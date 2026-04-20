"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Settings as SettingsIcon, 
  User, 
  CreditCard, 
  Link as LinkIcon, 
  RotateCw,
  ChevronDown,
  ExternalLink,
  ChevronRight,
  Info,
  Bell,
  Key,
  Monitor,
  Volume2,
  MoreHorizontal,
  Sparkles,
  Shield,
  Lock,
  Globe,
  Trash2
} from "lucide-react";
import GlobalShell from "@/components/layout/GlobalShell";

const settingsNav = [
  { label: "General", href: "#general", icon: SettingsIcon },
  { label: "Notifications", href: "#notifications", icon: Bell },
  { label: "Connectors", href: "#connectors", icon: LinkIcon },
  { label: "Models", href: "#models", icon: Sparkles },
  { label: "Billing", href: "#billing", icon: CreditCard },
  { label: "Appearance", href: "#appearance", icon: Monitor },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("General");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [showAddConnectorModal, setShowAddConnectorModal] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Close menu on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Notification States
  const [notifStates, setNotifStates] = useState({
    responseCompletions: true,
    dispatchMessages: true,
    weeklyRecap: false,
    featureUpdates: true,
    securityAlerts: true,
    creditUsageAlerts: true,
    newsletters: false,
    soundEffects: true
  });

  const toggleNotif = (key: keyof typeof notifStates) => {
    setNotifStates(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleMenu = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const [models, setModels] = useState({
    Anthropic: { enabled: true, snippet: "claude-3-5-sonnet" },
    Grok: { enabled: false, snippet: null },
    Gemini: { enabled: true, snippet: "gemini-1.5-pro" },
    OpenAI: { enabled: true, snippet: "gpt-4o" },
    Groq: { enabled: false, snippet: null },
    Qwen: { enabled: false, snippet: null }
  });

  const [showConnectAIModal, setShowConnectAIModal] = useState(false);
  const [connectingModel, setConnectingModel] = useState<string | null>(null);
  const [aiApiKey, setAiApiKey] = useState("");

  const aiProviderMetadata: Record<string, { domain: string, placeholder: string }> = {
    'Anthropic': { domain: 'anthropic.com', placeholder: 'sk-ant-api...' },
    'OpenAI': { domain: 'openai.com', placeholder: 'sk-...' },
    'Gemini': { domain: 'google.com', placeholder: 'Enter API Key' },
    'Grok': { domain: 'x.ai', placeholder: 'Enter API Key' },
    'Groq': { domain: 'groq.com', placeholder: 'gsk_...' },
    'Qwen': { domain: 'alibaba.com', placeholder: 'Enter API Key' }
  };

  const handleToggleModel = (name: string) => {
    if (!models[name as keyof typeof models].enabled) {
      setConnectingModel(name);
      setAiApiKey("");
      setShowConnectAIModal(true);
    } else {
      setModels(prev => ({
        ...prev,
        [name]: { ...prev[name as keyof typeof models], enabled: false, snippet: null }
      }));
    }
  };

  const confirmConnectAI = () => {
    if (connectingModel) {
      const snippet = aiApiKey.length > 8 
        ? `${aiApiKey.substring(0, 4)}...${aiApiKey.substring(aiApiKey.length - 4)}`
        : "Connected";
      
      setModels(prev => ({
        ...prev,
        [connectingModel]: { enabled: true, snippet }
      }));
      setShowConnectAIModal(false);
      setConnectingModel(null);
    }
  };

  const [appearance, setAppearance] = useState("Auto");
  const [bgAnimation, setBgAnimation] = useState("Auto");
  const [chatFont, setChatFont] = useState("Default");
  const [voice, setVoice] = useState("Buttery");

  const [displayName, setDisplayName] = useState("Oponushi");
  const [fullName, setFullName] = useState("Esther Webdev");

  return (
    <GlobalShell>
      <div className="flex-1 overflow-y-auto bg-white w-full h-full">
        <main className="mx-auto mt-4 w-full px-4 md:px-8 lg:mt-6 max-w-7xl">
          <h1 className="font-heading text-[#111] mb-6 flex items-center gap-2.5 text-[24px] font-bold md:hidden">
            Settings
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-[224px_minmax(0px,_1fr)] gap-x-10 w-full my-4 md:my-10">
            {/* Nav sidebar */}
            <nav className="min-w-0 w-full self-start md:sticky md:top-4 z-10 mb-8 md:mb-0" aria-label="Settings">
              <ul className="flex gap-1 md:flex-col overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                {settingsNav.map((item) => (
                  <li key={item.label}>
                    <button
                      onClick={() => setActiveTab(item.label)}
                      className={`font-medium whitespace-nowrap transition-all rounded-xl px-4 h-11 flex gap-3 items-center w-full text-[14px] ${
                        activeTab === item.label
                          ? "bg-[#F7F7F5] text-[#111] border border-[#ebebea]"
                          : "text-[#888780] hover:text-[#111] hover:bg-[#F7F7F5]"
                      }`}
                    >
                      <item.icon size={16} className={activeTab === item.label ? "text-[#1D9E75]" : "text-[#888780]"} />
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Content area */}
            <div className="outline-none">
              <div className="flex flex-col max-w-2xl">
                
                {activeTab === "General" && (
                  <section className="flex flex-col gap-8 pb-12 mb-12">
                    <h2 className="text-[20px] font-bold text-[#111]">Profile</h2>
                    <div className="flex flex-col gap-7">
                      {/* Name & Avatar */}
                      <div className="grid gap-2">
                         <label className="text-[13px] font-semibold text-[#888780]">Full name</label>
                         <div className="flex gap-4 items-center">
                            <button 
                              className="w-12 h-12 rounded-xl border border-[#ebebea] bg-white hover:border-[#1D9E75] transition-all flex items-center justify-center relative group overflow-hidden shadow-sm"
                              title="Randomize avatar"
                            >
                              <RotateCw size={18} className="absolute z-10 text-[#5F5E5A] opacity-0 group-hover:opacity-100 transition-opacity" />
                              <div className="flex shrink-0 items-center justify-center rounded-full font-bold select-none h-9 w-9 text-[13px] bg-[#E1F5EE] text-[#085041] border border-[#9FE1CB] group-hover:opacity-20 group-hover:blur-sm transition-all duration-300">
                                EW
                              </div>
                            </button>
                            <input 
                              className="salix-input flex-1 h-12 text-[14px]"
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              placeholder="Full name"
                            />
                         </div>
                      </div>

                      {/* Display Name */}
                      <div className="grid gap-2">
                         <label className="text-[13px] font-semibold text-[#888780]">What should Claiv call you? <span className="text-[#e13224]">*</span></label>
                         <input 
                           className="salix-input h-12 text-[14px]"
                           value={displayName}
                           onChange={(e) => setDisplayName(e.target.value)}
                           placeholder="e.g. Oponushi"
                           required
                         />
                      </div>

                      {/* Work Function */}
                      <div className="grid gap-2">
                         <label className="text-[13px] font-semibold text-[#888780]">What best describes your work?</label>
                         <div className="relative">
                           <select className="salix-input h-12 w-full text-[14px] appearance-none pr-10 cursor-pointer text-[#111]">
                             <option>Select your work function</option>
                             <option>Engineering</option>
                             <option>Product Management</option>
                             <option>Design</option>
                             <option>Marketing</option>
                             <option>Sales</option>
                             <option>Operations</option>
                             <option>Other</option>
                           </select>
                           <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#888780]" />
                         </div>
                      </div>

                      {/* Preferences */}
                      <div className="grid gap-2">
                         <label className="text-[13px] font-semibold text-[#888780]">
                           What <a href="#" className="underline decoration-[#888780]/40 underline-offset-4 hover:decoration-[#1D9E75] transition-all text-[#1D9E75]">personal preferences</a> should Claiv consider in responses?
                         </label>
                         <p className="text-[12px] text-[#888780] -mt-1 mb-1">
                           Your preferences will apply to all conversations, within Claiv's guidelines.
                         </p>
                         <textarea 
                           className="salix-input p-4 min-h-[100px] text-[14px] resize-none"
                           placeholder="e.g. keep explanations brief and to the point"
                         />
                      </div>
                    </div>

                    {/* Security - Integrated from Account */}
                    <div className="flex flex-col gap-6 mt-6 pt-6 border-t border-[#f0f0ee]">
                      <h3 className="text-[14px] font-semibold text-[#111]">Security & Access</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 bg-white border border-[#ebebea] rounded-xl shadow-sm flex flex-col gap-4">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-[#F7F7F5] border border-[#ebebea] flex items-center justify-center">
                                 <Lock size={18} className="text-[#888780]" />
                              </div>
                              <div className="flex flex-col">
                                 <span className="text-[14px] font-semibold text-[#111]">Password</span>
                                 <span className="text-[12px] text-[#A3A199]">Last changed 3 months ago</span>
                              </div>
                           </div>
                           <button className="w-full py-2.5 bg-[#F7F7F5] hover:bg-[#ebebea] text-[#111] text-[13px] font-bold rounded-xl border border-[#ebebea] transition-all">
                              Change Password
                           </button>
                        </div>

                        <div className="p-6 bg-white border border-[#ebebea] rounded-xl shadow-sm flex flex-col gap-4">
                           <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 rounded-xl bg-[#1D9E75]/10 flex items-center justify-center border border-[#1D9E75]/20">
                                    <Shield size={18} className="text-[#1D9E75]" />
                                 </div>
                                 <div className="flex flex-col">
                                    <span className="text-[14px] font-semibold text-[#111]">Two-Factor (2FA)</span>
                                    <span className="text-[12px] text-[#1D9E75] font-medium">Enhanced security active</span>
                                 </div>
                              </div>
                              <div className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-[#ebebea] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1D9E75]"></div>
                              </div>
                           </div>
                           <p className="text-[11px] text-[#A3A199] leading-relaxed">
                              Add an extra layer of security to your account with a mobile authenticator app.
                           </p>
                        </div>
                      </div>
                    </div>

                    {/* Danger Zone - Integrated from Account */}
                    <div className="mt-8 p-8 bg-[#FFF1F1] border border-[#FFD9D9] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-6">
                       <div className="flex flex-col gap-1">
                          <h3 className="text-[16px] font-bold text-[#D93030]">Danger Zone</h3>
                          <p className="text-[13px] text-[#B84D4D] max-w-sm">
                             Deleting your account will permanently remove all your settings. This action cannot be undone.
                          </p>
                       </div>
                       <button className="px-6 py-3 bg-[#D93030] hover:bg-[#B32424] text-white text-[14px] font-bold rounded-2xl shadow-lg transition-all shadow-[#D93030]/20">
                          Delete Account
                       </button>
                    </div>
                  </section>
                )}

                {activeTab === "Notifications" && (
                  <section className="flex flex-col gap-8 pb-12 mb-12">
                    <h2 className="text-[20px] font-bold text-[#111]">Notifications</h2>
                    
                    {/* App Notifications Group */}
                    <div className="flex flex-col gap-6">
                      <h3 className="text-[14px] font-semibold text-[#111] uppercase tracking-wider text-[11px] opacity-50 px-0.5">App notifications</h3>
                      
                      <div className="flex flex-col gap-8">
                        {/* Response completions */}
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex flex-col gap-1">
                            <p className="text-[14px] font-semibold text-[#111]">Response completions</p>
                            <p className="text-[13px] text-[#888780] leading-relaxed">
                              Get notified when Claiv has finished a response. Most useful for long-running tasks like tool calls and Research.
                            </p>
                          </div>
                          <button 
                            onClick={() => toggleNotif('responseCompletions')}
                            className={`mt-1 shrink-0 w-9 h-5 rounded-full relative transition-colors border ${
                              notifStates.responseCompletions ? "bg-[#1D9E75] border-[#1D9E75]" : "bg-[#ebebea] border-[#D3D1C7]"
                            }`}
                          >
                            <div className={`absolute top-0.5 w-3.5 h-3.5 bg-white rounded-full shadow-sm transition-transform ${
                              notifStates.responseCompletions ? "translate-x-4.5" : "translate-x-0.5"
                            }`} />
                          </button>
                        </div>

                        {/* Dispatch Messages */}
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex flex-col gap-1">
                            <p className="text-[14px] font-semibold text-[#111]">Dispatch messages</p>
                            <p className="text-[13px] text-[#888780] leading-relaxed">
                              Get an alert when Claiv messages you in your active Dispatch threads.
                            </p>
                          </div>
                          <button 
                            onClick={() => toggleNotif('dispatchMessages')}
                            className={`mt-1 shrink-0 w-9 h-5 rounded-full relative transition-colors border ${
                              notifStates.dispatchMessages ? "bg-[#1D9E75] border-[#1D9E75]" : "bg-[#ebebea] border-[#D3D1C7]"
                            }`}
                          >
                            <div className={`absolute top-0.5 w-3.5 h-3.5 bg-white rounded-full shadow-sm transition-transform ${
                              notifStates.dispatchMessages ? "translate-x-4.5" : "translate-x-0.5"
                            }`} />
                          </button>
                        </div>

                        {/* Sound Effects */}
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex flex-col gap-1">
                            <p className="text-[14px] font-semibold text-[#111] flex items-center gap-2">
                              Sound Effects <Volume2 size={14} className="text-[#888780] opacity-50" />
                            </p>
                            <p className="text-[13px] text-[#888780] leading-relaxed">
                              Play a subtle sound when a message arrives or a task completes in the background.
                            </p>
                          </div>
                          <button 
                            onClick={() => toggleNotif('soundEffects')}
                            className={`mt-1 shrink-0 w-9 h-5 rounded-full relative transition-colors border ${
                              notifStates.soundEffects ? "bg-[#1D9E75] border-[#1D9E75]" : "bg-[#ebebea] border-[#D3D1C7]"
                            }`}
                          >
                            <div className={`absolute top-0.5 w-3.5 h-3.5 bg-white rounded-full shadow-sm transition-transform ${
                              notifStates.soundEffects ? "translate-x-4.5" : "translate-x-0.5"
                            }`} />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="h-px bg-[#ebebea] w-full mt-4" />

                    {/* Email Notifications Group */}
                    <div className="flex flex-col gap-6 pt-4">
                      <h3 className="text-[14px] font-semibold text-[#111] uppercase tracking-wider text-[11px] opacity-50 px-0.5">Email notifications</h3>
                      
                      <div className="flex flex-col gap-8">
                        {/* Weekly Recap */}
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex flex-col gap-1">
                            <p className="text-[14px] font-semibold text-[#111]">Weekly Recap</p>
                            <p className="text-[13px] text-[#888780] leading-relaxed">
                              Receive emotional and productivity insights from your Claiv interactions over the past week.
                            </p>
                          </div>
                          <button 
                            onClick={() => toggleNotif('weeklyRecap')}
                            className={`mt-1 shrink-0 w-9 h-5 rounded-full relative transition-colors border ${
                              notifStates.weeklyRecap ? "bg-[#1D9E75] border-[#1D9E75]" : "bg-[#ebebea] border-[#D3D1C7]"
                            }`}
                          >
                            <div className={`absolute top-0.5 w-3.5 h-3.5 bg-white rounded-full shadow-sm transition-transform ${
                              notifStates.weeklyRecap ? "translate-x-4.5" : "translate-x-0.5"
                            }`} />
                          </button>
                        </div>

                        {/* Feature Updates */}
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex flex-col gap-1">
                            <p className="text-[14px] font-semibold text-[#111]">Product & Feature Updates</p>
                            <p className="text-[13px] text-[#888780] leading-relaxed">
                              Stay ahead with the latest claiv news, model improvements, and architectural updates.
                            </p>
                          </div>
                          <button 
                            onClick={() => toggleNotif('featureUpdates')}
                            className={`mt-1 shrink-0 w-9 h-5 rounded-full relative transition-colors border ${
                              notifStates.featureUpdates ? "bg-[#1D9E75] border-[#1D9E75]" : "bg-[#ebebea] border-[#D3D1C7]"
                            }`}
                          >
                            <div className={`absolute top-0.5 w-3.5 h-3.5 bg-white rounded-full shadow-sm transition-transform ${
                              notifStates.featureUpdates ? "translate-x-4.5" : "translate-x-0.5"
                            }`} />
                          </button>
                        </div>

                        {/* Security Alerts */}
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex flex-col gap-1">
                            <p className="text-[14px] font-semibold text-[#111]">Security Alerts</p>
                            <p className="text-[13px] text-[#888780] leading-relaxed">
                              Get notified regarding login attempts from new devices or critical changes to your API keys.
                            </p>
                          </div>
                          <button 
                            onClick={() => toggleNotif('securityAlerts')}
                            className={`mt-1 shrink-0 w-9 h-5 rounded-full relative transition-colors border ${
                              notifStates.securityAlerts ? "bg-[#1D9E75] border-[#1D9E75]" : "bg-[#ebebea] border-[#D3D1C7]"
                            }`}
                          >
                            <div className={`absolute top-0.5 w-3.5 h-3.5 bg-white rounded-full shadow-sm transition-transform ${
                              notifStates.securityAlerts ? "translate-x-4.5" : "translate-x-0.5"
                            }`} />
                          </button>
                        </div>

                        {/* Credit Thresholds */}
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex flex-col gap-1">
                            <p className="text-[14px] font-semibold text-[#111]">Credit Usage Alerts</p>
                            <p className="text-[13px] text-[#888780] leading-relaxed">
                              Receive an email when your usage balance falls below your specified threshold.
                            </p>
                          </div>
                          <button 
                            onClick={() => toggleNotif('creditThresholds')}
                            className={`mt-1 shrink-0 w-9 h-5 rounded-full relative transition-colors border ${
                              notifStates.creditThresholds ? "bg-[#1D9E75] border-[#1D9E75]" : "bg-[#ebebea] border-[#D3D1C7]"
                            }`}
                          >
                            <div className={`absolute top-0.5 w-3.5 h-3.5 bg-white rounded-full shadow-sm transition-transform ${
                              notifStates.creditThresholds ? "translate-x-4.5" : "translate-x-0.5"
                            }`} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {activeTab === "Connectors" && (
                  <section className="flex flex-col gap-8 pb-12 mb-12">
                    <div className="w-full flex flex-row gap-x-8 gap-y-3 justify-between items-center">
                      <div className="flex flex-col gap-1.5 min-w-0">
                        <h2 className="text-[20px] font-bold text-[#111]">Connectors</h2>
                        <p className="text-[14px] text-[#888780]">Allow Claiv to reference other apps and services for more context.</p>
                      </div>
                      <button className="px-5 py-2.5 bg-[#F7F7F5] hover:bg-[#ebebea] text-[#111] text-[13px] font-semibold rounded-[10px] border border-[#ebebea] transition-all shrink-0">
                        Browse connectors
                      </button>
                    </div>

                    <div className="flex flex-col gap-0 mt-2">
                      {[
                        { name: "Google Drive", connected: true, url: "https://drive.google.com" },
                        { name: "Google Docs", connected: false, url: "https://docs.google.com" },
                        { name: "Google Sheets", connected: false, url: "https://sheets.google.com" },
                        { name: "Notion", connected: true, url: "https://notion.so" },
                        { name: "Slack", connected: false, url: "https://slack.com" },
                        { name: "Gmail", connected: false, url: "https://mail.google.com" },
                        { name: "GitHub", connected: false, url: null },
                        { name: "OneDrive", connected: false, url: "https://onedrive.live.com" },
                        { name: "Jira", connected: false, url: "https://jira.atlassian.com" },
                        { name: "Confluence", connected: false, url: "https://confluence.atlassian.com" },
                        { name: "Dropbox", connected: false, url: "https://dropbox.com" },
                      ].map((connector) => (
                        <div 
                          key={connector.name} 
                          className="w-full min-w-0 flex flex-row gap-x-6 gap-y-3 justify-between items-center py-4 border-b border-[#f0f0ee] last:border-b-0"
                        >
                          <div className="w-full min-w-0 flex flex-row gap-4 items-center">
                            <div className={`shrink-0 bg-white border border-[#ebebea] shadow-sm flex items-center justify-center w-[42px] h-[42px] rounded-xl overflow-hidden ${!connector.connected ? "opacity-50" : ""}`}>
                              {connector.url ? (
                                <img 
                                  className="object-contain w-[24px] h-[24px]" 
                                  src={`https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${connector.url}&size=64`} 
                                  alt={connector.name}
                                />
                              ) : (
                                <svg className="text-[#111]" width="24" height="24" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M8.00536 1.4C4.35271 1.4 1.3999 4.425 1.3999 8.167c0 2.992 1.892 5.524 4.517 6.42.328.068.448-.179.448-.358 0-.157-.011-.695-.011-1.255-1.837.404-2.22-.81-2.22-.81-.295-.784-.733-.987-.733-.987-.601-.414-.044-.414-.044-.414.667.045 1.017.695 1.017.695.59 1.031 1.542.74 1.924.56.055-.449.23-.75.416-.919-1.466-.168-3.008-.75-3.008-3.35 0-.739.262-1.345.678-1.815-.066-.168-.296-.86.065-1.79 0 0 .558-.18 1.815.694a6.17 6.17 0 011.652-.225c.558 0 1.126.079 1.651.225 1.258-.875 1.816-.695 1.816-.695.36.93.131 1.623.065 1.79.428.471.679 1.077.679 1.816 0 2.6-1.542 3.17-3.018 3.34.24.213.448.616.448 1.255 0 .907-.011 1.636-.011 1.86 0 .179.12.39.449.358 2.624-.896 4.517-3.429 4.517-6.42C14.611 4.425 11.647 1.4 8.005 1.4Z" /></svg>
                              )}
                            </div>
                            <div className="flex flex-col gap-0.5 min-w-0">
                              <button type="button" className="text-left font-semibold text-[14px] text-[#111] hover:underline decoration-1 underline-offset-4">
                                {connector.name}
                              </button>
                            </div>
                          </div>
                          <div className="flex gap-2 items-center shrink-0">
                            {connector.connected ? (
                              <>
                                <button className="px-4 py-2 bg-[#1D9E75] hover:bg-[#0F6E56] text-white text-[13px] font-semibold rounded-lg transition-all">
                                  Connected
                                </button>
                                <div className="relative">
                                  <button 
                                    onClick={(e) => toggleMenu(connector.name, e)}
                                    className={`p-2 transition-all rounded-lg border ${
                                      openMenuId === connector.name 
                                      ? "bg-[#ebebea] border-[#D3D1C7] text-[#111]" 
                                      : "bg-[#F7F7F5] border-[#ebebea] text-[#111] hover:bg-[#ebebea]"
                                    }`}
                                  >
                                    <MoreHorizontal size={16} />
                                  </button>
                                  {openMenuId === connector.name && (
                                    <div 
                                      ref={menuRef}
                                      className="absolute right-0 top-[110%] p-1.5 z-[100] bg-white border border-[#ebebea] backdrop-blur-xl rounded-xl min-w-[175px] text-[#888780] shadow-[0px_4px_12px_rgba(0,0,0,0.08)] overflow-hidden"
                                    >
                                      <div role="menuitem" className="font-medium text-[13px] min-h-8 px-2.5 py-2 rounded-lg cursor-pointer flex items-center outline-none select-none hover:bg-[#F7F7F5] hover:text-[#111] transition-colors">
                                        View details
                                      </div>
                                      <div role="menuitem" className="font-medium text-[13px] min-h-8 px-2.5 py-2 rounded-lg cursor-pointer flex items-center outline-none select-none hover:bg-[#FFF5F5] text-[#FF5F52] transition-colors">
                                        Disconnect
                                      </div>
                                      <div role="menuitem" className="font-medium text-[13px] min-h-8 px-2.5 py-2 rounded-lg cursor-pointer flex items-center outline-none select-none hover:bg-[#FFF5F5] text-[#FF5F52] transition-colors">
                                        Remove
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </>
                            ) : (
                              <button className="px-5 py-2 bg-[#F7F7F5] hover:bg-[#ebebea] text-[#111] text-[13px] font-semibold rounded-lg border border-[#ebebea] transition-all">
                                Connect
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-6 border-t border-[#ebebea]">
                      <button 
                        onClick={() => setShowAddConnectorModal(true)}
                        className="px-5 py-2.5 bg-[#F7F7F5] hover:bg-[#ebebea] text-[#111] text-[13px] font-semibold rounded-[10px] border border-[#ebebea] transition-all w-full md:w-auto"
                      >
                        Add custom connector
                      </button>
                    </div>
                  </section>
                )}

                {/* Modal Overlay: Add Custom Connector */}
                {showAddConnectorModal && (
                  <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
                    <div 
                      className="absolute inset-0 bg-[#111]/40 backdrop-blur-md animate-in fade-in duration-300"
                      onClick={() => setShowAddConnectorModal(false)}
                    />
                    <div className="relative w-full max-w-[536px] bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-[#ebebea]">
                      <div className="p-6 sm:p-8">
                        <div className="flex items-center justify-between mb-8">
                          <div className="flex items-center gap-3">
                            <h2 className="text-[20px] font-bold text-[#111]">Add custom connector</h2>
                            <span className="bg-[#1D9E75]/10 text-[#1D9E75] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#1D9E75]/20">BETA</span>
                          </div>
                          <button 
                            onClick={() => setShowAddConnectorModal(false)}
                            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#F7F7F5] transition-colors group"
                          >
                            <svg className="w-5 h-5 text-[#888780] group-hover:text-[#111]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                          </button>
                        </div>

                        <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                          <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                              <label className="text-[13px] font-semibold text-[#111]">Connector Name</label>
                              <input 
                                className="bg-[#F7F7F5] border border-[#ebebea] hover:border-[#D3D1C7] transition-all placeholder:text-[#A3A199] text-[14px] h-11 px-4 rounded-xl outline-none focus:border-[#1D9E75] focus:ring-4 focus:ring-[#1D9E75]/5 shadow-sm" 
                                placeholder="e.g., Internal Wiki" 
                              />
                            </div>
                            <div className="flex flex-col gap-2">
                              <label className="text-[13px] font-semibold text-[#111]">Remote MCP server URL</label>
                              <input 
                                className="bg-[#F7F7F5] border border-[#ebebea] hover:border-[#D3D1C7] transition-all placeholder:text-[#A3A199] text-[14px] h-11 px-4 rounded-xl outline-none focus:border-[#1D9E75] focus:ring-4 focus:ring-[#1D9E75]/5 shadow-sm" 
                                placeholder="https://mcp.yourdomain.com" 
                              />
                            </div>
                          </div>

                          <div>
                            <button 
                              type="button" 
                              onClick={() => setShowAdvanced(!showAdvanced)}
                              className="flex items-center gap-2 text-[13px] font-medium text-[#888780] hover:text-[#111] transition-colors w-fit py-1.5"
                            >
                              <div className={`transition-transform duration-200 ${showAdvanced ? "" : "-rotate-90"}`}>
                                <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor"><path d="M10 6a.5.5 0 0 1 .289.092l.077.068 6.5 7a.5.5 0 1 1-.732.68L10 7.233 3.866 13.84l-.076.067a.5.5 0 0 1-.718-.667l.062-.08 6.5-7A.5.5 0 0 1 10 6"></path></svg>
                              </div>
                              Advanced settings
                            </button>
                            
                            {showAdvanced && (
                              <div className="mt-2 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                <input 
                                  className="bg-[#F7F7F5] border border-[#ebebea] hover:border-[#D3D1C7] transition-all placeholder:text-[#A3A199] text-[14px] h-11 px-4 rounded-xl outline-none focus:border-[#1D9E75] focus:ring-4 focus:ring-[#1D9E75]/5 shadow-sm" 
                                  placeholder="OAuth Client ID (optional)" 
                                />
                                <input 
                                  type="password"
                                  className="bg-[#F7F7F5] border border-[#ebebea] hover:border-[#D3D1C7] transition-all placeholder:text-[#A3A199] text-[14px] h-11 px-4 rounded-xl outline-none focus:border-[#1D9E75] focus:ring-4 focus:ring-[#1D9E75]/5 shadow-sm" 
                                  placeholder="OAuth Client Secret (optional)" 
                                />
                              </div>
                            )}
                          </div>

                          <div className="mt-2 text-[#A3A199] text-[12px] leading-relaxed">
                            <p>Only use connectors from developers you trust. Claiv does not control which tools developers make available and cannot verify that they will work as intended.</p>
                            <p className="mt-3 italic">
                              Building an MCP server? <a href="#" className="underline underline-offset-[3px] decoration-[#A3A199]/40 hover:text-[#111] transition-all">Report issues and subscribe to updates here</a>
                            </p>
                          </div>

                          <div className="mt-4 flex flex-col gap-3 sm:flex-row justify-end border-t border-[#ebebea] pt-8">
                            <button 
                              type="button"
                              onClick={() => setShowAddConnectorModal(false)}
                              className="px-6 py-3 bg-[#F7F7F5] hover:bg-[#ebebea] text-[#111] text-[14px] font-semibold rounded-2xl border border-[#ebebea] transition-all"
                            >
                              Cancel
                            </button>
                            <button 
                              className="px-6 py-3 bg-[#1D9E75] hover:bg-[#0F6E56] text-white text-[14px] font-semibold rounded-2xl shadow-lg transition-all shadow-[#1D9E75]/20"
                              disabled
                            >
                              Add Connector
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                )}

                {/* Modal Overlay: Connect AI Provider */}
                {showConnectAIModal && connectingModel && (
                  <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
                    <div 
                      className="absolute inset-0 bg-[#111]/40 backdrop-blur-md animate-in fade-in duration-300"
                      onClick={() => { setShowConnectAIModal(false); setConnectingModel(null); }}
                    />
                    <div className="relative w-full max-w-[480px] bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-[#ebebea]">
                       <div className="p-6 sm:p-8">
                         <div className="flex flex-col items-center text-center mb-8">
                           <div className="w-16 h-16 rounded-2xl bg-[#F7F7F5] border border-[#ebebea] flex items-center justify-center p-3.5 shadow-sm mb-4">
                              <img 
                                src={`https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${aiProviderMetadata[connectingModel]?.domain}&size=128`} 
                                className="w-full h-full object-contain"
                                alt={connectingModel}
                              />
                           </div>
                           <h2 className="text-[22px] font-bold text-[#111]">Link {connectingModel}</h2>
                           <p className="mt-1.5 text-[14px] text-[#888780] max-w-[320px]">
                             Enter your API credentials to enable {connectingModel} capabilities in Claiv.
                           </p>
                         </div>

                         <div className="flex flex-col gap-6" onSubmit={(e) => { e.preventDefault(); confirmConnectAI(); }}>
                            <div className="flex flex-col gap-2">
                               <div className="flex items-center justify-between">
                                 <label className="text-[13px] font-semibold text-[#111]">API Key</label>
                                 <a href="#" className="text-[11px] text-[#1D9E75] hover:underline font-medium">Get API Key</a>
                               </div>
                               <input 
                                 type="password"
                                 value={aiApiKey}
                                 onChange={(e) => setAiApiKey(e.target.value)}
                                 className="bg-[#F7F7F5] border border-[#ebebea] hover:border-[#D3D1C7] transition-all placeholder:text-[#A3A199] text-[14px] h-12 px-4 rounded-xl outline-none focus:border-[#1D9E75] focus:ring-4 focus:ring-[#1D9E75]/5 shadow-sm font-mono" 
                                 placeholder={aiProviderMetadata[connectingModel]?.placeholder}
                                 autoFocus
                               />
                            </div>

                            <div className="p-4 rounded-2xl bg-[#F7F7F5]/80 border border-[#ebebea] flex gap-3.5">
                               <Info size={16} className="shrink-0 text-[#888780] mt-0.5" />
                               <p className="text-[12px] text-[#888780] leading-relaxed">
                                 Your key is encrypted and stored securely. Claiv only uses this key to process requests you explicitly send to {connectingModel}.
                               </p>
                            </div>

                            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                               <button 
                                 type="button"
                                 onClick={() => { setShowConnectAIModal(false); setConnectingModel(null); }}
                                 className="flex-1 px-6 py-3 bg-white hover:bg-[#F7F7F5] text-[#111] text-[14px] font-semibold rounded-2xl border border-[#ebebea] transition-all"
                               >
                                 Cancel
                               </button>
                               <button 
                                 type="button"
                                 onClick={confirmConnectAI}
                                 disabled={!aiApiKey}
                                 className="flex-1 px-6 py-3 bg-[#1D9E75] hover:bg-[#0F6E56] text-white text-[14px] font-semibold rounded-2xl shadow-lg transition-all shadow-[#1D9E75]/20 disabled:opacity-50 disabled:shadow-none"
                               >
                                 Connect Provider
                               </button>
                            </div>
                         </div>
                       </div>
                    </div>
                  </div>
                )}

                {activeTab === "Models" && (
                  <section className="flex flex-col gap-8 pb-12 mb-12">
                    <div className="flex flex-col gap-1.5">
                      <h2 className="text-[20px] font-bold text-[#111]">AI Providers</h2>
                      <p className="text-[14px] text-[#888780]">Choose which models Claiv uses to process requests, generate code, and analyze data.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      {Object.entries(models).map(([name, data]) => (
                        <div key={name} className="flex items-center justify-between p-5 bg-[#F7F7F5] border border-[#ebebea] rounded-2xl hover:border-[#D3D1C7] transition-all group">
                          <div className="flex items-center gap-4">
                            <div className={`shrink-0 w-11 h-11 rounded-xl bg-white border border-[#ebebea] flex items-center justify-center p-2.5 shadow-sm transition-opacity ${!data.enabled ? "opacity-40" : ""}`}>
                               <img 
                                 src={`https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${aiProviderMetadata[name]?.domain || (name.toLowerCase() + '.ai')}&size=64`} 
                                 className="w-full h-full object-contain"
                                 alt={name}
                               />
                            </div>
                            <div className="flex flex-col gap-0.5">
                              <div className="flex items-center gap-2">
                                <span className={`text-[15px] font-semibold transition-colors ${data.enabled ? "text-[#111]" : "text-[#888780]"}`}>{name}</span>
                                {['Anthropic', 'Gemini'].includes(name) && (
                                  <span className="text-[10px] font-bold text-[#1D9E75] bg-[#1D9E75]/10 px-2 py-0.5 rounded-md border border-[#1D9E75]/20 uppercase tracking-tight">Active Default</span>
                                )}
                              </div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-[12px] text-[#A3A199] font-medium uppercase tracking-wider text-[10px]">
                                  {data.enabled ? "System: Online" : "System: Standby"}
                                </span>
                                {data.enabled && data.snippet && (
                                  <>
                                    <span className="w-1 h-1 rounded-full bg-[#D3D1C7]" />
                                    <span className="text-[11px] font-mono text-[#888780] bg-white border border-[#ebebea] px-1.5 py-0.5 rounded-md shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]">{data.snippet}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          <button 
                            onClick={() => handleToggleModel(name)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 focus:outline-none ${data.enabled ? "bg-[#1D9E75]" : "bg-[#D3D1C7]"}`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-300 ${data.enabled ? "translate-x-6" : "translate-x-1"}`} />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="mt-2 p-6 rounded-2xl bg-[#F7F7F5] border border-[#ebebea] flex gap-4 min-w-0">
                      <div className="shrink-0 w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-[#ebebea] shadow-sm">
                        <Sparkles size={18} className="text-[#1D9E75]" />
                      </div>
                      <div className="flex flex-col gap-1 min-w-0">
                        <h4 className="text-[14px] font-semibold text-[#111]">Multimodal capabilities</h4>
                        <p className="text-[12px] text-[#888780] leading-relaxed">
                          Claiv connects multiple brains for the best reasoning. Enabling more providers allows for broader capability coverage across text, vision, and long-context processing.
                        </p>
                      </div>
                    </div>
                  </section>
                )}

                {activeTab === "Appearance" && (
                  <>
                    <section className="flex flex-col gap-8 border-b border-[#ebebea] pb-12 mb-12">
                      <h2 className="text-[20px] font-bold text-[#111]">Appearance</h2>
                      <div className="flex flex-col gap-8">
                        {/* Color Mode */}
                        <div>
                           <h3 className="text-[14px] font-semibold text-[#111] mb-5">Color mode</h3>
                           <div className="flex gap-4">
                             {["Light", "Auto", "Dark"].map((mode) => (
                               <button 
                                 key={mode}
                                 onClick={() => setAppearance(mode)}
                                 className={`flex-1 group transition-all duration-300 ${appearance === mode ? "" : "opacity-70 hover:opacity-100"}`}
                               >
                                 <div className={`aspect-[4/3] rounded-2xl border-2 transition-all overflow-hidden relative ${
                                   appearance === mode ? "border-[#1D9E75] shadow-md scale-[1.02]" : "border-[#ebebea] hover:border-[#D3D1C7]"
                                 }`}>
                                   <div className={`w-full h-full ${
                                     mode === "Light" ? "bg-white" : mode === "Dark" ? "bg-[#111]" : "bg-gradient-to-br from-white to-[#111]"
                                   }`} />
                                 </div>
                                 <p className="mt-3 text-center text-[13px] font-medium text-[#888780] group-hover:text-[#111] transition-colors">{mode}</p>
                               </button>
                             ))}
                           </div>
                        </div>

                        {/* Background Animation */}
                        <div>
                           <h3 className="text-[14px] font-semibold text-[#111] mb-5">Background animation</h3>
                           <div className="flex gap-4">
                             {["Enabled", "Auto", "Disabled"].map((mode) => (
                               <button 
                                 key={mode}
                                 onClick={() => setBgAnimation(mode)}
                                 className={`flex-1 group transition-all duration-300 ${bgAnimation === mode ? "" : "opacity-70 hover:opacity-100"}`}
                               >
                                  <div className={`aspect-[4/3] rounded-2xl border-2 transition-all flex items-center justify-center gap-1.5 ${
                                    bgAnimation === mode ? "border-[#1D9E75] bg-[#F7F7F5] shadow-sm scale-[1.02]" : "border-[#ebebea] bg-white group-hover:border-[#D3D1C7]"
                                  }`}>
                                    <div className={`w-2 h-2 rounded-full ${bgAnimation === mode ? "bg-[#1D9E75]" : "bg-[#ebebea] group-hover:bg-[#888780]"}`} />
                                    <div className={`w-2 h-2 rounded-full ${bgAnimation === mode ? "bg-[#1D9E75]" : "bg-[#ebebea] group-hover:bg-[#888780]"}`} />
                                    <div className={`w-2 h-2 rounded-full ${bgAnimation === mode ? "bg-[#1D9E75]" : "bg-[#ebebea] group-hover:bg-[#888780]"}`} />
                                  </div>
                                  <p className="mt-3 text-center text-[13px] font-medium text-[#888780] group-hover:text-[#111] transition-colors">{mode}</p>
                               </button>
                             ))}
                           </div>
                        </div>

                        {/* Chat Font */}
                        <div>
                           <h3 className="text-[14px] font-semibold text-[#111] mb-5">Chat font</h3>
                           <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                             {["Default", "Sans", "System", "Dyslexic"].map((font) => (
                               <button 
                                 key={font}
                                 onClick={() => setChatFont(font)}
                                 className={`group transition-all duration-300 ${chatFont === font ? "" : "opacity-70 hover:opacity-100"}`}
                               >
                                  <div className={`aspect-[4/3] rounded-2xl border-2 transition-all flex items-center justify-center ${
                                    chatFont === font ? "border-[#1D9E75] bg-[#F7F7F5] shadow-sm scale-[1.02]" : "border-[#ebebea] bg-white group-hover:border-[#D3D1C7]"
                                  }`}>
                                    <span className={`text-[20px] ${font === "Default" ? "font-serif" : "font-sans"} text-[#111]`}>Aa</span>
                                  </div>
                                  <p className="mt-3 text-center text-[13px] font-medium text-[#888780] group-hover:text-[#111] transition-colors">
                                    {font === "Dyslexic" ? "Dyslexic friendly" : font}
                                  </p>
                               </button>
                             ))}
                           </div>
                        </div>
                      </div>
                    </section>

                    <section className="flex flex-col gap-8 pb-12 mb-12">
                      <h2 className="text-[20px] font-bold text-[#111]">Voice settings</h2>
                      <div>
                        <p className="text-[14px] font-semibold text-[#111] mb-5">Voice</p>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                          {["Buttery", "Airy", "Mellow", "Glassy", "Rounded"].map((v) => (
                            <button 
                              key={v}
                              onClick={() => setVoice(v)}
                              className={`h-20 flex flex-col items-center justify-center p-4 rounded-xl text-[13px] font-medium transition-all shadow-sm border ${
                                voice === v 
                                  ? "border-[#1D9E75] bg-[#F7F7F5] text-[#111] scale-[1.02]" 
                                  : "border-[#ebebea] bg-white text-[#888780] hover:border-[#D3D1C7] hover:text-[#111]"
                              }`}
                            >
                              {v}
                            </button>
                          ))}
                        </div>
                      </div>
                    </section>
                  </>
                )}



                {activeTab === "Billing" && (
                  <section className="flex flex-col gap-10 pb-12 mb-12">
                    <div className="flex flex-col gap-1.5">
                      <h2 className="text-[20px] font-bold text-[#111]">Billing & Usage</h2>
                      <p className="text-[14px] text-[#888780]">Manage your subscription, compute credits, and billing information.</p>
                    </div>

                    {/* Subscription Card */}
                    <div className="bg-[#F7F7F5] border border-[#ebebea] rounded-[24px] overflow-hidden">
                      <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2.5">
                            <span className="text-[18px] font-bold text-[#111]">Claiv Pro</span>
                            <span className="text-[10px] font-bold text-[#1D9E75] bg-[#1D9E75]/10 px-2 py-0.5 rounded-full border border-[#1D9E75]/20 uppercase">Active</span>
                          </div>
                          <p className="text-[14px] text-[#888780]">Next billing date is <span className="text-[#111] font-semibold">May 17, 2026</span></p>
                        </div>
                        <div className="flex items-center gap-4">
                           <div className="text-right hidden sm:block">
                             <p className="text-[24px] font-bold text-[#111] leading-none">$20</p>
                             <p className="text-[12px] text-[#A3A199] mt-1">per month</p>
                           </div>
                           <button className="px-6 py-3 bg-[#111] hover:bg-[#222] text-white text-[14px] font-semibold rounded-2xl shadow-lg transition-all shadow-black/10">
                             Manage Plan
                           </button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Compute Credits */}
                      <div className="p-6 bg-white border border-[#ebebea] rounded-[24px] shadow-sm flex flex-col gap-5">
                         <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                               <Sparkles size={16} className="text-[#1D9E75]" />
                               <span className="text-[14px] font-semibold text-[#111]">Compute Credits</span>
                            </div>
                            <button className="text-[12px] font-bold text-[#1D9E75] hover:underline">Buy more</button>
                         </div>
                         <div className="flex flex-col gap-3">
                            <div className="flex justify-between items-end">
                               <span className="text-[24px] font-bold text-[#111]">1,240 <span className="text-[14px] text-[#888780] font-medium">/ 1,500</span></span>
                               <span className="text-[12px] text-[#A3A199] font-medium uppercase tracking-wider">82% Used</span>
                            </div>
                            <div className="h-2 w-full bg-[#F7F7F5] rounded-full overflow-hidden">
                               <div className="h-full bg-[#1D9E75] rounded-full transition-all duration-1000" style={{ width: '82%' }} />
                            </div>
                         </div>
                         <p className="text-[12px] text-[#888780] leading-relaxed">
                           Credits are consumed by {Object.entries(models).filter(([_,v]) => v.enabled).map(([k])=>k).join(', ')} models. Resetting in 28 days.
                         </p>
                      </div>

                      {/* Payment Method */}
                      <div className="p-6 bg-white border border-[#ebebea] rounded-[24px] shadow-sm flex flex-col gap-5">
                         <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                               <CreditCard size={16} className="text-[#888780]" />
                               <span className="text-[14px] font-semibold text-[#111]">Payment Method</span>
                            </div>
                            <button className="text-[12px] font-bold text-[#1D9E75] hover:underline">Edit</button>
                         </div>
                         <div className="flex items-center gap-4 py-1">
                            <div className="w-12 h-8 bg-gradient-to-br from-[#111] to-[#333] rounded-md flex items-center justify-center text-white text-[10px] font-bold italic tracking-wider">VISA</div>
                            <div className="flex flex-col">
                               <span className="text-[14px] font-semibold text-[#111]">Visa ending in 4242</span>
                               <span className="text-[12px] text-[#A3A199]">Expires 04/28</span>
                            </div>
                         </div>
                         <div className="mt-auto pt-2 border-t border-[#f0f0ee]">
                            <p className="text-[11px] text-[#A3A199]">Invoice will be sent to <span className="text-[#111]">billing@claiv.ai</span></p>
                         </div>
                      </div>
                    </div>

                    {/* Billing History */}
                    <div className="flex flex-col gap-4">
                      <h3 className="text-[14px] font-semibold text-[#111]">Billing History</h3>
                      <div className="border border-[#ebebea] rounded-2xl overflow-hidden bg-white shadow-sm">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-[#F7F7F5] border-b border-[#ebebea]">
                              <th className="px-6 py-3 text-[11px] font-bold text-[#888780] uppercase tracking-wider">Date</th>
                              <th className="px-6 py-3 text-[11px] font-bold text-[#888780] uppercase tracking-wider">Amount</th>
                              <th className="px-6 py-3 text-[11px] font-bold text-[#888780] uppercase tracking-wider text-right">Receipt</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#f0f0ee]">
                            {[
                              { date: "Apr 17, 2026", amount: "$20.00" },
                              { date: "Mar 17, 2026", amount: "$20.00" },
                              { date: "Feb 17, 2026", amount: "$20.00" },
                            ].map((invoice, i) => (
                              <tr key={i} className="hover:bg-[#F7F7F5]/30 transition-colors">
                                <td className="px-6 py-4 text-[13px] text-[#111] font-medium">{invoice.date}</td>
                                <td className="px-6 py-4 text-[13px] text-[#888780]">{invoice.amount}</td>
                                <td className="px-6 py-4 text-[13px] text-right">
                                  <button className="text-[#1D9E75] hover:underline font-semibold flex items-center gap-1.5 ml-auto">
                                    <ExternalLink size={12} />
                                    <span>View PDF</span>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </section>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </GlobalShell>
  );
}
