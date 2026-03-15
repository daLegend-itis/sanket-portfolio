'use client';

import React, { useRef, useEffect, useState } from 'react';
import {
  MessageSquarePlus, Search, Layers, FileText, Mail, User,
  Briefcase, FolderKanban, Paperclip, Send, Sparkles, X,
  Target, AlertCircle, Lightbulb, CheckCircle2, Download,
  ExternalLink, MapPin, Phone, Linkedin, GraduationCap,
  Wrench, ChevronRight, Loader2,
} from 'lucide-react';
import {
  sanketProfile, contact, experience, skills, education,
  caseStudies, resume, blogArticles,
} from './lib/data';

// ─── Types ────────────────────────────────────────────────────────────────────

type Intent = 'about' | 'skills' | 'experience' | 'caseStudies' | 'resume' | 'contact' | 'education' | 'unknown';

type AIResponse = {
  intent: Intent;
  answer: string;
  cards: string[];
};

type Message = {
  id: string;
  role: 'user' | 'assistant';
  text?: string;       // user message text OR assistant answer text
  aiResponse?: AIResponse;
  loading?: boolean;
  streaming?: boolean; // true while typewriter is running
};

type HistoryEntry = { role: 'user' | 'assistant'; content: string };

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  const [showSplash, setShowSplash] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;
    setInputValue('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';

    const userMsg: Message = { id: `u-${Date.now()}`, role: 'user', text };
    const loadingMsg: Message = { id: `a-${Date.now() + 1}`, role: 'assistant', loading: true };

    setMessages((prev) => [...prev, userMsg, loadingMsg]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history }),
      });

      const data: AIResponse = await res.json();

      // Replace the loading bubble — start with empty text and streaming: true
      // The typewriter effect in AssistantResponse will animate the text in
      setMessages((prev) =>
        prev.map((m) =>
          m.loading ? { ...m, loading: false, aiResponse: data, text: data.answer, streaming: true } : m
        )
      );

      // Append to conversation history for multi-turn context
      setHistory((prev) => [
        ...prev,
        { role: 'user', content: text },
        { role: 'assistant', content: JSON.stringify(data) },
      ]);
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.loading
            ? {
                ...m,
                loading: false,
                text: 'Something went wrong. Please try again.',
                aiResponse: { intent: 'unknown', answer: '', cards: [] },
              }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SplashScreen visible={showSplash} />

      <div className="relative w-full bg-[#FAFAFA] flex font-sans text-slate-800 selection:bg-orange-100 selection:text-orange-900 overflow-hidden" style={{ height: '100dvh' }}>
        {/* Ambient blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FFF0E5] rounded-full blur-[100px] pointer-events-none opacity-80" />
        <div className="absolute top-[10%] right-[-10%] w-[50%] h-[60%] bg-[#FFE8D6] rounded-full blur-[120px] pointer-events-none opacity-80" />
        <div className="absolute bottom-[-10%] left-[10%] w-[60%] h-[50%] bg-[#FFF9F2] rounded-full blur-[120px] pointer-events-none opacity-70" />

        {/* Nav Rail — hidden on mobile */}
        <nav className="hidden md:flex z-20 w-[72px] border-r border-slate-200/50 bg-white/40 backdrop-blur-xl flex-col items-center py-6 flex-shrink-0" style={{ height: '100dvh' }}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white shadow-sm mb-12 cursor-pointer hover:scale-105 transition-transform duration-300">
            <span className="font-semibold text-sm tracking-wide">SS</span>
          </div>
          <div className="flex flex-col gap-5 items-center w-full px-2">
            <NavIcon icon={<MessageSquarePlus size={20} strokeWidth={1.75} />} active tooltip="New Chat" />
            <NavIcon icon={<Search size={20} strokeWidth={1.75} />} tooltip="Search" />
            <NavIcon icon={<Layers size={20} strokeWidth={1.75} />} tooltip="Projects" />
            <NavIcon icon={<FileText size={20} strokeWidth={1.75} />} tooltip="Resume" />
          </div>
          <div className="mt-auto w-full px-2 flex justify-center">
            <NavIcon icon={<Mail size={20} strokeWidth={1.75} />} tooltip="Contact" />
          </div>
        </nav>

        {/* Main */}
        <main className="relative z-10 flex-1 p-0 md:p-4 lg:p-10 flex justify-center items-start overflow-hidden" style={{ height: '100dvh' }}>
          <div className="w-full max-w-[1100px] bg-white/60 backdrop-blur-3xl md:rounded-[2.5rem] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.06)] border-0 md:border border-white flex flex-col overflow-hidden ring-1 ring-slate-900/[0.03]" style={{ height: '100%' }}>

            <div ref={messagesContainerRef} className="flex-1 overflow-y-auto hide-scrollbar pb-28 md:pb-36 scroll-smooth">

              {/* Hero Header */}
              <div className="pt-8 md:pt-16 pb-5 md:pb-8 px-5 md:px-8 text-center max-w-2xl mx-auto flex flex-col items-center">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-slate-100 shadow-sm text-xs font-medium text-slate-500 mb-4 backdrop-blur-md">
                  <Sparkles size={14} className="text-orange-500" />
                  <span>AI Portfolio Assistant</span>
                </div>
                <h1 className="text-[1.85rem] md:text-[2.75rem] leading-[1.15] font-medium tracking-tight text-slate-800 mb-3">
                  Ask anything about<br />Sanket Sawant
                </h1>
                <p className="text-[0.9rem] md:text-[1.05rem] text-slate-500 leading-relaxed font-light max-w-sm md:max-w-full">
                  Explore Sanket&apos;s work, experience and case studies through conversation.
                </p>
              </div>

              {/* Quick Actions */}
              <div className="px-8 pb-14 flex justify-center flex-wrap gap-3 max-w-4xl mx-auto">
                <QuickAction icon={<User size={16} strokeWidth={2} />} label="About Sanket" onClick={() => handleSend('Who is Sanket Sawant?')} />
                <QuickAction icon={<Briefcase size={16} strokeWidth={2} />} label="Work Experience" onClick={() => handleSend('Show me Sanket\'s work experience')} />
                <QuickAction icon={<FolderKanban size={16} strokeWidth={2} />} label="Case Studies" onClick={() => handleSend('Show Sanket\'s UX case studies')} />
                <QuickAction icon={<FileText size={16} strokeWidth={2} />} label="Download Resume" onClick={() => handleSend('I want to download Sanket\'s resume')} />
                <QuickAction icon={<Mail size={16} strokeWidth={2} />} label="Contact Sanket" onClick={() => handleSend('How can I contact Sanket?')} />
              </div>

              {/* Chat Thread */}
              <div className="px-4 md:px-10 pb-12 flex flex-col gap-5 max-w-4xl mx-auto w-full">

                {/* Dynamic messages */}
                {messages.map((msg) =>
                  msg.role === 'user' ? (
                    <UserBubble key={msg.id} text={msg.text!} />
                  ) : msg.loading ? (
                    <AssistantBubble key={msg.id}>
                      <TypingIndicator />
                    </AssistantBubble>
                  ) : (
                    <AssistantBubble key={msg.id}>
                      <AssistantResponse message={msg} onExternalSend={handleSend} />
                    </AssistantBubble>
                  )
                )}

                <div ref={chatEndRef} className="h-4" />
              </div>
            </div>

            {/* Input Bar — always anchored at bottom of flex column */}
            <div className="flex-shrink-0 px-4 md:px-6 py-3 md:py-5 pt-5 md:pt-10 bg-gradient-to-t from-white/98 via-white/90 to-transparent backdrop-blur-[4px]">

              <div className="max-w-3xl mx-auto w-full relative group">
                <div className="absolute -inset-[2px] bg-gradient-to-r from-orange-100 via-rose-100 to-amber-100 rounded-[1.35rem] blur-md opacity-40 group-hover:opacity-80 transition duration-500" />
                <div className="relative bg-white/90 backdrop-blur-md rounded-[1.25rem] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] border border-slate-200/50 flex items-end p-2 px-3 focus-within:ring-2 focus-within:ring-orange-200 focus-within:border-transparent transition-all">
                  <button className="p-2.5 text-slate-400 hover:text-orange-500 rounded-full hover:bg-orange-50 transition-colors shrink-0 mb-0.5">
                    <Paperclip size={20} strokeWidth={2} />
                  </button>
                  <textarea
                    ref={textareaRef}
                    rows={1}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(inputValue); }
                    }}
                    placeholder="Ask anything about Sanket..."
                    disabled={isLoading}
                    className="flex-1 max-h-[120px] bg-transparent border-none outline-none px-3 py-3 text-[15px] text-slate-700 placeholder-slate-400 resize-none min-h-[44px] leading-relaxed selection:bg-orange-100 disabled:opacity-50"
                    onInput={(e) => {
                      const t = e.target as HTMLTextAreaElement;
                      t.style.height = 'auto';
                      t.style.height = `${Math.min(t.scrollHeight, 120)}px`;
                    }}
                  />
                  <button
                    onClick={() => handleSend(inputValue)}
                    disabled={isLoading || !inputValue.trim()}
                    className="p-2.5 bg-slate-800 text-white rounded-[0.85rem] hover:bg-orange-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-300 shadow-sm flex items-center justify-center shrink-0 mb-0.5 group/btn"
                  >
                    {isLoading
                      ? <Loader2 size={18} strokeWidth={2} className="animate-spin" />
                      : <Send size={18} strokeWidth={2} className="ml-0.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    }
                  </button>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </>
  );
}

