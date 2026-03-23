import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://enuzazrnpqtwbzwmolvl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVudXphenJucHF0d2J6d21vbHZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxOTgxNjAsImV4cCI6MjA4OTc3NDE2MH0.uTpQj9SyI1he5pGF0y1DU1jKXJ3OpBnHMgtkfvaInl0';
const supabase = createClient(supabaseUrl, supabaseKey);

async function inspect() {
    console.log("🔍 Detailed Data Inspection...");
    const { data: notes, error } = await supabase.from('notes').select('id, title, course_code, department, file_url');
    if (error) {
        console.error("❌ DB Error:", error);
        return;
    }

    console.log(`📊 Found ${notes.length} total entries.`);
    notes.forEach(note => {
        console.log(`--- [${note.id}] ---`);
        console.log(`Title: ${note.title}`);
        console.log(`Code:  [${note.course_code}]`);
        console.log(`Dept:  ${note.department}`);
        console.log(`URL:   ${note.file_url ? 'EXISTS' : 'MISSING'}`);
    });
    console.log("🏁 Inspection Finished.");
}

inspect();
