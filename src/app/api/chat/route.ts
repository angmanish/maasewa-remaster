import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await streamText({
      model: google('gemini-2.5-flash'),
      system: `You are the exclusive customer support assistant for Maasewa Healthcare.
Your ONLY purpose is to answer questions related to Maasewa Healthcare's services, which include home nursing, elder care, ICU home setup, and post-operative care in Pune and Mumbai.

IMPORTANT COMPANY DETAILS (Always use these exact details if the user asks how to contact you or book a service):
- Phone Number / Helpline: +91 6361376521
- Email: info@maasewahealthcare.com
- Website: maasewahealthcare.com

CRITICAL RULE: If a user asks ANY question that is not directly related to Maasewa Healthcare, medical services, or patient care, you MUST refuse to answer. Reply with: "I apologize, but I can only assist you with questions related to Maasewa Healthcare services." Do not provide general knowledge, programming help, or any other out-of-scope information.
Keep your answers professional, concise, and highly relevant.`,
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Error in chat route:', error);
    return new Response(JSON.stringify({ error: 'Failed to process chat request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
