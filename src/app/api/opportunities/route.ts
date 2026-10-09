import { NextResponse } from 'next/server';
import { getOpportunities, addOpportunity } from '@/lib/db';
import { isRequestAuthorized } from '@/lib/auth';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category') || undefined;
  const search = searchParams.get('search') || undefined;
  const status = searchParams.get('status') || undefined;

  const list = getOpportunities(category, search, status);
  return NextResponse.json({ opportunities: list, count: list.length });
}

export async function POST(req: Request) {
  if (!isRequestAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, category, companyOrOrg, location, type, stipendOrPerks, description, requirements, deadline, status } = body;

    if (!title || !category || !companyOrOrg || !description) {
      return NextResponse.json({ error: 'Title, category, company/org, and description are required' }, { status: 400 });
    }

    const opp = addOpportunity({
      title: title.trim(),
      category,
      companyOrOrg: companyOrOrg.trim(),
      location: location || 'Remote',
      type: type || 'Internship',
      stipendOrPerks: stipendOrPerks || 'Stipend provided',
      description: description.trim(),
      requirements: Array.isArray(requirements) ? requirements : (requirements ? requirements.split('\n').filter(Boolean) : []),
      deadline: deadline || '2026-12-31',
      status: status || 'Open'
    });

    return NextResponse.json({ success: true, opportunity: opp }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
