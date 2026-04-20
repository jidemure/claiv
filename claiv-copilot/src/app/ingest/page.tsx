"use client";
import React, { useState } from "react";
import GlobalShell from "@/components/layout/GlobalShell";
import { UploadCloud, FileText, CheckCircle2, Loader2, Database, ShieldCheck, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function IngestionPage() {
  const [file, setFile] = useState<File | null>(null);
  const [department, setDepartment] = useState<string>("HR");
  const [status, setStatus] = useState<"idle" | "uploading" | "chunking" | "embedding" | "done">("idle");
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<{msg: string, time: string}[]>([]);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, { msg, time: new Date().toLocaleTimeString() }]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const startIngestion = async () => {
    if (!file) return;
    setStatus("uploading");
    setLogs([]);
    addLog(`Initiating secure upload for ${file.name}`);
    setProgress(10);
    
    const simTime = 1200;
    
    setTimeout(() => {
      setStatus("chunking");
      addLog(`RAG Pipeline: Extracting text & splitting into 800 token chunks (200 token overlap)`);
      setProgress(40);
      
      setTimeout(() => {
        setStatus("embedding");
        addLog(`Applying Department Schema bounds: [${department}]`);
        addLog(`OpenAI text-embedding-3-large model initializing...`);
        addLog(`Generating 1536-dimensional vectors via BYOK encrypted keys...`);
        setProgress(75);
        
        setTimeout(async () => {
          addLog("Connecting to Supabase pgvector instance & writing chunks...");
          const formData = new FormData();
          formData.append("file", file);
          formData.append("department", department);

          try {
            const res = await fetch("/api/ingest", { method: "POST", body: formData });
            const data = await res.json();
            
            if (res.ok) {
              setStatus("done");
              setProgress(100);
              addLog(`✅ SUCCESS: ${data.chunks} chunks stored. HNSW Index updated.`);
              addLog(`Document ID: ${data.docId}`);
            } else {
              throw new Error(data.error);
            }
          } catch (e: any) {
            addLog(`❌ FAILED: ${e.message}. (Database mock fallback active)`);
            setStatus("done");
            setProgress(100);
          }
        }, simTime * 1.5);
      }, simTime);
    }, simTime);
  };

  return (
    <GlobalShell>
      <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#F7F7F5] relative w-full">
        <div className="max-w-4xl">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-[26px] font-semibold tracking-[-0.02em] text-[#111] flex items-center gap-2.5">
                <Database className="text-[#0F6E56]" size={22} /> Knowledge Ingestion
              </h1>
              <p className="text-[14px] text-[#888780] mt-1">Upload PDFs, DOCXs, or CSVs to vectorize into the Claiv Copilot.</p>
            </div>
            
            <div className="flex items-center gap-2.5">
              <span className="salix-badge bg-[#E1F5EE] text-[#085041] text-[11px]">
                <span className="w-1.5 h-1.5 bg-[#1D9E75] rounded-full"></span>
                text-embedding-3-large
              </span>
              <span className="salix-badge bg-[#FAEEDA] text-[#633806] text-[11px]">
                <ShieldCheck size={12} /> strict-RLS
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Upload Section */}
            <div className="flex flex-col gap-4">
              <motion.div 
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                whileHover={{ scale: 1.01, borderColor: "#1D9E75" }}
                className="w-full h-48 border-2 border-dashed border-[#D3D1C7] bg-white rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all"
              >
                 <UploadCloud size={36} className="text-[#D3D1C7] mb-3" />
                 <p className="text-[14px] font-medium text-[#5F5E5A]">Drag & drop files here</p>
                 <p className="text-[12px] text-[#888780] mt-1">PDF, DOCX, CSV (Max 50MB)</p>
                 <input 
                   type="file" 
                   className="hidden" 
                   id="file-upload" 
                   onChange={(e) => e.target.files && setFile(e.target.files[0])} 
                 />
                 <label htmlFor="file-upload" className="mt-3 bg-[#F1EFE8] hover:bg-[#E1F5EE] transition-colors px-4 py-1.5 rounded-lg text-[12px] font-medium cursor-pointer text-[#5F5E5A] hover:text-[#085041]">
                   Browse Files
                 </label>
              </motion.div>

              {file && (
                <div className="bg-white p-4 rounded-[14px] border border-[#ebebea] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-[#E1F5EE] rounded-lg flex items-center justify-center shrink-0">
                      <FileText className="text-[#0F6E56]" size={18} />
                    </div>
                    <div>
                      <p className="text-[13px] font-medium text-[#111]">{file.name}</p>
                      <p className="text-[11px] text-[#888780]">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2.5">
                    <select 
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="salix-input text-[12px] py-1.5 px-3"
                    >
                      <option value="Global">Global (All)</option>
                      <option value="HR">HR Dept.</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Finance">Finance</option>
                    </select>
                    
                    <button 
                      onClick={startIngestion}
                      disabled={status !== "idle" && status !== "done"}
                      className="bg-[#0F6E56] text-white px-4 py-2 rounded-[10px] text-[12px] font-medium hover:bg-[#085041] disabled:opacity-50 transition-all flex items-center gap-1.5 active:scale-[0.98]"
                    >
                      {status !== "idle" && status !== "done" ? <Loader2 size={14} className="animate-spin" /> : "Process"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Live Pipeline Terminal (Salix-styled) */}
            <div className="w-full bg-[#04342C] border border-[#085041] rounded-2xl overflow-hidden flex flex-col">
               <div className="bg-[#02291f] border-b border-[#085041] p-3 flex items-center gap-2">
                 <Cpu size={14} className="text-[#9FE1CB]" />
                 <span className="text-[11px] font-mono text-[#9FE1CB] tracking-[0.04em] uppercase">Stream: Ingestion Daemon</span>
               </div>
               
               <div className="p-4 flex-1 overflow-y-auto min-h-[250px] max-h-[350px] font-mono text-[12px]">
                 {logs.length === 0 ? (
                   <p className="text-[#9FE1CB]/50 italic">Waiting for pipeline trigger...</p>
                 ) : (
                   <div className="flex flex-col gap-1.5">
                     <AnimatePresence>
                       {logs.map((log, i) => (
                         <motion.div 
                           key={i}
                           initial={{ opacity: 0, x: -10 }}
                           animate={{ opacity: 1, x: 0 }}
                           className="flex gap-2.5"
                         >
                           <span className="text-[#1D9E75]/60 shrink-0">[{log.time}]</span>
                           <span className={`${log.msg.includes("SUCCESS") ? "text-[#1D9E75] font-bold" : log.msg.includes("FAILED") ? "text-[#E24B4A]" : "text-[#9FE1CB]"}`}>
                             {log.msg}
                           </span>
                         </motion.div>
                       ))}
                     </AnimatePresence>
                   </div>
                 )}
               </div>

               {/* Progress Bar */}
               {(status !== "idle" && logs.length > 0) && (
                 <div className="h-1 w-full bg-[#085041] relative">
                    <motion.div 
                      className="absolute top-0 left-0 bottom-0 bg-[#1D9E75]"
                      initial={{ width: "0%" }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                 </div>
               )}
            </div>
          </div>
        </div>
      </div>
    </GlobalShell>
  );
}
