import { NextResponse } from 'next/server';
import { applyAsVolunteer, getEvents } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { eventId, name, email, phone, college, preferredRole, experience } = body;

    if (!eventId || !name || !email || !phone || !college || !preferredRole) {
      return NextResponse.json({ error: 'Please provide all required volunteer details.' }, { status: 400 });
    }

    // Double check event capacity
    const events = getEvents();
    const event = events.find(e => e.id === eventId);
    if (!event) {
      return NextResponse.json({ error: 'Event not found.' }, { status: 404 });
    }

    if (event.volunteerFilled >= event.volunteerCapacity) {
      return NextResponse.json({ 
        error: 'Volunteer Slots Full.', 
        slotsFull: true,
        filled: event.volunteerFilled,
        capacity: event.volunteerCapacity
      }, { status: 400 });
    }

    const application = applyAsVolunteer({
      eventId,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      college: college.trim(),
      preferredRole: preferredRole.trim(),
      experience: experience ? experience.trim() : ''
    });

    return NextResponse.json({
      success: true,
      application,
      message: 'Volunteer application submitted successfully! Our events coordinator will contact you shortly.'
    }, { status: 201 });
  } catch (err: any) {
    if (err.message === 'Volunteer Slots Full.') {
      return NextResponse.json({ error: 'Volunteer Slots Full.', slotsFull: true }, { status: 400 });
    }
    return NextResponse.json({ error: err.message || 'Failed to submit application' }, { status: 400 });
  }
}
