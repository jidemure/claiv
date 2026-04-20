"use client";
import React from 'react';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 font-sans">
      <div className="max-w-sm w-full bg-white border border-[#ebebea] rounded-[20px] p-10 text-center shadow-sm">
        <div className="w-16 h-16 rounded-full bg-[#FCEBEB] border border-[#F7C1C1] flex items-center justify-center mx-auto mb-5">
          <ShieldCheck size={28} className="text-[#E24B4A]" />
        </div>
        <h1 className="text-[26px] font-semibold tracking-[-0.02em] text-[#111] mb-3">Access Denied</h1>
        <p className="text-[14px] text-[#888780] mb-8 leading-[1.6]">
          You don&apos;t have the required permissions to view this page. Please contact your administrator.
        </p>
        <Link href="/" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#5F5E5A] border border-[#ddd] rounded-[10px] text-[14px] font-medium hover:border-[#1D9E75] hover:text-[#0F6E56] transition-all">
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>
    </div>
  );
}
