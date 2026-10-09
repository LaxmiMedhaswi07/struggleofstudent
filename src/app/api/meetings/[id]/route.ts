import { NextResponse } from 'next/server';
import { updateOnlineMeeting, deleteOnlineMeeting } from '@/lib/db';
import { isRequestAuthorized } from '@/lib/auth';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  if (!isRequestAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const updated = updateOnlineMeeting(params.id, body);
    if (!updated) {
      return NextResponse.json({ error: 'Meeting not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, meeting: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  if (!isRequestAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const deleted = deleteOnlineMeeting(params.id);
  if (!deleted) {
    return NextResponse.json({ error: 'Meeting not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true, message: 'Meeting deleted' });
}
