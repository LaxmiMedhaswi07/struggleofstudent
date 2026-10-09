import { NextResponse } from 'next/server';
import { getDB, addServiceEnquiry, updateServiceEnquiryStatus } from '@/lib/db';
import { isRequestAuthorized } from '@/lib/auth';

export async function GET(req: Request) {
  if (!isRequestAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const db = getDB();
  return NextResponse.json({ enquiries: db.serviceEnquiries });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { serviceId, serviceName, clientName, email, phone, organizationOrCollege, requirements, budgetOrTimeline } = body;

    if (!serviceId || !serviceName || !clientName || !email || !phone || !requirements) {
      return NextResponse.json({ error: 'Please provide all required enquiry details.' }, { status: 400 });
    }

    const enquiry = addServiceEnquiry({
      serviceId,
      serviceName,
      clientName: clientName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      organizationOrCollege: (organizationOrCollege || '').trim(),
      requirements: requirements.trim(),
      budgetOrTimeline: (budgetOrTimeline || '').trim()
    });

    return NextResponse.json({
      success: true,
      enquiry,
      message: 'Thank you! Your enquiry has been received. The SS vertical coordinator will reach out shortly.'
    }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to submit enquiry' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  if (!isRequestAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, status } = await req.json();
    const updated = updateServiceEnquiryStatus(id, status);
    if (!updated) {
      return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, enquiry: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
