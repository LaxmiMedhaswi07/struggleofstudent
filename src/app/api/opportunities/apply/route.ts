import { NextResponse } from 'next/server';
import { applyForOpportunity } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { opportunityId, name, email, phone, college, year, resumeLink, portfolio, statement } = body;

    if (!opportunityId || !name || !email || !phone || !college) {
      return NextResponse.json({ error: 'Please provide all required fields' }, { status: 400 });
    }

    const application = applyForOpportunity({
      opportunityId,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      college: college.trim(),
      year: year || '3rd Year',
      resumeLink: resumeLink || '',
      portfolio: portfolio || '',
      statement: statement || ''
    });

    return NextResponse.json({ 
      success: true, 
      application,
      message: 'Application submitted successfully! Our team will review and get in touch with you.' 
    }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Application submission failed' }, { status: 500 });
  }
}
