import { NextRequest, NextResponse } from 'next/server';
import { recruiterFAQ } from '@/app/lib/data';

// ─── Intent → card + answer map ───────────────────────────────────────────────

const INTENT_ANSWERS: Record<string, { answer: string; cards: string[] }> = {
  about:            { answer: "Here's a summary of who Sanket is.", cards: ['about'] },
  skills:           { answer: "Here are Sanket's design skills and tools.", cards: ['skills'] },
  experience:       { answer: "Here's Sanket's work experience.", cards: ['experience'] },
  caseStudies:      { answer: "Here are Sanket's selected UX case studies.", cards: ['caseStudies'] },
  resume:           { answer: "You can download Sanket's latest resume below.", cards: ['resume'] },
  contact:          { answer: "Here's how you can reach Sanket.", cards: ['contact'] },
  education:        { answer: "Here's Sanket's educational background.", cards: ['education'] },
  currentCompany:   { answer: `Sanket currently works at ${recruiterFAQ.currentCompany} as a ${recruiterFAQ.currentRole}.`, cards: [] },
  noticePeriod:     { answer: `Sanket's notice period is ${recruiterFAQ.noticePeriod}.`, cards: [] },
  totalExperience:  { answer: `Sanket has approximately ${recruiterFAQ.totalExperience} of professional experience.`, cards: [] },
  salaryExpectation:{ answer: `Sanket's salary expectation is around ${recruiterFAQ.salaryExpectation} depending on the role and responsibilities.`, cards: [] },
  reasonForChange:  { answer: recruiterFAQ.reasonForChange, cards: [] },
  locationFAQ:      { answer: `Sanket is currently based in ${recruiterFAQ.location}.`, cards: [] },
  personalPrivacy:  { answer: '__PERSONAL_PRIVACY__', cards: [] },
  unknown:          { answer: "I can help you explore Sanket's work, experience, case studies and design thinking.", cards: ['explore'] },
};

// ─── Sarcastic responses for personal questions ───────────────────────────────

const SARCASTIC_RESPONSES = [
  "Ah yes, Sanket's current salary — filed right next to his diary and his Wi-Fi password. Not public info! 😄",
  "That's classified information. Even Sanket's mom doesn't know the exact number. Try asking about his skills instead!",
  "Current CTC? Bold question. How about we start with what Sanket can do for your team first? 😏",
  "Nice try! That's between Sanket and his Excel sheet. His expected salary though — totally shareable, just ask!",
  "Sanket keeps his current salary as private as his Netflix password. But his salary expectations are shareable — just ask!",
];

// ─── Build response ────────────────────────────────────────────────────────────

function buildResponse(intent: string) {
  if (intent === 'personalPrivacy') {
    const answer = SARCASTIC_RESPONSES[Math.floor(Math.random() * SARCASTIC_RESPONSES.length)];
    return { intent, answer, cards: [] };
  }
  const data = INTENT_ANSWERS[intent] ?? INTENT_ANSWERS['unknown'];
  return { intent, answer: data.answer, cards: data.cards };
}

// ─── Keyword intent detection ─────────────────────────────────────────────────

function detectIntent(input: string): string {
  const q = input.toLowerCase();

  // ── Personal / private (must come before salary) ───────────────────────────
  if (/current (salary|ctc|package|pay|income|compensation)/.test(q)) return 'personalPrivacy';
  if (/(how much|what).*(earn|mak|paid|getting|drawing)/.test(q)) return 'personalPrivacy';
  if (/(existing|current|present).*(salary|ctc|package)/.test(q)) return 'personalPrivacy';

  // ── Notice period ──────────────────────────────────────────────────────────
  if (/notice/.test(q)) return 'noticePeriod';

  // ── Salary expectation ─────────────────────────────────────────────────────
  if (/(salary|ctc|package|lpa|compensation|pay|hike|expectation|expected)/.test(q)) return 'salaryExpectation';

  // ── Reason for change ──────────────────────────────────────────────────────
  if (/(why.*(change|switch|leav|look|mov|left)|reason.*(change|switch|leav)|job change|switching job|open to)/.test(q)) return 'reasonForChange';

  // ── Current company / where works ─────────────────────────────────────────
  if (/(current (company|org|role|job|employer)|currently work|where.*(work|employed)|which company|working at|works at|where is he work|genpact)/.test(q)) return 'currentCompany';

  // ── Total experience ───────────────────────────────────────────────────────
  if (/(total experience|years of exp|how many years|work experience|how long.*work|exp of sanket)/.test(q)) return 'totalExperience';

  // ── Location ───────────────────────────────────────────────────────────────
  if (/(location|city|based|where.*live|where.*from|where.*stay|relocat|mumbai)/.test(q)) return 'locationFAQ';

  // ── Case studies ───────────────────────────────────────────────────────────
  if (/(case stud|portfolio|ux work|design work|project|behance|show me.*work|show.*case)/.test(q)) return 'caseStudies';

  // ── Skills ─────────────────────────────────────────────────────────────────
  if (/(skill|tool|figma|software|expertise|specializ|capability|design process|tech stack)/.test(q)) return 'skills';

  // ── Experience (work history — after currentCompany check) ────────────────
  if (/(experience|work history|career|genpact|tcs|job|role|company|companies|employment)/.test(q)) return 'experience';

  // ── Resume ─────────────────────────────────────────────────────────────────
  if (/(resume|cv|download|pdf)/.test(q)) return 'resume';

  // ── Contact ────────────────────────────────────────────────────────────────
  if (/(contact|email|phone|reach|hire|linkedin|connect|get in touch|talk to)/.test(q)) return 'contact';

  // ── Education ─────────────────────────────────────────────────────────────
  if (/(education|degree|college|university|diploma|study|studied|qualification)/.test(q)) return 'education';

  // ── About ─────────────────────────────────────────────────────────────────
  if (/(about|who is|who.*sanket|profile|summary|background|tell me|introduce|sanket sawant|himself)/.test(q)) return 'about';

  // Blogs / articles
  if (/(blog|article|write|writing|post|linkedin post|ux write|reads|zeigarnik|spotify|labels|microcopy)/.test(q)) return 'blogs';

  return 'unknown';
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message?.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const intent = detectIntent(message);
    console.log(`[chat] "${message}" → intent: ${intent}`);

    return NextResponse.json(buildResponse(intent));

  } catch (error) {
    console.error('Chat route error:', error);
    return NextResponse.json(
      { intent: 'unknown', answer: 'Something went wrong. Please try again.', cards: [] },
      { status: 500 }
    );
  }
}