// ─── Assistant Response — renders answer text + mapped cards ──────────────────

// ─── Follow-up suggestions per intent ────────────────────────────────────────

const FOLLOW_UP_SUGGESTIONS: Record<string, { label: string; msg: string }[]> = {
  about: [
    { label: "Work experience", msg: "Show me Sanket's work experience" },
    { label: "UX case studies", msg: "Show Sanket's UX case studies" },
    { label: "Skills & tools", msg: "What skills does Sanket have?" },
    { label: "Download resume", msg: "Download Sanket's resume" },
  ],
  experience: [
    { label: "View case studies", msg: "Show Sanket's UX case studies" },
    { label: "Design challenges", msg: "What challenges has Sanket solved?" },
    { label: "Download resume", msg: "Download Sanket's resume" },
    { label: "Contact Sanket", msg: "How can I contact Sanket?" },
  ],
  caseStudies: [
    { label: "Work experience", msg: "Show me Sanket's work experience" },
    { label: "Read UX blogs", msg: "Show Sanket's UX blogs" },
    { label: "Skills & tools", msg: "What tools does Sanket use?" },
    { label: "Contact Sanket", msg: "How can I contact Sanket?" },
  ],
  skills: [
    { label: "Work experience", msg: "Show me Sanket's work experience" },
    { label: "Case studies", msg: "Show Sanket's UX case studies" },
    { label: "About Sanket", msg: "Tell me about Sanket Sawant" },
    { label: "Download resume", msg: "Download Sanket's resume" },
  ],
  blogs: [
    { label: "Case studies", msg: "Show Sanket's UX case studies" },
    { label: "Skills & tools", msg: "What tools does Sanket use?" },
    { label: "About Sanket", msg: "Who is Sanket Sawant?" },
    { label: "Contact Sanket", msg: "How can I contact Sanket?" },
  ],
  contact: [
    { label: "Download resume", msg: "Download Sanket's resume" },
    { label: "Case studies", msg: "Show Sanket's UX case studies" },
    { label: "Work experience", msg: "Show me Sanket's work experience" },
  ],
  resume: [
    { label: "Case studies", msg: "Show Sanket's UX case studies" },
    { label: "Work experience", msg: "Show me Sanket's work experience" },
    { label: "Contact Sanket", msg: "How can I contact Sanket?" },
  ],
  education: [
    { label: "About Sanket", msg: "Tell me about Sanket Sawant" },
    { label: "Skills & tools", msg: "What skills does Sanket have?" },
    { label: "Work experience", msg: "Show me Sanket's work experience" },
  ],
  currentCompany: [
    { label: "Work experience", msg: "Show me Sanket's work experience" },
    { label: "Case studies", msg: "Show Sanket's UX case studies" },
    { label: "Notice period", msg: "What is Sanket's notice period?" },
    { label: "Contact Sanket", msg: "How can I contact Sanket?" },
  ],
  noticePeriod: [
    { label: "Expected CTC", msg: "What is Sanket's salary expectation?" },
    { label: "Work experience", msg: "Show me Sanket's work experience" },
    { label: "Contact Sanket", msg: "How can I contact Sanket?" },
  ],
  salaryExpectation: [
    { label: "Notice period", msg: "What is Sanket's notice period?" },
    { label: "Work experience", msg: "Show me Sanket's work experience" },
    { label: "Contact Sanket", msg: "How can I contact Sanket?" },
  ],
  reasonForChange: [
    { label: "Work experience", msg: "Show me Sanket's work experience" },
    { label: "Case studies", msg: "Show Sanket's UX case studies" },
    { label: "Contact Sanket", msg: "How can I contact Sanket?" },
  ],
  totalExperience: [
    { label: "Work experience", msg: "Show me Sanket's work experience" },
    { label: "Skills & tools", msg: "What skills does Sanket have?" },
    { label: "Download resume", msg: "Download Sanket's resume" },
  ],
  locationFAQ: [
    { label: "About Sanket", msg: "Tell me about Sanket Sawant" },
    { label: "Contact Sanket", msg: "How can I contact Sanket?" },
    { label: "Work experience", msg: "Show me Sanket's work experience" },
  ],
};

