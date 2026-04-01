import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let genAI = null;
let model = null;
let visionModel = null;

function getModel() {
    if (!model) {
        if (!API_KEY || API_KEY === 'your_gemini_api_key_here') {
            throw new Error('GEMINI_API_KEY_MISSING');
        }
        genAI = new GoogleGenerativeAI(API_KEY);
        model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        visionModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    }
    return { model, visionModel };
}

// Convert a File object to base64 inline data for Gemini
async function fileToGenerativePart(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result.split(',')[1];
            resolve({ inlineData: { data: base64, mimeType: file.type } });
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// Fetch a remote file URL and convert to base64 for Gemini
async function urlToGenerativePart(url, mimeType = 'application/pdf') {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error('Fetch failed: ' + resp.statusText);
    const blob = await resp.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result.split(',')[1];
            resolve({ inlineData: { data: base64, mimeType } });
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

// ── Chat with optional attached file ──────────────────────────────────────────
export async function askAI(message, history = [], attachedFile = null) {
    const { visionModel: m } = getModel();

    const systemContext = `You are NoteMate AI, an intelligent study assistant for Southeast University (SEU) Bangladesh students. You help with:
- Answering academic questions across all subjects
- Explaining and summarizing uploaded notes, PDFs, and images
- Identifying important exam topics and predicting exam questions
- Helping with assignments and study plans
- Providing information about SEU departments and courses

When a file is attached, analyze it thoroughly and answer based on its content.
Be helpful, friendly, and detailed. Use markdown formatting for better readability.`;

    const parts = [];

    // Attach file if provided
    if (attachedFile) {
        try {
            const filePart = await fileToGenerativePart(attachedFile);
            parts.push(filePart);
        } catch (e) {
            console.error('File attachment error:', e);
        }
    }

    parts.push({ text: message });

    // Build conversation history for context
    const historyParts = history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
    }));

    const chat = m.startChat({
        history: [
            { role: 'user', parts: [{ text: 'Hello' }] },
            { role: 'model', parts: [{ text: `Hi! I'm NoteMate AI, your study assistant for SEU. You can chat with me, upload files (PDF, images), or load any note from the platform for me to analyze. What do you need help with?` }] },
            ...historyParts
        ],
        systemInstruction: systemContext,
    });

    const result = await chat.sendMessageStream(parts);
    return result.stream;
}

// ── Analyze a note from Supabase (by URL) ─────────────────────────────────────
export async function analyzeNoteFromUrl(fileUrl, userQuestion, mimeType = 'application/pdf') {
    const { visionModel: m } = getModel();

    let parts;
    try {
        const filePart = await urlToGenerativePart(fileUrl, mimeType);
        parts = [
            filePart,
            { text: userQuestion || 'Please summarize this document and identify the most important topics for exam preparation. Also predict likely exam questions.' }
        ];
    } catch (e) {
        // If file fetch fails, just answer from the question
        parts = [{ text: `I couldn't load the file directly. Here's the question: ${userQuestion}` }];
    }

    const result = await m.generateContentStream(parts);
    return result.stream;
}

// ── Summarize text ─────────────────────────────────────────────────────────────
export async function summarizeNote(text) {
    const { model: m } = getModel();
    const prompt = `You are a helpful study assistant. Summarize the following notes in a clear, structured way:
- Start with a 2-3 sentence overview
- Then list 5-8 key bullet points (use • bullet)
- End with a "Key Takeaways" section with 3 points

Notes:
${text}`;
    const result = await m.generateContentStream(prompt);
    return result.stream;
}

// ── Exam topics ────────────────────────────────────────────────────────────────
export async function getExamTopics(text) {
    const { model: m } = getModel();
    const prompt = `You are an expert exam preparation tutor. Analyze the following study material and identify the most important topics for an exam.

Format your response as:
## 🎯 Most Important Topics (Must Know)
List the top 3-4 critical topics with a brief explanation of why they're important.

## 📌 Important Topics (Very Likely)
List 4-5 topics that frequently appear in exams.

## 📝 Good to Know
List 3-4 supplementary topics.

For each topic, briefly explain what specific aspects to focus on.

Study Material:
${text}`;
    const result = await m.generateContentStream(prompt);
    return result.stream;
}

// ── Question prediction ────────────────────────────────────────────────────────
export async function predictQuestions(text, subject) {
    const { model: m } = getModel();
    const prompt = `You are an expert exam paper setter with years of experience at universities in Bangladesh. Analyze the following notes${subject ? ` for the subject: ${subject}` : ''} and predict likely exam questions.

Format your response as:

## 📋 Likely Short Questions (2-5 marks)
List 5-6 short answer questions with hints.

## 📝 Likely Broad Questions (10-15 marks)
List 3-4 detailed/essay-type questions that could appear.

## 💡 MCQ Topics
List 5 topics likely to appear as multiple-choice questions.

## 🔥 Hottest Topics
What is the single most likely topic to appear in the exam and why?

Notes:
${text}`;
    const result = await m.generateContentStream(prompt);
    return result.stream;
}
