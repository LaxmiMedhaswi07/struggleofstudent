export type OpportunityCategory = 
  | 'Internships'
  | 'Jobs'
  | 'Campus Ambassador'
  | 'Volunteering'
  | 'Events'
  | 'Talent Showcase'
  | 'Leadership'
  | 'Workshops/Sessions'
  | 'Projects'
  | 'Collaborations';

export interface CommunityMember {
  id: string;
  memberId: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  courseBranch: string;
  year: string;
  skills: string;
  interests: string;
  city: string;
  registeredAt: string;
}

export interface Opportunity {
  id: string;
  title: string;
  category: OpportunityCategory;
  companyOrOrg: string;
  location: string;
  type: string;
  stipendOrPerks: string;
  description: string;
  requirements: string[];
  deadline: string;
  status: 'Open' | 'Closed';
  applicantsCount: number;
  createdAt: string;
}

export interface OpportunityApplication {
  id: string;
  opportunityId: string;
  opportunityTitle?: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  year: string;
  resumeLink: string;
  portfolio: string;
  statement: string;
  submittedAt: string;
  status: 'Pending' | 'Shortlisted' | 'Interviewed' | 'Rejected' | 'Accepted';
}

export interface EventSpeaker {
  name: string;
  role: string;
  avatar: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: 'Online' | 'In-Person' | 'Hybrid';
  description: string;
  bannerImage: string;
  maxCapacity: number;
  registeredCount: number;
  volunteerCapacity: number;
  volunteerFilled: number;
  status: 'Upcoming' | 'Live' | 'Past';
  speakers: EventSpeaker[];
  createdAt: string;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  eventTitle?: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  ticketCode: string;
  registeredAt: string;
}

export interface VolunteerApplication {
  id: string;
  eventId: string;
  eventTitle?: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  preferredRole: string;
  experience: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  appliedAt: string;
}

export interface OnlineMeeting {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  durationMinutes: number;
  participantCapacity: number;
  participantCount: number;
  meetingLink: string;
  provider: 'Manual' | 'Zoom';
  zoomMeetingId?: string;
  zoomPassword?: string;
  status: 'Scheduled' | 'Live' | 'Completed';
  createdAt: string;
}

export interface MeetingRegistration {
  id: string;
  meetingId: string;
  meetingTitle?: string;
  name: string;
  email: string;
  college: string;
  registeredAt: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  image: string;
  badge: string;
  contactCta: string;
}

export interface ServiceEnquiry {
  id: string;
  serviceId: string;
  serviceName: string;
  clientName: string;
  email: string;
  phone: string;
  organizationOrCollege: string;
  requirements: string;
  budgetOrTimeline: string;
  status: 'New' | 'Contacted' | 'In Progress' | 'Resolved';
  createdAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  shortBio: string;
  photo: string;
  linkedin: string;
  github: string;
  department: string;
  isActive: boolean;
  order: number;
}

export interface LeadershipProfile {
  id: string;
  name: string;
  designation: string;
  bio: string;
  responsibility: string;
  photo: string;
  linkedin: string;
  twitter: string;
  order: number;
}

export interface StudentPlacement {
  id: string;
  studentName: string;
  college: string;
  company: string;
  role: string;
  packageOrStipend: string;
  batch: string;
  successStory: string;
  studentPhoto: string;
  companyLogo: string;
  featured: boolean;
}

export interface HomepageStats {
  communityMembers: number;
  studentsPlaced: number;
  eventsHosted: number;
  partnerColleges: number;
  volunteerHours: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'Unread' | 'Replied';
  createdAt: string;
}

export interface DBData {
  communityMembers: CommunityMember[];
  opportunities: Opportunity[];
  opportunityApplications: OpportunityApplication[];
  events: EventItem[];
  eventRegistrations: EventRegistration[];
  volunteerApplications: VolunteerApplication[];
  onlineMeetings: OnlineMeeting[];
  meetingRegistrations: MeetingRegistration[];
  services: ServiceItem[];
  serviceEnquiries: ServiceEnquiry[];
  teamMembers: TeamMember[];
  leadership: LeadershipProfile[];
  placements: StudentPlacement[];
  stats: HomepageStats;
  contactMessages: ContactMessage[];
}
