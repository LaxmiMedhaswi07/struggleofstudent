import { NextResponse } from 'next/server';
import { isRequestAuthorized } from '@/lib/auth';

export async function GET(req: Request) {
  const authorized = isRequestAuthorized(req);
  if (!authorized) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true, role: 'admin' });
}
