import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AppRole } from './lib/rbac';

// Mock role-based routing map mapping explicit capabilities per the PRD specification
const roleAccess: Record<AppRole, string[]> = {
  super_admin: ['/dashboard', '/knowledge', '/chat', '/history', '/settings', '/users', '/ingest', '/projects', '/project'],
  admin: ['/dashboard', '/knowledge', '/chat', '/history', '/settings', '/users', '/ingest', '/projects', '/project'],
  dept_manager: ['/dashboard', '/knowledge', '/chat', '/history', '/settings', '/projects', '/project'],
  employee: ['/dashboard', '/knowledge', '/chat', '/history', '/projects', '/project'],
  guest: ['/dashboard', '/chat'] // Guest can see a read-only empty dashboard + read-only chat
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Public routes exception
  if (
    pathname === '/' ||
    pathname.startsWith('/auth') || 
    pathname.startsWith('/onboarding') || 
    pathname.startsWith('/_next') || 
    pathname === '/favicon.ico' || 
    pathname === '/unauthorized' ||
    pathname === '/pricing' ||
    pathname.startsWith('/api')
  ) {
    return NextResponse.next();
  }

  // TODO: Replace with actual Supabase Auth check
  // For demo/skeleton purposes, assuming an authenticated user context defaults to employee unless overridden
  const mockUserRole = (request.cookies.get('user_role')?.value as AppRole) || 'super_admin';

  const allowedRoutes = roleAccess[mockUserRole] || [];
  
  // Explicitly check exact root or if pathname starts with allowed route (like /knowledge/upload)
  const isAllowed = allowedRoutes.some(route => 
    route === '/' ? pathname === '/' : pathname.startsWith(route)
  );

  if (!isAllowed) {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
