import { NextResponse } from 'next/server';
import { getDB, addCommunityMember } from '@/lib/db';
import { isRequestAuthorized } from '@/lib/auth';

export async function GET(req: Request) {
  if (!isRequestAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const db = getDB();
  return NextResponse.json({ members: db.communityMembers, total: db.communityMembers.length });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, college, courseBranch, year, skills, interests, city } = body;

    // Validate required fields
    if (!name || !email || !phone || !college || !courseBranch || !year || !city) {
      return NextResponse.json(
        { error: 'Please provide all required fields: name, email, phone, college, course/branch, year, and city.' }, 
        { status: 400 }
      );
    }

    // Check if email already registered
    const db = getDB();
    const existing = db.communityMembers.find(m => m.email.toLowerCase() === email.trim().toLowerCase());
    if (existing) {
      return NextResponse.json({
        success: true,
        alreadyMember: true,
        member: existing,
        message: 'You are already an official member of Struggle of Student!'
      });
    }

    const member = addCommunityMember({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      college: college.trim(),
      courseBranch: courseBranch.trim(),
      year: year.trim(),
      skills: (skills || '').trim(),
      interests: (interests || '').trim(),
      city: city.trim()
    });

    return NextResponse.json({
      success: true,
      member,
      message: 'Welcome to Struggle of Student! Your membership has been activated.'
    }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to register' }, { status: 500 });
  }
}
