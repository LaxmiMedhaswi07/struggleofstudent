import { NextResponse } from 'next/server';
import { updateOpportunity, deleteOpportunity } from '@/lib/db';
import { isRequestAuthorized } from '@/lib/auth';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  if (!isRequestAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const updated = updateOpportunity(params.id, body);
    if (!updated) {
      return NextResponse.json({ error: 'Opportunity not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, opportunity: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  if (!isRequestAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const deleted = deleteOpportunity(params.id);
  if (!deleted) {
    return NextResponse.json({ error: 'Opportunity not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true, message: 'Deleted opportunity' });
}
