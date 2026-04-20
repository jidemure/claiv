"use client";
import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";

import { 
  MessageSquare, 
  Search, 
  Settings, 
  Users,
  Database,
  Bell,
  LayoutDashboard,
  FileText,
  Clock,
  Globe,
  HelpCircle,
  ArrowUpCircle,
  Download,
  Gift,
  Info,
  LogOut,
  ChevronRight,
  Check,
  ExternalLink,
  MoreVertical,
  Pencil,
  Pin,
  Folder,
  Trash2,
  ChevronDown,
  Plus
} from "lucide-react";
import NewProjectModal from "../projects/NewProjectModal";

const navItems = [
  { href: "/chat", icon: MessageSquare, label: "Ask Claiv" },
  { href: "/knowledge", icon: FileText, label: "Documents" },
  { href: "/dashboard", icon: LayoutDashboard, label: "Analytics" },
];

const mockProjects = [
  "Project Claiv",
  "Market Research",
  "PRD Development",
  "Customer Support Bot"
];

const historyItems = [
  "Available user roles",
  "Pointed arrow symbols",
  "Purchase order management syst...",
  "Video analysis and insights",
  "SMS",
  "AI-powered business directory wi...",
  "PRD preparation and clarification ..."
];

export default function GlobalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(true);
  const [showProjects, setShowProjects] = useState(true);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const recentsMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (recentsMenuRef.current && !recentsMenuRef.current.contains(event.target as Node)) {
        setActiveMenuIndex(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const linkClass = (href: string) => {
    const active = pathname === href || pathname.startsWith(href + "/");
    return `flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors ${
      active
        ? "bg-[#E1F5EE] text-[#085041]"
        : "hover:bg-[#F1EFE8] text-[#888780] hover:text-[#1a1a18]"
    }`;
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans">
      {/* 224px Sidebar - Salix style */}
      <aside className="w-[224px] flex flex-col border-r border-border bg-white z-10 hidden md:flex shrink-0">
        {/* Brand */}
        <div className="h-[64px] flex items-center px-5 border-b border-border shrink-0">
          <a href="/" className="flex items-center gap-2.5">
            <img src="/claiv-main-logo.png" alt="Claiv Logo" className="h-6 w-auto" />
          </a>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-0.5 px-3">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className={linkClass(item.href)}>
              <item.icon size={16} /> {item.label}
            </a>
          ))}
          
          {/* Projects Section */}
          <div 
            className="pt-4 pb-1 px-3 w-full cursor-pointer flex items-center justify-between group h-8 mt-2"
            onClick={() => setShowProjects(!showProjects)}
            role="button"
            aria-expanded={showProjects}
          >
            <span className="inline-flex items-center gap-2">
              <span className="text-[11px] font-semibold text-[#111] uppercase tracking-[0.05em]">Projects</span>
              <ChevronDown 
                size={12} 
                className={`text-[#888780] transition-transform duration-150 ${showProjects ? '' : '-rotate-90'}`} 
              />
            </span>
          </div>
          
          <div className={`flex flex-col gap-0.5 transition-all duration-300 overflow-hidden ${showProjects ? 'max-h-[300px] opacity-100 mb-2' : 'max-h-0 opacity-0'}`}>
            <button 
              className="flex items-center gap-3 px-3 py-2 w-full text-left text-[13px] text-[#5F5E5A] hover:bg-[#F1EFE8] rounded-xl transition-colors group/new-project mb-0.5"
              onClick={(e) => {
                e.preventDefault();
                setIsNewProjectModalOpen(true);
              }}
            >
              <div className="flex items-center justify-center shrink-0 w-4 h-4">
                <Plus size={16} className="text-[#888780] group-hover/new-project:text-[#111] transition-colors" />
              </div>
              <span className="flex-1 select-none truncate group-hover/new-project:text-[#111] transition-colors">New Project</span>
            </button>
            {mockProjects.slice(0, 3).map((project, i) => (
              <a 
                key={i} 
                href={`/project/${i + 1}`} 
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-[13px] text-[#5F5E5A] hover:bg-[#F1EFE8] hover:text-[#1a1a18] transition-colors"
              >
                <Folder size={14} className="text-[#888780] shrink-0" />
                <span className="flex-1 truncate">{project}</span>
              </a>
            ))}
            <a 
              href="/projects"
              className="flex items-center gap-2.5 px-4 py-1 pb-1 mt-1 text-[13px] font-semibold text-[#888780] hover:text-[#111] transition-colors"
            >
              See all
            </a>
          </div>
          
          {/* History Section */}
          <div 
            className="pt-4 pb-1 px-3 w-full cursor-pointer flex items-center justify-between group h-8 mt-2"
            onClick={() => setShowHistory(!showHistory)}
            role="button"
            aria-expanded={showHistory}
          >
            <span className="inline-flex items-center gap-2">
              <span className="text-[11px] font-semibold text-[#111] uppercase tracking-[0.05em]">History</span>
              <ChevronDown 
                size={12} 
                className={`text-[#888780] transition-transform duration-150 ${showHistory ? '' : '-rotate-90'}`} 
              />
            </span>
          </div>
          
          <div className={`flex flex-col gap-0.5 transition-all duration-300 overflow-hidden ${showHistory ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
            {historyItems.slice(0, 3).map((item, i) => (
              <a 
                key={i} 
                href="#" 
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-[13px] text-[#5F5E5A] hover:bg-[#F1EFE8] hover:text-[#1a1a18] transition-colors"
                onClick={(e) => e.preventDefault()}
              >
                <MessageSquare size={14} className="text-[#888780] shrink-0" />
                <span className="flex-1 truncate">{item}</span>
              </a>
            ))}
            <a 
              href="/history"
              className="flex items-center gap-2.5 px-4 py-1 pb-1 mt-1 text-[13px] font-semibold text-[#888780] hover:text-[#111] transition-colors"
            >
              See all
            </a>
          </div>
        </div>
        
        {/* User footer */}
        <div className="p-3 border-t border-border shrink-0 mt-auto" ref={userMenuRef}>
          <div className="relative w-full">
            {isUserMenuOpen && (
              <div className="absolute bottom-full left-[-8px] mb-1 w-[216px] bg-white border border-[#ebebea] rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] py-1.5 z-50 text-[13px] text-[#111]">
                <div className="px-3 py-1.5 text-[#888780] font-medium text-[12px] truncate">esther.wedev@gmail.com</div>
                
                <a href="/settings" className="flex items-center gap-2.5 px-3 py-2 hover:bg-[#F7F7F5] mx-1.5 rounded-lg transition-colors cursor-pointer group">
                  <Settings size={16} className="text-[#5F5E5A] group-hover:text-[#111] transition-colors" />
                  <span className="flex-1 font-medium">Settings</span>
                </a>
                
                <div 
                  className="relative"
                  onMouseEnter={() => setIsLanguageMenuOpen(true)}
                  onMouseLeave={() => setIsLanguageMenuOpen(false)}
                >
                  <a href="/settings/language" className="flex items-center gap-2.5 px-3 py-2 hover:bg-[#F7F7F5] mx-1.5 rounded-lg transition-colors cursor-pointer group">
                    <Globe size={16} className="text-[#5F5E5A] group-hover:text-[#111] transition-colors" />
                    <span className="flex-1 font-medium">Languages</span>
                    <ChevronRight size={14} className="text-[#888780] group-hover:text-[#111]" />
                  </a>

                  {isLanguageMenuOpen && (
                    <div className="absolute left-full top-[-6px] ml-1.5 w-[14rem] bg-white border border-[#ebebea] rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] py-1.5 z-[60] text-[13px] text-[#111] backdrop-blur-xl">
                      {[
                        { name: "English (United States)", code: "en-US", selected: true },
                        { name: "français (France)", code: "fr-FR" },
                        { name: "Deutsch (Deutschland)", code: "de-DE" },
                        { name: "हिन्दी (भारत)", code: "hi-IN" },
                        { name: "Indonesia (Indonesia)", code: "id-ID" },
                        { name: "italiano (Italia)", code: "it-IT" },
                        { name: "日本語 (日本)", code: "ja-JP" },
                        { name: "한국어(대한민국)", code: "ko-KR" },
                        { name: "português (Brasil)", code: "pt-BR" },
                        { name: "español (Latinoamérica)", code: "es-419" },
                        { name: "español (España)", code: "es-ES" }
                      ].map((lang) => (
                        <div key={lang.code} className="flex items-center gap-2 px-3 py-1.5 hover:bg-[#F7F7F5] mx-1.5 rounded-lg transition-colors cursor-pointer group text-sm">
                          <span className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis capitalize">{lang.name}</span>
                          {lang.selected ? (
                            <Check size={14} className="text-[#1D9E75]" />
                          ) : (
                            <div className="w-[14px] h-[14px]"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <a href="/ingest" className="flex items-center gap-2.5 px-3 py-2 hover:bg-[#F7F7F5] mx-1.5 rounded-lg transition-colors cursor-pointer group">
                  <Database size={16} className="text-[#5F5E5A] group-hover:text-[#111] transition-colors" />
                  <span className="flex-1 font-medium">Ingestion</span>
                </a>

                <a href="/users" className="flex items-center gap-2.5 px-3 py-2 hover:bg-[#F7F7F5] mx-1.5 rounded-lg transition-colors cursor-pointer group">
                  <Users size={16} className="text-[#5F5E5A] group-hover:text-[#111] transition-colors" />
                  <span className="flex-1 font-medium">Users</span>
                </a>
                
                <div className="h-[1px] bg-[#ebebea] mx-3 my-1.5"></div>
                
                <a href="/pricing" className="flex items-center gap-2.5 px-3 py-2 hover:bg-[#F7F7F5] mx-1.5 rounded-lg transition-colors cursor-pointer group">
                  <ArrowUpCircle size={16} className="text-[#5F5E5A] group-hover:text-[#111] transition-colors" />
                  <span className="flex-1 font-medium">Upgrade plan</span>
                </a>

                <div 
                  className="relative"
                  onMouseEnter={() => setIsLearnMoreOpen(true)}
                  onMouseLeave={() => setIsLearnMoreOpen(false)}
                >
                  <a href="/learn" className="flex items-center gap-2.5 px-3 py-2 hover:bg-[#F7F7F5] mx-1.5 rounded-lg transition-colors cursor-pointer group">
                    <Info size={16} className="text-[#5F5E5A] group-hover:text-[#111] transition-colors" />
                    <span className="flex-1 font-medium">Learn more</span>
                    <ChevronRight size={14} className="text-[#888780] group-hover:text-[#111]" />
                  </a>

                  {isLearnMoreOpen && (
                    <div className="absolute left-full top-[-6px] ml-1.5 w-[13.5rem] bg-white border border-[#ebebea] rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] py-1.5 z-[60] text-[13px] text-[#111] backdrop-blur-xl">
                      <a href="https://www.anthropic.com/" target="_blank" className="flex items-center justify-between px-3 py-1.5 hover:bg-[#F7F7F5] mx-1.5 rounded-lg transition-colors cursor-pointer group">
                        <span className="font-medium">About Claiv</span>
                        <ExternalLink size={14} className="text-[#888780] group-hover:text-[#111]" />
                      </a>
                      
                      <a href="https://claude.com/resources/tutorials?open_in_browser=1" target="_blank" className="flex items-center justify-between px-3 py-1.5 hover:bg-[#F7F7F5] mx-1.5 rounded-lg transition-colors cursor-pointer group">
                        <span className="font-medium">Tutorials</span>
                        <ExternalLink size={14} className="text-[#888780] group-hover:text-[#111]" />
                      </a>

                      <div className="h-[1px] bg-[#ebebea] mx-3 my-1.5"></div>

                      <a href="https://www.anthropic.com/legal/aup" target="_blank" className="flex items-center justify-between px-3 py-1.5 hover:bg-[#F7F7F5] mx-1.5 rounded-lg transition-colors cursor-pointer group">
                        <span className="font-medium">Usage policy</span>
                        <ExternalLink size={14} className="text-[#888780] group-hover:text-[#111]" />
                      </a>

                      <a href="https://www.anthropic.com/legal/privacy" target="_blank" className="flex items-center justify-between px-3 py-1.5 hover:bg-[#F7F7F5] mx-1.5 rounded-lg transition-colors cursor-pointer group">
                        <span className="font-medium">Privacy policy</span>
                        <ExternalLink size={14} className="text-[#888780] group-hover:text-[#111]" />
                      </a>

                      <button className="flex items-center w-full px-3 py-1.5 hover:bg-[#F7F7F5] mx-1.5 rounded-lg transition-colors cursor-pointer text-left font-medium">
                        Your privacy choices
                      </button>
                    </div>
                  )}
                </div>
                
                <a href="/help" className="flex items-center gap-2.5 px-3 py-2 hover:bg-[#F7F7F5] mx-1.5 rounded-lg transition-colors cursor-pointer group">
                  <HelpCircle size={16} className="text-[#5F5E5A] group-hover:text-[#111] transition-colors" />
                  <span className="flex-1 font-medium">Get help</span>
                </a>
                
                <div className="h-[1px] bg-[#ebebea] mx-3 my-1.5"></div>
                
                <a href="/logout" className="flex items-center gap-2.5 px-3 py-2 hover:bg-[#fcfafa] mx-1.5 rounded-lg transition-colors cursor-pointer">
                  <LogOut size={16} className="text-[#e13224]" />
                  <span className="flex-1 font-medium text-[#e13224]">Log out</span>
                </a>
              </div>
            )}
            <button 
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center justify-center relative shrink-0 disabled:opacity-50 border border-transparent transition-all duration-300 w-full group px-2 py-2 rounded-xl hover:bg-[#F7F7F5] gap-3 text-left"
            >
              <div className="relative flex-shrink-0">
                <div className="flex items-center justify-center rounded-full border border-transparent group-hover:border-[#ebebea] transition-colors">
                  <div className="flex shrink-0 items-center justify-center rounded-full font-bold select-none h-9 w-9 text-[13px] bg-[#E1F5EE] text-[#085041] border border-[#9FE1CB]">
                    EW
                  </div>
                </div>
              </div>
              
              <div className="transition-opacity ease-out duration-150 flex flex-1 text-[13px] justify-between items-center font-medium min-w-0">
                <div className="flex flex-col items-start min-w-0 flex-1 pr-1">
                  <span className="w-full text-start block truncate text-[#111]">Esther Webdev</span>
                  <span className="w-full truncate text-[11px] text-[#888780] font-normal text-start">Free plan</span>
                </div>
                
                <div className="flex items-center gap-2 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256" className="flex-shrink-0 text-[#888780] group-hover:text-[#111] transition-colors">
                    <path d="M181.66,170.34a8,8,0,0,1,0,11.32l-48,48a8,8,0,0,1-11.32,0l-48-48a8,8,0,0,1,11.32-11.32L128,212.69l42.34-42.35A8,8,0,0,1,181.66,170.34Zm-96-84.68L128,43.31l42.34,42.35a8,8,0,0,0,11.32-11.32l-48-48a8,8,0,0,0-11.32,0l-48,48A8,8,0,0,0,85.66,85.66Z"></path>
                  </svg>
                </div>
              </div>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Dynamic Content */}
        <main className="flex-1 h-full overflow-hidden flex relative bg-[#F7F7F5]">
          {children}
        </main>
      </div>

      <NewProjectModal 
        isOpen={isNewProjectModalOpen} 
        onClose={() => setIsNewProjectModalOpen(false)} 
      />
    </div>
  );
}
