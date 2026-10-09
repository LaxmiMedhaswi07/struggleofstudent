import { NextResponse } from 'next/server';
import { getTeamMembers, addTeamMember, updateTeamMember, deleteTeamMember } from '@/lib/db';
import { isRequestAuthorized } from '@/lib/auth';

export async function GET() {
  const members = getTeamMembers();
  const activeCount = members.filter(m => m.isActive).length;
  return NextResponse.json({ members, activeCount, total: members.length });
}

export async function POST(req: Request) {
  if (!isRequestAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, designation, shortBio, photo, linkedin, github, department, isActive, order } = body;

    if (!name || !designation) {
      return NextResponse.json({ error: 'Name and designation are required' }, { status: 400 });
    }

    const member = addTeamMember({
      name: name.trim(),
      designation: designation.trim(),
      shortBio: shortBio || '',
      photo: photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      linkedin: linkedin || '',
      github: github || '',
      department: department || 'General',
      isActive: isActive !== undefined ? Boolean(isActive) : true,
      order: Number(order) || 1
    });

    return NextResponse.json({ success: true, member }, { status: 201 });
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
    const updated = updateTeamMember(id, updates);
    if (!updated) {
      return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, member: updated });
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

    const deleted = deleteTeamMember(id);
    if (!deleted) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    return NextResponse.json({ success: true, message: 'Member deleted' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
