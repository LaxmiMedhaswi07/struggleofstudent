import { NextResponse } from 'next/server';
import { getEvents, addEvent } from '@/lib/db';
import { isRequestAuthorized } from '@/lib/auth';

export async function GET() {
  const events = getEvents();
  return NextResponse.json({ events, count: events.length });
}

export async function POST(req: Request) {
  if (!isRequestAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, date, time, location, type, description, bannerImage, maxCapacity, volunteerCapacity, speakers } = body;

    if (!title || !date || !time || !location) {
      return NextResponse.json({ error: 'Title, date, time, and location are required' }, { status: 400 });
    }

    const event = addEvent({
      title: title.trim(),
      date,
      time,
      location: location.trim(),
      type: type || 'In-Person',
      description: description || '',
      bannerImage: bannerImage || 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
      maxCapacity: Number(maxCapacity) || 200,
      volunteerCapacity: Number(volunteerCapacity) || 10,
      status: 'Upcoming',
      speakers: Array.isArray(speakers) ? speakers : []
    });

    return NextResponse.json({ success: true, event }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
