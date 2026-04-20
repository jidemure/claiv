"use client";
import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Zap, 
  ChevronDown, 
  Search, 
  MessageSquare, 
  Database, 
  TrendingUp, 
  ArrowRight,
  Cpu,
  BarChart3,
  Check,
  X
} from 'lucide-react';
import { motion } from 'framer-motion';
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

export default function PricingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [activeFeatureTab, setActiveFeatureTab] = useState(0);

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

  const comparisonData = [
    {
      feature: "Core Knowledge Base",
      starter: "Up to 50 docs",
      pro: "Unlimited docs",
      enterprise: "Custom / On-prem"
    },
    {
      feature: "User Seats",
      starter: "1 admin seat",
      pro: "Unlimited seats",
      enterprise: "Custom"
    },
    {
      feature: "AI Models",
      starter: "Standard model",
      pro: "Premium models",
      enterprise: "Choice of models"
    },
    {
      feature: "Analytics",
      starter: "Basic",
      pro: "Advanced & gaps",
      enterprise: "Custom BI export"
    },
    {
      feature: "Integrations",
      starter: "Drive, Notion",
      pro: "All + Slack/Teams",
      enterprise: "Custom + API/Webhooks"
    },
    {
      feature: "Security",
      starter: "SSL encryption",
      pro: "Custom permissions",
      enterprise: "SSO, SAML, SOC2"
    },
    {
      feature: "Support",
      starter: "Community",
      pro: "Priority Email",
      enterprise: "Dedicated Manager"
    }
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

        .animate-pulse-dot {
          animation: pulse-dot 2s infinite ease-in-out;
        }

        .premium-button {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 12px 28px;
          background: #181818;
          color: white;
          border-radius: 99px;
          font-weight: 600;
          font-size: 15px;
          transition: all 0.3s ease;
          border: 1px solid transparent;
          overflow: hidden;
        }

        .premium-button:hover {
          background: #0F6E56;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(15, 110, 86, 0.2);
        }

        .text-roll-container {
          display: flex;
          flex-direction: column;
          height: 1.5em;
          overflow: hidden;
        }

        .text-roll-container span {
          display: block;
          transition: transform 0.3s ease;
          line-height: 1.5;
        }

        .premium-button:hover .text-roll-container span {
          transform: translateY(-100%);
        }
      `}} />

      {/* Top Gradient Bar */}
      <div className="w-full h-[6px] bg-gradient-to-r from-[#1D9E75] via-[#0F6E56] to-[#04342C] fixed top-0 left-0 z-[60]" />

      {/* Navigation */}
      <div className={`fixed left-0 right-0 z-50 transition-transform duration-300 ${navVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex justify-center px-[24px] md:px-[48px] pt-[20px]">
          <nav className={`w-full max-w-[1120px] h-[64px] flex items-center px-6 transition-all duration-200 rounded-[99px] ${scrolled ? 'backdrop-blur-md bg-white/90 border border-[#ebebea] shadow-[0_2px_12px_rgba(0,0,0,0.06)]' : 'bg-transparent'}`}>
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Link href="/">
                  <img src="/logo-brand.png" alt="Claiv Logo" className="h-7 w-auto" />
                </Link>
              </div>

              <div className="hidden md:flex items-center gap-8">
                <Link href="/#features" className="text-[14px] font-[500] text-[#5F5E5A] hover:text-[#111] transition-colors">Product</Link>
                <Link href="/pricing" className="text-[14px] font-[500] text-[#111] transition-colors">Pricing</Link>
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

      <main className="pt-[140px]">
        {/* PRICING SECTION */}
        <section id="pricing" className="pb-24 px-6 md:px-12 bg-white">
          <div className="max-w-[1000px] mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-[32px] md:text-[42px] font-[600] text-[#111] mb-4 tracking-tight">Simple, transparent pricing</h2>
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
                    <div key={index} className="flex items-center justify-center p-[8px] border border-[#f0f0ee] rounded-[10px] w-[110px] h-[50px] shrink-0 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all bg-white">
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
                    <div key={`dup-${index}`} className="flex items-center justify-center p-[8px] border border-[#f0f0ee] rounded-[10px] w-[110px] h-[50px] shrink-0 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all bg-white">
                      <Image src={logo} alt="Brand Partner Logo" width={70} height={24} className="max-w-[70px] max-h-[24px] object-contain" unoptimized />
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Compare Our Plans Section */}
        <section className="w-full py-[100px] bg-white">
          <div className="max-w-[1000px] mx-auto px-6 lg:px-0">
            <div className="text-center mb-16">
              <h2 className="text-[32px] md:text-[38px] font-[600] text-[#111] mb-4 tracking-tight">Compare Our Plans</h2>
              <p className="text-[16px] text-[#5F5E5A] max-w-[500px] mx-auto">Detailed feature-by-feature breakdown to help you choose.</p>
            </div>

            <div className="overflow-x-auto ring-1 ring-[#ebebea] rounded-[24px]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F7F7F5]">
                    <th className="py-6 px-8 text-[14px] font-[600] text-[#111] uppercase tracking-[0.05em] w-[25%]">Plan Features</th>
                    <th className="py-6 px-8 text-[14px] font-[600] text-[#111] uppercase tracking-[0.05em] w-[25%]">Starter Plan</th>
                    <th className="py-6 px-8 text-[14px] font-[600] text-[#0F6E56] uppercase tracking-[0.05em] w-[25%]">Pro Plan</th>
                    <th className="py-6 px-8 text-[14px] font-[600] text-[#111] uppercase tracking-[0.05em] w-[25%]">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ebebea]">
                  {comparisonData.map((row, i) => (
                    <tr key={i} className="hover:bg-[#F7F7F5]/50 transition-colors">
                      <td className="py-5 px-8 text-[14px] font-[600] text-[#111]">{row.feature}</td>
                      <td className="py-5 px-8 text-[14px] text-[#5F5E5A]">{row.starter}</td>
                      <td className="py-5 px-8 text-[14px] text-[#111] font-[500]">{row.pro}</td>
                      <td className="py-5 px-8 text-[14px] text-[#5F5E5A]">{row.enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* How Claiv works section */}
        <section className="w-full py-[120px] bg-[#fafaf9] border-y border-[#f0f0ee]">
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
              <div className="inline-flex bg-white rounded-[14px] p-[4px] border border-[#ebebea] shadow-sm">
                {featureTabs.map((tab, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveFeatureTab(i)}
                    className={`flex items-center gap-[6px] px-[20px] py-[10px] rounded-[10px] text-[14px] font-[500] transition-all duration-200 ${
                      activeFeatureTab === i
                        ? 'bg-[#E1F5EE] text-[#0F6E56] shadow-sm border border-[#9FE1CB]'
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
              </div>

              <div className="w-full lg:w-[55%]">
                <div className="bg-white rounded-[24px] border border-[#ebebea] p-[32px] min-h-[340px] flex items-center justify-center relative overflow-hidden shadow-lg">
                  {/* Tab 0 — Ask */}
                  {activeFeatureTab === 0 && (
                    <div className="w-full max-w-[400px] space-y-[12px]">
                      <div className="bg-[#F7F7F5] rounded-[12px] border border-[#ebebea] p-[14px] shadow-sm">
                        <div className="flex items-center gap-[8px] mb-[8px]">
                          <div className="w-[6px] h-[6px] bg-[#1D9E75] rounded-full"></div>
                          <span className="text-[12px] font-[500] text-[#888780]">Claiv AI</span>
                        </div>
                        <p className="text-[14px] text-[#1a1a18] leading-[1.6]">SaaS clients are eligible for a full refund within 14 days...</p>
                        <div className="flex gap-[6px] mt-[10px]">
                          <span className="bg-[#E1F5EE] text-[#085041] text-[10px] font-[500] rounded-[5px] px-[8px] py-[2px]">📄 Refund Policy v2.pdf</span>
                        </div>
                      </div>
                      <div className="bg-[#F7F7F5] rounded-[12px] border border-[#ebebea] p-[12px] flex items-center gap-[8px]">
                        <Search size={16} className="text-[#D3D1C7]" />
                        <span className="text-[13px] text-[#D3D1C7]">Ask a follow-up question...</span>
                      </div>
                    </div>
                  )}
                  {/* Tab 1 — Ingest */}
                  {activeFeatureTab === 1 && (
                    <div className="w-full max-w-[360px] space-y-[10px]">
                      {['Google Drive', 'Notion', 'Confluence', 'Slack'].map((src, i) => (
                        <div key={i} className="bg-[#F7F7F5] rounded-[12px] border border-[#ebebea] p-[14px] flex items-center justify-between shadow-sm">
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
                      <div className="bg-[#F7F7F5] rounded-[12px] border border-[#ebebea] p-[16px] shadow-sm">
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
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-24 px-6 md:px-12 bg-white pb-32 border-b border-[#f0f0ee]">
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
      </main>

      {/* FOOTER */}
      <footer className="bg-white pt-20 pb-10 px-6 md:px-12">
        <div className="max-w-[1000px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-10 lg:gap-16 mb-20">
            <div className="col-span-2 md:col-span-2 lg:col-span-3">
              <div className="flex items-center mb-6">
                <img src="/claiv-logo.svg" alt="Claiv Logo" className="h-7 w-auto" />
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

      {/* Bottom Gradient Bar */}
      <div className="w-full h-[6px] bg-gradient-to-r from-[#04342C] via-[#0F6E56] to-[#1D9E75]" />
    </div>
  );
}
