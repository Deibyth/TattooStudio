import { NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rate-limiter';

export async function middleware(request: Request) {
  // Solo aplicar rate limiting a rutas /api/*
  if (!request.url.includes('/api/')) {
    return NextResponse.next();
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const { success, limit, remaining, reset } = await rateLimit(ip);

  const headers = new Headers();
  headers.set('X-RateLimit-Limit', limit.toString());
  headers.set('X-RateLimit-Remaining', remaining.toString());
  headers.set('X-RateLimit-Reset', reset.toString());

  if (!success) {
    return new NextResponse(
      JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          ...Object.fromEntries(headers),
        },
      }
    );
  }

  const response = NextResponse.next();
  response.headers.set('X-RateLimit-Limit', limit.toString());
  response.headers.set('X-RateLimit-Remaining', remaining.toString());
  response.headers.set('X-RateLimit-Reset', reset.toString());
  return response;
}

export const config = {
  matcher: ['/api/:path*'],
};