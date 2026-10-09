import { NextResponse } from 'next/server';
import { getLeadership, updateLeadershipProfile } from '@/lib/db';
import { isRequestAuthorized } from '@/lib/auth';

export async function GET() {
  const leadership = getLeadership();
  return NextResponse.json({ leadership });
}

export async function PUT(req: Request) {
  if (!isRequestAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, ...updates } = await req.json();
    const updated = updateLeadershipProfile(id, updates);
    if (!updated) {
      return NextResponse.json({ error: 'Leadership profile not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, leadership: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
