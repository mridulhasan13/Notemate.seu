import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://enuzazrnpqtwbzwmolvl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVudXphenJucHF0d2J6d21vbHZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxOTgxNjAsImV4cCI6MjA4OTc3NDE2MH0.uTpQj9SyI1he5pGF0y1DU1jKXJ3OpBnHMgtkfvaInl0';
const supabase = createClient(supabaseUrl, supabaseKey);

async function inspect() {
    console.log("🔍 Deep Data Inspection (JSON Mode)...");
    const { data: notes, error } = await supabase.from('notes').select('*');
    if (error) {
        console.error("❌ DB Error:", error);
        return;
    }

    console.log(`📊 Total Notes: ${notes.length}`);
    notes.forEach(note => {
        console.log(JSON.stringify({
            id: note.id,
            title: note.title,
            course_code: note.course_code,
            department: note.department,
            created_at: note.created_at
        }, null, 2));
    });
    console.log("🏁 Inspection Finished.");
}

inspect();
