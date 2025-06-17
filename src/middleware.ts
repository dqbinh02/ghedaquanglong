import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

export async function middleware(request: NextRequest) {
  // Allow access to login route and categories endpoint
  if (request.nextUrl.pathname === '/api/v1/user/login' || 
      request.nextUrl.pathname === '/api/v1/products/categories') {
    return NextResponse.next();
  }

  // Check if the request is for an API route
  if (request.nextUrl.pathname.startsWith('/api/v1/')) {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    try {
      const token = authHeader.split(' ')[1];
      await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
      return NextResponse.next();
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/v1/:path*',
}; 