function AssistantResponse({ message, onExternalSend }: { message: Message; onExternalSend?: (msg: string) => void }) {
  const { aiResponse, text, streaming } = message;
  if (!aiResponse) return null;

  const fullText = text ?? '';
  const [displayedText, setDisplayedText] = useState(streaming ? '' : fullText);
  const [isDone, setIsDone] = useState(!streaming);

  // Typewriter effect — runs only when streaming: true
  useEffect(() => {
    if (!streaming || !fullText) {
      setDisplayedText(fullText);
      setIsDone(true);
      return;
    }
    setDisplayedText('');
    setIsDone(false);
    let i = 0;
    // Small initial pause so the typing indicator briefly shows before text starts
    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayedText(fullText.slice(0, i));
        if (i >= fullText.length) {
          clearInterval(interval);
          setIsDone(true);
        }
      }, 18); // ~18ms per character — feels natural, not too slow
      return () => clearInterval(interval);
    }, 400);
    return () => clearTimeout(startDelay);
  }, [fullText, streaming]);

  const suggestions = FOLLOW_UP_SUGGESTIONS[aiResponse.intent] ?? [];

  return (
    <div className="flex flex-col gap-4 w-full animate-in fade-in slide-in-from-bottom-2 duration-400">
      {/* Typewriter answer text */}
      {(displayedText || fullText) && (
        <div className="px-4 md:px-5 py-3 md:py-4 leading-[1.65] text-[14px] md:text-[15px] bg-white/90 text-slate-700 rounded-[1.25rem] rounded-tl-sm shadow-[0_2px_16px_-4px_rgba(0,0,0,0.05)] border border-slate-100 backdrop-blur-sm self-start max-w-[78%] md:max-w-[72%]">
          {displayedText}
          {/* Blinking cursor while streaming */}
          {!isDone && (
            <span className="inline-block w-[2px] h-[1em] bg-orange-400 ml-[2px] align-middle animate-pulse" />
          )}
        </div>
      )}
      {/* Cards + chips only appear after text finishes streaming */}
      {isDone && (
        <>
          {(aiResponse.cards ?? []).map((card) => (
            <CardRenderer key={card} cardType={card} onSend={onExternalSend} />
          ))}
          {suggestions.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1 animate-in fade-in duration-500">
              {suggestions.map((s, i) => (
                <button
                  key={s.label}
                  onClick={() => onExternalSend?.(s.msg)}
                  className={`text-[12px] font-medium text-slate-500 hover:text-orange-600 bg-white/70 hover:bg-orange-50 border border-slate-200/70 hover:border-orange-200 px-3 py-1.5 rounded-full transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 whitespace-nowrap ${i >= 3 ? 'hidden md:inline-flex' : ''}`}
                >
                  {s.label} →
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ─── Card Renderer — maps card type string → component ───────────────────────

function CardRenderer({ cardType, onSend }: { cardType: string; onSend?: (msg: string) => void }) {
  switch (cardType) {
    case 'about':       return <AboutCard />;
    case 'experience':  return <ExperienceCards />;
    case 'caseStudies': return <CaseStudyCarousel />;
    case 'resume':      return <ResumeCard />;
    case 'contact':     return <ContactCard />;
    case 'skills':      return <SkillsCard />;
    case 'education':   return <EducationCard />;
    case 'explore':     return <ExplorationCards onSend={onSend} />;
    case 'blogs':       return <BlogCards />;
    default:            return null;
  }
}

// ─── Blog Cards ───────────────────────────────────────────────────────────────

function BlogCards() {
  return (
    <div className="flex flex-col gap-3 w-full animate-in fade-in slide-in-from-bottom-2 duration-400">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {blogArticles.map((article) => (
          <div
            key={article.title}
            className="group flex flex-col gap-3 bg-white border border-slate-100 rounded-[1.25rem] overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_-6px_rgba(249,115,22,0.12)] transition-all duration-300 hover:-translate-y-0.5"
          >
            <div className="h-1.5 w-full bg-gradient-to-r from-violet-400 to-indigo-400" />
            <div className="px-5 pb-5 flex flex-col gap-2.5 flex-1">
              <span className="text-[10px] font-bold text-violet-600 bg-violet-50 border border-violet-100/60 px-2.5 py-1 rounded-md inline-flex w-fit uppercase tracking-widest">
                {article.topic}
              </span>
              <h3 className="text-[14px] font-bold text-slate-800 leading-snug group-hover:text-violet-600 transition-colors">
                {article.title}
              </h3>
              <p className="text-[13px] text-slate-500 leading-relaxed flex-1">
                {article.description}
              </p>
              <a
                href={article.link}
                target="_blank"
                rel="noreferrer"
                className="mt-1 w-full flex items-center justify-center gap-2 py-2.5 text-[13px] font-semibold text-slate-700 bg-slate-50 hover:bg-violet-50 hover:text-violet-700 border border-slate-200/80 hover:border-violet-200 rounded-xl transition-all duration-200"
              >
                <ExternalLink size={14} strokeWidth={2} /> Read Article
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Exploration Cards (unknown fallback) ────────────────────────────────────

const EXPLORE_CARDS = [
  {
    title: 'About Sanket',
    description: "Learn about Sanket's background, experience and design focus.",
    icon: '👤',
    message: 'Tell me about Sanket Sawant',
  },
  {
    title: 'Work Experience',
    description: 'See where Sanket has worked and the type of products he has designed.',
    icon: '💼',
    message: "Show me Sanket's work experience",
  },
  {
    title: 'UX Case Studies',
    description: "Explore selected UX case studies from Sanket's portfolio.",
    icon: '📐',
    message: "Show Sanket's UX case studies",
  },
  {
    title: 'Design Challenges',
    description: 'Discover some of the complex design problems Sanket has solved.',
    icon: '🧩',
    message: "What complex design problems has Sanket solved?",
  },
  {
    title: 'Contact Sanket',
    description: "Get in touch or view Sanket's resume.",
    icon: '✉️',
    message: 'How can I contact Sanket?',
  },
];

function ExplorationCards({ onSend }: { onSend?: (msg: string) => void }) {
  return (
    <div className="flex flex-col gap-3 w-full animate-in fade-in slide-in-from-bottom-2 duration-400">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {EXPLORE_CARDS.map((card) => (
          <button
            key={card.title}
            onClick={() => onSend?.(card.message)}
            className="group text-left flex items-start gap-3 p-4 bg-white hover:bg-orange-50 border border-slate-100 hover:border-orange-200 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 shadow-sm hover:shadow-md"
          >
            <span className="text-xl flex-shrink-0 mt-0.5">{card.icon}</span>
            <div>
              <p className="text-[13px] font-bold text-slate-800 group-hover:text-orange-600 transition-colors mb-0.5">
                {card.title}
              </p>
              <p className="text-[12px] text-slate-500 leading-relaxed">{card.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Typing Indicator ─────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="px-5 py-4 bg-white/90 rounded-[1.5rem] rounded-tl-sm shadow-[0_2px_16px_-4px_rgba(0,0,0,0.05)] border border-slate-100 backdrop-blur-sm self-start">
      <div className="flex items-center gap-1.5 h-5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full bg-orange-400 animate-bounce"
            style={{ animationDelay: `${i * 0.15}s`, animationDuration: '0.8s' }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── About Card ───────────────────────────────────────────────────────────────

function AboutCard() {
  return (
    <div className="bg-white rounded-[1.5rem] rounded-tl-sm border border-slate-100 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] overflow-hidden w-full animate-in fade-in slide-in-from-bottom-2 duration-400">
      <div className="h-2 bg-gradient-to-r from-orange-400 to-rose-400" />
      <div className="p-6">
        <div className="flex items-start gap-4 mb-5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
            {sanketProfile.initials}
          </div>
          <div>
            <h2 className="text-[18px] font-bold text-slate-800">{sanketProfile.name}</h2>
            <p className="text-[13px] text-orange-600 font-semibold">{sanketProfile.title}</p>
            <p className="text-[12px] text-slate-400 mt-0.5 flex items-center gap-1"><MapPin size={11} />{sanketProfile.location}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-orange-50 rounded-xl p-3 border border-orange-100/50">
            <p className="text-[11px] text-orange-500 font-bold uppercase tracking-widest mb-0.5">Experience</p>
            <p className="text-[18px] font-bold text-slate-800">{sanketProfile.yearsOfExperience} Years</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">Focus</p>
            <p className="text-[13px] font-semibold text-slate-700 leading-snug">{sanketProfile.specialization}</p>
          </div>
        </div>
        <p className="text-[14px] text-slate-600 leading-[1.7]">{sanketProfile.summary}</p>
      </div>
    </div>
  );
}

// ─── Experience Cards ─────────────────────────────────────────────────────────

function ExperienceCards() {
  return (
    <div className="flex flex-col gap-4 w-full">
      {experience.map((job) => (
        <div key={job.company} className="bg-white rounded-[1.25rem] border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-50 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[16px] font-bold text-slate-800">{job.company}</h3>
                {job.current && (
                  <span className="text-[10px] font-bold bg-green-50 text-green-600 border border-green-100 px-2 py-0.5 rounded-full uppercase tracking-widest">Current</span>
                )}
              </div>
              <p className="text-[13px] text-orange-600 font-semibold">{job.role}</p>
            </div>
            <span className="text-[12px] text-slate-400 font-medium whitespace-nowrap ml-4">{job.period}</span>
          </div>
          <div className="p-4 flex flex-col gap-3">
            {job.projects.map((proj) => (
              <div key={proj.name} className="flex gap-3 p-3 rounded-xl bg-slate-50/80 hover:bg-orange-50/40 transition-colors border border-slate-100/50">
                <ChevronRight size={14} className="text-orange-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[13px] font-bold text-slate-700 mb-0.5">{proj.name}</p>
                  <p className="text-[12px] text-slate-500 leading-relaxed">{proj.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {proj.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-semibold text-orange-600 bg-orange-50 border border-orange-100/60 px-2 py-0.5 rounded-md">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Case Study Carousel ──────────────────────────────────────────────────────

function CaseStudyCarousel() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = caseStudies.find((c) => c.id === selected);

  if (active) {
    return <CaseStudyDetail study={active} onClose={() => setSelected(null)} />;
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex gap-4 overflow-x-auto pb-6 pt-2 px-2 -mx-2 hide-scrollbar">
        {caseStudies.map((cs) => (
          <CaseStudyCard key={cs.id} study={cs} onClick={() => setSelected(cs.id)} />
        ))}
      </div>
      {/* Behance CTA */}
      <a
        href="https://www.behance.net/sanketsawant5"
        target="_blank"
        rel="noreferrer"
        className="self-start flex items-center gap-2 px-4 py-2.5 text-[13px] font-semibold text-slate-500 hover:text-orange-600 bg-white/70 hover:bg-orange-50 border border-slate-200/60 hover:border-orange-200 rounded-xl transition-all duration-300"
      >
        <ExternalLink size={14} strokeWidth={2} />
        View all case studies on Behance
      </a>
    </div>
  );
}

function CaseStudyCard({ study, onClick }: { study: typeof caseStudies[0]; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="group min-w-[260px] md:min-w-[280px] max-w-[300px] flex-shrink-0 flex flex-col gap-3 bg-white/80 backdrop-blur-md border border-slate-200/60 rounded-[1.25rem] overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_-6px_rgba(249,115,22,0.15)] transition-all duration-300 hover:-translate-y-1 cursor-pointer"
    >
      {/* Gradient header bar */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${study.gradient}`} />
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="text-[10px] font-bold text-orange-600 bg-orange-50/80 px-2.5 py-1 rounded-md inline-flex w-fit uppercase tracking-widest border border-orange-100/50">
          {study.category}
        </div>
        <h3 className="text-[15px] font-bold text-slate-800 leading-snug group-hover:text-orange-600 transition-colors">{study.title}</h3>
        <p className="text-[13px] text-slate-500 leading-relaxed flex-1">{study.description}</p>
        {/* Mini metadata row */}
        <div className="flex flex-col gap-1 pt-2 border-t border-slate-100 mt-1">
          <span className="text-[11px] text-slate-400"><span className="font-semibold text-slate-500">Client:</span> {study.client}</span>
          <span className="text-[11px] text-slate-400"><span className="font-semibold text-slate-500">Duration:</span> {study.duration}</span>
        </div>
        <button className="w-full text-[13px] font-semibold text-slate-700 bg-slate-50 group-hover:bg-orange-50 group-hover:text-orange-700 border border-slate-200/80 group-hover:border-orange-200 py-2.5 rounded-xl transition-all duration-300 shadow-sm">
          View Case Study
        </button>
      </div>
    </div>
  );
}

function CaseStudyDetail({ study, onClose }: { study: typeof caseStudies[0]; onClose: () => void }) {
  return (
    <div className="relative bg-white text-slate-700 rounded-[1.5rem] rounded-tl-sm shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)] border border-slate-100 w-full overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-400">

      {/* Gradient top bar */}
      <div className={`h-2 w-full bg-gradient-to-r ${study.gradient}`} />

      <div className="px-6 py-8">
        {/* Back button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors"
        >
          <X size={18} strokeWidth={2} />
        </button>

        {/* Category + Title */}
        <div className="text-[11px] font-bold text-orange-600 bg-orange-50 px-3 py-1.5 rounded-lg inline-flex w-fit uppercase tracking-widest mb-4 border border-orange-100/50">
          {study.category}
        </div>
        <h2 className="text-2xl md:text-[26px] leading-tight font-semibold text-slate-800 mb-6 pr-10">
          {study.title}
        </h2>

        {/* ── Project Overview ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8 p-4 bg-slate-50 rounded-2xl border border-slate-100">
          {[
            { label: 'Industry', value: study.industry },
            { label: 'Client', value: study.client },
            { label: 'Project Duration', value: study.duration },
            { label: 'Role', value: study.role },
            { label: 'Platform', value: study.platform },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{item.label}</p>
              <p className="text-[13px] font-semibold text-slate-700 leading-snug">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="space-y-8">

          {/* ── Context ── */}
          <section>
            <h3 className="text-[13px] font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Target size={15} className="text-orange-400" /> Context
            </h3>
            {study.context.split('\n\n').map((para, i) => (
              <p key={i} className={`text-slate-600 text-[14px] leading-[1.75] ${i > 0 ? 'mt-3' : ''}`}>{para}</p>
            ))}
          </section>

          {/* ── Problem Statement ── */}
          <section>
            <h3 className="text-[13px] font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <AlertCircle size={15} className="text-orange-400" /> Problem Statement
            </h3>
            {study.problem.split('\n\n').map((para, i) => (
              <p key={i} className={`text-slate-600 text-[14px] leading-[1.75] ${i > 0 ? 'mt-3' : ''}`}>{para}</p>
            ))}
          </section>

          {/* ── Key Design Decisions ── */}
          <section>
            <h3 className="text-[13px] font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              <Lightbulb size={15} className="text-orange-400" /> Key Design Decisions
            </h3>
            <div className="flex flex-col gap-3">
              {study.designDecisions.map((d, i) => (
                <div key={d.title} className="flex gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-6 h-6 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center text-[11px] font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-slate-800 mb-1">{d.title}</p>
                    <p className="text-[13px] text-slate-500 leading-relaxed">{d.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Solution ── */}
          <section>
            <h3 className="text-[13px] font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <CheckCircle2 size={15} className="text-orange-400" /> Solution
            </h3>
            <p className="text-slate-600 text-[14px] leading-[1.75]">{study.solution}</p>
          </section>

          {/* ── Outcomes ── */}
          <section>
            <h3 className="text-[13px] font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <CheckCircle2 size={15} className="text-orange-400" /> Outcome & Impact
            </h3>
            <ul className="space-y-2">
              {study.outcomes.map((o) => (
                <li key={o} className="flex items-start gap-2.5 text-[14px] text-slate-600 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0 mt-2" />
                  {o}
                </li>
              ))}
            </ul>
          </section>

          {/* ── CTAs ── */}
          <div className="flex flex-wrap gap-3 pt-6 mt-2 border-t border-slate-100">
            <a
              href={study.pdfPath}
              download
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white text-[14px] font-semibold rounded-xl shadow-[0_4px_16px_-4px_rgba(249,115,22,0.4)] hover:shadow-[0_8px_24px_-6px_rgba(249,115,22,0.5)] transition-all duration-300 flex items-center gap-2 hover:-translate-y-0.5"
            >
              <Download size={17} strokeWidth={2} /> Download Case Study
            </a>
            <a
              href={study.behanceUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-white border border-slate-200 hover:border-orange-200 hover:bg-orange-50/50 text-slate-700 hover:text-orange-700 text-[14px] font-semibold rounded-xl shadow-sm transition-all duration-300 flex items-center gap-2"
            >
              <ExternalLink size={17} strokeWidth={2} /> View on Behance
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}

// ─── Resume Card ──────────────────────────────────────────────────────────────

function ResumeCard() {
  return (
    <div className="bg-white rounded-[1.5rem] rounded-tl-sm border border-slate-100 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] overflow-hidden w-full max-w-md">
      <div className="h-2 bg-gradient-to-r from-orange-400 to-rose-400" />
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center">
            <FileText size={22} className="text-orange-500" />
          </div>
          <div>
            <h3 className="text-[16px] font-bold text-slate-800">Resume</h3>
            <p className="text-[12px] text-slate-400">{resume.fileName} · Updated {resume.lastUpdated}</p>
          </div>
        </div>
        <a href={resume.filePath} download className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white text-[14px] font-semibold rounded-xl shadow-[0_4px_16px_-4px_rgba(249,115,22,0.4)] hover:shadow-[0_8px_24px_-6px_rgba(249,115,22,0.5)] transition-all duration-300 hover:-translate-y-0.5">
          <Download size={18} strokeWidth={2} /> Download Resume (PDF)
        </a>
      </div>
    </div>
  );
}

// ─── Contact Card ─────────────────────────────────────────────────────────────

function ContactCard() {
  return (
    <div className="bg-white rounded-[1.5rem] rounded-tl-sm border border-slate-100 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] overflow-hidden w-full max-w-md">
      <div className="h-2 bg-gradient-to-r from-orange-400 to-rose-400" />
      <div className="p-6">
        <h3 className="text-[16px] font-bold text-slate-800 mb-5">Get in touch with Sanket</h3>
        <div className="flex flex-col gap-3">
          {[
            { href: `mailto:${contact.email}`, icon: <Mail size={15} />, label: 'Email', value: contact.email },
            { href: `tel:${contact.phone}`, icon: <Phone size={15} />, label: 'Phone', value: contact.phone },
            { href: contact.linkedin, icon: <Linkedin size={15} />, label: 'LinkedIn', value: 'linkedin.com/in/sanketdsawant' },
          ].map((item) => (
            <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-orange-50 border border-slate-100 hover:border-orange-200 transition-all group">
              <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-orange-500 group-hover:border-orange-200 transition-colors">{item.icon}</div>
              <div>
                <p className="text-[11px] text-slate-400 font-medium">{item.label}</p>
                <p className="text-[13px] text-slate-700 font-semibold">{item.value}</p>
              </div>
            </a>
          ))}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400"><MapPin size={15} /></div>
            <div>
              <p className="text-[11px] text-slate-400 font-medium">Location</p>
              <p className="text-[13px] text-slate-700 font-semibold">{contact.location}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Skills Card ──────────────────────────────────────────────────────────────

function SkillsCard() {
  return (
    <div className="bg-white rounded-[1.5rem] rounded-tl-sm border border-slate-100 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] overflow-hidden w-full">
      <div className="h-2 bg-gradient-to-r from-orange-400 to-rose-400" />
      <div className="p-6">
        <h3 className="text-[16px] font-bold text-slate-800 mb-5 flex items-center gap-2"><Wrench size={16} className="text-orange-500" /> Skills & Tools</h3>
        <div className="mb-5">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Design Skills</p>
          <div className="flex flex-wrap gap-2">
            {skills.design.map((s) => (
              <span key={s} className="text-[12px] font-medium text-slate-600 bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-lg hover:bg-orange-50 hover:border-orange-200 hover:text-orange-700 transition-colors cursor-default">{s}</span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Tools</p>
          <div className="flex flex-wrap gap-2">
            {skills.tools.map((t) => (
              <span key={t} className="text-[12px] font-bold text-orange-600 bg-orange-50 border border-orange-100 px-3 py-1.5 rounded-lg">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Education Card ───────────────────────────────────────────────────────────

function EducationCard() {
  return (
    <div className="bg-white rounded-[1.5rem] rounded-tl-sm border border-slate-100 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] overflow-hidden w-full max-w-md">
      <div className="h-2 bg-gradient-to-r from-orange-400 to-rose-400" />
      <div className="p-6">
        <h3 className="text-[16px] font-bold text-slate-800 mb-5 flex items-center gap-2"><GraduationCap size={18} className="text-orange-500" /> Education</h3>
        <div className="flex flex-col gap-3">
          {education.map((ed) => (
            <div key={ed.degree} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-[14px] font-bold text-slate-800 mb-0.5">{ed.degree}</p>
              <p className="text-[13px] text-orange-600 font-semibold">{ed.institution}</p>
              <p className="text-[12px] text-slate-400 mt-1">{ed.period}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Shell Components ─────────────────────────────────────────────────────────

function AssistantBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full justify-start group">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FFF4E6] to-[#FFE4CC] border border-white shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] flex items-center justify-center mr-4 flex-shrink-0 mt-1 z-10">
        <Sparkles className="w-4 h-4 text-orange-500" />
      </div>
      <div className="flex flex-col gap-3 w-full overflow-hidden">{children}</div>
    </div>
  );
}

function UserBubble({ text }: { text: string }) {
  return (
    <div className="flex w-full justify-end group mt-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="relative max-w-[78%] md:max-w-[70%] px-4 md:px-5 py-3 md:py-4 leading-[1.65] text-[14px] md:text-[15px] bg-slate-800 text-white rounded-[1.25rem] rounded-tr-sm shadow-sm">
        {text}
      </div>
      <div className="w-8 h-8 rounded-full bg-slate-100 border border-white shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] flex items-center justify-center ml-4 flex-shrink-0 mt-1 overflow-hidden z-10">
        <User className="w-4 h-4 text-slate-400" />
      </div>
    </div>
  );
}

function SplashScreen({ visible }: { visible: boolean }) {
  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white transition-opacity duration-1000 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-50 via-white to-white opacity-80" />
      <div className="relative z-10 flex flex-col items-center animate-in zoom-in-95 duration-1000 fill-mode-both">
        <div className="w-20 h-20 rounded-[1.5rem] bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center text-white shadow-[0_8px_30px_-6px_rgba(249,115,22,0.4)] mb-8 animate-pulse">
          <Sparkles className="w-10 h-10" strokeWidth={1.5} />
        </div>
        <h1 className="text-[2.5rem] font-medium tracking-tight text-slate-800 mb-3">Ask Sanket</h1>
        <p className="text-orange-500/80 font-bold tracking-[0.2em] text-[11px] uppercase">AI Portfolio Assistant</p>
      </div>
    </div>
  );
}

function NavIcon({ icon, active = false, tooltip }: { icon: React.ReactNode; active?: boolean; tooltip: string }) {
  const [show, setShow] = useState(false);
  const [y, setY] = useState(0);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleMouseEnter = () => {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setY(rect.top + rect.height / 2);
    }
    setShow(true);
  };

  return (
    <div className="relative w-full flex justify-center">
      <button
        ref={btnRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setShow(false)}
        className={`p-3 rounded-[14px] transition-all duration-300 w-11 h-11 flex items-center justify-center ${active ? 'bg-white text-orange-500 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.06)] border border-slate-100' : 'text-slate-400 hover:text-orange-500 hover:bg-white/60'}`}
      >
        {icon}
      </button>
      {/* Tooltip rendered via portal-like fixed position so it escapes any overflow */}
      {show && (
        <div
          className="fixed left-[80px] px-2.5 py-1.5 bg-slate-800 text-white text-xs font-medium rounded-lg pointer-events-none whitespace-nowrap z-[200] -translate-y-1/2 animate-in fade-in duration-150"
          style={{ top: y }}
        >
          {tooltip}
          <div className="absolute right-full top-1/2 -translate-y-1/2 border-[5px] border-transparent border-r-slate-800" />
        </div>
      )}
    </div>
  );
}

function QuickAction({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="group flex-shrink-0 flex items-center gap-2 md:gap-2.5 px-3 md:px-4 py-2 md:py-2.5 bg-white/70 hover:bg-white border border-slate-200/50 rounded-2xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_16px_-4px_rgba(249,115,22,0.1)] hover:border-orange-200 transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap">
      <div className="text-slate-400 group-hover:text-orange-500 transition-colors duration-300">{icon}</div>
      <span className="text-[12px] md:text-[13px] font-medium text-slate-600 group-hover:text-slate-900 transition-colors duration-300">{label}</span>
    </button>
  );
}

function PromptChip({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="text-[13px] text-slate-600 bg-white/70 hover:bg-white border border-slate-200/60 rounded-xl px-4 py-2.5 shadow-[0_1px_4px_-1px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_12px_-4px_rgba(249,115,22,0.15)] hover:border-orange-200 hover:text-orange-700 transition-all duration-300 hover:-translate-y-0.5 text-left leading-snug font-medium cursor-pointer">
      {label}
    </button>
  );
}
