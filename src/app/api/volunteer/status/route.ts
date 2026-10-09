import { NextResponse } from 'next/server';
import { updateVolunteerStatus } from '@/lib/db';
import { isRequestAuthorized } from '@/lib/auth';

export async function PUT(req: Request) {
  if (!isRequestAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { applicationId, status } = await req.json();
    if (!applicationId || !['Approved', 'Rejected'].includes(status)) {
      return NextResponse.json({ error: 'Invalid application ID or status' }, { status: 400 });
    }

    const updated = updateVolunteerStatus(applicationId, status);
    if (!updated) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, application: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
