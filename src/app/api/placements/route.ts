import { NextResponse } from 'next/server';
import { getPlacements, addPlacement, updatePlacement, deletePlacement } from '@/lib/db';
import { isRequestAuthorized } from '@/lib/auth';

export async function GET() {
  const placements = getPlacements();
  return NextResponse.json({ placements, count: placements.length });
}

export async function POST(req: Request) {
  if (!isRequestAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { studentName, college, company, role, packageOrStipend, batch, successStory, studentPhoto, companyLogo, featured } = body;

    if (!studentName || !college || !company || !role) {
      return NextResponse.json({ error: 'Student name, college, company, and role are required' }, { status: 400 });
    }

    const placement = addPlacement({
      studentName: studentName.trim(),
      college: college.trim(),
      company: company.trim(),
      role: role.trim(),
      packageOrStipend: packageOrStipend || 'Competitive Package',
      batch: batch || '2026 Batch',
      successStory: successStory || '',
      studentPhoto: studentPhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      companyLogo: companyLogo || '',
      featured: featured !== undefined ? Boolean(featured) : true
    });

    return NextResponse.json({ success: true, placement }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  if (!isRequestAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, ...updates } = await req.json();
    const updated = updatePlacement(id, updates);
    if (!updated) {
      return NextResponse.json({ error: 'Placement record not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, placement: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  if (!isRequestAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    const deleted = deletePlacement(id);
    if (!deleted) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    return NextResponse.json({ success: true, message: 'Placement deleted' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
