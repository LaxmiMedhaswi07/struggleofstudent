import { NextResponse } from 'next/server';
import { registerForMeeting } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { meetingId, name, email, college } = await req.json();

    if (!meetingId || !name || !email || !college) {
      return NextResponse.json({ error: 'All fields required' }, { status: 400 });
    }

    const reg = registerForMeeting({
      meetingId,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      college: college.trim()
    });

    return NextResponse.json({
      success: true,
      registration: reg,
      message: 'Registered for online meeting! Access link is confirmed.'
    }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Registration failed' }, { status: 400 });
  }
}
