import { cookies } from 'next/headers';
import { getPermissions, AppRole } from '@/lib/rbac';
import { FileText, UploadCloud, Lock, FileArchive } from 'lucide-react';
import GlobalShell from '@/components/layout/GlobalShell';

export default async function KnowledgeBase() {
  const cookieStore = await cookies();
  const role = (cookieStore.get('user_role')?.value as AppRole) || 'super_admin';
  const perms = getPermissions(role);

  return (
    <GlobalShell>
      <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#F7F7F5] w-full">
        <div className="bg-white border border-[#ebebea] rounded-[14px] p-6 max-w-5xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-[26px] font-semibold tracking-[-0.02em] text-[#111]">Knowledge Base</h1>
              <p className="text-[14px] text-[#888780] mt-1">
                {perms.canViewAllOrgDocuments 
                  ? "Global repository of all organizational vector-indexed documents."
                  : "Documents indexed within your department boundary."}
              </p>
            </div>
            
            {perms.canUploadDocuments && (
              <button className="px-4 py-2.5 bg-[#0F6E56] hover:bg-[#085041] text-white rounded-[10px] text-[13px] font-medium transition-colors flex items-center gap-2 active:scale-[0.98]">
                <UploadCloud size={14} /> Upload docs
              </button>
            )}
          </div>

          <div className="rounded-xl border border-[#ebebea] overflow-hidden">
            <table className="w-full text-[13px] text-left">
              <thead className="text-[11px] text-[#888780] bg-[#F7F7F5] uppercase tracking-[0.04em]">
                <tr>
                  <th className="px-5 py-3 font-medium">Document Name</th>
                  <th className="px-5 py-3 font-medium">Department</th>
                  <th className="px-5 py-3 font-medium">Type</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f0ee]">
                <tr className="hover:bg-[#F7F7F5] transition-colors">
                  <td className="px-5 py-3.5 flex items-center gap-2.5 text-[#111] font-medium">
                    <FileText size={14} className="text-[#1D9E75]" />
                    Employee_Handbook_2026.pdf
                  </td>
                  <td className="px-5 py-3.5 text-[#888780]">Global</td>
                  <td className="px-5 py-3.5 text-[#888780]">PDF</td>
                  <td className="px-5 py-3.5"><span className="salix-badge bg-[#E1F5EE] text-[#085041] text-[11px]"><span className="w-1.5 h-1.5 bg-[#1D9E75] rounded-full"></span>Vectorized</span></td>
                </tr>

                {(perms.canViewAllOrgDocuments || !perms.isScopedToDepartment) && (
                  <tr className="hover:bg-[#F7F7F5] transition-colors">
                    <td className="px-5 py-3.5 flex items-center gap-2.5 text-[#111] font-medium">
                      <FileArchive size={14} className="text-[#3C3489]" />
                      Q3_Financial_Projections.xlsx
                    </td>
                    <td className="px-5 py-3.5 text-[#3C3489] flex items-center gap-1.5">
                      <Lock size={10} /> Finance
                    </td>
                    <td className="px-5 py-3.5 text-[#888780]">CSV</td>
                    <td className="px-5 py-3.5"><span className="salix-badge bg-[#E1F5EE] text-[#085041] text-[11px]"><span className="w-1.5 h-1.5 bg-[#1D9E75] rounded-full"></span>Vectorized</span></td>
                  </tr>
                )}

                {!perms.canViewAllOrgDocuments && perms.isScopedToDepartment && (
                   <tr className="hover:bg-[#F7F7F5] transition-colors">
                    <td className="px-5 py-3.5 flex items-center gap-2 text-[#888780] italic" colSpan={4}>
                      <Lock size={12} /> 124 other documents are hidden by your department RLS policy.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </GlobalShell>
  );
}
