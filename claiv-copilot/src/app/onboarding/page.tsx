"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, ShieldCheck, Database, Zap, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

const steps = [
  { id: 'org', title: 'Organization', icon: Building2, desc: 'Set up your company workspace.' },
  { id: 'security', title: 'Security', icon: ShieldCheck, desc: 'Configure RLS and role-based access.' },
  { id: 'ingest', title: 'Ingestion', icon: Database, desc: 'Seed your knowledge corpus.' },
  { id: 'deploy', title: 'Deploy', icon: Zap, desc: 'Finalize your Copilot instance.' }
];

export default function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [orgName, setOrgName] = useState('');

  const next = () => currentStep < steps.length - 1 && setCurrentStep(s => s + 1);
  const back = () => currentStep > 0 && setCurrentStep(s => s - 1);

  return (
    <div className="min-h-screen bg-white text-[#1a1a18] font-sans flex items-center justify-center p-6">

      <div className="max-w-xl w-full">
        {/* Brand */}
        <div className="flex items-center gap-2 mb-10 justify-center">
          <div className="w-7 h-7 rounded-lg bg-[#0F6E56] flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-[#9FE1CB]"></div>
          </div>
          <span className="text-[15px] font-semibold tracking-tight">Claiv</span>
        </div>

        {/* Step Indicator */}
        <div className="flex justify-between mb-10 relative px-2">
           <div className="absolute top-1/2 left-0 w-full h-0.5 bg-[#f0f0ee] -translate-y-1/2 -z-10"></div>
           <div 
             className="absolute top-1/2 left-0 h-0.5 bg-[#1D9E75] transition-all duration-500 -translate-y-1/2 -z-10" 
             style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
           ></div>
           {steps.map((s, i) => {
             const Icon = s.icon;
             const active = i <= currentStep;
             return (
               <div key={s.id} className="flex flex-col items-center gap-1.5">
                 <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${active ? 'bg-white border-[#1D9E75] text-[#0F6E56]' : 'bg-white border-[#ebebea] text-[#D3D1C7]'}`}>
                   {i < currentStep ? <CheckCircle2 size={18} /> : <Icon size={16} />}
                 </div>
                 <span className={`text-[10px] uppercase tracking-[0.05em] font-medium ${active ? 'text-[#0F6E56]' : 'text-[#D3D1C7]'}`}>{s.title}</span>
               </div>
             )
           })}
        </div>

        {/* Card Content */}
        <div className="bg-white border border-[#ebebea] rounded-[16px] p-8 min-h-[360px] flex flex-col justify-between shadow-sm">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-1"
            >
              <h2 className="text-[26px] font-semibold tracking-[-0.02em] text-[#111] mb-1">{steps[currentStep].title} Setup</h2>
              <p className="text-[14px] text-[#888780] mb-8">{steps[currentStep].desc}</p>

              {currentStep === 0 && (
                <div className="space-y-4">
                  <label className="text-[13px] font-medium text-[#111]">Organization Name</label>
                  <input 
                    type="text" 
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    placeholder="e.g. Acme Corp"
                    className="salix-input w-full"
                  />
                  <div className="p-3.5 bg-[#E1F5EE] border border-[#9FE1CB] rounded-xl flex items-center gap-2.5">
                     <ShieldCheck size={16} className="text-[#0F6E56] shrink-0" />
                     <p className="text-[12px] text-[#085041]">Every organization gets a unique encrypted vector namespace.</p>
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-[#F7F7F5] border border-[#ebebea] rounded-xl">
                    <div>
                      <h4 className="font-semibold text-[14px] text-[#111]">Strict RLS Isolation</h4>
                      <p className="text-[11px] text-[#888780] uppercase tracking-[0.04em]">PostgreSQL Protected</p>
                    </div>
                    <div className="w-10 h-5 bg-[#0F6E56] rounded-full relative">
                      <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#F7F7F5] border border-[#ebebea] rounded-xl">
                    <div>
                      <h4 className="font-semibold text-[14px] text-[#111]">Departmental Scoping</h4>
                      <p className="text-[11px] text-[#888780] uppercase tracking-[0.04em]">HR / ENG / FIN Separated</p>
                    </div>
                    <div className="w-10 h-5 bg-[#0F6E56] rounded-full relative">
                      <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                   <div className="grid grid-cols-2 gap-3">
                      {['PDF', 'Markdown', 'Web Index', 'Slack Logs'].map(t => (
                        <div key={t} className="p-4 border border-[#ebebea] bg-white rounded-[14px] text-center hover:border-[#1D9E75] hover:shadow-md transition-all cursor-pointer group">
                           <Database size={18} className="mx-auto mb-2 text-[#D3D1C7] group-hover:text-[#0F6E56] transition-colors" />
                           <span className="text-[13px] font-medium text-[#111]">{t}</span>
                        </div>
                      ))}
                   </div>
                   <p className="text-center text-[12px] text-[#888780]">Connect your company sources to begin vectorized indexing.</p>
                </div>
              )}

              {currentStep === 3 && (
                <div className="flex flex-col items-center justify-center py-8">
                   <div className="w-16 h-16 rounded-full bg-[#E1F5EE] border-2 border-[#1D9E75] flex items-center justify-center mb-5">
                      <Zap size={28} className="text-[#0F6E56]" />
                   </div>
                   <h3 className="text-[19px] font-semibold text-[#111] mb-2">Ready to Launch</h3>
                   <p className="text-[#888780] text-center text-[14px] max-w-xs">Your Copilot instance is configured{orgName ? ` for ${orgName}` : ''}. Proceed to dashboard.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex gap-3 mt-10">
            <button 
              onClick={back}
              disabled={currentStep === 0}
              className={`flex-1 py-3 rounded-[10px] font-medium text-[14px] flex items-center justify-center gap-2 transition-all border ${currentStep === 0 ? 'bg-[#F7F7F5] text-[#D3D1C7] border-[#ebebea] cursor-not-allowed' : 'bg-white hover:bg-[#F1EFE8] text-[#5F5E5A] border-[#ddd]'}`}
            >
              <ArrowLeft size={16} /> Back
            </button>
            <button 
              onClick={currentStep === steps.length - 1 ? () => window.location.href='/dashboard' : next}
              className="flex-[2] py-3 bg-[#0F6E56] text-white rounded-[10px] font-medium text-[14px] flex items-center justify-center gap-2 hover:bg-[#085041] transition-all active:scale-[0.98]"
            >
              {currentStep === steps.length - 1 ? 'Go to Dashboard' : 'Continue'} <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
