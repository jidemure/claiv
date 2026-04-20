"use client";
import React, { useState, useRef, useEffect } from "react";
import GlobalShell from "@/components/layout/GlobalShell";
import { 
  Component, 
  Pen, 
  Ellipsis, 
  FileUp, 
  Files, 
  Code, 
  Mic, 
  ChevronRight, 
  Search,
  Plus,
  X,
  FileText,
  Database,
  ArrowUp,
  Settings2,
  Paperclip,
  Info,
  ChevronDown,
  Layout,
  Zap,
  Brain,
  Check,
  LayoutGrid
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectWorkspacePage({ params }: { params: { id: string } }) {
  const [leftPanelWidth, setLeftPanelWidth] = useState(340);
  const [isResizing, setIsResizing] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("conversations");
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isFilesModalOpen, setIsFilesModalOpen] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const [isProjectMenuOpen, setIsProjectMenuOpen] = useState(false);
  const [isModelMenuOpen, setIsModelMenuOpen] = useState(false);
  const [projectName, setProjectName] = useState("Fish");
  const [isRenaming, setIsRenaming] = useState(false);
  const [query, setQuery] = useState("");
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [instructions, setInstructions] = useState("");
  const [conversations, setConversations] = useState([
    { id: "1", title: "Invoice Summary: Monthly Maintenance $50 Due", time: "1 minute ago" }
  ]);
  const [files, setFiles] = useState<{name: string, isNew?: boolean}[]>([
     { name: "invoice b13292eb-ce39-4b99-8b65-ec47d3ef12ee.pdf", isNew: true }
  ]);
 
  // Mock messages for the first conversation
  const [messages, setMessages] = useState<{role: "user" | "assistant", content: string}[]>([
    { role: "user", content: "Can you summarize the maintenance invoice?" },
    { role: "assistant", content: "The invoice is for monthly maintenance totaling **$50.00**. It covers technical support and server uptime monitoring for the current billing cycle. Payment is due by the end of the month." }
  ]);

  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const startResizing = () => setIsResizing(true);
  const stopResizing = () => setIsResizing(false);

  const resize = (e: MouseEvent) => {
    if (isResizing && containerRef.current) {
      const newWidth = e.clientX - containerRef.current.getBoundingClientRect().left;
      if (newWidth > 260 && newWidth < 500) {
        setLeftPanelWidth(newWidth);
      }
    }
  };

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", resize);
      window.addEventListener("mouseup", stopResizing);
    } else {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    }
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [isResizing]);

  return (
    <GlobalShell>
      <div ref={containerRef} className="flex h-full w-full bg-white overflow-hidden relative">
        {/* --- PROJECT SIDE PANEL --- */}
        <motion.div 
          animate={{ width: isSidebarCollapsed ? 0 : leftPanelWidth, opacity: isSidebarCollapsed ? 0 : 1 }}
          transition={{ type: "spring", stiffness: 350, damping: 35 }}
          className="flex flex-col border-r border-border-l1 shrink-0 bg-[#F7F7F5] overflow-hidden"
        >
          <div className="pt-3 px-3 h-full flex flex-col gap-4 overflow-hidden min-w-[300px]">
            {/* Header Area */}
            <div className="flex flex-col w-full gap-2">
              {/* Back Link */}
              <a href="/projects" className="text-fg-tertiary hover:text-fg-primary flex items-center gap-1 text-[13px] font-medium transition-colors mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
                </svg>
                All projects
              </a>

              <div className="flex items-center justify-start min-w-0 w-full relative h-9">
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer focus-visible:outline-none focus:outline-none text-fg-primary hover:bg-button-ghost-hover border border-transparent h-8 w-8 rounded-lg transition-colors">
                  <Component className="size-4 text-lime-600" />
                </button>
                
                {isRenaming ? (
                  <input 
                    autoFocus
                    className="ms-1 sm:ms-2 flex-1 bg-white border border-primary rounded-md px-2 py-0.5 min-w-0 outline-none text-md font-semibold text-fg-primary shadow-sm"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    onBlur={() => setIsRenaming(false)}
                    onKeyDown={(e) => e.key === "Enter" && setIsRenaming(false)}
                  />
                ) : (
                  <h1 
                    onClick={() => setIsRenaming(true)}
                    className="ms-1 sm:ms-2 flex-1 bg-transparent border-b-secondary min-w-0 truncate group text-md font-semibold flex items-center cursor-text"
                  >
                    {projectName}
                    <Pen className="ms-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-fg-secondary size-4" />
                  </h1>
                )}

                {/* Star Button */}
                <button 
                  onClick={() => setIsStarred(!isStarred)}
                  className="inline-flex items-center justify-center relative isolate shrink-0 select-none border-transparent transition duration-300 h-8 w-8 rounded-md hover:bg-surface-l2 text-fg-tertiary hover:text-fg-primary" 
                  type="button" 
                  aria-pressed={isStarred} 
                  aria-label="Star project"
                >
                  <div className={`transition-all duration-300 ${isStarred ? 'scale-0 opacity-0 rotate-[36deg]' : 'scale-100 opacity-100 rotate-0'}`} style={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ flexShrink: 0 }}>
                      <path d="M9.158 2.708c.414-.656 1.43-.609 1.758.14l1.697 3.886 4.263.39c.877.082 1.23 1.175.563 1.752l-3.206 2.775.94 4.11c.184.801-.613 1.444-1.336 1.157l-.143-.07L10 14.685l-3.694 2.163c-.756.442-1.675-.232-1.48-1.086l.94-4.11L2.56 8.875c-.666-.577-.315-1.67.563-1.751l4.262-.39 1.698-3.886zm-.974 4.698a.5.5 0 0 1-.346.287l-.067.011-4.556.416 3.432 2.973a.5.5 0 0 1 .16.489l-1.006 4.402 3.946-2.31.06-.03a.5.5 0 0 1 .446.03l3.946 2.31-1.007-4.402a.5.5 0 0 1 .16-.49l3.433-2.972-4.556-.416a.5.5 0 0 1-.413-.298L10 3.25z"></path>
                    </svg>
                  </div>
                  <div className={`absolute transition-all duration-300 ${isStarred ? 'scale-100 opacity-100 rotate-0 text-amber-500' : 'scale-50 opacity-0 -rotate-[36deg]'}`} style={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ flexShrink: 0 }}>
                      <path d="m10.916 2.849 1.697 3.885 4.263.39c.877.082 1.23 1.175.563 1.752l-3.206 2.775.94 4.11c.184.801-.613 1.444-1.336 1.157L10 14.685l-3.694 2.163c-.756.442-1.675-.232-1.48-1.086l.94-4.11L2.56 8.875c-.666-.577-.315-1.67.563-1.751l4.262-.39 1.698-3.886c.416-.849 1.468-.833 1.832 0"></path>
                    </svg>
                  </div>
                </button>

                {/* More Options Button */}
                 <div className="relative">
                  <button 
                    onClick={() => setIsProjectMenuOpen(!isProjectMenuOpen)}
                    className={`inline-flex items-center justify-center relative isolate transition duration-300 h-8 w-8 rounded-md hover:bg-surface-l2 text-fg-secondary hover:text-fg-primary ${isProjectMenuOpen ? 'bg-surface-l2' : ''}`} 
                    type="button" 
                    aria-label="More options"
                  >
                    <div style={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ flexShrink: 0 }}>
                        <path d="M10 14a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3m0-5.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3M10 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3"></path>
                      </svg>
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {isProjectMenuOpen && (
                      <>
                        <div 
                          className="fixed inset-0 z-40" 
                          onClick={() => setIsProjectMenuOpen(false)}
                        />
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95, y: 5 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: 5 }}
                          className="absolute right-0 top-full mt-1.5 p-1.5 z-50 bg-white border border-border-l1 backdrop-blur-xl rounded-xl min-w-[10rem] shadow-xl overflow-hidden"
                        >
                          <div className="flex flex-col">
                             <button 
                              onClick={() => {
                                setIsRenaming(true);
                                setIsProjectMenuOpen(false);
                              }}
                              className="flex items-center gap-2 w-full px-2.5 py-2 rounded-lg text-[13.5px] font-medium text-fg-primary hover:bg-surface-l1 transition-colors group"
                            >
                              <div className="size-5 flex items-center justify-center text-fg-tertiary group-hover:text-fg-primary">
                                <Pen className="size-4" />
                              </div>
                              <span className="flex-1 text-left truncate">Rename</span>
                            </button>

                            <button 
                              onClick={() => {
                                setIsSettingsModalOpen(true);
                                setIsProjectMenuOpen(false);
                              }}
                              className="flex items-center gap-2 w-full px-2.5 py-2 rounded-lg text-[13.5px] font-medium text-fg-primary hover:bg-surface-l1 transition-colors group"
                            >
                              <div className="size-5 flex items-center justify-center text-fg-tertiary group-hover:text-fg-primary">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ flexShrink: 0 }}>
                                  <path d="M9.728 2.88a1.5 1.5 0 0 1 1.946-.847l2.792 1.1a1.5 1.5 0 0 1 .845 1.945l-3.92 9.953a1.5 1.5 0 0 1-.452.615l-.088.066-3.143 2.186a.75.75 0 0 1-1.135-.362l-.026-.095-.81-3.742a1.5 1.5 0 0 1 .071-.867zm-2.99 10.319a.5.5 0 0 0-.023.288l.73 3.376 2.835-1.971.058-.047a.5.5 0 0 0 .122-.18l2.637-6.698-3.721-1.466zm4.57-10.236a.5.5 0 0 0-.65.283L9.743 5.57l3.722 1.467.917-2.327a.5.5 0 0 0-.283-.648z"></path>
                                </svg>
                              </div>
                              <span className="flex-1 text-left truncate">Edit details</span>
                            </button>
                            
                            <div className="h-[1px] bg-border-l1 my-1.5 mx-2"></div>
                            
                            <button 
                              onClick={() => {
                                console.log("Archiving project...");
                                setIsProjectMenuOpen(false);
                              }}
                              className="flex items-center gap-2 w-full px-2.5 py-2 rounded-lg text-[13.5px] font-medium text-fg-primary hover:bg-surface-l1 transition-colors group"
                            >
                              <div className="size-5 flex items-center justify-center text-fg-tertiary group-hover:text-fg-primary">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ flexShrink: 0 }}>
                                  <path d="M11.5 9.5a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1z"></path>
                                  <path fillRule="evenodd" d="M15.653 3.008A1.5 1.5 0 0 1 17 4.5v2l-.008.153A1.5 1.5 0 0 1 16 7.913V15a2 2 0 0 1-1.796 1.99L14 17H6a2 2 0 0 1-2-2V7.912a1.5 1.5 0 0 1-.992-1.259L3 6.5v-2A1.5 1.5 0 0 1 4.5 3h11zM5 15a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V8H5zM4.5 4a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5z" clipRule="evenodd"></path>
                                </svg>
                              </div>
                              <span className="flex-1 text-left truncate">Archive</span>
                            </button>
                            
                            <button 
                              onClick={() => {
                                setIsDeleteModalOpen(true);
                                setIsProjectMenuOpen(false);
                              }}
                              className="flex items-center gap-2 w-full px-2.5 py-2 rounded-lg text-[13.5px] font-medium text-destructive hover:bg-destructive/10 transition-colors group"
                            >
                              <div className="size-5 flex items-center justify-center">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ flexShrink: 0 }}>
                                  <path d="M11.323 1.5a1.5 1.5 0 0 1 1.393.943L13.338 4H17.5l.1.01a.5.5 0 0 1 0 .98l-.1.01h-1.537l-.894 11.615A1.5 1.5 0 0 1 13.574 18H6.426a1.5 1.5 0 0 1-1.478-1.24l-.017-.145L4.037 5H2.5a.5.5 0 0 1 0-1h4.162l.622-1.557.047-.104A1.5 1.5 0 0 1 8.677 1.5zM5.928 16.538a.5.5 0 0 0 .498.462h7.148a.5.5 0 0 0 .498-.462L14.961 5H5.039zM8.5 8a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0v-5a.5.5 0 0 1 .5-.5m3 0a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0v-5a.5.5 0 0 1 .5-.5M8.677 2.5a.5.5 0 0 0-.43.246l-.034.068L7.738 4h4.524l-.475-1.186a.5.5 0 0 0-.464-.314z"></path>
                                </svg>
                              </div>
                              <span className="flex-1 text-left truncate font-bold">Delete</span>
                            </button>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>

                <button 
                  onClick={() => setIsSidebarCollapsed(true)}
                  className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium leading-[normal] cursor-pointer hover:bg-button-ghost-hover text-fg-secondary hover:text-fg-primary border border-transparent h-8 rounded-xl gap-1.5 w-8 px-1.5 transition-colors"
                >
                  <Layout className="size-[18px]" />
                </button>
              </div>
            </div>

            {/* Instruction/Sources Section */}
            <div className="flex flex-col gap-3 overflow-y-auto no-scrollbar scroll-smooth pb-4">
              {/* Instructions Card */}
              <div 
                role="button"
                onClick={() => setIsSettingsModalOpen(true)}
                className="flex flex-col rounded-xl border border-border-l1 p-3 group/side-panel-section hover:border-border-l2 duration-150 cursor-pointer bg-white shadow-sm"
              >
                <div className="flex items-center gap-2 w-full group/collapsible-row mb-2">
                  <div className="flex flex-col gap-2 w-full">
                    <div className="flex items-center justify-between w-full">
                      <div className="shrink-0 bg-surface-l2 p-1 rounded-full">
                        <Settings2 className="size-4 text-fg-secondary" />
                      </div>
                      <div className="flex items-center gap-2.5 shrink-0 opacity-0 group-hover/side-panel-section:opacity-100 duration-100">
                        <div className="p-1 rounded-lg border border-surface-l2 bg-white">
                          <Pen className="size-3.5 text-secondary" />
                        </div>
                      </div>
                    </div>
                    <div className="grow text-sm font-semibold truncate text-fg-primary">Instructions</div>
                  </div>
                </div>
                <div className="text-fg-secondary text-sm line-clamp-3">
                  <span className="italic">{instructions || "Set up instructions for Grok in this project"}</span>
                </div>
              </div>

              {/* Sources Card */}
              <div className="flex flex-col rounded-xl border border-border-l1 p-3 group/side-panel-section bg-white shadow-sm">
                <div className="flex flex-col gap-2 w-full mb-1">
                  <div className="flex items-center justify-between w-full">
                    <div className="shrink-0 bg-surface-l2 p-1 rounded-full">
                      <Database className="size-4 text-fg-secondary" />
                    </div>
                  </div>
                  <div className="grow text-sm font-semibold truncate text-fg-primary">Sources</div>
                </div>
                <p className="text-fg-secondary text-sm mb-3">Custom knowledge base for this project</p>
                
                <div className="shrink-0 bg-border-l1 h-[1px] w-full mb-3"></div>
                
                <button 
                  onClick={() => setIsFilesModalOpen(true)}
                  className="flex items-center justify-between text-sm py-1.5 px-1 -mx-1 rounded-lg hover:bg-surface-l2 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="size-4 text-fg-tertiary" />
                    <span className="text-fg-primary font-medium">Personal files</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-fg-secondary text-xs">{files.length}</span>
                    <ChevronRight className="size-4 text-fg-tertiary" />
                  </div>
                </button>
              </div>

              {/* Conversations Tabs List */}
              <div className="flex flex-col flex-1 min-h-0 pt-2">
                <div className="flex items-end border-b border-border-l1 mb-2">
                  <button 
                    className={`pb-2 px-2 text-[13px] font-semibold border-b-2 transition-all ${
                      activeTab === "conversations" 
                        ? "border-primary text-primary" 
                        : "border-transparent text-fg-secondary hover:text-fg-primary"
                    }`}
                    onClick={() => setActiveTab("conversations")}
                  >
                    Conversations
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto py-2 flex flex-col gap-1.5">
                  {conversations.length > 0 ? (
                    conversations.map((conv) => (
                      <div 
                        key={conv.id} 
                        onClick={() => {
                          setActiveConversationId(conv.id);
                          if (conv.id === "1") {
                            setMessages([
                               { role: "user", content: "Can you summarize the maintenance invoice?" },
                               { role: "assistant", content: "The invoice is for monthly maintenance totaling **$50.00**. It covers technical support and server uptime monitoring for the current billing cycle. Payment is due by the end of the month." }
                            ]);
                          } else {
                            setMessages([]);
                          }
                        }}
                        className={`group relative rounded-xl p-3 hover:bg-white border transition-all cursor-pointer ${
                          activeConversationId === conv.id ? "bg-white border-border-l1 shadow-sm" : "bg-transparent border-transparent hover:border-border-l1"
                        }`}
                      >
                        <div className="flex flex-col gap-1">
                          <div className="text-sm font-semibold text-fg-primary leading-tight line-clamp-2">{conv.title}</div>
                          <div className="flex items-center justify-between mt-1">
                            <div className="text-[11px] text-fg-tertiary">{conv.time}</div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="bg-white/50 border border-dashed border-border-l1 rounded-2xl flex flex-col items-center justify-center p-8 gap-2 text-center h-40">
                       <Search className="size-6 text-fg-tertiary/40" />
                       <h3 className="font-semibold text-sm text-fg-secondary">No conversations yet</h3>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- RESIZE HANDLE --- */}
        {!isSidebarCollapsed && (
          <div 
            onMouseDown={startResizing}
            className="w-1 cursor-ew-resize hover:bg-primary/20 transition-colors z-10 active:bg-primary/40 group"
          >
            <div className="h-full w-px bg-border-l1 group-hover:bg-primary/30 mx-auto" />
          </div>
        )}

        {/* --- MAIN CHAT AREA --- */}
        <div className="flex-1 flex flex-col h-full bg-white relative">
          {/* Collapse sidebar trigger button (if collapsed) */}
          {isSidebarCollapsed && (
             <button 
              onClick={() => setIsSidebarCollapsed(false)}
              className="absolute top-4 left-4 z-20 h-9 w-9 rounded-xl bg-white border border-border-l1 flex items-center justify-center text-fg-secondary hover:text-primary transition-all shadow-sm"
            >
              <Layout className="size-5 rotate-180" />
            </button>
          )}

          {/* Conversation Starter / Messages Panel */}
          <div className="flex-1 flex flex-col relative overflow-hidden">
            <div className="flex-1 overflow-y-auto w-full">
              <div className="max-w-3xl mx-auto h-full flex flex-col p-8">
                <AnimatePresence mode="wait">
                  {activeConversationId && messages.length > 0 ? (
                    <motion.div 
                      key="messages"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col gap-8 w-full pb-20"
                    >
                       {messages.map((msg, i) => (
                         <motion.div 
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex gap-4 ${msg.role === 'assistant' ? 'items-start' : 'items-start flex-row-reverse'}`}
                         >
                           <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm ${msg.role === 'assistant' ? 'bg-[#F7F7F5] text-primary' : 'bg-primary text-white'}`}>
                              {msg.role === 'assistant' ? '🤖' : '👤'}
                           </div>
                           <div className={`max-w-[80%] rounded-2xl p-4 text-[15px] leading-relaxed ${msg.role === 'assistant' ? 'bg-[#F7F7F5] text-fg-primary' : 'bg-surface-l1 text-fg-primary'}`}>
                              {msg.content}
                           </div>
                         </motion.div>
                        ))}
                    </motion.div>
                  ) : !activeConversationId ? (
                    <motion.div 
                      key="activity"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      className="flex-1 flex flex-col items-center justify-center text-center py-12"
                    >
                      <div className="w-20 h-20 rounded-[32px] bg-primary/5 text-primary flex items-center justify-center mb-8">
                        <Database className="size-10" />
                      </div>
                      
                      <h2 className="text-3xl font-bold text-fg-primary mb-3">Project Activity</h2>
                      <p className="text-[17px] text-fg-tertiary max-w-lg mb-10 leading-relaxed font-medium">
                        Get a quick summary of what's been happening or continue where you left off. 
                        Grok is ready to assist with your project files.
                      </p>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <button 
                          onClick={() => {
                            setActiveConversationId("1");
                            setTimeout(() => textareaRef.current?.focus(), 100);
                          }}
                          className="premium-button px-10 h-14 shadow-xl shadow-black/20"
                        >
                          <div className="text-roll-container">
                            <span>{conversations.length > 0 ? "Resume chat" : "Start chat"}</span>
                            <span aria-hidden="true">{conversations.length > 0 ? "Resume chat" : "Start chat"}</span>
                          </div>
                        </button>
                        
                        <button 
                          onClick={() => setIsFilesModalOpen(true)}
                          className="premium-button px-8 h-14 !bg-none !bg-white !text-black !border-[#ebebea] hover:!bg-[#fcfcfb] hover:!border-[#1D9E75] hover:!text-[#0F6E56] shadow-sm flex items-center justify-center transition-all"
                        >
                          <div className="text-roll-container">
                            <span className="block !text-black font-bold whitespace-nowrap text-center">
                              <Paperclip className="inline-block size-4 align-text-bottom mb-0.5 mr-1.5 shrink-0" />
                              Add files
                            </span>
                            <span aria-hidden="true" className="block !text-black font-bold whitespace-nowrap text-center">
                              <Paperclip className="inline-block size-4 align-text-bottom mb-0.5 mr-1.5 shrink-0" />
                              Add files
                            </span>
                          </div>
                        </button>
                      </div>

                      {/* Help/Secondary Button area as mentioned in audio */}
                      <div className="mt-16 flex items-center gap-6 opacity-60">
                        <button className="flex items-center gap-2 text-sm font-bold text-fg-tertiary hover:text-fg-primary transition-colors">
                          <Info className="size-4" />
                          Get help with a task
                        </button>
                        <div className="w-1 h-1 rounded-full bg-border-l1" />
                        <button className="flex items-center gap-2 text-sm font-bold text-fg-tertiary hover:text-fg-primary transition-colors">
                          <Layout className="size-4" />
                          View project guide
                        </button>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>
            
            {/* Project Attachment Dropzone (Invisible Overlay) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 border-2 border-dashed border-primary/40 rounded-3xl bg-surface-l1/80 backdrop-blur-sm transition-opacity duration-300 ease-in-out opacity-0 pointer-events-none m-4 z-30">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md">
                 <FileUp className="size-6 text-primary" />
              </div>
              <span className="font-bold text-lg text-fg-primary mt-2">Attach to project</span>
              <span className="text-fg-secondary">Drop here to add files to project</span>
            </div>
          </div>

          {/* --- INDUSTRIAL PRECISION QUERY BAR --- */}
          <div className="w-full max-w-4xl mx-auto px-4 pb-8">
            <div className="relative group/query-bar">
              <div className="bg-surface-l1/90 backdrop-blur-2xl ring-1 ring-inset ring-border-l1 focus-within:ring-border-l2 rounded-[28px] p-2 transition-all shadow-xl shadow-black/[0.02]">
                <div className="px-4 pt-4 pb-1">
                  <textarea 
                    ref={textareaRef}
                    className="w-full bg-transparent border-none !border-0 focus:ring-0 focus:outline-none text-[15.5px] leading-relaxed text-fg-primary placeholder:text-fg-tertiary resize-none min-h-[60px] pr-12 scroll-smooth"
                    placeholder="How can i help you today?"
                    rows={1}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        if (query.trim()) {
                           const newMsg = { role: 'user' as const, content: query };
                           setMessages(prev => [...prev, newMsg]);
                           setQuery('');
                           setActiveConversationId("1");
                        }
                      }
                    }}
                  />
                </div>
                
                <div className="flex items-center justify-between px-2 py-1.5">
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => setIsFilesModalOpen(true)}
                      className="h-10 w-10 rounded-full flex items-center justify-center text-fg-secondary hover:bg-white hover:text-primary transition-all active:scale-95"
                    >
                      <Paperclip className="size-[19px]" />
                    </button>
                    
                    <div className="relative">
                      <button 
                        onClick={() => setIsModelMenuOpen(!isModelMenuOpen)}
                        className={`h-10 px-4 flex items-center gap-2 rounded-full border transition-all active:scale-95 group/model-btn ${isModelMenuOpen ? 'bg-white border-border-l1 shadow-sm' : 'hover:bg-white border-transparent hover:border-border-l1'} text-[13.5px] font-bold text-fg-primary`}
                      >
                        <span>Expert</span>
                        <ChevronDown className={`size-4 text-fg-tertiary group-hover/model-btn:text-primary transition-transform duration-300 ${isModelMenuOpen ? 'rotate-180 text-primary' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {isModelMenuOpen && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute bottom-full left-0 mb-3 min-w-[280px] bg-white rounded-2xl border border-border-l1 shadow-2xl p-1 z-50 overflow-hidden"
                          >
                            <div className="p-1">
                              {/* Auto */}
                              <button className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-surface-l1 transition-colors group">
                                <div className="flex items-center gap-3">
                                  <div className="size-8 rounded-md bg-surface-l1 flex items-center justify-center text-fg-secondary">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-[2]"><path d="M6.5 12.5L11.5 17.5M6.5 12.5L11.8349 6.83172C13.5356 5.02464 15.9071 4 18.3887 4H20V5.61135C20 8.09292 18.9754 10.4644 17.1683 12.1651L11.5 17.5M6.5 12.5L2 11L5.12132 7.87868C5.68393 7.31607 6.44699 7 7.24264 7H11M11.5 17.5L13 22L16.1213 18.8787C16.6839 18.3161 17 17.553 17 16.7574V13" stroke="currentColor" strokeLinecap="square"></path><path d="M4.5 16.5C4.5 16.5 4 18 4 20C6 20 7.5 19.5 7.5 19.5" stroke="currentColor"></path></svg>
                                  </div>
                                  <div className="text-left">
                                    <div className="text-[14px] font-bold text-fg-primary">Auto</div>
                                    <div className="text-[12px] text-fg-tertiary">Chooses Fast or Expert</div>
                                  </div>
                                </div>
                              </button>

                              {/* Fast */}
                              <button className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-surface-l1 transition-colors group">
                                <div className="flex items-center gap-3">
                                  <div className="size-8 rounded-md bg-surface-l1 flex items-center justify-center text-fg-secondary">
                                    <Zap className="size-[18px]" />
                                  </div>
                                  <div className="text-left">
                                    <div className="text-[14px] font-bold text-fg-primary">Fast</div>
                                    <div className="text-[12px] text-fg-tertiary">Quick responses</div>
                                  </div>
                                </div>
                              </button>

                              {/* Expert (Active) */}
                              <button className="w-full flex items-center justify-between p-2 rounded-lg bg-surface-l1/60 transition-colors group">
                                <div className="flex items-center gap-3">
                                  <div className="size-8 rounded-md bg-white shadow-sm flex items-center justify-center text-primary">
                                    <Brain className="size-[18px]" />
                                  </div>
                                  <div className="text-left">
                                    <div className="text-[14px] font-bold text-fg-primary">Expert</div>
                                    <div className="text-[12px] text-fg-tertiary">Thinks hard</div>
                                  </div>
                                </div>
                                <div className="size-4 bg-primary rounded-full flex items-center justify-center">
                                  <Check className="size-2.5 text-white stroke-[3.5]" />
                                </div>
                              </button>

                              {/* Model Expansion Area */}
                              <div className="h-px bg-border-l1 mx-2 my-1" />
                              
                              {/* Pro Plan Upsell */}
                              <div className="relative select-none cursor-pointer px-3 py-2 rounded-xl text-sm outline-none hover:bg-surface-l1 transition-colors flex flex-col items-start border border-border-l1 bg-surface-l3 group/mode-select-upsell">
                                <div className="flex flex-row items-center justify-between w-full gap-3">
                                  <div className="flex flex-col justify-center -space-y-0.5">
                                    <span className="font-bold text-[16px] text-fg-primary tracking-tight leading-tight">
                                      Claiv Pro
                                    </span>
                                    <p className="text-[11.5px] text-fg-secondary leading-normal">Extended capabilities</p>
                                  </div>
                                  <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer transition-colors duration-100 bg-[#111] text-white hover:bg-[#111]/80 h-8 px-3.5 text-[12.5px] rounded-full font-bold shadow-sm" type="button" aria-label="Upgrade">
                                    Upgrade
                                  </button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 relative">
                    <button 
                      onClick={() => {}} 
                      className="h-10 w-10 rounded-full flex items-center justify-center text-fg-secondary hover:bg-white hover:text-primary transition-all active:scale-95"
                    >
                      <Mic className="size-[19px]" />
                    </button>
                    <button 
                      onClick={() => {
                        if (query.trim()) {
                          const newMsg = { id: Date.now().toString(), role: 'user', content: query };
                          setMessages([...messages, newMsg]);
                          setQuery('');
                        }
                      }}
                      className="h-11 w-11 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/30 transition-all hover:bg-primary/90 hover:scale-[1.03] active:scale-[0.97]"
                    >
                      <ArrowUp className="size-5 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- MODALS --- */}
        <AnimatePresence>
          {/* Project Settings Modal */}
          {isSettingsModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSettingsModalOpen(false)}
                className="absolute inset-0 bg-black/50 backdrop-blur-[4px]"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 15 }}
                className="relative bg-white rounded-[32px] w-full max-w-2xl overflow-hidden shadow-2xl border border-border-l1 px-8 py-8"
              >
                <button 
                  onClick={() => setIsSettingsModalOpen(false)}
                  className="absolute right-8 top-8 p-2 rounded-xl text-fg-tertiary hover:bg-surface-l1 hover:text-destructive transition-all"
                >
                  <X className="size-5" />
                </button>
                
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-fg-primary">Project settings</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-[13px] font-bold uppercase tracking-wider text-fg-tertiary px-1">Project Name</label>
                    <div className="rounded-[20px] border border-border-l1 overflow-hidden bg-surface-l1/50 focus-within:border-primary/50 transition-colors px-1">
                      <input 
                        className="w-full p-4 bg-transparent focus:outline-none text-[16px] text-fg-primary font-bold"
                        placeholder="Project name"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[13px] font-bold uppercase tracking-wider text-fg-tertiary px-1">Project Instructions</label>
                    <div className="rounded-[20px] border border-border-l1 overflow-hidden bg-surface-l1/50 focus-within:border-primary/50 transition-colors">
                      <textarea 
                        className="w-full p-5 bg-transparent min-h-[220px] focus:outline-none text-[15px] text-fg-primary leading-relaxed"
                        placeholder="Grok will follow these instructions for all conversations in this project."
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        style={{ resize: 'none' }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-3 pt-4 border-t border-border-l1">
                    <button 
                      onClick={() => setIsSettingsModalOpen(false)}
                      className="px-6 py-2.5 rounded-2xl border border-border-l2 text-[13.5px] font-bold text-fg-primary hover:bg-surface-l1 transition-all active:scale-95"
                    >
                      Discard
                    </button>
                    <button 
                      onClick={() => setIsSettingsModalOpen(false)}
                      className="px-6 py-2.5 rounded-2xl bg-primary text-white text-[13.5px] font-bold hover:bg-primary/90 shadow-md shadow-primary/10 transition-all active:scale-95"
                    >
                      Save changes
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* Personal Files Modal */}
          {isFilesModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsFilesModalOpen(false)}
                className="absolute inset-0 bg-black/50 backdrop-blur-[4px]"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 15 }}
                className="relative bg-white rounded-[32px] w-full max-w-[520px] flex flex-col max-h-[85vh] shadow-2xl border border-border-l1 px-8 py-2"
              >
                <button 
                  onClick={() => setIsFilesModalOpen(false)}
                  className="absolute right-8 top-8 p-2 rounded-xl text-fg-tertiary hover:bg-surface-l1 hover:text-destructive transition-all"
                >
                  <X className="size-5" />
                </button>
                
                <div className="py-8 space-y-1.5">
                   <h2 className="text-xl font-bold text-fg-primary">Personal files</h2>
                   <p className="text-sm text-fg-tertiary">Files uploaded to provide context for this project</p>
                </div>

                <div className="flex-1 min-h-0 flex flex-col">
                  <div className="flex flex-row items-center justify-between w-full gap-3 pb-5 mb-3 border-b border-border-l1 shrink-0">
                    <div className="relative flex-1">
                       <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-fg-tertiary" />
                       <input 
                        type="text" 
                        placeholder="Search files"
                        className="w-full h-11 rounded-2xl border border-border-l1 bg-surface-l1/30 pl-11 pr-4 text-[14px] focus:outline-none focus:border-primary/40 focus:bg-white transition-all shadow-inner-sm" 
                       />
                    </div>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setFiles(prev => [{ name: file.name, isNew: true }, ...prev]);
                        }
                      }}
                    />
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="premium-button px-6 h-11 !bg-none !bg-white !text-black !border-[#ebebea] hover:!bg-[#fcfcfb] hover:!border-[#1D9E75] hover:!text-[#0F6E56] shadow-sm transition-all"
                    >
                      <div className="text-roll-container">
                        <span className="flex items-center gap-2 text-[13.5px] font-bold">
                          Attach
                        </span>
                        <span aria-hidden="true" className="flex items-center gap-2 text-[13.5px] font-bold">
                          Attach
                        </span>
                      </div>
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto min-h-0 py-4 scroll-smooth">
                    {files.length > 0 ? (
                      <div className="flex flex-col gap-1.5">
                        {files.map((file, i) => (
                           <motion.div 
                            key={i} 
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3.5 py-3 px-3 rounded-[18px] hover:bg-surface-l1 group transition-all border border-transparent hover:border-border-l1"
                           >
                             <div className="rounded-xl w-10 h-10 shrink-0 bg-white shadow-sm border border-border-l1 flex items-center justify-center text-xl">
                               📄
                             </div>
                             <div className="flex flex-col flex-1 min-w-0">
                               <span className="text-[14px] truncate text-fg-primary font-bold">{file.name}</span>
                               <span className="text-[10px] text-fg-tertiary">Added 1m ago</span>
                             </div>
                             {file.isNew && (
                                <span className="text-[9px] uppercase tracking-[0.1em] text-lime-700 font-black px-2 py-0.5 bg-lime-100/80 rounded-full">New</span>
                             )}
                             <button className="p-2 rounded-xl text-fg-tertiary hover:bg-white hover:text-destructive transition-all opacity-0 group-hover:opacity-100">
                               <X className="size-4" />
                             </button>
                           </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="h-60 flex flex-col items-center justify-center text-sm text-fg-tertiary font-medium bg-surface-l1/30 rounded-3xl border border-dashed border-border-l1 border-spacing-4">
                        <Files className="size-10 text-fg-tertiary/20 mb-3" />
                        No files uploaded yet
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-2.5 pt-6 pb-8 border-t border-border-l1">
                  <button 
                    onClick={() => setIsFilesModalOpen(false)}
                    className="px-6 py-2.5 rounded-2xl border border-border-l2 text-[13.5px] font-bold text-fg-primary hover:bg-surface-l1 transition-all active:scale-95"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => setIsFilesModalOpen(false)}
                    className="px-6 py-2.5 rounded-2xl bg-primary text-white text-[13.5px] font-bold hover:bg-primary/90 shadow-md shadow-primary/10 transition-all active:scale-95"
                  >
                    Save Changes
                  </button>
                </div>
              </motion.div>
            </div>
          )}
          {/* Delete Project Modal */}
          {isDeleteModalOpen && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsDeleteModalOpen(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-[6px]"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 15 }}
                className="relative bg-white rounded-[40px] w-full max-w-md overflow-hidden shadow-2xl border border-border-l1 px-10 py-10 flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-[24px] bg-destructive/10 text-destructive flex items-center justify-center mb-6">
                  <svg width="32" height="32" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ flexShrink: 0 }}>
                    <path d="M11.323 1.5a1.5 1.5 0 0 1 1.393.943L13.338 4H17.5l.1.01a.5.5 0 0 1 0 .98l-.1.01h-1.537l-.894 11.615A1.5 1.5 0 0 1 13.574 18H6.426a1.5 1.5 0 0 1-1.478-1.24l-.017-.145L4.037 5H2.5a.5.5 0 0 1 0-1h4.162l.622-1.557.047-.104A1.5 1.5 0 0 1 8.677 1.5zM5.928 16.538a.5.5 0 0 0 .498.462h7.148a.5.5 0 0 0 .498-.462L14.961 5H5.039zM8.5 8a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0v-5a.5.5 0 0 1 .5-.5m3 0a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0v-5a.5.5 0 0 1 .5-.5M8.677 2.5a.5.5 0 0 0-.43.246l-.034.068L7.738 4h4.524l-.475-1.186a.5.5 0 0 0-.464-.314z"></path>
                  </svg>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-fg-primary mb-2">Delete project?</h2>
                  <p className="text-fg-secondary text-[15px] leading-relaxed">
                    This action is permanent and cannot be undone. All your project files and conversations will be lost forever.
                  </p>
                </div>
                
                <div className="flex flex-col gap-3 w-full">
                  <button 
                    onClick={() => {
                      setIsDeleteModalOpen(false);
                      window.location.href = "/projects";
                    }}
                    className="w-full h-14 rounded-2xl bg-destructive text-white text-[15px] font-bold hover:bg-destructive/90 shadow-lg shadow-destructive/20 transition-all active:scale-[0.98]"
                  >
                    Delete project
                  </button>
                  <button 
                    onClick={() => setIsDeleteModalOpen(false)}
                    className="w-full h-14 rounded-2xl border border-border-l1 text-[15px] font-bold text-fg-primary hover:bg-surface-l1 transition-all active:scale-[0.98]"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </GlobalShell>
  );
}
