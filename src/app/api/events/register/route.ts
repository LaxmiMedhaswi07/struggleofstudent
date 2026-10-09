import { NextResponse } from 'next/server';
import { registerForEvent } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { eventId, name, email, phone, college } = body;

    if (!eventId || !name || !email || !phone || !college) {
      return NextResponse.json({ error: 'All fields are required for event registration' }, { status: 400 });
    }

    const registration = registerForEvent({
      eventId,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      college: college.trim()
    });

    return NextResponse.json({
      success: true,
      registration,
      message: `Successfully registered! Your ticket code is ${registration.ticketCode}.`
    }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Registration failed' }, { status: 400 });
  }
}
