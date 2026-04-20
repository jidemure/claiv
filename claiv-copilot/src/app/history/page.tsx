import { cookies } from 'next/headers';
import { getPermissions, AppRole } from '@/lib/rbac';
import { Clock, MessageSquare, ChevronRight } from 'lucide-react';
import GlobalShell from '@/components/layout/GlobalShell';

export default async function HistoryPage() {
  const cookieStore = await cookies();
  const role = (cookieStore.get('user_role')?.value as AppRole) || 'super_admin';
  const perms = getPermissions(role);

  return (
    <GlobalShell>
      <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#F7F7F5] w-full">
        <div className="max-w-3xl">
          <div className="mb-6">
            <h1 className="text-[26px] font-semibold tracking-[-0.02em] text-[#111] flex items-center gap-2.5">
              <Clock size={22} className="text-[#888780]" /> Conversation History
            </h1>
            <p className="text-[14px] text-[#888780] mt-1.5">
              View your past interactions with Claiv.
            </p>
          </div>

          <div className="space-y-2.5">
            <div className="p-4 bg-white border border-[#ebebea] rounded-[14px] flex items-center justify-between hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group">
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-full bg-[#E1F5EE] flex items-center justify-center shrink-0">
                  <MessageSquare size={16} className="text-[#0F6E56]" />
                </div>
                <div>
                  <h3 className="text-[14px] font-semibold text-[#111]">&quot;What is the Q3 Marketing budget?&quot;</h3>
                  <p className="text-[12px] text-[#888780] mt-0.5">Today at 10:43 AM · 4 messages</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-[#D3D1C7] group-hover:text-[#0F6E56] transition-colors" />
            </div>

            <div className="p-4 bg-white border border-[#ebebea] rounded-[14px] flex items-center justify-between hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group">
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-full bg-[#E1F5EE] flex items-center justify-center shrink-0">
                  <MessageSquare size={16} className="text-[#0F6E56]" />
                </div>
                <div>
                  <h3 className="text-[14px] font-semibold text-[#111]">&quot;Summarize the new HR Leave Policy changes.&quot;</h3>
                  <p className="text-[12px] text-[#888780] mt-0.5">Yesterday · 12 messages</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-[#D3D1C7] group-hover:text-[#0F6E56] transition-colors" />
            </div>

            <div className="p-4 bg-white border border-[#ebebea] rounded-[14px] flex items-center justify-between hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group">
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-full bg-[#E1F5EE] flex items-center justify-center shrink-0">
                  <MessageSquare size={16} className="text-[#0F6E56]" />
                </div>
                <div>
                  <h3 className="text-[14px] font-semibold text-[#111]">&quot;Show me the onboarding steps for new hires.&quot;</h3>
                  <p className="text-[12px] text-[#888780] mt-0.5">3 days ago · 7 messages</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-[#D3D1C7] group-hover:text-[#0F6E56] transition-colors" />
            </div>

            {perms.canViewGlobalAnalytics && (
              <div className="mt-8 pt-6 border-t border-[#f0f0ee]">
                <h3 className="text-[12px] font-semibold text-[#888780] uppercase tracking-[0.05em] mb-3">Admin Audit Mode</h3>
                <p className="text-[13px] text-[#888780] mb-4 leading-[1.6]">
                  As Super Admin, you also have access to the global query audit log for compliance.
                </p>
                <button className="px-4 py-2.5 bg-white border border-[#ddd] rounded-[10px] text-[13px] font-medium text-[#5F5E5A] hover:border-[#1D9E75] hover:text-[#0F6E56] transition-all">
                  View Global Query Log
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </GlobalShell>
  );
}
