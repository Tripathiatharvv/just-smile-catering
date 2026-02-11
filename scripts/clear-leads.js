const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function clearLeads() {
    console.log('Clearing all leads...');

    // Using delete with neq (not equal) to id 0000... to match all rows
    // Or since we don't have a truncate allowed over api usually without service key 
    // (unless RLS allows delete for all).
    // The user is admin, so RLS allows delete.
    // We need to login as admin first to delete if RLS protects it.

    // Login as admin
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: 'curiousmugnoida@gmail.com',
        password: 'JustSmile98@$$',
    });

    if (authError) {
        console.error('Auth failed:', authError.message);
        return;
    }

    console.log('Logged in as admin.');

    // Delete all leads
    // We can select all IDs and then delete them
    const { data: leads, error: fetchError } = await supabase.from('leads').select('id');

    if (fetchError) {
        console.error('Error fetching leads:', fetchError.message);
        return;
    }

    if (leads.length === 0) {
        console.log('No leads to delete.');
        return;
    }

    const ids = leads.map(l => l.id);
    const { error: deleteError } = await supabase.from('leads').delete().in('id', ids);

    if (deleteError) {
        console.error('Error deleting leads:', deleteError.message);
    } else {
        console.log(`Successfully deleted ${leads.length} leads.`);
    }
}

clearLeads();
