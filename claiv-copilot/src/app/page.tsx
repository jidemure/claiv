"use client";
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Star, ChevronDown, CheckCircle2, Zap, Search, Shield, FileText, BarChart3, Lock, Cpu, ArrowRight, MessageSquare, Database, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';


const PremiumButton = ({ children, className = '', href = '#', secondary = false }: { children: React.ReactNode, className?: string, href?: string, secondary?: boolean }) => (
  <Link 
    href={href} 
    className={`premium-button ${secondary ? '!bg-none !bg-white !text-[#111] !border-[#ebebea] hover:!bg-[#fcfcfb] hover:!border-[#1D9E75] hover:!text-[#0F6E56] shadow-sm' : ''} ${className}`}
  >
    <div className="text-roll-container">
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </div>
  </Link>
);

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeFeatureTab, setActiveFeatureTab] = useState(0);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 60);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setNavVisible(false);
      } else {
        setNavVisible(true);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const featureTabs = [
    {
      label: 'Ask',
      icon: <MessageSquare size={16} />,
      title: 'Natural language answers from your docs',
      description: 'Ask questions in plain English and get precise, cited answers pulled directly from your internal knowledge base. No more digging through folders.',
      highlights: ['Source citations on every answer', 'Follow-up questions in context', 'Works across all document types'],
    },
    {
      label: 'Ingest',
      icon: <Database size={16} />,
      title: 'Connect everything in one click',
      description: 'Claiv syncs with your existing tools — Google Drive, Notion, Confluence, Slack. It respects your existing permission model out-of-the-box.',
      highlights: ['One-click integrations', 'Real-time sync', 'Permission-aware indexing'],
    },
    {
      label: 'Insights',
      icon: <TrendingUp size={16} />,
      title: 'See what your team is searching for',
      description: 'Understand knowledge gaps, trending queries, and which documents drive the most value. Use data to improve your internal documentation.',
      highlights: ['Query analytics dashboard', 'Knowledge gap detection', 'Document usage heatmaps'],
    },
  ];

  return (
    <div className="min-h-screen bg-[#ffffff] font-sans text-[#5F5E5A] overflow-x-hidden">
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --teal-50: #E1F5EE;
          --teal-100: #9FE1CB;
          --teal-400: #1D9E75;
          --teal-600: #0F6E56;
          --teal-800: #085041;
          --teal-900: #04342C;
          --gray-50: #F7F7F5;
          --gray-100: #ebebea;
          --gray-200: #D3D1C7;
          --gray-400: #888780;
          --gray-600: #5F5E5A;
          --gray-800: #1a1a18;
        }

        .font-sans {
          font-family: 'Inter', sans-serif;
        }

        @keyframes pulse-dot {
          0% { transform: scale(0.95); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(0.95); opacity: 0.5; }
        }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(var(--y-start, 10px)); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes float-loop {
          0% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0); }
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .animate-pulse-dot {
          animation: pulse-dot 2s infinite ease-in-out;
        }

        .animate-shimmer {
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%);
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }

        @media (prefers-reduced-motion: no-preference) {
          .animate-entrance-1 { animation: fade-in-up 400ms ease forwards; opacity: 0; --y-start: 8px; animation-delay: 0ms; }
          .animate-entrance-2 { animation: fade-in-up 500ms ease forwards; opacity: 0; --y-start: 16px; animation-delay: 80ms; }
          .animate-entrance-3 { animation: fade-in-up 500ms ease forwards; opacity: 0; --y-start: 12px; animation-delay: 160ms; }
          .animate-entrance-4 { animation: fade-in-up 500ms ease forwards; opacity: 0; --y-start: 10px; animation-delay: 240ms; }
          .animate-entrance-5 { animation: fade-in 400ms ease forwards; opacity: 0; animation-delay: 320ms; }
          
          .animate-card-entrance {
            animation: fade-in-up 600ms ease forwards, float-loop 4s ease-in-out infinite 700ms;
            opacity: 0;
            --y-start: 20px;
            animation-delay: 100ms;
          }
        }
      `}} />

      {/* Top Gradient Bar (Salix-style) */}
      <div className="w-full h-[6px] bg-gradient-to-r from-[#1D9E75] via-[#0F6E56] to-[#04342C] fixed top-0 left-0 z-[60]" />

      {/* Navigation */}
      <div className={`fixed left-0 right-0 z-50 transition-transform duration-300 ${navVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex justify-center px-[24px] md:px-[48px] pt-[20px]">
          <nav className={`w-full max-w-[1120px] h-[64px] flex items-center px-6 transition-all duration-200 rounded-[99px] ${scrolled ? 'backdrop-blur-md bg-white/90 border border-[#ebebea] shadow-[0_2px_12px_rgba(0,0,0,0.06)]' : 'bg-transparent'}`}>
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src="/claiv-main-logo.png" alt="Claiv Logo" className="h-7 w-auto" />
              </div>

              <div className="hidden md:flex items-center gap-8">
                <Link href="#features" className="text-[14px] font-[500] text-[#5F5E5A] hover:text-[#111] transition-colors">Product</Link>
                <Link href="#pricing" className="text-[14px] font-[500] text-[#5F5E5A] hover:text-[#111] transition-colors">Pricing</Link>
                <Link href="#" className="text-[14px] font-[500] text-[#5F5E5A] hover:text-[#111] transition-colors">Docs</Link>
                <Link href="#" className="text-[14px] font-[500] text-[#5F5E5A] hover:text-[#111] transition-colors">Integrations</Link>
              </div>

              <div className="flex items-center gap-4">
                <Link href="#" className="text-[14px] font-[500] text-[#1a1a18] hover:text-[#0F6E56] transition-colors hidden md:block">Login</Link>
                <PremiumButton href="/chat" className="!py-[10px] !px-[20px] !text-[14px]">
                  Ask Claiv free
                </PremiumButton>
              </div>
            </div>
          </nav>
        </div>
      </div>

      <main className="max-w-[1000px] mx-auto px-6 lg:px-0 pt-[140px] pb-[80px]">
        <div className="flex flex-col lg:flex-row items-center gap-[40px] lg:gap-[80px]">
          
          {/* Left Column (55%) */}
          <div className="w-full lg:w-[55%]">
            <div className="animate-entrance-1 inline-flex items-center gap-[6px] bg-white border border-[#e8ede9] rounded-[99px] py-[5px] px-[14px] shadow-sm">
              <div className="w-[6px] h-[6px] bg-[#1D9E75] rounded-full animate-pulse-dot"></div>
              <span className="text-[12px] font-[500] text-[#0F6E56]">Join 1,000+ knowledge-driven teams</span>
            </div>

            <h1 className="animate-entrance-2 mt-[16px] text-[32px] md:text-[42px] lg:text-[52px] font-[600] text-[#111] leading-[1.1] tracking-[-0.03em]">
              <span className="block whitespace-nowrap">Your company&apos;s</span>
              <span className="block whitespace-nowrap">private <span className="text-[#1D9E75]">AI brain.</span></span>
            </h1>

            <p className="animate-entrance-3 mt-[18px] text-[17px] text-[#5F5E5A] leading-[1.65] font-[400] max-w-[440px]">
              Stop searching. Start knowing. Claiv gives your team instant answers from internal documents — so no one wastes hours searching again.
            </p>

            <div className="animate-entrance-4 mt-[32px] flex flex-col sm:flex-row gap-[12px]">
              <PremiumButton href="/chat">
                Ask Claiv free
              </PremiumButton>
              <PremiumButton href="#" secondary className="!bg-transparent !text-[#5F5E5A] !border-[#ddd]">
                Book a demo &rarr;
              </PremiumButton>
            </div>

            <div className="animate-entrance-5 mt-[40px] flex items-center gap-[10px]">
              <div className="flex items-center">
                {[
                  { src: 'https://randomuser.me/api/portraits/women/68.jpg', z: 40 },
                  { src: 'https://randomuser.me/api/portraits/men/75.jpg', z: 30 },
                  { src: 'https://randomuser.me/api/portraits/women/45.jpg', z: 20 },
                  { src: 'https://randomuser.me/api/portraits/men/22.jpg', z: 10 },
                ].map((avatar, i) => (
                  <div key={i} className={`relative w-[28px] h-[28px] rounded-full border-2 border-white overflow-hidden ${i > 0 ? 'ml-[-8px]' : ''}`} style={{ zIndex: avatar.z }}>
                    <Image
                      src={avatar.src}
                      alt={`User avatar ${i + 1}`}
                      width={28}
                      height={28}
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <p className="text-[13px] text-[#5F5E5A]">
                Trusted by 1,000+ companies worldwide
              </p>
            </div>
          </div>

          {/* Right Column (45%) -> App Mockup Card */}
          <div className="w-full lg:w-[45%] relative z-10 hidden md:flex lg:justify-end">
            <div className="animate-card-entrance relative w-[560px] max-w-full lg:max-w-none shrink-0 bg-white border border-[#ebebea] rounded-[16px] shadow-[0_8px_40px_rgba(0,0,0,0.08)] overflow-hidden flex flex-row h-[420px] lg:translate-x-12 lg:rotate-[-2deg] hover:rotate-0 hover:translate-x-0 transition-all duration-500">
              
              {/* Left Sidebar */}
              <div className="w-[190px] bg-[#F7F7F5] border-r border-[#ebebea] flex flex-col shrink-0">
                <div className="p-[16px_12px] border-b border-[#ebebea] flex items-center gap-[8px]">
                  <div className="w-[16px] h-[16px] bg-[#0F6E56] rounded-[4px] flex items-center justify-center">
                    <div className="w-[6px] h-[6px] bg-white rounded-full"></div>
                  </div>
                  <span className="text-[14px] font-[600] text-[#1a1a18]">Claiv</span>
                </div>
                
                <div className="flex-1 p-[12px] flex flex-col gap-[4px]">
                  <div className="flex items-center gap-[8px] p-[8px_10px] bg-[#E1F5EE] rounded-[8px]">
                    <div className="w-[14px] h-[14px] bg-[#0F6E56] rounded-[4px] opacity-80 mix-blend-multiply"></div>
                    <span className="text-[13px] font-[500] text-[#085041]">Ask Claiv</span>
                  </div>
                  <div className="flex items-center gap-[8px] p-[8px_10px] hover:bg-[#ebebea] rounded-[8px] transition-colors cursor-pointer">
                    <div className="w-[14px] h-[14px] bg-[#D3D1C7] rounded-[4px]"></div>
                    <span className="text-[13px] font-[500] text-[#5F5E5A]">Documents</span>
                  </div>
                  <div className="flex items-center gap-[8px] p-[8px_10px] hover:bg-[#ebebea] rounded-[8px] transition-colors cursor-pointer">
                    <div className="w-[14px] h-[14px] bg-[#D3D1C7] rounded-[4px]"></div>
                    <span className="text-[13px] font-[500] text-[#5F5E5A]">Analytics</span>
                  </div>
                  <div className="flex items-center gap-[8px] p-[8px_10px] hover:bg-[#ebebea] rounded-[8px] transition-colors cursor-pointer">
                    <div className="w-[14px] h-[14px] bg-[#D3D1C7] rounded-[4px]"></div>
                    <span className="text-[13px] font-[500] text-[#5F5E5A]">Settings</span>
                  </div>
                </div>

                <div className="p-[16px] border-t border-[#ebebea] flex flex-col items-start">
                  <div className="flex items-center gap-[8px]">
                    <div className="w-[28px] h-[28px] rounded-full bg-[#9FE1CB] flex items-center justify-center">
                      <span className="text-[10px] font-[600] text-[#085041]">JD</span>
                    </div>
                    <span className="text-[13px] font-[500] text-[#1a1a18]">John D.</span>
                  </div>
                  <div className="inline-flex items-center justify-center bg-[#E1F5EE] text-[#085041] px-[8px] py-[4px] rounded-[12px] text-[12px] font-[500] mt-[8px]">
                    HR dept.
                  </div>
                </div>
              </div>

              {/* Right Main Content */}
              <div className="flex-1 bg-white flex flex-col min-w-0">
                <div className="h-[48px] border-b border-[#ebebea] flex items-center justify-between px-[16px] shrink-0">
                  <span className="text-[14px] font-[600] text-[#1a1a18]">Ask Claiv</span>
                  <div className="flex items-center gap-[8px]">
                    <div className="bg-[#E1F5EE] text-[#085041] px-[8px] py-[2px] rounded-full text-[12px] font-[500]">HR dept.</div>
                    <div className="w-[24px] h-[24px] rounded-full bg-[#9FE1CB] flex items-center justify-center">
                      <span className="text-[8px] font-[600] text-[#085041]">JD</span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 p-[16px] flex flex-col gap-[12px] overflow-y-auto">
                  
                  {/* User Bubble */}
                  <div className="self-end bg-[#0F6E56] text-white rounded-[14px_14px_3px_14px] px-[14px] py-[10px] max-w-[85%]">
                    <p className="text-[13px] leading-[1.6]">What is our refund policy for SaaS clients?</p>
                  </div>

                  {/* AI Bubble */}
                  <div className="self-start bg-white border border-[#ebebea] rounded-[14px_14px_14px_3px] px-[14px] py-[10px] max-w-[95%]">
                    <p className="text-[13px] text-[#1a1a18] leading-[1.6] mb-[12px]">
                      SaaS clients are eligible for a full refund within 14 days of purchase, provided they have not exceeded the usage limits outlined in section 2.1.
                    </p>
                    <div className="flex flex-wrap gap-[6px]">
                      <div className="bg-[#E1F5EE] text-[#085041] text-[11px] font-[500] rounded-[6px] px-[9px] py-[3px]">
                        📄 Refund Policy v2.pdf — p.4
                      </div>
                      <div className="bg-[#E1F5EE] text-[#085041] text-[11px] font-[500] rounded-[6px] px-[9px] py-[3px]">
                        📄 Client Terms 2024.docx
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#ebebea] p-[12px_16px] shrink-0 flex gap-[8px] items-center">
                  <input 
                    type="text" 
                    placeholder="Ask Claiv anything..." 
                    className="flex-1 border border-[#e0e0dc] rounded-[10px] px-[14px] py-[9px] text-[14px] outline-none placeholder:text-[#D3D1C7] text-[#1a1a18]"
                    readOnly
                  />
                  <button className="bg-[#0F6E56] text-white rounded-[9px] px-[16px] py-[9px] text-[13px] font-[500]">
                    Send
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* Trust Logo Strip */}
      <section className="w-full border-t border-[#f0f0ee] border-b py-[64px] bg-white overflow-hidden">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-0 text-center mb-[48px]">
          <p className="text-[13px] font-[500] text-[#888780] uppercase tracking-[0.08em]">
            Trusted by knowledge-driven companies
          </p>
        </div>
        
        <div className="max-w-[1000px] mx-auto overflow-hidden">
          <div className="relative w-full">
            <div 
              className="flex w-full overflow-hidden"
              style={{ 
                maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
              }}
            >
              <motion.div 
                className="flex items-center gap-[12px] whitespace-nowrap min-w-full py-2"
                animate={{ x: [0, -1220] }}
                transition={{ 
                  duration: 22, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              >
                {[
                  'https://www.vectorlogo.zone/logos/slack/slack-ar21.svg',
                  'https://www.vectorlogo.zone/logos/notion/notion-ar21.svg',
                  'https://www.vectorlogo.zone/logos/github/github-ar21.svg',
                  'https://www.vectorlogo.zone/logos/linearapp/linearapp-ar21.svg',
                  'https://www.vectorlogo.zone/logos/stripe/stripe-ar21.svg',
                  'https://www.vectorlogo.zone/logos/asana/asana-ar21.svg',
                  'https://www.vectorlogo.zone/logos/intercom/intercom-ar21.svg',
                  'https://www.vectorlogo.zone/logos/loom/loom-ar21.svg',
                  'https://www.vectorlogo.zone/logos/figma/figma-ar21.svg',
                  'https://www.vectorlogo.zone/logos/framer/framer-ar21.svg',
                ].map((logo, index) => (
                  <div key={index} className="flex items-center justify-center p-[8px] border border-[#f0f0ee] rounded-[10px] w-[110px] h-[50px] shrink-0 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all">
                    <Image src={logo} alt="Brand Partner Logo" width={70} height={24} className="max-w-[70px] max-h-[24px] object-contain" unoptimized />
                  </div>
                ))}
                {/* Duplicate for infinite effect */}
                {[
                  'https://www.vectorlogo.zone/logos/slack/slack-ar21.svg',
                  'https://www.vectorlogo.zone/logos/notion/notion-ar21.svg',
                  'https://www.vectorlogo.zone/logos/github/github-ar21.svg',
                  'https://www.vectorlogo.zone/logos/linearapp/linearapp-ar21.svg',
                  'https://www.vectorlogo.zone/logos/stripe/stripe-ar21.svg',
                  'https://www.vectorlogo.zone/logos/asana/asana-ar21.svg',
                  'https://www.vectorlogo.zone/logos/intercom/intercom-ar21.svg',
                  'https://www.vectorlogo.zone/logos/loom/loom-ar21.svg',
                  'https://www.vectorlogo.zone/logos/figma/figma-ar21.svg',
                  'https://www.vectorlogo.zone/logos/framer/framer-ar21.svg',
                ].map((logo, index) => (
                  <div key={`dup-${index}`} className="flex items-center justify-center p-[8px] border border-[#f0f0ee] rounded-[10px] w-[110px] h-[50px] shrink-0 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all">
                    <Image src={logo} alt="Brand Partner Logo" width={70} height={24} className="max-w-[70px] max-h-[24px] object-contain" unoptimized />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Features Grid */}
      <section id="features" className="w-full py-[120px] bg-[#fafaf9]">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-0">
          <div className="text-center mb-[64px]">
            <div className="inline-flex items-center gap-[6px] bg-white border border-[#e8ede9] rounded-[99px] py-[5px] px-[14px] mb-[16px] shadow-sm">
              <Cpu size={14} className="text-[#0F6E56]" />
              <span className="text-[12px] font-[500] text-[#0F6E56] uppercase tracking-[0.08em]">Platform</span>
            </div>
            <h2 className="text-[32px] md:text-[42px] font-[600] text-[#111] tracking-[-0.03em] leading-[1.15] mb-[14px]">
              Everything your team needs to know
            </h2>
            <p className="text-[16px] text-[#5F5E5A] max-w-[500px] mx-auto leading-[1.65]">
              A unified AI layer that sits on top of your existing knowledge base.
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]"
          >
            {[
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0F6E56]">
                    <motion.circle
                      cx="11" cy="11" r="8"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
                    />
                    <motion.line
                      x1="21" y1="21" x2="16.65" y2="16.65"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "easeInOut", delay: 0.5 }}
                    />
                  </svg>
                ),
                title: 'Semantic Search',
                desc: 'Goes beyond keywords. Understands intent and finds the exact paragraph across thousands of documents.',
                accent: 'bg-[#E1F5EE]',
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0F6E56]">
                    <motion.path
                      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 2.5, repeat: Infinity, repeatType: "loop", ease: "linear" }}
                    />
                    <motion.path
                      d="M12 8v4"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: [0, 1, 0] }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </svg>
                ),
                title: 'Permission-Aware',
                desc: 'Mirrors your existing access controls. If someone can\'t see a file, Claiv won\'t use it in their answers.',
                accent: 'bg-[#E1F5EE]',
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0F6E56]">
                    <motion.path
                      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 3, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
                    />
                    <motion.path d="M14 2v6h6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1 }} />
                    <motion.line x1="16" y1="13" x2="8" y2="13" initial={{ x: 0 }} whileInView={{ x: [0, 2, 0] }} transition={{ duration: 2, repeat: Infinity }} />
                    <motion.line x1="16" y1="17" x2="8" y2="17" initial={{ x: 0 }} whileInView={{ x: [0, -2, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
                  </svg>
                ),
                title: 'Source Citations',
                desc: 'Every answer links back to the exact document and page. Full auditability, zero hallucination risk.',
                accent: 'bg-[#E1F5EE]',
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0F6E56]">
                    <motion.line x1="18" y1="20" x2="18" y2="10" initial={{ scaleY: 1, originY: 1 }} whileInView={{ scaleY: [1, 1.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
                    <motion.line x1="12" y1="20" x2="12" y2="4" initial={{ scaleY: 1, originY: 1 }} whileInView={{ scaleY: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }} />
                    <motion.line x1="6" y1="20" x2="6" y2="14" initial={{ scaleY: 1, originY: 1 }} whileInView={{ scaleY: [1, 1.8, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }} />
                  </svg>
                ),
                title: 'Query Analytics',
                desc: 'See what your team searches for most. Identify knowledge gaps before they become problems.',
                accent: 'bg-[#E1F5EE]',
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0F6E56]">
                    <motion.rect x="3" y="11" width="18" height="11" rx="2" ry="2" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }} />
                    <motion.path d="M7 11V7a5 5 0 0 1 10 0v4" initial={{ y: 0 }} whileInView={{ y: [0, -2, 0] }} transition={{ duration: 2, repeat: Infinity }} />
                  </svg>
                ),
                title: 'SOC2 Compliant',
                desc: 'Enterprise-grade security. Your data never trains our models. Zero data retention on the LLM side.',
                accent: 'bg-[#E1F5EE]',
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0F6E56]">
                    <motion.path
                      d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                      initial={{ pathLength: 0, fill: "rgba(15,110,86,0)" }}
                      whileInView={{ 
                        pathLength: 1, 
                        fill: ["rgba(15,110,86,0)", "rgba(15,110,86,0.1)", "rgba(15,110,86,0)"] 
                      }}
                      viewport={{ once: true }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
                    />
                  </svg>
                ),
                title: 'Instant Setup',
                desc: 'Connect Google Drive, Notion, Confluence, or Slack. Claiv starts indexing automatically — zero config.',
                accent: 'bg-[#E1F5EE]',
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group bg-white border border-[#ebebea] rounded-[20px] p-[32px] hover:border-[#c8e6d8] hover:shadow-[0_8px_32px_rgba(15,110,86,0.06)] transition-all duration-300"
              >
                <div className={`w-[48px] h-[48px] rounded-[14px] ${feature.accent} flex items-center justify-center mb-[20px] group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-[17px] font-[600] text-[#111] mb-[8px]">{feature.title}</h3>
                <p className="text-[14px] text-[#5F5E5A] leading-[1.65]">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tab-based Feature Showcase (Salix-style) */}
      <section className="w-full py-[120px] bg-white">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-0">
          <div className="text-center mb-[56px]">
            <h2 className="text-[32px] md:text-[42px] font-[600] text-[#111] tracking-[-0.03em] leading-[1.15] mb-[14px]">
              How Claiv works
            </h2>
            <p className="text-[16px] text-[#5F5E5A] max-w-[480px] mx-auto leading-[1.65]">
              Three simple steps to transform your team&apos;s productivity.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-[48px]">
            <div className="inline-flex bg-[#F7F7F5] rounded-[14px] p-[4px] border border-[#ebebea]">
              {featureTabs.map((tab, i) => (
                <button
                  key={i}
                  onClick={() => setActiveFeatureTab(i)}
                  className={`flex items-center gap-[6px] px-[20px] py-[10px] rounded-[10px] text-[14px] font-[500] transition-all duration-200 ${
                    activeFeatureTab === i
                      ? 'bg-white text-[#0F6E56] shadow-sm border border-[#e8ede9]'
                      : 'text-[#5F5E5A] hover:text-[#111]'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="flex flex-col lg:flex-row items-center gap-[56px]">
            <div className="w-full lg:w-[45%]">
              <h3 className="text-[26px] md:text-[32px] font-[600] text-[#111] tracking-[-0.02em] leading-[1.2] mb-[16px]">
                {featureTabs[activeFeatureTab].title}
              </h3>
              <p className="text-[16px] text-[#5F5E5A] leading-[1.7] mb-[28px]">
                {featureTabs[activeFeatureTab].description}
              </p>
              <div className="space-y-[14px]">
                {featureTabs[activeFeatureTab].highlights.map((item, i) => (
                  <div key={i} className="flex items-center gap-[10px]">
                    <CheckCircle2 size={18} className="text-[#1D9E75] shrink-0" />
                    <span className="text-[15px] text-[#111] font-[500]">{item}</span>
                  </div>
                ))}
              </div>
              <Link href="#" className="inline-flex items-center gap-[6px] mt-[28px] text-[14px] font-[600] text-[#0F6E56] hover:text-[#085041] transition-colors group">
                Learn more <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="w-full lg:w-[55%]">
              <div className="bg-[#F7F7F5] rounded-[20px] border border-[#ebebea] p-[32px] min-h-[340px] flex items-center justify-center relative overflow-hidden">
                {/* Tab 0 — Ask */}
                {activeFeatureTab === 0 && (
                  <div className="w-full max-w-[400px] space-y-[12px]">
                    <div className="bg-white rounded-[12px] border border-[#ebebea] p-[14px] shadow-sm">
                      <div className="flex items-center gap-[8px] mb-[8px]">
                        <div className="w-[6px] h-[6px] bg-[#1D9E75] rounded-full"></div>
                        <span className="text-[12px] font-[500] text-[#888780]">Claiv AI</span>
                      </div>
                      <p className="text-[14px] text-[#1a1a18] leading-[1.6]">SaaS clients are eligible for a full refund within 14 days...</p>
                      <div className="flex gap-[6px] mt-[10px]">
                        <span className="bg-[#E1F5EE] text-[#085041] text-[10px] font-[500] rounded-[5px] px-[8px] py-[2px]">📄 Refund Policy v2.pdf</span>
                      </div>
                    </div>
                    <div className="bg-white rounded-[12px] border border-[#ebebea] p-[12px] flex items-center gap-[8px]">
                      <Search size={16} className="text-[#D3D1C7]" />
                      <span className="text-[13px] text-[#D3D1C7]">Ask a follow-up question...</span>
                    </div>
                  </div>
                )}
                {/* Tab 1 — Ingest */}
                {activeFeatureTab === 1 && (
                  <div className="w-full max-w-[360px] space-y-[10px]">
                    {['Google Drive', 'Notion', 'Confluence', 'Slack'].map((src, i) => (
                      <div key={i} className="bg-white rounded-[12px] border border-[#ebebea] p-[14px] flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-[10px]">
                          <div className="w-[32px] h-[32px] rounded-[8px] bg-[#E1F5EE] flex items-center justify-center">
                            <Database size={16} className="text-[#0F6E56]" />
                          </div>
                          <span className="text-[14px] font-[500] text-[#1a1a18]">{src}</span>
                        </div>
                        <span className="text-[12px] font-[500] text-[#1D9E75] bg-[#E1F5EE] px-[8px] py-[3px] rounded-full">Connected</span>
                      </div>
                    ))}
                  </div>
                )}
                {/* Tab 2 — Insights */}
                {activeFeatureTab === 2 && (
                  <div className="w-full max-w-[380px] space-y-[12px]">
                    <div className="bg-white rounded-[12px] border border-[#ebebea] p-[16px] shadow-sm">
                      <span className="text-[12px] font-[500] text-[#888780] uppercase tracking-[0.05em]">Top Queries This Week</span>
                      <div className="mt-[12px] space-y-[8px]">
                        {[
                          { q: 'Refund policy', count: 142 },
                          { q: 'Onboarding checklist', count: 98 },
                          { q: 'PTO policy', count: 87 },
                        ].map((item, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <span className="text-[14px] text-[#1a1a18] font-[500]">{item.q}</span>
                            <span className="text-[12px] text-[#888780]">{item.count} queries</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-white rounded-[12px] border border-[#ebebea] p-[16px] shadow-sm flex items-center gap-[12px]">
                      <div className="w-[40px] h-[40px] rounded-[10px] bg-[#FEF3C7] flex items-center justify-center">
                        <BarChart3 size={20} className="text-[#D97706]" />
                      </div>
                      <div>
                        <span className="text-[13px] font-[600] text-[#111]">Knowledge Gap Detected</span>
                        <p className="text-[12px] text-[#888780]">18 questions had no matching docs</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="w-full py-[72px] bg-[#04342C]">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '10x', label: 'Faster answers' },
              { value: '95%', label: 'Citation accuracy' },
              { value: '500K+', label: 'Queries answered' },
              { value: '<2s', label: 'Avg. response time' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-[36px] md:text-[48px] font-[700] text-white tracking-tight leading-none mb-[8px]">{stat.value}</span>
                <span className="text-[14px] font-[500] text-[#9FE1CB] tracking-wide">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="w-full py-[100px] bg-white border-b border-[#f0f0ee]">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-0 text-center">
          <div className="inline-flex items-center gap-[6px] bg-white border border-[#e8ede9] rounded-[99px] py-[5px] px-[14px] mb-[16px] shadow-sm">
            <Database size={14} className="text-[#0F6E56]" />
            <span className="text-[12px] font-[500] text-[#0F6E56] uppercase tracking-[0.08em]">Integrations</span>
          </div>
          <h2 className="text-[32px] md:text-[42px] font-[600] text-[#111] tracking-[-0.03em] leading-[1.15] mb-[14px]">
            Connects to your stack
          </h2>
          <p className="text-[16px] text-[#5F5E5A] max-w-[460px] mx-auto leading-[1.65] mb-[56px]">
            One-click connectors for the tools your team already uses. No migrations needed.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-[16px]">
            {[
              { name: 'Google Drive', logo: 'https://www.vectorlogo.zone/logos/google_drive/google_drive-icon.svg' },
              { name: 'Notion', logo: 'https://www.vectorlogo.zone/logos/notion/notion-icon.svg' },
              { name: 'Confluence', logo: 'https://www.vectorlogo.zone/logos/atlassian_confluence/atlassian_confluence-icon.svg' },
              { name: 'Slack', logo: 'https://www.vectorlogo.zone/logos/slackwsh/slackwsh-icon.svg' },
              { name: 'GitHub', logo: 'https://www.vectorlogo.zone/logos/github/github-icon.svg' },
              { name: 'Linear', logo: 'https://www.vectorlogo.zone/logos/linearapp/linearapp-icon.svg' },
              { name: 'Intercom', logo: 'https://www.vectorlogo.zone/logos/intercom/intercom-icon.svg' },
              { name: 'Zendesk', logo: 'https://www.vectorlogo.zone/logos/zendesk/zendesk-icon.svg' },
            ].map((integration, i) => (
              <div key={i} className="group bg-[#F7F7F5] border border-[#ebebea] rounded-[16px] p-[24px] flex flex-col items-center gap-[12px] hover:border-[#c8e6d8] hover:shadow-sm transition-all duration-200 cursor-default">
                <div className="h-[32px] w-auto relative">
                  <Image 
                    src={integration.logo} 
                    alt={`${integration.name} integration`} 
                    width={32} 
                    height={32} 
                    className="h-[32px] w-auto object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all" 
                    unoptimized
                  />
                </div>
                <span className="text-[14px] font-[500] text-[#1a1a18]">{integration.name}</span>
              </div>
            ))}
          </div>

          <p className="mt-[32px] text-[14px] text-[#888780]">
            + 20 more integrations available. <Link href="#" className="text-[#0F6E56] font-[500] hover:underline">See all →</Link>
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full bg-[#fcfcfb] py-[100px] border-b border-[#f0f0ee] overflow-hidden">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-0 mb-[64px]">
          <h2 className="text-[32px] md:text-[38px] font-[600] text-center text-[#1a1a18] tracking-tight">
            Loved by scaling teams
          </h2>
        </div>
        
        {(() => {
          const testimonials = [
            {
              quote: "We've tried several platforms, but nothing came close to how intuitive and flexible this is. Our team loves it.",
              name: "Esther Howard",
              role: "Founder, at Salix.app",
              image: "https://framerusercontent.com/images/qeXap3EO6YmjlYMqraaJ36n9eI.png"
            },
            {
              quote: "Outstanding service! They understood my needs perfectly and delivered beyond expectations.",
              name: "Robert Fox",
              role: "Web Developer",
              image: "https://framerusercontent.com/images/8NzoGbh8vFIK3e1oLhJG2x2jqXw.png?width=494&height=642"
            },
            {
              quote: "Professional, efficient, and friendly. They went above and beyond to make sure everything was perfect.",
              name: "Devon Lane",
              role: "Sales Manager",
              image: "https://framerusercontent.com/images/F0oAeTFfwItkqUyZEWYiAZb8Vk.png?width=494&height=642"
            },
            {
              quote: "After exploring other options, this was by far the most user-friendly and versatile solution. Our team loves it.",
              name: "James Patel",
              role: "E-Commerce Entrepreneur",
              image: "https://framerusercontent.com/images/TcUNvYo3oCmtvFsDVPcaP9ijrk.png?width=512&height=513"
            },
            {
              quote: "We’ve used different systems, but nothing compares to the simplicity and flexibility we found here.",
              name: "Lena Hoffmann",
              role: "Operations Director",
              image: "https://framerusercontent.com/images/MTcFwYTn2ysLkQ06hyWbYqIQRNk.png?width=264&height=282"
            },
            {
              quote: "Tried countless platforms, yet this one stood out for its ease of use and adaptability.",
              name: "Lucas Brown",
              role: "Retail Store Owner",
              image: "https://framerusercontent.com/images/oItYOK2AN2u6BMXk3x2ASz9dVPE.png?width=988&height=1284"
            },
            {
              quote: "Other tools felt clunky, but this one is intuitive and flexible. It transformed our operations.",
              name: "David Kim",
              role: "Product Designer",
              image: "https://framerusercontent.com/images/9vCHge9ssDnQ9LntZgRHNIp7XU.png?width=988&height=1284"
            }
          ];
          
          return (
            <div className="relative w-full overflow-hidden flex flex-col gap-[20px]" style={{ maskImage: 'linear-gradient(to right, transparent, black 12.5%, black 87.5%, transparent)' }}>
              
              {/* Row 1: Left to Right */}
              <div className="flex gap-[20px] w-max animate-ticker">
                {[...Array(2)].flatMap(() => testimonials).map((testimonial, i) => (
                  <div key={`row1-${i}`} className="w-[340px] h-[236px] flex-shrink-0 bg-transparent border-[1.5px] border-[#46484d0f] rounded-[16px] p-[24px] flex flex-col justify-between">
                    <div>
                      <p className="text-[16px] leading-[1.65] text-[#181818] font-[400] tracking-[-0.01em]">
                        &quot;{testimonial.quote}&quot;
                      </p>
                    </div>
                    <div className="flex items-center gap-[12px]">
                      <div className="relative w-[48px] h-[48px] rounded-full overflow-hidden shrink-0">
                        <Image 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          width={48} 
                          height={48} 
                          className="object-cover block" 
                          unoptimized
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[15px] font-[500] text-[#181818]">{testimonial.name}</span>
                        <span className="text-[14px] text-[#46484D] opacity-80">{testimonial.role}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Row 2: Right to Left */}
              <div className="flex gap-[20px] w-max animate-ticker-reverse">
                {[...Array(2)].flatMap(() => [...testimonials].reverse()).map((testimonial, i) => (
                  <div key={`row2-${i}`} className="w-[340px] h-[236px] flex-shrink-0 bg-transparent border-[1.5px] border-[#46484d0f] rounded-[16px] p-[24px] flex flex-col justify-between">
                    <div>
                      <p className="text-[16px] leading-[1.65] text-[#181818] font-[400] tracking-[-0.01em]">
                        &quot;{testimonial.quote}&quot;
                      </p>
                    </div>
                    <div className="flex items-center gap-[12px]">
                      <div className="relative w-[48px] h-[48px] rounded-full overflow-hidden shrink-0">
                        <Image 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          width={48} 
                          height={48} 
                          className="object-cover block" 
                          unoptimized
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[15px] font-[500] text-[#181818]">{testimonial.name}</span>
                        <span className="text-[14px] text-[#46484D] opacity-80">{testimonial.role}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          );
        })()}
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-[32px] md:text-[38px] font-[600] text-[#111] mb-4 tracking-tight">Simple, transparent pricing</h2>
            <p className="text-[16px] text-[#5F5E5A] max-w-[500px] mx-auto">Start instantly. Scale as your team grows.</p>
          </div>

          {/* Pricing Control */}
          <div className="flex items-center justify-center gap-4 mb-16">
            <button 
              onClick={() => setBillingCycle('monthly')}
              className={`text-[15px] font-[600] transition-colors ${billingCycle === 'monthly' ? 'text-[#181818]' : 'text-[#888780]'}`}
            >
              Monthly
            </button>
            <div 
              className="w-[44px] h-[24px] bg-[#fafafa] border border-[rgba(108,111,118,0.12)] rounded-full p-[3px] cursor-pointer shadow-inner relative"
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            >
              <div 
                className={`w-[16px] h-[16px] bg-[#181818] rounded-full transition-all duration-300 ease-in-out ${billingCycle === 'yearly' ? 'translate-x-[20px]' : 'translate-x-0'}`}
              />
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setBillingCycle('yearly')}
                className={`text-[15px] font-[600] transition-colors ${billingCycle === 'yearly' ? 'text-[#181818]' : 'text-[#888780]'}`}
              >
                Yearly
              </button>
              <div className="bg-[#f83d69] px-[12px] py-[5px] rounded-full shadow-sm flex items-center justify-center">
                <span className="text-white text-[11px] font-[700] uppercase tracking-wider leading-none mt-[1px]">SAVE 20%</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1000px] mx-auto items-center">
            {/* Starter */}
            <div className="bg-white border border-[#ebebea] rounded-[24px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <div className="text-[14px] font-[600] text-[#5F5E5A] mb-2 uppercase tracking-[0.05em]">Starter</div>
              <div className="text-[42px] font-[600] text-[#111] tracking-[-0.03em] mb-4">$0 <span className="text-[16px] font-[400] text-[#888780]">/mo</span></div>
              <p className="text-[14px] text-[#5F5E5A] mb-5 leading-[1.6] h-10">For small teams testing the waters.</p>
              <PremiumButton href="#" secondary className="w-full mb-8">
                Get Started
              </PremiumButton>
              <div className="space-y-4">
                {['Up to 50 documents','1 admin seat','Community support','Basic analytics'].map((feat, i) => (
                  <div key={i} className="flex items-start gap-3 text-[14px] text-[#5F5E5A]">
                    <CheckCircle2 size={18} className="text-[#1D9E75] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pro */}
            <div className="bg-[#fcfcfb] border-2 border-[#1D9E75] rounded-[24px] p-8 relative shadow-lg transform md:-translate-y-4 flex flex-col">
              <div className="absolute top-0 right-6 -translate-y-1/2 px-3 py-1 bg-[#1D9E75] text-white text-[12px] font-[600] uppercase tracking-[0.05em] rounded-full shadow-sm">Most Popular</div>
              <div className="text-[14px] font-[600] text-[#0F6E56] mb-2 uppercase tracking-[0.05em]">Pro</div>
              <div className="text-[42px] font-[600] text-[#111] tracking-[-0.03em] mb-4">
                {billingCycle === 'monthly' ? '$99' : '$79'} 
                <span className="text-[16px] font-[400] text-[#888780]">/mo</span>
              </div>
              <p className="text-[14px] text-[#5F5E5A] mb-5 leading-[1.6] h-10">Perfect for growing organizations.</p>
              <PremiumButton href="#" className="w-full mb-8">
                Start 14-Day Free Trial
              </PremiumButton>
              <div className="space-y-4 flex-1">
                {['Unlimited documents','Custom roles & permissions','Advanced query analytics','Priority Email support', 'Slack / Teams integration'].map((feat, i) => (
                  <div key={i} className="flex items-start gap-3 text-[14px] text-[#111] font-[500]">
                    <CheckCircle2 size={18} className="text-[#0F6E56] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Enterprise */}
            <div className="bg-white border border-[#ebebea] rounded-[24px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <div className="text-[14px] font-[600] text-[#5F5E5A] mb-2 uppercase tracking-[0.05em]">Enterprise</div>
              <div className="text-[42px] font-[600] text-[#111] tracking-[-0.03em] mb-4">Custom</div>
              <p className="text-[14px] text-[#5F5E5A] mb-5 leading-[1.6] h-10">Advanced security and custom SLA.</p>
              <PremiumButton href="#" secondary className="w-full mb-8">
                Contact Sales
              </PremiumButton>
              <div className="space-y-4">
                {['Dedicated account manager','On-premise deployment options','SOC2 compliance reporting','SAML SSO (Okta, Azure)', 'Custom webhooks & API'].map((feat, i) => (
                  <div key={i} className="flex items-start gap-3 text-[14px] text-[#5F5E5A]">
                    <CheckCircle2 size={18} className="text-[#1D9E75] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-24 px-6 md:px-12 bg-[#F9F9F8] border-y border-[#ebebea]">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[32px] md:text-[38px] font-[600] text-[#111] mb-4 tracking-tight">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-4">
            {[
              { q: 'Is my data used to train your AI models?', a: 'Absolutely not. Claiv operates in a strictly siloed environment. Your data is your own, protected by SOC2 equivalent compliance and zero data-retention policies on the LLM side.' },
              { q: 'How long does implementation typically take?', a: 'For most companies, setup is instantaneous. Just authenticate your Google Drive or Notion, and Claiv starts indexing the data in the background. Full ingestion for 100k+ documents usually finishes within a few hours.' },
              { q: 'Can I restrict certain documents to managers only?', a: 'Yes. Claiv mirrors your existing permission structures. If a user cannot access a file in Google Drive, Claiv will never use it to answer their questions.' },
              { q: 'Does the AI hallucinate or invent answers?', a: 'Claiv uses a strictly constrained retrieval-augmented generation (RAG) architecture. This limits answers only to the facts present in your documents. If the answer does not exist, Claiv clearly states that it cannot find the information.' }
            ].map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className="bg-white border border-[#ebebea] rounded-[16px] overflow-hidden hover:border-[#D3D1C7] transition-all shadow-sm">
                  <button 
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full text-left px-8 py-6 flex items-center justify-between focus:outline-none"
                  >
                    <span className="text-[16px] font-[600] text-[#111] pr-6">{faq.q}</span>
                    <ChevronDown size={20} className={`text-[#888780] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#0F6E56]' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-8 pb-6">
                      <p className="text-[16px] text-[#5F5E5A] leading-[1.7]">{faq.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-6 md:px-12 bg-white pb-32">
        <div className="max-w-[1000px] mx-auto">
          <div className="bg-[#0F6E56] rounded-[32px] py-16 px-6 md:px-12 text-center relative overflow-hidden shadow-2xl">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1D9E75] blur-[100px] rounded-full opacity-40 -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#04342C] blur-[80px] rounded-full opacity-60 translate-y-1/2 -translate-x-1/3" />

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 bg-[#04342C]/40 rounded-[16px] flex items-center justify-center mb-5 backdrop-blur-sm border border-white/10 shadow-inner">
                <Zap size={28} className="text-[#E1F5EE]" />
              </div>
              <h2 className="text-[40px] font-[600] text-white leading-[1.15] mb-3 max-w-none tracking-tight">
                Stop Searching. Start Knowing.
              </h2>
              <p className="text-[17px] text-[#E1F5EE] opacity-90 max-w-[600px] mb-8 leading-relaxed">
                Join thousands of teams that now get precise, sourced answers from every document, Slack message, and email, instantly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <PremiumButton href="/chat" className="!bg-none !bg-[#E1F5EE] !text-[#085041] hover:!bg-white">
                  Get Started Free
                </PremiumButton>
                <PremiumButton href="#" className="!bg-none !bg-transparent !border !border-white/30 !text-white hover:!bg-white/10">
                  Contact Sales
                </PremiumButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#ebebea] bg-white pt-20 pb-10 px-6 md:px-12">
        <div className="max-w-[1000px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-10 lg:gap-16 mb-20">
            <div className="col-span-2 md:col-span-2 lg:col-span-3">
              <div className="flex items-center mb-6">
                <img src="/claiv-main-logo.png" alt="Claiv Logo" className="h-7 w-auto" />
              </div>
              <p className="text-[15px] text-[#5F5E5A] max-w-[320px] leading-[1.7]">
                The private AI brain for modern enterprises. Stop searching, start knowing. Secure, siloed, and lightning fast.
              </p>
            </div>
            
            <div>
              <h4 className="text-[14px] font-[600] text-[#111] mb-5">Product</h4>
              <ul className="space-y-4">
                {['Platform Overview', 'Integrations', 'Security & SOC2', 'Pricing', 'Changelog'].map(link => (
                  <li key={link}><Link href="#" className="text-[14px] text-[#5F5E5A] hover:text-[#0F6E56] transition-colors">{link}</Link></li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-[14px] font-[600] text-[#111] mb-5">Company</h4>
              <ul className="space-y-4">
                {['About Us', 'Careers', 'Blog', 'Contact', 'Partners'].map(link => (
                  <li key={link}><Link href="#" className="text-[14px] text-[#5F5E5A] hover:text-[#0F6E56] transition-colors">{link}</Link></li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-[14px] font-[600] text-[#111] mb-5">Legal</h4>
              <ul className="space-y-4">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Security Info'].map(link => (
                  <li key={link}><Link href="#" className="text-[14px] text-[#5F5E5A] hover:text-[#0F6E56] transition-colors">{link}</Link></li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-[#ebebea] flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-[14px] text-[#888780]">© 2026 Claiv AI. All rights reserved.</p>
            <div className="flex gap-6">
               <Link href="#" className="text-[14px] font-[500] text-[#888780] hover:text-[#0F6E56] transition-colors">Twitter</Link>
               <Link href="#" className="text-[14px] font-[500] text-[#888780] hover:text-[#0F6E56] transition-colors">LinkedIn</Link>
               <Link href="#" className="text-[14px] font-[500] text-[#888780] hover:text-[#0F6E56] transition-colors">GitHub</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Bottom Gradient Bar (mirrors top bar) */}
      <div className="w-full h-[6px] bg-gradient-to-r from-[#04342C] via-[#0F6E56] to-[#1D9E75]" />
    </div>
  );
}
