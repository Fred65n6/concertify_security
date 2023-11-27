import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isAdminPath = path === '/admin-dashboard' || path === '/admin-artist' || path === '/admin-concerts' || path === '/admin-upload-artist' || path === '/admin-uploadconcert' || path === '/admin-upload-venue' || path === '/admin-venues';
  const isRestrictedPath = path === '/favourites' || path === '/profile' || path === '/profile/${data}';

  const token = request.cookies.get('token')?.value || ''
  const adminToken = request.cookies.get('adminToken')?.value || ''

  if(isAdminPath && !adminToken) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  if (isRestrictedPath && !token && !adminToken) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }
    
}

export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup',
    '/verifyemail',
    '/admin-dashboard',
    '/favourites',
    '/admin-concerts',
    '/admin-venues',
    '/admin-artists',
    '/admin-upload-artist',
    '/admin-upload-venue',
    '/admin-upload-concert',
    '/profile/${data}'
  ]
}

