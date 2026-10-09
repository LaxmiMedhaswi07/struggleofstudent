import { NextResponse } from 'next/server';
import { addContactMessage } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { name, email, phone, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }

    const msg = addContactMessage({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: (phone || '').trim(),
      subject: subject || 'General Query',
      message: message.trim()
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been sent to the SS support team.'
    }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to submit' }, { status: 500 });
  }
}
