"use client";
import React, { useState, useRef, useEffect } from "react";
import GlobalShell from "@/components/layout/GlobalShell";
import { ArrowRight, ArrowUp, Sparkles, Paperclip, Mic, ShieldCheck, BookOpen, Key, Link as LinkIcon, User, ChevronDown, Code2, Lightbulb, Target, PenTool, Coffee, Zap, Brain, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const fadeInUp: any = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function ChatPage() {
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userRole, setUserRole] = useState("employee");
  const [isModelMenuOpen, setIsModelMenuOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState("Expert");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || userRole === "guest") return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] })
      });

      if (!response.body) throw new Error("No body");
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let aiMessage = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          const chunk = decoder.decode(value);
          aiMessage += chunk;
          setMessages((prev) => {
            const newMsgs = [...prev];
            newMsgs[newMsgs.length - 1].content = aiMessage;
            return newMsgs;
          });
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GlobalShell>
      <div className="flex-1 flex flex-col h-full bg-[#F7F7F5] relative overflow-hidden" onClick={() => setIsModelMenuOpen(false)}>

        {/* Breadcrumb Header - Only shown when conversation is open */}
        {messages.length > 0 && (
          <header className="w-full flex items-center justify-between gap-4 px-4 py-2 border-b border-[#ebebea] bg-white z-20 shrink-0">
            <div className="flex min-w-0 flex-1 shrink gap-1 items-center font-semibold text-[13px]">
              <div className="text-[#888780] hover:text-[#111] inline-flex min-w-0 shrink-[4] items-center gap-1 transition-colors">
                <a href="/project/1" className="truncate">Internal Knowledge Copilot</a>
                <span className="opacity-50 px-0.5 text-[14px]">/</span>
              </div>
              
              <div className="flex min-w-0 items-center group [&:hover>button]:bg-[#F1EFE8] [&>button:hover]:bg-[#D3D1C7]">
                <button 
                  className="h-7 px-2 rounded-l-lg transition-colors text-[#5F5E5A] group-hover:text-[#111] truncate min-w-[5rem] active:bg-[#D3D1C7]" 
                  type="button"
                >
                  Available user roles
                </button>
                <div className="w-[1px] h-7 bg-white/20"></div>
                <button 
                  className="h-7 w-7 rounded-r-lg transition-colors text-[#888780] group-hover:text-[#111] active:bg-[#D3D1C7] flex items-center justify-center" 
                  type="button"
                >
                  <ChevronDown size={14} />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={(e) => { e.stopPropagation(); setUserRole("guest"); }} 
                className={`px-3 py-1 text-[11px] font-medium rounded-full border transition-colors ${userRole === "guest" ? "bg-[#E1F5EE] text-[#085041] border-[#9FE1CB]" : "bg-white text-[#888780] border-[#ebebea] hover:bg-[#F7F7F5]"}`}
              >
                Guest
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); setUserRole("employee"); }} 
                className={`px-3 py-1 text-[11px] font-medium rounded-full border transition-colors ${userRole === "employee" ? "bg-[#E1F5EE] text-[#085041] border-[#9FE1CB]" : "bg-white text-[#888780] border-[#ebebea] hover:bg-[#F7F7F5]"}`}
              >
                Employee
              </button>
            </div>
          </header>
        )}

        {/* Floating Role Switcher - only show when empty */}
        {messages.length === 0 && (
          <div className="absolute top-3 right-4 z-20 flex gap-2">
            <button onClick={(e) => { e.stopPropagation(); setUserRole("guest"); }} className={`px-3 py-1 text-[11px] font-medium rounded-full border transition-colors ${userRole === "guest" ? "bg-[#E1F5EE] text-[#085041] border-[#9FE1CB]" : "bg-white text-[#888780] border-[#ebebea]"}`}>Guest</button>
            <button onClick={(e) => { e.stopPropagation(); setUserRole("employee"); }} className={`px-3 py-1 text-[11px] font-medium rounded-full border transition-colors ${userRole === "employee" ? "bg-[#E1F5EE] text-[#085041] border-[#9FE1CB]" : "bg-white text-[#888780] border-[#ebebea]"}`}>Employee</button>
          </div>
        )}

        {messages.length > 0 && (
          <div className="flex-1 overflow-y-auto p-6 md:p-8 min-h-0">
            <div className="w-full max-w-4xl mx-auto flex flex-col gap-5">
              <AnimatePresence>
                {messages.map((msg, index) => (
                    <motion.div key={index} initial={{ opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} className={`flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[80%] flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                        <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center mt-0.5 ${msg.role === "user" ? "bg-[#F1EFE8] border border-[#D3D1C7]" : "bg-[#0F6E56]"}`}>
                          {msg.role === "user" ? <User size={14} className="text-[#5F5E5A]" /> : <div className="w-3 h-3 bg-[#9FE1CB] rounded-full"></div>}
                        </div>
                        <div className={`p-3.5 text-[14px] leading-[1.6] ${msg.role === "user" ? "bg-[#0F6E56] text-white rounded-[14px] rounded-tr-[3px]" : "bg-white border border-[#ebebea] rounded-[14px] rounded-tl-[3px] text-[#1a1a18] whitespace-pre-wrap"}`}>
                          {msg.content}
                          
                          {msg.role === "assistant" && !isLoading && index === messages.length - 1 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-3 flex flex-wrap gap-1.5 pt-3 border-t border-[#f0f0ee]">
                              <div className="text-[11px] flex items-center gap-1 px-2 py-1 rounded-md bg-[#E1F5EE] text-[#085041] font-medium cursor-pointer hover:bg-[#9FE1CB]/30 transition-colors">
                                <LinkIcon size={10} /> HR PTO Policy
                              </div>
                              <div className="text-[11px] flex items-center gap-1 px-2 py-1 rounded-md bg-[#E1F5EE] text-[#085041] font-medium cursor-pointer hover:bg-[#9FE1CB]/30 transition-colors">
                                <LinkIcon size={10} /> Access Matrix
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isLoading && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex w-full justify-start">
                       <div className="max-w-[80%] flex gap-3 flex-row">
                        <div className="w-8 h-8 shrink-0 bg-[#0F6E56] rounded-full flex items-center justify-center mt-0.5 animate-pulse">
                           <div className="w-3 h-3 bg-[#9FE1CB] rounded-full"></div>
                        </div>
                        <div className="p-3.5 rounded-[14px] rounded-tl-[3px] bg-white border border-[#ebebea] flex items-center gap-1.5">
                           <div className="w-1.5 h-1.5 bg-[#1D9E75] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                           <div className="w-1.5 h-1.5 bg-[#1D9E75] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                           <div className="w-1.5 h-1.5 bg-[#1D9E75] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </motion.div>
                  )}
              </AnimatePresence>
              <div ref={chatEndRef} />
            </div>
          </div>
        )}
        
        {/* Chat Input & Empty State Container */}
        <div className={`w-full max-w-[46rem] mx-auto shrink-0 z-10 transition-all duration-300 ${messages.length === 0 ? "flex-1 flex flex-col justify-center px-4" : "p-4 pb-6"}`}>
          {messages.length === 0 && (
            <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="flex flex-col items-center gap-6 mb-6 mt-[-5vh]">
              <div className="inline-flex items-center gap-1.5 rounded-lg h-8 px-2.5 text-[13px] font-medium text-[#5F5E5A] bg-[#ebebea]">
                Free plan
                <div className="w-[3px] h-[3px] bg-[#888780]/30 rounded-full mx-0.5 mt-0.5"></div>
                <span className="underline underline-offset-[3px] text-[#2C2C2A] hover:text-[#0F6E56] cursor-pointer">Upgrade</span>
              </div>
              
              <div className="flex items-center gap-3 text-[#111] font-semibold text-[32px] md:text-[38px] tracking-tight">
                <Sparkles className="text-[#0F6E56] w-9 h-9 hidden md:block" />
                <span>Happy Friday, User</span>
              </div>
            </motion.div>
          )}

          <div className="relative">
            <form onSubmit={handleSubmit} className="flex flex-col bg-white items-stretch transition-all duration-200 relative z-10 rounded-[20px] border border-[#ebebea] shadow-[0_4px_24px_rgba(0,0,0,0.04)] focus-within:border-[#1D9E75] focus-within:shadow-[0_4px_24px_rgba(0,0,0,0.06),0_0_0_1px_#1D9E75]">
              <div className="flex flex-col m-3 gap-2">
                <textarea 
                  value={input} onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSubmit(e); } }}
                  disabled={userRole === "guest" || isLoading}
                  placeholder={userRole === "guest" ? "Read-only access (Guest mode restricts chat)..." : "Ask Claiv anything about your company..."} 
                  className={`w-full bg-transparent px-2 py-1 focus:outline-none text-[15px] resize-none min-h-[44px] max-h-96 placeholder:text-[#888780] text-[#111] ${userRole === "guest" ? "opacity-50 cursor-not-allowed" : ""}`}
                />
                <div className="relative flex gap-2 w-full items-center">
                  <div className="flex-1 flex flex-row items-center shrink min-w-0 gap-1">
                    <button type="button" disabled={userRole === "guest"} className="h-10 w-10 rounded-full flex items-center justify-center text-[#888780] hover:bg-white hover:text-[#1D9E75] transition-all active:scale-95 disabled:opacity-40">
                      <Paperclip size={19} />
                    </button>
                    
                    <div className="relative">
                      <button 
                        type="button" 
                        onClick={(e) => { e.stopPropagation(); setIsModelMenuOpen(!isModelMenuOpen); }}
                        className={`h-8 rounded-lg px-2 flex items-center gap-1.5 text-[13px] font-medium transition-colors ${isModelMenuOpen ? 'bg-[#F7F7F5] text-[#111]' : 'text-[#5F5E5A] hover:bg-[#F7F7F5]'}`}
                      >
                        {selectedModel} <ChevronDown size={14} className={`opacity-75 transition-transform duration-200 ${isModelMenuOpen ? 'rotate-180' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {isModelMenuOpen && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                            className="absolute bottom-full left-0 mb-2 w-[260px] bg-white border border-[#ebebea] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] p-1 z-50 overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button 
                              type="button"
                              onClick={() => { setSelectedModel("Auto"); setIsModelMenuOpen(false); }}
                              className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors group ${selectedModel === "Auto" ? "bg-[#F7F7F5]" : "hover:bg-[#F7F7F5]"}`}
                            >
                              <div className="flex items-center gap-3">
                                <div className="size-8 rounded-md bg-[#F7F7F5] flex items-center justify-center text-[#5F5E5A]">
                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-[2]">
                                    <path d="M6.5 12.5L11.5 17.5M6.5 12.5L11.8349 6.83172C13.5356 5.02464 15.9071 4 18.3887 4H20V5.61135C20 8.09292 18.9754 10.4644 17.1683 12.1651L11.5 17.5M6.5 12.5L2 11L5.12132 7.87868C5.68393 7.31607 6.44699 7 7.24264 7H11M11.5 17.5L13 22L16.1213 18.8787C16.6839 18.3161 17 17.553 17 16.7574V13" stroke="currentColor" strokeLinecap="square"></path>
                                    <path d="M4.5 16.5C4.5 16.5 4 18 4 20C6 20 7.5 19.5 7.5 19.5" stroke="currentColor"></path>
                                  </svg>
                                </div>
                                <div className="text-left">
                                  <div className="text-[14px] font-bold text-[#111]">Auto</div>
                                  <div className="text-[12px] text-[#888780]">Chooses Fast or Expert</div>
                                </div>
                              </div>
                              {selectedModel === "Auto" && (
                                <div className="size-4 bg-[#0F6E56] rounded-full flex items-center justify-center">
                                  <Check size={10} className="text-white stroke-[3.5]" />
                                </div>
                              )}
                            </button>

                            <button 
                              type="button"
                              onClick={() => { setSelectedModel("Fast"); setIsModelMenuOpen(false); }}
                              className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors group ${selectedModel === "Fast" ? "bg-[#F7F7F5]" : "hover:bg-[#F7F7F5]"}`}
                            >
                              <div className="flex items-center gap-3">
                                <div className="size-8 rounded-md bg-[#F7F7F5] flex items-center justify-center text-[#5F5E5A]">
                                  <Zap size={18} />
                                </div>
                                <div className="text-left">
                                  <div className="text-[14px] font-bold text-[#111]">Fast</div>
                                  <div className="text-[12px] text-[#888780]">Quick responses</div>
                                </div>
                              </div>
                              {selectedModel === "Fast" && (
                                <div className="size-4 bg-[#0F6E56] rounded-full flex items-center justify-center">
                                  <Check size={10} className="text-white stroke-[3.5]" />
                                </div>
                              )}
                            </button>

                            <button 
                              type="button"
                              onClick={() => { setSelectedModel("Expert"); setIsModelMenuOpen(false); }}
                              className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors group ${selectedModel === "Expert" ? "bg-[#F7F7F5]" : "hover:bg-[#F7F7F5]"}`}
                            >
                              <div className="flex items-center gap-3">
                                <div className="size-8 rounded-md bg-white shadow-sm flex items-center justify-center text-[#1D9E75] border border-[#ebebea]">
                                  <Brain size={18} />
                                </div>
                                <div className="text-left">
                                  <div className="text-[14px] font-bold text-[#111]">Expert</div>
                                  <div className="text-[12px] text-[#888780]">Thinks hard</div>
                                </div>
                              </div>
                              {selectedModel === "Expert" && (
                                <div className="size-4 bg-[#0F6E56] rounded-full flex items-center justify-center">
                                  <Check size={10} className="text-white stroke-[3.5]" />
                                </div>
                              )}
                            </button>

                            <div className="h-px bg-[#ebebea] mx-2 my-1"></div>
                            
                            <div className="relative select-none cursor-pointer px-3 py-2 rounded-xl text-sm outline-none hover:bg-[#F7F7F5] transition-colors flex flex-col items-start border border-[#ebebea] bg-[#F7F7F5]/50 group/mode-select-upsell m-1 shadow-sm">
                              <div className="flex flex-row items-center justify-between w-full gap-3">
                                <div className="flex flex-col justify-center -space-y-0.5">
                                  <span className="font-bold text-[16px] text-[#111] tracking-tight leading-tight">Claiv Pro</span>
                                  <p className="text-[11.5px] text-[#5F5E5A] leading-normal whitespace-nowrap">Extended capabilities</p>
                                </div>
                                <button type="button" className="inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer transition-colors duration-100 bg-[#111] text-white hover:bg-[#111]/80 h-8 px-3.5 text-[12.5px] rounded-full font-bold shadow-sm" aria-label="Upgrade">
                                  Upgrade
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  <div className="shrink-0 flex items-center gap-2 relative">
                    <button type="button" disabled={userRole === "guest"} className="h-10 w-10 rounded-full flex items-center justify-center text-[#888780] hover:bg-white hover:text-[#1D9E75] transition-all active:scale-95 disabled:opacity-40">
                      <Mic size={19} />
                    </button>
                    <button type="submit" disabled={!input.trim() || userRole === "guest" || isLoading} className="h-11 w-11 bg-[#0F6E56] text-white rounded-full flex items-center justify-center shadow-lg shadow-[#0F6E56]/30 transition-all hover:bg-[#085041] hover:scale-[1.03] active:scale-[0.97] disabled:opacity-40 disabled:scale-100 disabled:cursor-not-allowed">
                      <ArrowUp size={20} className="stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              </div>
            </form>

            {/* Out of messages banner */}
            <div className="px-3">
              <div className="w-full relative z-0 px-4 -mb-1 -mt-2 rounded-b-[16px] border border-t-0 pb-2.5 pt-4 bg-[#F1EFE8] border-transparent">
                <div className="flex w-full items-center justify-between text-[13px]">
                  <div className="text-[#5F5E5A]">You are out of free <span className="underline cursor-pointer hover:text-[#111]">messages</span> until 1:00 PM</div>
                  <span className="underline text-[#111] font-medium cursor-pointer hover:text-[#0F6E56]">Upgrade</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs below input (only show when empty) */}
          {messages.length === 0 && (
            <motion.ul variants={fadeInUp} initial="hidden" animate="visible" className="flex flex-wrap justify-center w-full gap-2 pt-6">
              {[
                { icon: BookOpen, label: "Search Wiki" },
                { icon: ShieldCheck, label: "Find Policies" },
                { icon: Target, label: "Analyze OKRs" },
                { icon: PenTool, label: "Draft Comms" },
                { icon: Lightbulb, label: "Generate Ideas" }
              ].map((tab, i) => (
                <li key={i}>
                  <button type="button" className="flex items-center gap-1.5 h-8 px-3 rounded-lg border border-[#ebebea] bg-white text-[13px] font-medium text-[#5F5E5A] hover:border-[#D3D1C7] hover:bg-[#F7F7F5] hover:text-[#111] transition-all focus:border-[#1D9E75] focus:outline-none shadow-sm">
                    <tab.icon size={16} className="text-[#888780]" />
                    {tab.label}
                  </button>
                </li>
              ))}
            </motion.ul>
          )}
        </div>
      </div>
      
      {/* Right Panel */}
      <aside className="w-[280px] border-l border-[#ebebea] bg-white hidden lg:flex flex-col shrink-0 z-10">
        <div className="p-4 border-b border-[#ebebea]">
          <h3 className="font-semibold text-[12px] uppercase tracking-[0.04em] text-[#888780] flex items-center justify-between">
            Sources & Context
            <span className="bg-[#E1F5EE] text-[#085041] text-[10px] px-2 py-0.5 rounded-full font-medium animate-pulse-dot">LIVE</span>
          </h3>
        </div>
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2.5">
          <p className="text-[11px] text-[#888780] mb-1">Retrieval pipeline active:</p>
          <AnimatePresence>
            {[
              { tag: "Engineering", title: "Q3 OKRs & Planning 2026", score: "98%" },
              { tag: "HR", title: "Remote Work Policy Guidelines", score: "94%" },
              { tag: "Design", title: "Salix Design System Overview", score: "87%" }
            ].map((source, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="bg-[#F7F7F5] p-3 rounded-xl border border-[#ebebea] hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group">
                <div className="flex justify-between items-start mb-1.5">
                  <span className="text-[10px] font-medium tracking-[0.04em] text-[#085041] bg-[#E1F5EE] px-2 py-0.5 rounded-sm uppercase">{source.tag}</span>
                  <span className="text-[11px] text-[#888780] group-hover:text-[#0F6E56] transition-colors font-medium">{source.score}</span>
                </div>
                <h4 className="text-[13px] font-medium leading-snug line-clamp-2 text-[#1a1a18] group-hover:text-[#0F6E56]">{source.title}</h4>
              </motion.div>
            ))}
          </AnimatePresence>
          <div className="mt-4 border border-[#ebebea] rounded-xl p-3.5 bg-[#F7F7F5]">
            <h4 className="text-[11px] font-medium uppercase text-[#888780] tracking-[0.04em] mb-1.5">Department Scope</h4>
            <p className="text-[12px] text-[#888780] leading-[1.6]">
               {userRole === "guest" 
                 ? "Guest Mode. Results restricted to public company wikis."
                 : "Queries synthesized across Engineering, HR, and Product."}
            </p>
          </div>
        </div>
      </aside>
    </GlobalShell>
  );
}
