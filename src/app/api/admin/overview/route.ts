import { NextResponse } from 'next/server';
import { getDB } from '@/lib/db';
import { isRequestAuthorized } from '@/lib/auth';

export async function GET(req: Request) {
  if (!isRequestAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = getDB();

  return NextResponse.json({
    metrics: {
      totalMembers: db.communityMembers.length,
      totalOpportunities: db.opportunities.length,
      openOpportunities: db.opportunities.filter(o => o.status === 'Open').length,
      totalApplications: db.opportunityApplications.length,
      totalEvents: db.events.length,
      upcomingEvents: db.events.filter(e => e.status === 'Upcoming').length,
      eventRegistrationsCount: db.eventRegistrations.length,
      volunteerApplicationsCount: db.volunteerApplications.length,
      pendingVolunteerCount: db.volunteerApplications.filter(v => v.status === 'Pending').length,
      totalMeetings: db.onlineMeetings.length,
      meetingRegistrationsCount: db.meetingRegistrations.length,
      totalEnquiries: db.serviceEnquiries.length,
      newEnquiriesCount: db.serviceEnquiries.filter(e => e.status === 'New').length,
      activeTeamMembersCount: db.teamMembers.filter(t => t.isActive).length,
      totalPlacementsCount: db.placements.length,
      unreadMessagesCount: db.contactMessages.filter(m => m.status === 'Unread').length
    },
    data: db
  });
}
