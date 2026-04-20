"use client";
import React, { useState } from "react";
import Modal from "../ui/Modal";
import { 
  User, 
  Users, 
  Building2, 
  ChevronRight,
  Sparkles,
  Zap,
  Globe,
  Settings
} from "lucide-react";

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewProjectModal({ isOpen, onClose }: NewProjectModalProps) {
  const [workspaceType, setWorkspaceType] = useState<"personal" | "team" | "org">("personal");
  const [workspaceName, setWorkspaceName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [companySize, setCompanySize] = useState("");

  const handleCreate = () => {
    // Implement creation logic
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col h-full max-h-[calc(100vh-100px)] overflow-hidden font-universal">
        {/* Header */}
        <div className="p-6 pb-4 flex flex-col gap-1 border-b border-border-l1 bg-white sticky top-0 z-10">
          <h2 className="text-xl font-bold text-fg-primary">Create Workspace</h2>
          <p className="text-sm text-fg-tertiary">Select the type of workspace you want to set up.</p>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-6 overflow-y-auto no-scrollbar bg-surface-base">
          {/* Workspace Type Selector */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: "personal", label: "Personal", icon: User },
              { id: "team", label: "Team", icon: Users },
              { id: "org", label: "Organization", icon: Building2 },
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setWorkspaceType(type.id as any)}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${
                  workspaceType === type.id 
                    ? "border-primary bg-claiv-50 text-primary shadow-sm" 
                    : "border-border-l1 bg-white text-fg-secondary hover:border-border-l2 hover:bg-surface-l1"
                }`}
              >
                <type.icon size={20} />
                <span className="text-xs font-bold uppercase tracking-wider">{type.label}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-5">
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-fg-primary px-1">Workspace name</label>
              <input 
                placeholder="e.g. Marketing Team" 
                className="w-full h-11 px-4 border border-border-l1 rounded-xl bg-white focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-sm"
                type="text" 
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
              />
            </div>

            {/* Purpose */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-fg-primary px-1">What will you use it for?</label>
              <select 
                className="w-full h-11 px-4 border border-border-l1 rounded-xl bg-white focus:outline-none focus:border-primary transition-all text-sm appearance-none cursor-pointer"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
              >
                <option value="" disabled>Select a purpose</option>
                <option value="business">Business Operations</option>
                <option value="content">Content Creation</option>
                <option value="legal">Legal/Compliance</option>
                <option value="research">Research & Development</option>
              </select>
            </div>

            {workspaceType !== "personal" && (
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-fg-primary px-1">How large is your company?</label>
                <select 
                  className="w-full h-11 px-4 border border-border-l1 rounded-xl bg-white focus:outline-none focus:border-primary transition-all text-sm appearance-none cursor-pointer"
                  value={companySize}
                  onChange={(e) => setCompanySize(e.target.value)}
                >
                  <option value="" disabled>Select company size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201+">201+ employees</option>
                </select>
              </div>
            )}

            {/* Plan Promo */}
            <div className="p-4 rounded-2xl bg-[#04342C] text-white flex items-center gap-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/20 rounded-full blur-3xl -mr-12 -mt-12"></div>
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                <Sparkles size={20} className="text-[#9FE1CB]" />
              </div>
              <div className="flex flex-col flex-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#9FE1CB]">Pro Plan Recommendation</span>
                <span className="text-sm font-medium">Unlock unlimited projects and team collaboration.</span>
              </div>
              <ChevronRight size={18} className="text-white/40 group-hover:text-white transition-colors" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-4 border-t border-border-l1 bg-white flex justify-end gap-3 sticky bottom-0 z-10">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-sm font-medium text-fg-secondary hover:bg-button-ghost-hover transition-all"
          >
            Cancel
          </button>
          <button 
            onClick={handleCreate}
            disabled={!workspaceName.trim()}
            className="px-8 py-2.5 rounded-xl text-sm font-bold bg-primary text-white hover:bg-claiv-800 transition-all shadow-sm shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Workspace
          </button>
        </div>
      </div>
    </Modal>
  );
}
