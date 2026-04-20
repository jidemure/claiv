import React from "react";
import { Sparkles, ArrowRight, Building, KeyRound } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex h-screen w-full bg-background overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      
      <div className="w-full flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-6 border border-primary/30 shadow-[0_0_40px_-10px_rgba(30,215,142,0.3)]">
              <span className="text-primary text-3xl font-bold tracking-tighter">C</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-2 text-foreground">Welcome to Claiv</h1>
            <p className="text-muted-foreground text-sm">Sign in to your enterprise copilot</p>
          </div>
          
          <div className="glass-panel p-8 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
            
            <form className="space-y-5" action="/">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Work Email</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-[50%] text-muted-foreground">
                    <Building size={16} />
                  </div>
                  <input 
                    type="email" 
                    placeholder="name@company.com" 
                    className="w-full h-12 glass border border-white/10 rounded-xl pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-muted-foreground/50"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password</label>
                  <a href="#" className="text-xs text-primary hover:underline font-medium">Forgot password?</a>
                </div>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-[50%] text-muted-foreground">
                    <KeyRound size={16} />
                  </div>
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    className="w-full h-12 glass border border-white/10 rounded-xl pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-muted-foreground/50"
                  />
                </div>
              </div>
              
              <button 
                type="submit" 
                className="w-full h-12 mt-4 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group"
              >
                Sign In
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
            
            <div className="mt-6 flex items-center justify-center">
              <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Sparkles size={12} className="text-primary" /> Powered by advanced enterprise AI
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
