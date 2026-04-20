export type AppRole = 'super_admin' | 'admin' | 'dept_manager' | 'employee' | 'guest';

// Role Hierarchy for comparison checks
const ROLE_RANK: Record<AppRole, number> = {
  super_admin: 50,
  admin: 40,
  dept_manager: 30,
  employee: 20,
  guest: 10
};

// Feature Flags Definition Context Structure
export interface RBACFlags {
  canViewGlobalAnalytics: boolean;      // SuperAdmin
  canManageOrgUsers: boolean;           // Admin + SuperAdmin
  canManageDepartment: boolean;         // DeptManager + Admin + SuperAdmin
  canUploadDocuments: boolean;          // DeptManager + Admin + SuperAdmin
  canViewIngestPipeline: boolean;       // Admin + SuperAdmin
  canEngageChat: boolean;               // Everyone except Guest (Read-Only)
  canViewAllOrgDocuments: boolean;      // Admin + SuperAdmin
  isScopedToDepartment: boolean;        // Employee + DeptManager
}

// Global hook/utility for fetching current permissions given a role
export function getPermissions(role: AppRole): RBACFlags {
  const rank = ROLE_RANK[role] || 10;
  return {
    canViewGlobalAnalytics: rank >= ROLE_RANK.super_admin,
    canManageOrgUsers: rank >= ROLE_RANK.admin,
    canManageDepartment: rank >= ROLE_RANK.dept_manager,
    canUploadDocuments: rank >= ROLE_RANK.dept_manager,
    canViewIngestPipeline: rank >= ROLE_RANK.admin,
    canEngageChat: rank > ROLE_RANK.guest,
    canViewAllOrgDocuments: rank >= ROLE_RANK.admin,
    isScopedToDepartment: rank === ROLE_RANK.dept_manager || rank === ROLE_RANK.employee
  };
}
