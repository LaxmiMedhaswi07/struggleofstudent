import { NextResponse } from 'next/server';
import { getHomepageStats, updateHomepageStats } from '@/lib/db';
import { isRequestAuthorized } from '@/lib/auth';

export async function GET() {
  const stats = getHomepageStats();
  return NextResponse.json({ stats });
}

export async function PUT(req: Request) {
  if (!isRequestAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const updated = updateHomepageStats(body);
    return NextResponse.json({ success: true, stats: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
