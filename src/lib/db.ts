import fs from 'fs';
import path from 'path';
import { initialData } from './seed';
import { 
  DBData, 
  CommunityMember, 
  Opportunity, 
  OpportunityApplication,
  EventItem, 
  EventRegistration, 
  VolunteerApplication, 
  OnlineMeeting, 
  MeetingRegistration,
  ServiceItem, 
  ServiceEnquiry, 
  TeamMember, 
  LeadershipProfile, 
  StudentPlacement, 
  HomepageStats, 
  ContactMessage 
} from './types';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Ensure database directory and file exist
function initDB(): DBData {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
      return initialData;
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    console.error('Error initializing or reading DB, using initial data:', error);
    return initialData;
  }
}

export function getDB(): DBData {
  return initDB();
}

export function saveDB(data: DBData): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving DB:', error);
  }
}

// 1. Community Members
export function addCommunityMember(memberData: Omit<CommunityMember, 'id' | 'memberId' | 'registeredAt'>): CommunityMember {
  const db = getDB();
  const count = db.communityMembers.length + 1;
  const memberId = `SS-${new Date().getFullYear()}-${String(count).padStart(4, '0')}`;
  const newMember: CommunityMember = {
    ...memberData,
    id: `cm-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    memberId,
    registeredAt: new Date().toISOString()
  };
  db.communityMembers.unshift(newMember);
  db.stats.communityMembers += 1;
  saveDB(db);
  return newMember;
}

// 2. Opportunities
export function getOpportunities(filterCategory?: string, search?: string, status?: string): Opportunity[] {
  const db = getDB();
  let list = db.opportunities;
  if (filterCategory && filterCategory !== 'All') {
    list = list.filter(o => o.category === filterCategory);
  }
  if (status && status !== 'All') {
    list = list.filter(o => o.status === status);
  }
  if (search && search.trim() !== '') {
    const q = search.toLowerCase();
    list = list.filter(o => 
      o.title.toLowerCase().includes(q) || 
      o.companyOrOrg.toLowerCase().includes(q) ||
      o.description.toLowerCase().includes(q)
    );
  }
  return list;
}

export function addOpportunity(oppData: Omit<Opportunity, 'id' | 'applicantsCount' | 'createdAt'>): Opportunity {
  const db = getDB();
  const newOpp: Opportunity = {
    ...oppData,
    id: `opp-${Date.now()}`,
    applicantsCount: 0,
    createdAt: new Date().toISOString()
  };
  db.opportunities.unshift(newOpp);
  saveDB(db);
  return newOpp;
}

export function updateOpportunity(id: string, updates: Partial<Opportunity>): Opportunity | null {
  const db = getDB();
  const index = db.opportunities.findIndex(o => o.id === id);
  if (index === -1) return null;
  db.opportunities[index] = { ...db.opportunities[index], ...updates };
  saveDB(db);
  return db.opportunities[index];
}

export function deleteOpportunity(id: string): boolean {
  const db = getDB();
  const before = db.opportunities.length;
  db.opportunities = db.opportunities.filter(o => o.id !== id);
  if (db.opportunities.length !== before) {
    saveDB(db);
    return true;
  }
  return false;
}

export function applyForOpportunity(appData: Omit<OpportunityApplication, 'id' | 'submittedAt' | 'status'>): OpportunityApplication {
  const db = getDB();
  const opp = db.opportunities.find(o => o.id === appData.opportunityId);
  const newApp: OpportunityApplication = {
    ...appData,
    opportunityTitle: opp ? opp.title : appData.opportunityTitle,
    id: `app-${Date.now()}`,
    submittedAt: new Date().toISOString(),
    status: 'Pending'
  };
  db.opportunityApplications.unshift(newApp);
  if (opp) {
    opp.applicantsCount = (opp.applicantsCount || 0) + 1;
  }
  saveDB(db);
  return newApp;
}

// 3. Events
export function getEvents(): EventItem[] {
  const db = getDB();
  return db.events;
}

export function addEvent(eventData: Omit<EventItem, 'id' | 'registeredCount' | 'volunteerFilled' | 'createdAt'>): EventItem {
  const db = getDB();
  const newEvent: EventItem = {
    ...eventData,
    id: `evt-${Date.now()}`,
    registeredCount: 0,
    volunteerFilled: 0,
    createdAt: new Date().toISOString()
  };
  db.events.unshift(newEvent);
  db.stats.eventsHosted += 1;
  saveDB(db);
  return newEvent;
}

export function updateEvent(id: string, updates: Partial<EventItem>): EventItem | null {
  const db = getDB();
  const index = db.events.findIndex(e => e.id === id);
  if (index === -1) return null;
  db.events[index] = { ...db.events[index], ...updates };
  saveDB(db);
  return db.events[index];
}

export function deleteEvent(id: string): boolean {
  const db = getDB();
  const before = db.events.length;
  db.events = db.events.filter(e => e.id !== id);
  if (db.events.length !== before) {
    saveDB(db);
    return true;
  }
  return false;
}

export function registerForEvent(regData: Omit<EventRegistration, 'id' | 'ticketCode' | 'registeredAt'>): EventRegistration {
  const db = getDB();
  const event = db.events.find(e => e.id === regData.eventId);
  if (!event) throw new Error('Event not found');
  if (event.registeredCount >= event.maxCapacity) {
    throw new Error('Event registrations are at full capacity.');
  }

  const ticketCode = `EVT-SS-${Math.floor(1000 + Math.random() * 9000)}`;
  const newReg: EventRegistration = {
    ...regData,
    eventTitle: event.title,
    id: `ereg-${Date.now()}`,
    ticketCode,
    registeredAt: new Date().toISOString()
  };
  event.registeredCount += 1;
  db.eventRegistrations.unshift(newReg);
  saveDB(db);
  return newReg;
}

// 4. Volunteer System with Capacity Enforcement
export function applyAsVolunteer(volData: Omit<VolunteerApplication, 'id' | 'appliedAt' | 'status'>): VolunteerApplication {
  const db = getDB();
  const event = db.events.find(e => e.id === volData.eventId);
  if (!event) throw new Error('Event not found');

  // Enforce capacity check
  if (event.volunteerFilled >= event.volunteerCapacity) {
    throw new Error('Volunteer Slots Full.');
  }

  const newVol: VolunteerApplication = {
    ...volData,
    eventTitle: event.title,
    id: `vol-${Date.now()}`,
    appliedAt: new Date().toISOString(),
    status: 'Pending'
  };

  // Pre-increment filled slots on valid application or reserve slot
  event.volunteerFilled += 1;
  db.volunteerApplications.unshift(newVol);
  db.stats.volunteerHours += 8; // average volunteer block
  saveDB(db);
  return newVol;
}

export function updateVolunteerCapacity(eventId: string, newCapacity: number): EventItem | null {
  const db = getDB();
  const event = db.events.find(e => e.id === eventId);
  if (!event) return null;
  event.volunteerCapacity = Math.max(0, newCapacity);
  saveDB(db);
  return event;
}

export function updateVolunteerStatus(volId: string, status: 'Approved' | 'Rejected'): VolunteerApplication | null {
  const db = getDB();
  const vol = db.volunteerApplications.find(v => v.id === volId);
  if (!vol) return null;
  const prevStatus = vol.status;
  vol.status = status;

  // If rejected, free up a slot if it was previously counted
  if (status === 'Rejected' && prevStatus !== 'Rejected') {
    const event = db.events.find(e => e.id === vol.eventId);
    if (event && event.volunteerFilled > 0) {
      event.volunteerFilled -= 1;
    }
  } else if (prevStatus === 'Rejected' && status === 'Approved') {
    const event = db.events.find(e => e.id === vol.eventId);
    if (event) {
      event.volunteerFilled += 1;
    }
  }
  saveDB(db);
  return vol;
}

// 5. Online Meetings
export function getOnlineMeetings(): OnlineMeeting[] {
  const db = getDB();
  return db.onlineMeetings;
}

export function addOnlineMeeting(meetData: Omit<OnlineMeeting, 'id' | 'participantCount' | 'createdAt'>): OnlineMeeting {
  const db = getDB();
  const newMeeting: OnlineMeeting = {
    ...meetData,
    id: `meet-${Date.now()}`,
    participantCount: 0,
    createdAt: new Date().toISOString()
  };
  db.onlineMeetings.unshift(newMeeting);
  saveDB(db);
  return newMeeting;
}

export function updateOnlineMeeting(id: string, updates: Partial<OnlineMeeting>): OnlineMeeting | null {
  const db = getDB();
  const idx = db.onlineMeetings.findIndex(m => m.id === id);
  if (idx === -1) return null;
  db.onlineMeetings[idx] = { ...db.onlineMeetings[idx], ...updates };
  saveDB(db);
  return db.onlineMeetings[idx];
}

export function deleteOnlineMeeting(id: string): boolean {
  const db = getDB();
  const before = db.onlineMeetings.length;
  db.onlineMeetings = db.onlineMeetings.filter(m => m.id !== id);
  if (db.onlineMeetings.length !== before) {
    saveDB(db);
    return true;
  }
  return false;
}

export function registerForMeeting(regData: Omit<MeetingRegistration, 'id' | 'registeredAt'>): MeetingRegistration {
  const db = getDB();
  const meeting = db.onlineMeetings.find(m => m.id === regData.meetingId);
  if (!meeting) throw new Error('Meeting not found');
  if (meeting.participantCount >= meeting.participantCapacity) {
    throw new Error('Meeting participant limit reached.');
  }

  const newReg: MeetingRegistration = {
    ...regData,
    meetingTitle: meeting.title,
    id: `mreg-${Date.now()}`,
    registeredAt: new Date().toISOString()
  };
  meeting.participantCount += 1;
  db.meetingRegistrations.unshift(newReg);
  saveDB(db);
  return newReg;
}

// 6. Services & Enquiries
export function getServices(): ServiceItem[] {
  const db = getDB();
  return db.services;
}

export function addServiceEnquiry(enquiryData: Omit<ServiceEnquiry, 'id' | 'createdAt' | 'status'>): ServiceEnquiry {
  const db = getDB();
  const newEnquiry: ServiceEnquiry = {
    ...enquiryData,
    id: `enq-${Date.now()}`,
    status: 'New',
    createdAt: new Date().toISOString()
  };
  db.serviceEnquiries.unshift(newEnquiry);
  saveDB(db);
  return newEnquiry;
}

export function updateServiceEnquiryStatus(id: string, status: ServiceEnquiry['status']): ServiceEnquiry | null {
  const db = getDB();
  const enq = db.serviceEnquiries.find(e => e.id === id);
  if (!enq) return null;
  enq.status = status;
  saveDB(db);
  return enq;
}

// 7. Team Members
export function getTeamMembers(): TeamMember[] {
  const db = getDB();
  return db.teamMembers;
}

export function addTeamMember(memberData: Omit<TeamMember, 'id'>): TeamMember {
  const db = getDB();
  const newMember: TeamMember = {
    ...memberData,
    id: `tm-${Date.now()}`
  };
  db.teamMembers.push(newMember);
  saveDB(db);
  return newMember;
}

export function updateTeamMember(id: string, updates: Partial<TeamMember>): TeamMember | null {
  const db = getDB();
  const idx = db.teamMembers.findIndex(t => t.id === id);
  if (idx === -1) return null;
  db.teamMembers[idx] = { ...db.teamMembers[idx], ...updates };
  saveDB(db);
  return db.teamMembers[idx];
}

export function deleteTeamMember(id: string): boolean {
  const db = getDB();
  const before = db.teamMembers.length;
  db.teamMembers = db.teamMembers.filter(t => t.id !== id);
  if (db.teamMembers.length !== before) {
    saveDB(db);
    return true;
  }
  return false;
}

// 8. Leadership
export function getLeadership(): LeadershipProfile[] {
  const db = getDB();
  return db.leadership;
}

export function updateLeadershipProfile(id: string, updates: Partial<LeadershipProfile>): LeadershipProfile | null {
  const db = getDB();
  const idx = db.leadership.findIndex(l => l.id === id);
  if (idx === -1) return null;
  db.leadership[idx] = { ...db.leadership[idx], ...updates };
  saveDB(db);
  return db.leadership[idx];
}

// 9. Student Placements
export function getPlacements(): StudentPlacement[] {
  const db = getDB();
  return db.placements;
}

export function addPlacement(plcData: Omit<StudentPlacement, 'id'>): StudentPlacement {
  const db = getDB();
  const newPlc: StudentPlacement = {
    ...plcData,
    id: `plc-${Date.now()}`
  };
  db.placements.unshift(newPlc);
  db.stats.studentsPlaced += 1;
  saveDB(db);
  return newPlc;
}

export function updatePlacement(id: string, updates: Partial<StudentPlacement>): StudentPlacement | null {
  const db = getDB();
  const idx = db.placements.findIndex(p => p.id === id);
  if (idx === -1) return null;
  db.placements[idx] = { ...db.placements[idx], ...updates };
  saveDB(db);
  return db.placements[idx];
}

export function deletePlacement(id: string): boolean {
  const db = getDB();
  const before = db.placements.length;
  db.placements = db.placements.filter(p => p.id !== id);
  if (db.placements.length !== before) {
    saveDB(db);
    return true;
  }
  return false;
}

// 10. Homepage Stats
export function getHomepageStats(): HomepageStats {
  const db = getDB();
  return db.stats;
}

export function updateHomepageStats(newStats: Partial<HomepageStats>): HomepageStats {
  const db = getDB();
  db.stats = { ...db.stats, ...newStats };
  saveDB(db);
  return db.stats;
}

// 11. Contact Messages
export function addContactMessage(msgData: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>): ContactMessage {
  const db = getDB();
  const newMsg: ContactMessage = {
    ...msgData,
    id: `msg-${Date.now()}`,
    status: 'Unread',
    createdAt: new Date().toISOString()
  };
  db.contactMessages.unshift(newMsg);
  saveDB(db);
  return newMsg;
}
