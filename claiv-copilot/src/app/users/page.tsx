import { cookies } from 'next/headers';
import { getPermissions, AppRole } from '@/lib/rbac';
import { Users as UsersIcon, Plus, Shield, User } from 'lucide-react';
import GlobalShell from '@/components/layout/GlobalShell';

export default async function UserManagement() {
  const cookieStore = await cookies();
  const role = (cookieStore.get('user_role')?.value as AppRole) || 'super_admin';
  const perms = getPermissions(role);

  return (
    <GlobalShell>
      <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#F7F7F5] w-full">
        <div className="max-w-4xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-[26px] font-semibold tracking-[-0.02em] text-[#111]">People Directory</h1>
              <p className="text-[14px] text-[#888780] mt-1.5">
                {perms.canManageOrgUsers 
                  ? "Global Organization User Management" 
                  : "Manage members within your scoped department"}
              </p>
            </div>
            
            <button className="px-4 py-2.5 bg-[#0F6E56] hover:bg-[#085041] text-white rounded-[10px] text-[13px] font-medium transition-colors flex items-center gap-2 active:scale-[0.98]">
              <Plus size={14} /> Invite User
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-4 bg-white border border-[#ebebea] rounded-[14px] flex items-center gap-3.5 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-default">
              <div className="w-10 h-10 rounded-full bg-[#E1F5EE] flex items-center justify-center border border-[#9FE1CB] shrink-0">
                <User size={16} className="text-[#085041]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-[14px] text-[#111]">Alex Chen</h3>
                <p className="text-[12px] text-[#888780] truncate">alex.c@company.internal · Employee</p>
              </div>
              <span className="salix-badge bg-[#F7F7F5] text-[#5F5E5A] text-[11px] border border-[#ebebea] shrink-0">Engineering</span>
            </div>

            <div className="p-4 bg-white border border-[#ebebea] rounded-[14px] flex items-center gap-3.5 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-default">
              <div className="w-10 h-10 rounded-full bg-[#E1F5EE] flex items-center justify-center border border-[#9FE1CB] shrink-0">
                <User size={16} className="text-[#085041]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-[14px] text-[#111]">Fatima Al-Rashid</h3>
                <p className="text-[12px] text-[#888780] truncate">fatima.r@company.internal · Employee</p>
              </div>
              <span className="salix-badge bg-[#F7F7F5] text-[#5F5E5A] text-[11px] border border-[#ebebea] shrink-0">HR</span>
            </div>

            {perms.canManageOrgUsers && (
              <div className="p-4 bg-white border border-[#ebebea] rounded-[14px] flex items-center gap-3.5 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-default">
                <div className="w-10 h-10 rounded-full bg-[#EEEDFE] flex items-center justify-center border border-[#C8C4F3] shrink-0">
                  <Shield size={16} className="text-[#3C3489]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[14px] text-[#111]">Sarah Jenkins</h3>
                  <p className="text-[12px] text-[#888780] truncate">sarah.j@company.internal · Dept Manager</p>
                </div>
                <span className="salix-badge bg-[#F7F7F5] text-[#5F5E5A] text-[11px] border border-[#ebebea] shrink-0">Finance</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </GlobalShell>
  );
}
