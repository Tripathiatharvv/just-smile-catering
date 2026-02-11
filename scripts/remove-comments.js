const fs = require('fs');
const path = require('path');

function removeComments(content) {
    // Regex to match single-line comments (//) and multi-line comments (/* */)
    // Be careful with strings containing // or /*
    // This is a basic implementation, a full parser is safer but complex.
    // Given the context, a carefully crafted regex or using a library is better.
    // But we can't install libraries easily without user permission.
    // Let's use a regex that handles strings reasonably well.

    return content.replace(/\/\*[\s\S]*?\*\/|(?<=[^:])\/\/.*|^\/\/.*/gm, (match, offset, string) => {
        // Check if the match is inside a string (simple check)
        // This is not perfect but covers most cases
        const before = string.substring(0, offset);
        const singleQuotes = (before.match(/'/g) || []).length;
        const doubleQuotes = (before.match(/"/g) || []).length;
        const backticks = (before.match(/`/g) || []).length;

        if (singleQuotes % 2 !== 0 || doubleQuotes % 2 !== 0 || backticks % 2 !== 0) {
            return match; // It's inside a string, don't replace
        }
        return '';
    });
}

function processDirectory(dir) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
                processDirectory(filePath);
            }
        } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.js')) {
            const content = fs.readFileSync(filePath, 'utf8');
            const newContent = removeComments(content);

            // Cleanup empty lines left by removed comments
            const cleaned = newContent.replace(/^\s*[\r\n]/gm, '');

            if (content !== cleaned) {
                fs.writeFileSync(filePath, cleaned, 'utf8');
                console.log(`Processed: ${filePath}`);
            }
        }
    });
}

const targetDir = path.join(__dirname, '../src');
if (fs.existsSync(targetDir)) {
    console.log(`Cleaning comments in ${targetDir}...`);
    processDirectory(targetDir);
    console.log('Done.');
} else {
    console.error(`Directory ${targetDir} not found.`);
}
