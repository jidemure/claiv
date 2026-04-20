"use client";
import React from 'react';
import { BarChart3, TrendingUp, Users, Database, ShieldCheck, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import GlobalShell from '@/components/layout/GlobalShell';

const fadeInUp: any = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function AnalyticsDashboard() {
  return (
    <GlobalShell>
      <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#F7F7F5] relative z-10 w-full">
        <motion.div 
          initial="hidden" animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="w-full relative z-10 max-w-5xl"
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-[26px] font-semibold tracking-[-0.02em] text-[#111] flex items-center gap-3">
                Analytics & ROI
                <span className="salix-badge bg-[#EEEDFE] text-[#3C3489] text-[11px]">Super Admin</span>
              </h1>
              <p className="text-[14px] text-[#888780] mt-1.5">
                 Platform-wide ROI metrics, department adoption, and intelligence utilization.
              </p>
            </div>
            <div className="flex gap-2.5">
               <button 
                 onClick={() => alert("Simulating Demo Data Ingestion...\n[✓] Schema Created\n[✓] 500 Chunks Embedded\n[✓] RLS Verified")}
                 className="px-4 py-2 bg-white border border-[#ebebea] rounded-[10px] text-[13px] font-medium text-[#5F5E5A] hover:border-[#1D9E75] hover:text-[#0F6E56] transition-all flex items-center gap-2"
               >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1D9E75] animate-pulse-dot"></span>
                  Import Demo
               </button>
               <button 
                 onClick={() => alert("Generating Audit Report (PDF)...\n- RLS Access Logs\n- Token Usage by Dept\n- Encryption Audit")}
                 className="px-4 py-2 bg-[#0F6E56] text-white rounded-[10px] text-[13px] font-medium hover:bg-[#085041] transition-all flex items-center gap-2 active:scale-[0.98]"
               >
                  <FileText size={14} /> Export Report
               </button>
            </div>
          </motion.div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-8">
            {[
              { color: "text-[#0F6E56]", accent: "bg-[#0F6E56]", icon: TrendingUp, title: "Est. Time Saved", val: "412", unit: "hrs", meta: "+45% this month", change: "up" },
              { color: "text-[#0C447C]", icon: BarChart3, title: "Queries Answered", val: "8,241", unit: "", meta: "99.8% precision", change: "up" },
              { color: "text-[#3C3489]", icon: Users, title: "Active Users", val: "142", unit: "", meta: "72% adoption rate", change: "up" },
              { color: "text-[#633806]", icon: Database, title: "Tokens Indexed", val: "12.5", unit: "M", meta: "across 480 docs", change: "up" }
            ].map((card, i) => (
              <motion.div key={i} variants={fadeInUp} className="bg-white border border-[#ebebea] rounded-[14px] p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all relative overflow-hidden cursor-default">
                {card.accent && <div className={`absolute top-0 left-0 w-1 h-full ${card.accent} rounded-l-[14px]`}></div>}
                <div className={`flex items-center gap-2 mb-1.5 ${card.color}`}>
                  <card.icon size={16} />
                  <h3 className="font-medium text-[13px]">{card.title}</h3>
                </div>
                <div className="text-[28px] font-semibold text-[#111] mt-1 tracking-[-0.02em]">
                  {card.val}<span className="text-[16px] text-[#888780] ml-0.5">{card.unit}</span>
                </div>
                <p className="text-[12px] text-[#0F6E56] mt-1 font-medium">{card.meta}</p>
              </motion.div>
            ))}
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5">
            {/* Department Adoption */}
            <motion.div variants={fadeInUp} className="lg:col-span-2 bg-white border border-[#ebebea] rounded-[14px] p-6">
              <h3 className="font-semibold text-[15px] text-[#111] mb-5 flex items-center gap-2"><BarChart3 size={16} className="text-[#1D9E75]" /> Department Adoption</h3>
              <div className="space-y-5">
                {[
                  { name: "Engineering", percent: 85, vol: "2.4k queries" },
                  { name: "Human Resources", percent: 65, vol: "1.1k queries" },
                  { name: "Sales & Operations", percent: 45, vol: "850 queries" }
                ].map((dept, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[13px] mb-2">
                      <span className="font-medium text-[#111]">{dept.name}</span>
                      <span className="text-[#888780] text-[11px] uppercase tracking-[0.04em]">{dept.vol}</span>
                    </div>
                    <div className="w-full bg-[#F1EFE8] rounded-full h-2 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }} animate={{ width: `${dept.percent}%` }} transition={{ duration: 1, delay: 0.5 + (i*0.2) }}
                        className="bg-[#1D9E75] h-2 rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Security Health */}
            <motion.div variants={fadeInUp} className="bg-white border border-[#ebebea] rounded-[14px] p-6">
              <div className="flex items-center gap-2 mb-4 text-[#0F6E56]">
                <ShieldCheck size={18} />
                <h3 className="font-semibold text-[15px]">Security Health</h3>
              </div>
              <div className="text-[14px] space-y-3">
                  <div className="p-3 bg-[#F7F7F5] rounded-xl border border-[#ebebea] flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#1D9E75] animate-pulse-dot"></div>
                    <div>
                      <div className="text-[11px] text-[#888780] uppercase tracking-[0.04em] font-medium">Context Leaks</div>
                      <div className="font-semibold text-[#111]">0 Incidents</div>
                    </div>
                  </div>
                  <div className="p-3 bg-[#F7F7F5] rounded-xl border border-[#ebebea] flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#1D9E75] animate-pulse-dot"></div>
                    <div>
                      <div className="text-[11px] text-[#888780] uppercase tracking-[0.04em] font-medium">RLS Isolation</div>
                      <div className="font-semibold text-[#111]">100% Enforced</div>
                    </div>
                  </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </GlobalShell>
  );
}
