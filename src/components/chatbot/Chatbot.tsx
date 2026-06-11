"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { MessageSquare, X, Send, Bot, User, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export default function Chatbot() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const MAX_DAILY_MESSAGES = 10;
  const [messageCount, setMessageCount] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize and check daily limit from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("maasewa_chat_usage");
      const today = new Date().toDateString();
      if (stored) {
        const { date, count } = JSON.parse(stored);
        if (date === today) {
          setMessageCount(count);
        } else {
          localStorage.setItem("maasewa_chat_usage", JSON.stringify({ date: today, count: 0 }));
        }
      } else {
        localStorage.setItem("maasewa_chat_usage", JSON.stringify({ date: today, count: 0 }));
      }
    } catch (e) {
      console.error("Local storage error:", e);
    }
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Auto-focus input when loading finishes
  useEffect(() => {
    if (!isLoading && isOpen && messageCount < MAX_DAILY_MESSAGES) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isLoading, isOpen, messageCount]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentInput = input?.trim();
    if (!currentInput || isLoading) return;

    setInput("");
    if (inputRef.current) inputRef.current.value = "";
    setError(null);
    setIsLoading(true);

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: currentInput,
    };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);

    const newCount = messageCount + 1;
    setMessageCount(newCount);
    try {
      localStorage.setItem(
        "maasewa_chat_usage",
        JSON.stringify({ date: new Date().toDateString(), count: newCount })
      );
    } catch (e) {}

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) throw new Error("Failed to connect to the assistant.");
      if (!response.body) throw new Error("No response stream available.");

      setIsLoading(false);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";
      const assistantId = (Date.now() + 1).toString();

      setMessages((prev) => [
        ...prev,
        { id: assistantId, role: "assistant", content: "" },
      ]);

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        assistantContent += chunk;
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantId ? { ...msg, content: assistantContent } : msg
          )
        );
      }
    } catch (err: any) {
      console.error("Chatbot Error:", err);
      setError(err);
      setIsLoading(false);
    }
  };

  const remainingMessages = MAX_DAILY_MESSAGES - messageCount;
  const isLimitReached = messageCount >= MAX_DAILY_MESSAGES;

  // Return nothing if on dashboard route
  if (pathname.startsWith("/dashboard")) return null;

  return (
    <div className="fixed bottom-24 right-5 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="mb-4 w-[360px] max-w-[calc(100vw-2.5rem)] flex flex-col overflow-hidden rounded-2xl shadow-2xl"
            style={{ height: "520px", maxHeight: "calc(100vh - 8rem)" }}
          >
            {/* ── Header ── */}
            <div
              className="shrink-0 px-5 py-4 flex items-center justify-between"
              style={{
                background: "linear-gradient(135deg, #0369a1 0%, #0284c7 60%, #38bdf8 100%)",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm">
                  <Bot className="w-5 h-5 text-white" />
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm leading-tight">Maasewa Assistant</p>
                  <p className="text-sky-200 text-xs">Online · Powered by AI</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* ── Messages ── */}
            <div className="flex-1 overflow-y-auto bg-slate-50 px-4 py-4 space-y-4">
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex flex-col items-center justify-center h-full text-center gap-3 py-6"
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                    style={{
                      background: "linear-gradient(135deg, #0284c7, #38bdf8)",
                    }}
                  >
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-slate-800 font-semibold">Hi there! 👋</p>
                    <p className="text-slate-500 text-sm mt-1 max-w-[220px] leading-snug">
                      Ask me anything about Maasewa Healthcare services.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center mt-1">
                    {[
                      "Home Nursing",
                      "Elder Care",
                      "ICU Setup",
                      "Post-Operative Care",
                      "Baby Care",
                      "Physiotherapy"
                    ].map((chip) => (
                      <button
                        key={chip}
                        onClick={() => setInput(chip)}
                        className="px-3 py-1.5 rounded-full text-xs font-medium bg-white border border-sky-200 text-sky-700 hover:bg-sky-50 hover:border-sky-400 transition-colors shadow-sm"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {messages.map((m, i) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: i === 0 ? 0 : 0 }}
                  className={`flex gap-2.5 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  {/* Avatar */}
                  <div
                    className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white shadow-sm ${
                      m.role === "user"
                        ? "bg-sky-600"
                        : "bg-gradient-to-br from-sky-500 to-blue-600"
                    }`}
                  >
                    {m.role === "user" ? (
                      <User className="w-3.5 h-3.5" />
                    ) : (
                      <Bot className="w-3.5 h-3.5" />
                    )}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      m.role === "user"
                        ? "bg-sky-600 text-white rounded-tr-sm"
                        : "bg-white text-slate-700 border border-slate-100 rounded-tl-sm"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{m.content}</p>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2.5 flex-row"
                >
                  <div className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-sm">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ── Error Banner ── */}
            {error && (
              <div className="shrink-0 px-4 py-2 bg-red-50 border-t border-red-100 text-red-600 text-xs text-center">
                {error.message || "Something went wrong. Please try again."}
              </div>
            )}

            {/* ── Input / Limit Footer ── */}
            {isLimitReached ? (
              <div className="shrink-0 px-5 py-4 bg-white border-t border-slate-100 text-center">
                <p className="text-slate-700 text-sm font-semibold">Daily limit reached 🎉</p>
                <p className="text-slate-400 text-xs mt-1">
                  Your free 10 messages are used up. Chat again after midnight,<br />or reach us directly on WhatsApp!
                </p>
              </div>
            ) : (
              <div className="shrink-0 bg-white border-t border-slate-100 px-3 py-3">
                {/* Remaining messages pill */}
                {messageCount > 0 && (
                  <p className="text-center text-xs text-slate-400 mb-2">
                    {remainingMessages} free message{remainingMessages !== 1 ? "s" : ""} remaining today
                  </p>
                )}
                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about our services…"
                    disabled={isLoading}
                    className="flex-1 bg-slate-100 text-slate-800 placeholder-slate-400 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 transition-shadow disabled:opacity-60"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input?.trim()}
                    className="w-9 h-9 shrink-0 rounded-full flex items-center justify-center text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md hover:scale-105 active:scale-95"
                    style={{ background: "linear-gradient(135deg, #0284c7, #38bdf8)" }}
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating Action Button ── */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Chat"
        className="relative w-14 h-14 rounded-full text-white flex items-center justify-center shadow-xl"
        style={{
          background: "linear-gradient(135deg, #0369a1, #0284c7, #38bdf8)",
        }}
      >
        {/* pulse ring */}
        {!isOpen && (
          <span
            className="absolute inset-0 rounded-full opacity-40 animate-ping"
            style={{ background: "rgba(2,132,199,0.6)" }}
          />
        )}
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-6 h-6" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Sparkles className="w-6 h-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
