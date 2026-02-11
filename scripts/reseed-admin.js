const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// If we had service_role we could delete users first, but with anon we rely on cleanup or just recreate
// Since user says they deleted it, we assume it's gone.

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedAdmin() {
    const email = 'curiousmugnoida@gmail.com';
    const password = 'JustSmile98@$$';

    console.log(`Attempting to create admin user: ${email}`);

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        console.error('Error creating user:', error.message);
        if (error.message.includes("User already registered")) {
            console.log("User already exists. Attempting login to verify.");
            const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
                email,
                password
            });
            if (loginError) {
                console.error("Login failed:", loginError.message);
            } else {
                console.log("Login successful! User is active.");
            }
        }
    } else {
        console.log('User created successfully:', data.user?.id);
        console.log('Session established:', !!data.session);
    }
}

seedAdmin();
