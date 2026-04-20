"use client";
import React, { useState } from "react";
import { 
  Plus, 
  Ellipsis, 
  Component, 
  Stethoscope, 
  Globe, 
  User, 
  BookOpen, 
  Briefcase, 
  StickyNote, 
  Apple,
  Share2,
  BookCopy,
  Trash2,
  SquareUserRound,
  Trash
} from "lucide-react";
import GlobalShell from "@/components/layout/GlobalShell";
import NewProjectModal from "@/components/projects/NewProjectModal";

const myProjects = [
  { id: "1", name: "Fish", icon: Component, iconColor: "text-lime-400" },
  { id: "2", name: "Rain", icon: Stethoscope, iconColor: "text-blue-300" },
  { id: "3", name: "Sample", icon: Globe, iconColor: "text-purple-300" },
  { id: "4", name: "Remeske", icon: User, iconColor: "text-gray-400" },
];

const exampleProjects = [
  { id: "e1", name: "Legal Document Reviewer", description: "Get expert analysis of U.S. legal documents", icon: BookOpen, iconColor: "text-gray-300" },
  { id: "e2", name: "Cover Letter Writer", description: "Craft tailored cover letters that align your experience with the job description", icon: Briefcase, iconColor: "text-yellow-300" },
  { id: "e3", name: "Writing Assistant", description: "Polish and improve any text for clarity, conciseness, and style.", icon: StickyNote, iconColor: "text-blue-300" },
  { id: "e4", name: "Fitness Advice", description: "Plan workouts, nutrition, and fitness goals with evidence-based guidance", icon: Apple, iconColor: "text-red-300" },
];

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState("own");
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const tabs = [
    { id: "own", label: "My Projects" },
    { id: "shared", label: "Shared with me" },
    { id: "examples", label: "Examples" },
  ];

  return (
    <GlobalShell>
      <div className="flex-1 overflow-hidden bg-background font-universal">
        <div className="max-w-[50rem] px-5 pt-16 @sm:pt-18 mx-auto w-full flex flex-col h-full relative items-center text-fg-primary leading-6 tracking-[-0.1px]">
          <main className="w-full h-full flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center mb-4 min-h-[42px]">
              <h1 className="text-2xl flex gap-2 items-center font-semibold">Projects</h1>
              <div className="flex justify-end">
                <button 
                  onClick={() => setIsNewProjectModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium leading-[normal] cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-100 border border-border-l2 text-fg-primary hover:bg-button-ghost-hover h-10 rounded-xl px-4 py-2"
                >
                  <Plus size={16} />
                  <span className="sr-only sm:not-sr-only">Create project</span>
                </button>
              </div>
            </div>

            {/* Tabs Container */}
            <div className="flex-1 overflow-hidden flex flex-col gap-4">
              {/* Tab List */}
              <div role="tablist" className="inline-flex items-center bg-surface-base p-1 text-fg-secondary border-none justify-start rounded-none pb-0">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`inline-flex items-center justify-center whitespace-nowrap font-medium transition-all focus-visible:outline-none text-md px-2 pb-1 border-b transition-all duration-200 ${
                      activeTab === tab.id 
                        ? "text-fg-primary border-fg-primary" 
                        : "text-fg-secondary border-transparent hover:text-fg-primary"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
                <div className="flex-1 border-b border-border-l1 self-stretch"></div>
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto no-scrollbar pt-2">
                {activeTab === "own" && (
                  <div className="pb-8 flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {myProjects.map((project) => (
                        <div key={project.id} className="group relative">
                          <a href={`/project/${project.id}`}>
                            <div className="flex flex-row items-center md:flex-col md:items-stretch gap-2 px-5 py-4 pe-12 md:pe-5 max-w-4/5 rounded-2xl hover:bg-surface-l1 h-full overflow-hidden border border-border-l1 transition-colors">
                              <project.icon className={`${project.iconColor} size-4`} />
                              <div className="text-base font-semibold truncate">{project.name}</div>
                            </div>
                          </a>
                          
                          <button 
                            onClick={(e) => {
                              e.preventDefault();
                              setOpenMenuId(openMenuId === project.id ? null : project.id);
                            }}
                            className={`inline-flex items-center justify-center whitespace-nowrap text-sm font-medium leading-[normal] cursor-pointer focus-visible:outline-none transition-colors duration-100 border border-transparent h-8 rounded-xl gap-1.5 overflow-hidden w-8 px-1.5 py-1.5 visible md:invisible md:group-hover:visible absolute right-3 top-1/2 -translate-y-1/2 md:top-3 md:translate-y-0 ${
                              openMenuId === project.id ? 'bg-surface-l2 text-fg-primary' : 'text-fg-tertiary hover:bg-button-ghost-hover hover:text-fg-primary'
                            }`}
                          >
                            <Ellipsis size={12} />
                          </button>

                          {openMenuId === project.id && (
                            <div className="absolute right-0 top-full mt-2 w-40 bg-white border border-border-l1 rounded-2xl shadow-sm shadow-black/5 p-1 z-50 flex flex-col z-[100]">
                              <button className="relative flex select-none items-center cursor-pointer px-3 py-2 rounded-xl text-sm outline-none hover:bg-button-ghost-hover gap-2">
                                <Share2 size={16} />
                                <span>Share</span>
                              </button>
                              <button className="relative flex select-none items-center cursor-pointer px-3 py-2 rounded-xl text-sm outline-none hover:bg-button-ghost-hover gap-2">
                                <BookCopy size={16} />
                                <span>Clone</span>
                              </button>
                              <button className="relative flex select-none items-center cursor-pointer px-3 py-2 rounded-xl text-sm outline-none hover:bg-button-ghost-hover gap-2 text-red-500">
                                <Trash size={16} />
                                <span>Remove</span>
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "shared" && (
                  <div className="p-4 sm:p-6 flex flex-col justify-center items-center border border-border-l1 text-sm rounded-2xl text-center gap-4 bg-surface-base">
                    <div className="bg-surface-l1 rounded-full p-2 flex items-center justify-center">
                      <SquareUserRound size={24} className="text-fg-tertiary" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="font-medium">You don't have any projects shared with you.</h3>
                      <p className="text-fg-secondary text-sm">When someone shares a project with you, it will appear here.</p>
                    </div>
                  </div>
                )}

                {activeTab === "examples" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {exampleProjects.map((project) => (
                      <div key={project.id} className="p-3 flex flex-col gap-2 grow bg-surface-l1 cursor-pointer hover:bg-button-ghost-hover rounded-2xl border border-transparent hover:border-border-l1 transition-all">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <project.icon className={`${project.iconColor} size-4`} />
                            <h3 className="font-semibold text-sm">{project.name}</h3>
                          </div>
                          <div className="text-[10px] font-bold text-fg-tertiary uppercase tracking-wider bg-white/50 px-1.5 py-0.5 rounded border border-border-l1">Example</div>
                        </div>
                        <p className="text-xs text-fg-secondary leading-relaxed">{project.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>

        <NewProjectModal 
          isOpen={isNewProjectModalOpen} 
          onClose={() => setIsNewProjectModalOpen(false)} 
        />
      </div>
    </GlobalShell>
  );
}
