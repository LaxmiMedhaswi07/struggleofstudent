'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Shield, Users, Briefcase, Calendar, HeartHandshake, 
  Video, Code2, GraduationCap, Award, Settings, LogOut, 
  Search, Plus, Trash2, Edit3, CheckCircle2, XCircle, 
  Clock, AlertCircle, ArrowLeft, Loader2, Sparkles, Eye,
  BarChart3, MessageSquare, ExternalLink, RefreshCw
} from 'lucide-react';
import { 
  CommunityMember, Opportunity, OpportunityApplication, 
  EventItem, EventRegistration, VolunteerApplication, 
  OnlineMeeting, MeetingRegistration, ServiceItem, ServiceEnquiry, 
  TeamMember, LeadershipProfile, StudentPlacement, HomepageStats, ContactMessage 
} from '@/lib/types';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  
  // Login form states
  const [email, setEmail] = useState('admin@struggleofstudent.org');
  const [password, setPassword] = useState('admin123456');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Active admin tab
  const [activeTab, setActiveTab] = useState<
    'overview' | 'members' | 'opportunities' | 'events' | 'volunteer' | 
    'meetings' | 'enquiries' | 'team' | 'leadership' | 'placements' | 'stats' | 'messages'
  >('overview');

  // Admin data
  const [data, setData] = useState<any>(null);
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [actionSuccess, setActionSuccess] = useState('');

  // Modals inside Admin
  const [newOppModal, setNewOppModal] = useState(false);
  const [newEventModal, setNewEventModal] = useState(false);
  const [newMeetingModal, setNewMeetingModal] = useState(false);
  const [newTeamModal, setNewTeamModal] = useState(false);
  const [newPlacementModal, setNewPlacementModal] = useState(false);
  const [editLeaderModal, setEditLeaderModal] = useState<LeadershipProfile | null>(null);

  // Forms for new entities
  const [oppForm, setOppForm] = useState({
    title: '', category: 'Internships', companyOrOrg: '', location: 'Remote',
    type: '3 Months', stipendOrPerks: '₹20,000 / month', description: '',
    requirements: '', deadline: '2026-11-30', status: 'Open'
  });

  const [eventForm, setEventForm] = useState({
    title: '', date: '2026-11-15', time: '10:00 AM IST', location: 'Campus Auditorium',
    type: 'In-Person', description: '', bannerImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    maxCapacity: 300, volunteerCapacity: 10
  });

  const [meetingForm, setMeetingForm] = useState({
    title: '', description: '', date: '2026-11-10', time: '07:00 PM IST',
    durationMinutes: 60, participantCapacity: 150, meetingLink: 'https://meet.google.com/ss-session',
    provider: 'Manual'
  });

  const [teamForm, setTeamForm] = useState({
    name: '', designation: '', shortBio: '', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    department: 'Technology', linkedin: '', github: '', isActive: true, order: 1
  });

  const [placementForm, setPlacementForm] = useState({
    studentName: '', college: '', company: '', role: '',
    packageOrStipend: '₹12.0 LPA', batch: '2026 Batch', successStory: '',
    studentPhoto: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    featured: true
  });

  const [statsForm, setStatsForm] = useState<HomepageStats>({
    communityMembers: 12450, studentsPlaced: 480, eventsHosted: 135,
    partnerColleges: 52, volunteerHours: 18200
  });

  // Search filters inside tabs
  const [searchMember, setSearchMember] = useState('');
  const [searchOpp, setSearchOpp] = useState('');

  // Check auth on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    setCheckingAuth(true);
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        setIsAuthenticated(true);
        loadAdminData();
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    } finally {
      setCheckingAuth(false);
    }
  };

  const loadAdminData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/overview');
      if (res.ok) {
        const json = await res.json();
        setData(json.data);
        setMetrics(json.metrics);
        if (json.data?.stats) {
          setStatsForm(json.data.stats);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || 'Authentication failed');
      }

      setIsAuthenticated(true);
      loadAdminData();
    } catch (err: any) {
      setLoginError(err.message || 'Invalid admin credentials');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setIsAuthenticated(false);
  };

  const flashMessage = (msg: string) => {
    setActionSuccess(msg);
    setTimeout(() => setActionSuccess(''), 4000);
  };

  // 1. Toggle Opportunity Status (Open/Closed)
  const toggleOppStatus = async (opp: Opportunity) => {
    const newStatus = opp.status === 'Open' ? 'Closed' : 'Open';
    try {
      const res = await fetch(`/api/opportunities/${opp.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        flashMessage(`Opportunity marked as ${newStatus}`);
        loadAdminData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteOpp = async (id: string) => {
    if (!confirm('Are you sure you want to delete this opportunity?')) return;
    const res = await fetch(`/api/opportunities/${id}`, { method: 'DELETE' });
    if (res.ok) {
      flashMessage('Opportunity deleted');
      loadAdminData();
    }
  };

  // 2. Adjust Volunteer Capacity
  const handleUpdateVolunteerCapacity = async (eventId: string, newCap: number) => {
    try {
      const res = await fetch(`/api/events/${eventId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ volunteerCapacity: newCap })
      });
      if (res.ok) {
        flashMessage('Volunteer capacity updated');
        loadAdminData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 3. Update Volunteer Application Status (Approved / Rejected)
  const handleVolunteerStatus = async (applicationId: string, status: 'Approved' | 'Rejected') => {
    try {
      const res = await fetch('/api/volunteer/status', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicationId, status })
      });
      if (res.ok) {
        flashMessage(`Volunteer application marked as ${status}`);
        loadAdminData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 4. Update Enquiry Status
  const handleEnquiryStatus = async (id: string, status: string) => {
    try {
      const res = await fetch('/api/services/enquiry', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      });
      if (res.ok) {
        flashMessage(`Enquiry updated to ${status}`);
        loadAdminData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 5. Delete Event
  const deleteEvent = async (id: string) => {
    if (!confirm('Delete this event?')) return;
    const res = await fetch(`/api/events/${id}`, { method: 'DELETE' });
    if (res.ok) {
      flashMessage('Event deleted');
      loadAdminData();
    }
  };

  // 6. Delete Meeting
  const deleteMeeting = async (id: string) => {
    if (!confirm('Delete this meeting?')) return;
    const res = await fetch(`/api/meetings/${id}`, { method: 'DELETE' });
    if (res.ok) {
      flashMessage('Meeting deleted');
      loadAdminData();
    }
  };

  // 7. Delete Team Member
  const deleteTeam = async (id: string) => {
    if (!confirm('Remove this team member?')) return;
    const res = await fetch(`/api/team?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      flashMessage('Team member removed');
      loadAdminData();
    }
  };

  // 8. Delete Placement
  const deletePlacement = async (id: string) => {
    if (!confirm('Delete placement record?')) return;
    const res = await fetch(`/api/placements?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      flashMessage('Placement record removed');
      loadAdminData();
    }
  };

  // 9. Update Stats
  const handleSaveStats = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/stats', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(statsForm)
      });
      if (res.ok) {
        flashMessage('Homepage statistics saved successfully!');
        loadAdminData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 10. Create Opportunity
  const handleCreateOpp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/opportunities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(oppForm)
      });
      if (res.ok) {
        setNewOppModal(false);
        flashMessage('Opportunity posted successfully!');
        loadAdminData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 11. Create Event
  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventForm)
      });
      if (res.ok) {
        setNewEventModal(false);
        flashMessage('Event created successfully!');
        loadAdminData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 12. Create Meeting
  const handleCreateMeeting = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/meetings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(meetingForm)
      });
      if (res.ok) {
        setNewMeetingModal(false);
        flashMessage('Online meeting scheduled!');
        loadAdminData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 13. Create Team Member
  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teamForm)
      });
      if (res.ok) {
        setNewTeamModal(false);
        flashMessage('Team member added!');
        loadAdminData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 14. Create Placement
  const handleCreatePlacement = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/placements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(placementForm)
      });
      if (res.ok) {
        setNewPlacementModal(false);
        flashMessage('Placement record added!');
        loadAdminData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#090d16] flex items-center justify-center text-white">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  // If not logged in, show login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#090d16] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#0f172a] border border-indigo-500/30 rounded-3xl p-8 shadow-2xl shadow-indigo-950/60">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-4">
              <img src="/official-ss-logo.jpg" alt="SS Logo" className="h-16 w-auto mx-auto object-contain" />
            </Link>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-2">
              <Shield className="w-3.5 h-3.5" />
              Secure Administration
            </div>
            <h1 className="text-2xl font-black text-white">SS Admin Portal</h1>
            <p className="text-xs text-slate-400 mt-1">
              Manage community members, opportunities, events, and verticals.
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Admin Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:border-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:border-indigo-500 outline-none"
              />
            </div>

            <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/20 text-[11px] text-indigo-300">
              <span className="font-bold block mb-0.5">Default Testing Credentials:</span>
              <span>Email: <code className="text-white font-mono">admin@struggleofstudent.org</code></span><br />
              <span>Password: <code className="text-white font-mono">admin123456</code></span>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs tracking-wide transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loginLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Shield className="w-4 h-4" />}
              Access Admin Dashboard
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/5 text-center">
            <Link href="/" className="text-xs text-slate-400 hover:text-white flex items-center justify-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col">
      {/* Top Admin Header */}
      <header className="bg-[#0c101c] border-b border-indigo-500/20 sticky top-0 z-30 px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <img src="/official-ss-logo.jpg" alt="SS Logo" className="w-10 h-10 object-contain" />
            <span className="font-black text-sm text-white tracking-wider hidden sm:inline">SS ADMIN</span>
          </Link>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            System Live
          </span>
        </div>

        {/* Global Toast Message */}
        {actionSuccess && (
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold animate-fadeIn">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {actionSuccess}
          </div>
        )}

        <div className="flex items-center gap-3">
          <button
            onClick={loadAdminData}
            title="Refresh Data"
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <Link
            href="/"
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View Site
          </Link>

          <button
            onClick={handleLogout}
            className="px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 hover:bg-rose-500/20 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </button>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar Tabs */}
        <aside className="w-full md:w-64 bg-[#0a0e1a] border-r border-white/5 p-4 space-y-1.5 shrink-0 overflow-x-auto md:overflow-y-auto">
          <div className="text-[10px] uppercase font-bold text-slate-500 px-3 py-1 tracking-wider">
            Control Panel
          </div>

          {[
            { id: 'overview', label: 'Overview & Metrics', icon: BarChart3, badge: null },
            { id: 'members', label: 'Community Members', icon: Users, badge: metrics?.totalMembers },
            { id: 'opportunities', label: 'Opportunities', icon: Briefcase, badge: metrics?.totalOpportunities },
            { id: 'events', label: 'Events & Registrations', icon: Calendar, badge: metrics?.totalEvents },
            { id: 'volunteer', label: 'Volunteer System', icon: HeartHandshake, badge: metrics?.pendingVolunteerCount ? `${metrics.pendingVolunteerCount} New` : null },
            { id: 'meetings', label: 'Online Meetings (Zoom)', icon: Video, badge: metrics?.totalMeetings },
            { id: 'enquiries', label: 'Service Inquiries', icon: Code2, badge: metrics?.newEnquiriesCount ? `${metrics.newEnquiriesCount} New` : null },
            { id: 'team', label: 'SS Team Squad', icon: Users, badge: metrics?.activeTeamMembersCount },
            { id: 'leadership', label: 'Leadership Profiles', icon: Shield, badge: null },
            { id: 'placements', label: 'Student Placements', icon: GraduationCap, badge: metrics?.totalPlacementsCount },
            { id: 'stats', label: 'Homepage Statistics', icon: Settings, badge: null },
            { id: 'messages', label: 'Contact Messages', icon: MessageSquare, badge: metrics?.unreadMessagesCount ? `${metrics.unreadMessagesCount} Unread` : null },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full px-3 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between ${
                  isActive
                    ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{tab.label}</span>
                </div>
                {tab.badge !== null && tab.badge !== undefined && (
                  <span
                    className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Tab Content Panel */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl overflow-y-auto">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && metrics && (
            <div className="space-y-8 animate-fadeIn">
              <div>
                <h2 className="text-2xl font-black text-white">Dashboard Overview</h2>
                <p className="text-xs text-slate-400">Live operational snapshot of Struggle of Student (SS).</p>
              </div>

              {/* Metric Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/5 space-y-2">
                  <div className="flex justify-between items-center text-slate-400 text-xs">
                    <span>Registered Members</span>
                    <Users className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div className="text-3xl font-extrabold text-white">{metrics.totalMembers}</div>
                  <span className="text-[11px] text-emerald-400 font-medium">Active in Community DB</span>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/5 space-y-2">
                  <div className="flex justify-between items-center text-slate-400 text-xs">
                    <span>Open Opportunities</span>
                    <Briefcase className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="text-3xl font-extrabold text-white">{metrics.openOpportunities} / {metrics.totalOpportunities}</div>
                  <span className="text-[11px] text-cyan-400 font-medium">{metrics.totalApplications} Applications Received</span>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/5 space-y-2">
                  <div className="flex justify-between items-center text-slate-400 text-xs">
                    <span>Volunteer Applications</span>
                    <HeartHandshake className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="text-3xl font-extrabold text-white">{metrics.volunteerApplicationsCount}</div>
                  <span className="text-[11px] text-purple-400 font-medium">{metrics.pendingVolunteerCount} Pending Review</span>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/5 space-y-2">
                  <div className="flex justify-between items-center text-slate-400 text-xs">
                    <span>Service Inquiries</span>
                    <Code2 className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-3xl font-extrabold text-white">{metrics.totalEnquiries}</div>
                  <span className="text-[11px] text-amber-400 font-medium">{metrics.newEnquiriesCount} New Leads</span>
                </div>
              </div>

              {/* Quick Actions Bar */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-purple-950/20 to-slate-900 border border-indigo-500/20 space-y-3">
                <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">Quick Admin Actions</span>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => { setActiveTab('opportunities'); setNewOppModal(true); }}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/30"
                  >
                    <Plus className="w-3.5 h-3.5" /> Post New Opportunity
                  </button>
                  <button
                    onClick={() => { setActiveTab('events'); setNewEventModal(true); }}
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-purple-600/30"
                  >
                    <Plus className="w-3.5 h-3.5" /> Create Event
                  </button>
                  <button
                    onClick={() => { setActiveTab('meetings'); setNewMeetingModal(true); }}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-blue-600/30"
                  >
                    <Plus className="w-3.5 h-3.5" /> Schedule Online Meeting
                  </button>
                  <button
                    onClick={() => setActiveTab('volunteer')}
                    className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-cyan-600/30"
                  >
                    <HeartHandshake className="w-3.5 h-3.5" /> Manage Volunteer Capacity
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: COMMUNITY MEMBERS */}
          {activeTab === 'members' && data && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-white">Community Members ({data.communityMembers.length})</h2>
                  <p className="text-xs text-slate-400">All registered students with their official Member ID.</p>
                </div>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search by name, email, college..."
                    value={searchMember}
                    onChange={(e) => setSearchMember(e.target.value)}
                    className="pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:border-indigo-500 outline-none w-64"
                  />
                </div>
              </div>

              <div className="bg-slate-900/60 rounded-2xl border border-white/5 overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950/80 text-[11px] uppercase font-bold text-slate-400 border-b border-white/5">
                    <tr>
                      <th className="p-3.5">Member ID</th>
                      <th className="p-3.5">Name</th>
                      <th className="p-3.5">Email / Phone</th>
                      <th className="p-3.5">College & City</th>
                      <th className="p-3.5">Branch & Year</th>
                      <th className="p-3.5">Skills / Interests</th>
                      <th className="p-3.5">Registered</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-normal">
                    {data.communityMembers
                      .filter((m: CommunityMember) => {
                        const q = searchMember.toLowerCase();
                        return !q || m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q) || m.college.toLowerCase().includes(q);
                      })
                      .map((m: CommunityMember) => (
                        <tr key={m.id} className="hover:bg-white/5 transition-colors">
                          <td className="p-3.5 font-mono font-bold text-indigo-400">{m.memberId}</td>
                          <td className="p-3.5 font-semibold text-white">{m.name}</td>
                          <td className="p-3.5">
                            <div>{m.email}</div>
                            <div className="text-slate-500 text-[11px]">{m.phone}</div>
                          </td>
                          <td className="p-3.5">
                            <div>{m.college}</div>
                            <div className="text-slate-500 text-[11px]">{m.city}</div>
                          </td>
                          <td className="p-3.5">
                            <div>{m.courseBranch}</div>
                            <div className="text-indigo-400 text-[11px]">{m.year}</div>
                          </td>
                          <td className="p-3.5 max-w-[200px]">
                            <div className="truncate text-slate-300">{m.skills || '—'}</div>
                            <div className="truncate text-slate-500 text-[10px]">{m.interests || '—'}</div>
                          </td>
                          <td className="p-3.5 text-slate-500 text-[11px]">
                            {new Date(m.registeredAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: OPPORTUNITIES */}
          {activeTab === 'opportunities' && data && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-white">Opportunities Management ({data.opportunities.length})</h2>
                  <p className="text-xs text-slate-400">Add, edit, toggle Open/Closed status, and review student applications.</p>
                </div>
                <button
                  onClick={() => setNewOppModal(true)}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/30"
                >
                  <Plus className="w-3.5 h-3.5" /> Post Opportunity
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {data.opportunities.map((opp: Opportunity) => {
                  const isOpen = opp.status === 'Open';
                  const oppApps = data.opportunityApplications.filter((a: OpportunityApplication) => a.opportunityId === opp.id);

                  return (
                    <div key={opp.id} className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                              {opp.category}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                isOpen ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                              }`}
                            >
                              {opp.status}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-white mt-1">{opp.title}</h3>
                          <p className="text-xs text-slate-400">{opp.companyOrOrg} • {opp.location} • {opp.stipendOrPerks}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleOppStatus(opp)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                              isOpen
                                ? 'bg-amber-500/20 border border-amber-500/30 text-amber-300 hover:bg-amber-500/30'
                                : 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/30'
                            }`}
                          >
                            {isOpen ? 'Close Applications' : 'Re-open Opportunity'}
                          </button>
                          <button
                            onClick={() => deleteOpp(opp.id)}
                            className="p-1.5 text-rose-400 hover:bg-rose-500/20 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Applicants Sub-Section */}
                      <div className="pt-3 border-t border-white/5">
                        <span className="text-xs font-bold text-slate-400 block mb-2">
                          Submitted Applications ({oppApps.length}):
                        </span>
                        {oppApps.length === 0 ? (
                          <p className="text-xs text-slate-500 italic">No applications received yet.</p>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {oppApps.map((a: OpportunityApplication) => (
                              <div key={a.id} className="p-3 rounded-xl bg-slate-950 border border-white/5 text-xs space-y-1">
                                <div className="flex justify-between items-start">
                                  <span className="font-bold text-white">{a.name} ({a.college}, {a.year})</span>
                                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/20 text-indigo-300">{a.status}</span>
                                </div>
                                <div className="text-slate-400">{a.email} • {a.phone}</div>
                                {a.resumeLink && (
                                  <a href={a.resumeLink} target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline flex items-center gap-1 text-[11px] pt-1">
                                    <ExternalLink className="w-3 h-3" /> View Resume
                                  </a>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: EVENTS */}
          {activeTab === 'events' && data && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-white">Event Management ({data.events.length})</h2>
                  <p className="text-xs text-slate-400">Create events, track attendee registrations, and configure capacity.</p>
                </div>
                <button
                  onClick={() => setNewEventModal(true)}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-purple-600/30"
                >
                  <Plus className="w-3.5 h-3.5" /> Create New Event
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {data.events.map((evt: EventItem) => {
                  const regs = data.eventRegistrations.filter((r: EventRegistration) => r.eventId === evt.id);
                  return (
                    <div key={evt.id} className="p-6 rounded-2xl bg-slate-900/60 border border-white/5 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300">
                              {evt.type}
                            </span>
                            <span className="text-xs text-slate-400">{evt.date} at {evt.time}</span>
                          </div>
                          <h3 className="text-xl font-bold text-white mt-1">{evt.title}</h3>
                          <p className="text-xs text-slate-400">{evt.location}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => deleteEvent(evt.id)}
                            className="p-2 text-rose-400 hover:bg-rose-500/20 rounded-lg transition-colors"
                            title="Delete Event"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Capacity Counters */}
                      <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-950 border border-white/5 text-xs">
                        <div>
                          <span className="text-slate-400 block mb-0.5">Attendee Capacity:</span>
                          <span className="font-bold text-white text-sm">{evt.registeredCount} / {evt.maxCapacity} Seats Filled</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block mb-0.5">Volunteer Slot Limit:</span>
                          <span className="font-bold text-cyan-400 text-sm">{evt.volunteerFilled} / {evt.volunteerCapacity} Slots Filled</span>
                        </div>
                      </div>

                      {/* Attendee Registrations List */}
                      <div className="pt-2 border-t border-white/5">
                        <span className="text-xs font-bold text-slate-400 block mb-2">
                          Registered Attendees ({regs.length}):
                        </span>
                        {regs.length === 0 ? (
                          <p className="text-xs text-slate-500 italic">No attendees registered yet.</p>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                            {regs.map((r: EventRegistration) => (
                              <div key={r.id} className="p-2.5 rounded-xl bg-slate-950 border border-white/5 text-xs">
                                <div className="font-bold text-white truncate">{r.name}</div>
                                <div className="text-[11px] text-slate-400 truncate">{r.college}</div>
                                <div className="text-[10px] font-mono text-emerald-400 mt-1">Ticket: {r.ticketCode}</div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 5: VOLUNTEER SYSTEM & CAPACITY */}
          {activeTab === 'volunteer' && data && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-2xl font-black text-white">Volunteer System & Capacity Enforcement</h2>
                <p className="text-xs text-slate-400">
                  Update event volunteer capacity in real time. When slots reach capacity, applications auto-lock with &ldquo;Volunteer Slots Full.&rdquo;
                </p>
              </div>

              {/* Event Capacity Controls */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wider">Event Volunteer Limits:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {data.events.map((evt: EventItem) => {
                    const isFull = evt.volunteerFilled >= evt.volunteerCapacity;
                    return (
                      <div key={evt.id} className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 space-y-3">
                        <h4 className="font-bold text-sm text-white line-clamp-1">{evt.title}</h4>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400">Current Status:</span>
                          <span className={`font-bold ${isFull ? 'text-rose-400' : 'text-emerald-400'}`}>
                            {evt.volunteerFilled} / {evt.volunteerCapacity} Slots Filled
                          </span>
                        </div>

                        {/* Capacity adjuster */}
                        <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-2">
                          <span className="text-xs text-slate-400">Change Capacity:</span>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleUpdateVolunteerCapacity(evt.id, Math.max(evt.volunteerFilled, evt.volunteerCapacity - 1))}
                              className="w-7 h-7 rounded-lg bg-slate-800 text-white font-bold flex items-center justify-center hover:bg-slate-700 text-xs"
                            >
                              -
                            </button>
                            <span className="w-8 text-center font-bold text-white text-xs">{evt.volunteerCapacity}</span>
                            <button
                              onClick={() => handleUpdateVolunteerCapacity(evt.id, evt.volunteerCapacity + 1)}
                              className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center hover:bg-indigo-500 text-xs"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {isFull && (
                          <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-[11px] font-semibold text-center">
                            Volunteer Slots Full (Auto-locked)
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Applications List */}
              <div className="space-y-4 pt-4 border-t border-white/5">
                <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wider">
                  Volunteer Applications ({data.volunteerApplications.length}):
                </h3>

                <div className="space-y-3">
                  {data.volunteerApplications.map((v: VolunteerApplication) => (
                    <div key={v.id} className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{v.name}</span>
                          <span className="text-xs text-slate-400">• {v.college}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            v.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-300' :
                            v.status === 'Rejected' ? 'bg-rose-500/20 text-rose-300' : 'bg-amber-500/20 text-amber-300'
                          }`}>
                            {v.status}
                          </span>
                        </div>
                        <div className="text-xs text-indigo-300 font-medium">Role: {v.preferredRole}</div>
                        <div className="text-xs text-slate-400">Event: {v.eventTitle}</div>
                        {v.experience && (
                          <p className="text-xs text-slate-400 italic pt-1">&ldquo;{v.experience}&rdquo;</p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {v.status !== 'Approved' && (
                          <button
                            onClick={() => handleVolunteerStatus(v.id, 'Approved')}
                            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1 transition-all"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                          </button>
                        )}
                        {v.status !== 'Rejected' && (
                          <button
                            onClick={() => handleVolunteerStatus(v.id, 'Rejected')}
                            className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs flex items-center gap-1 transition-all"
                          >
                            <XCircle className="w-3.5 h-3.5" /> Reject
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: ONLINE MEETINGS */}
          {activeTab === 'meetings' && data && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-white">Online Meetings & Zoom Sessions ({data.onlineMeetings.length})</h2>
                  <p className="text-xs text-slate-400">Manage interactive student sessions with participant capacities and meeting links.</p>
                </div>
                <button
                  onClick={() => setNewMeetingModal(true)}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-blue-600/30"
                >
                  <Plus className="w-3.5 h-3.5" /> Schedule Meeting
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.onlineMeetings.map((m: OnlineMeeting) => (
                  <div key={m.id} className="p-6 rounded-2xl bg-slate-900/60 border border-white/5 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-500/20 text-blue-300">
                          {m.provider}
                        </span>
                        <h3 className="text-lg font-bold text-white mt-1">{m.title}</h3>
                        <p className="text-xs text-slate-400">{m.date} at {m.time} ({m.durationMinutes} mins)</p>
                      </div>
                      <button
                        onClick={() => deleteMeeting(m.id)}
                        className="p-1.5 text-rose-400 hover:bg-rose-500/20 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-xs text-slate-300">{m.description}</p>

                    <div className="p-3 rounded-xl bg-slate-950 border border-white/5 text-xs space-y-1">
                      <div className="flex justify-between text-slate-400">
                        <span>Participant Capacity:</span>
                        <span className="font-bold text-white">{m.participantCount} / {m.participantCapacity}</span>
                      </div>
                      <div className="text-indigo-400 font-mono truncate">
                        Link: <a href={m.meetingLink} target="_blank" rel="noreferrer" className="underline">{m.meetingLink}</a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: SERVICE INQUIRIES */}
          {activeTab === 'enquiries' && data && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-2xl font-black text-white">Service Inquiries ({data.serviceEnquiries.length})</h2>
                <p className="text-xs text-slate-400">Client leads for SS Band, Event Management, and IT Solutions.</p>
              </div>

              <div className="space-y-3">
                {data.serviceEnquiries.map((enq: ServiceEnquiry) => (
                  <div key={enq.id} className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-purple-500/20 text-purple-300">
                          {enq.serviceName}
                        </span>
                        <span className="font-bold text-white text-sm">{enq.clientName}</span>
                        {enq.organizationOrCollege && (
                          <span className="text-xs text-slate-400">({enq.organizationOrCollege})</span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400">Status:</span>
                        <select
                          value={enq.status}
                          onChange={(e) => handleEnquiryStatus(enq.id, e.target.value)}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 text-xs text-white border border-slate-700 outline-none"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Resolved">Resolved</option>
                        </select>
                      </div>
                    </div>

                    <div className="text-xs text-slate-300">
                      <strong>Requirements:</strong> {enq.requirements}
                    </div>

                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span>Email: <a href={`mailto:${enq.email}`} className="text-indigo-400 hover:underline">{enq.email}</a></span>
                      <span>Phone: <a href={`tel:${enq.phone}`} className="text-indigo-400 hover:underline">{enq.phone}</a></span>
                      {enq.budgetOrTimeline && <span>Budget: {enq.budgetOrTimeline}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: TEAM SQUAD */}
          {activeTab === 'team' && data && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-white">Active Team Squad ({data.teamMembers.length})</h2>
                  <p className="text-xs text-slate-400">Add, edit, or remove active student team coordinators.</p>
                </div>
                <button
                  onClick={() => setNewTeamModal(true)}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/30"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Member
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.teamMembers.map((tm: TeamMember) => (
                  <div key={tm.id} className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 space-y-3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <img src={tm.photo} alt={tm.name} className="w-12 h-12 rounded-xl object-cover" />
                        <div>
                          <h4 className="font-bold text-white text-base leading-tight">{tm.name}</h4>
                          <p className="text-xs text-indigo-400">{tm.designation}</p>
                          <span className="text-[10px] text-slate-500">{tm.department}</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-3">{tm.shortBio}</p>
                    </div>

                    <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                      <span className={`text-[10px] font-bold uppercase ${tm.isActive ? 'text-emerald-400' : 'text-slate-500'}`}>
                        {tm.isActive ? 'Active Member' : 'Inactive'}
                      </span>
                      <button
                        onClick={() => deleteTeam(tm.id)}
                        className="text-rose-400 hover:text-rose-300 p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: LEADERSHIP */}
          {activeTab === 'leadership' && data && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-2xl font-black text-white">Founder & Executive Leadership</h2>
                <p className="text-xs text-slate-400">Founder and Directors profiles, biographies, and mandates.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {data.leadership.map((l: LeadershipProfile) => (
                  <div key={l.id} className="p-6 rounded-2xl bg-slate-900/60 border border-white/5 space-y-3">
                    <img src={l.photo} alt={l.name} className="w-full h-44 rounded-xl object-cover mb-2" />
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-purple-500/20 text-purple-300">
                      {l.designation}
                    </span>
                    <h3 className="text-lg font-bold text-white">{l.name}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{l.bio}</p>
                    <div className="p-2.5 rounded-lg bg-slate-950 text-xs text-slate-400 border border-white/5">
                      <strong className="text-indigo-300 block text-[10px] uppercase">Responsibility:</strong>
                      {l.responsibility}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 10: PLACEMENTS */}
          {activeTab === 'placements' && data && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-white">Student Placements ({data.placements.length})</h2>
                  <p className="text-xs text-slate-400">Manage placed students, companies, roles, and success stories.</p>
                </div>
                <button
                  onClick={() => setNewPlacementModal(true)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-emerald-600/30"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Placement
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.placements.map((plc: StudentPlacement) => (
                  <div key={plc.id} className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 space-y-3 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2.5">
                          <img src={plc.studentPhoto} alt={plc.studentName} className="w-10 h-10 rounded-full object-cover" />
                          <div>
                            <h4 className="font-bold text-white text-sm">{plc.studentName}</h4>
                            <p className="text-[11px] text-slate-400">{plc.college}</p>
                          </div>
                        </div>
                        <span className="font-mono font-bold text-xs text-emerald-400">{plc.packageOrStipend}</span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-950 border border-white/5 text-xs">
                        <div className="font-bold text-white">{plc.company}</div>
                        <div className="text-indigo-400">{plc.role}</div>
                      </div>

                      <p className="text-xs text-slate-400 mt-2 italic line-clamp-3">&ldquo;{plc.successStory}&rdquo;</p>
                    </div>

                    <div className="pt-3 border-t border-white/5 flex justify-end">
                      <button
                        onClick={() => deletePlacement(plc.id)}
                        className="text-rose-400 hover:text-rose-300 p-1"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 11: HOMEPAGE STATS */}
          {activeTab === 'stats' && (
            <div className="space-y-6 animate-fadeIn max-w-2xl">
              <div>
                <h2 className="text-2xl font-black text-white">Homepage Impact Statistics</h2>
                <p className="text-xs text-slate-400">Update the live counters displayed on the website homepage.</p>
              </div>

              <form onSubmit={handleSaveStats} className="p-6 rounded-2xl bg-slate-900/60 border border-white/5 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Community Members Count</label>
                  <input
                    type="number"
                    value={statsForm.communityMembers}
                    onChange={(e) => setStatsForm({ ...statsForm, communityMembers: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:border-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Students Placed Count</label>
                  <input
                    type="number"
                    value={statsForm.studentsPlaced}
                    onChange={(e) => setStatsForm({ ...statsForm, studentsPlaced: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:border-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Events Hosted Count</label>
                  <input
                    type="number"
                    value={statsForm.eventsHosted}
                    onChange={(e) => setStatsForm({ ...statsForm, eventsHosted: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:border-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Partner Colleges Count</label>
                  <input
                    type="number"
                    value={statsForm.partnerColleges}
                    onChange={(e) => setStatsForm({ ...statsForm, partnerColleges: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:border-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Volunteer Hours Given</label>
                  <input
                    type="number"
                    value={statsForm.volunteerHours}
                    onChange={(e) => setStatsForm({ ...statsForm, volunteerHours: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:border-indigo-500 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all shadow-md shadow-indigo-600/30"
                >
                  Save Statistics Changes
                </button>
              </form>
            </div>
          )}

          {/* TAB 12: MESSAGES */}
          {activeTab === 'messages' && data && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-2xl font-black text-white">Contact Messages ({data.contactMessages?.length || 0})</h2>
                <p className="text-xs text-slate-400">Inbound inquiries sent through the website contact form.</p>
              </div>

              <div className="space-y-3">
                {data.contactMessages?.map((msg: ContactMessage) => (
                  <div key={msg.id} className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-bold text-white text-sm">{msg.name}</span>
                        <span className="text-xs text-slate-400"> ({msg.email} {msg.phone ? `• ${msg.phone}` : ''})</span>
                        <div className="text-xs font-semibold text-indigo-400 mt-0.5">Subject: {msg.subject}</div>
                      </div>
                      <span className="text-[11px] text-slate-500">{new Date(msg.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-white/5">
                      {msg.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL: POST OPPORTUNITY */}
      {newOppModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#0f172a] border border-indigo-500/30 rounded-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-white">Post New Opportunity</h3>
            <form onSubmit={handleCreateOpp} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300">Title</label>
                <input
                  type="text" required value={oppForm.title}
                  onChange={(e) => setOppForm({ ...oppForm, title: e.target.value })}
                  placeholder="e.g. Backend Node.js Intern"
                  className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-white mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-300">Category</label>
                  <select
                    value={oppForm.category}
                    onChange={(e) => setOppForm({ ...oppForm, category: e.target.value })}
                    className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-white mt-1"
                  >
                    {['Internships', 'Jobs', 'Campus Ambassador', 'Volunteering', 'Events', 'Talent Showcase', 'Leadership', 'Workshops/Sessions', 'Projects', 'Collaborations'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-slate-300">Company / Organization</label>
                  <input
                    type="text" required value={oppForm.companyOrOrg}
                    onChange={(e) => setOppForm({ ...oppForm, companyOrOrg: e.target.value })}
                    className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-white mt-1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-300">Location</label>
                  <input
                    type="text" value={oppForm.location}
                    onChange={(e) => setOppForm({ ...oppForm, location: e.target.value })}
                    className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-white mt-1"
                  />
                </div>
                <div>
                  <label className="text-slate-300">Stipend / Perks</label>
                  <input
                    type="text" value={oppForm.stipendOrPerks}
                    onChange={(e) => setOppForm({ ...oppForm, stipendOrPerks: e.target.value })}
                    className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-white mt-1"
                  />
                </div>
              </div>
              <div>
                <label className="text-slate-300">Description</label>
                <textarea
                  rows={3} required value={oppForm.description}
                  onChange={(e) => setOppForm({ ...oppForm, description: e.target.value })}
                  className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-white mt-1"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setNewOppModal(false)} className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-bold">Publish</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CREATE EVENT */}
      {newEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#0f172a] border border-indigo-500/30 rounded-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-white">Create New Event</h3>
            <form onSubmit={handleCreateEvent} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300">Event Title</label>
                <input
                  type="text" required value={eventForm.title}
                  onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                  className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-white mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-300">Date</label>
                  <input
                    type="date" required value={eventForm.date}
                    onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                    className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-white mt-1"
                  />
                </div>
                <div>
                  <label className="text-slate-300">Time</label>
                  <input
                    type="text" required value={eventForm.time}
                    onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                    className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-white mt-1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-300">Location</label>
                  <input
                    type="text" required value={eventForm.location}
                    onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                    className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-white mt-1"
                  />
                </div>
                <div>
                  <label className="text-slate-300">Type</label>
                  <select
                    value={eventForm.type}
                    onChange={(e) => setEventForm({ ...eventForm, type: e.target.value })}
                    className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-white mt-1"
                  >
                    <option value="In-Person">In-Person</option>
                    <option value="Online">Online</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-300">Max Attendees</label>
                  <input
                    type="number" value={eventForm.maxCapacity}
                    onChange={(e) => setEventForm({ ...eventForm, maxCapacity: Number(e.target.value) })}
                    className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-white mt-1"
                  />
                </div>
                <div>
                  <label className="text-slate-300">Volunteer Capacity (Slots Limit)</label>
                  <input
                    type="number" value={eventForm.volunteerCapacity}
                    onChange={(e) => setEventForm({ ...eventForm, volunteerCapacity: Number(e.target.value) })}
                    className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-white mt-1"
                  />
                </div>
              </div>
              <div>
                <label className="text-slate-300">Description</label>
                <textarea
                  rows={3} value={eventForm.description}
                  onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                  className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-white mt-1"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setNewEventModal(false)} className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-purple-600 text-white font-bold">Create Event</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: SCHEDULE ONLINE MEETING */}
      {newMeetingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#0f172a] border border-indigo-500/30 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">Schedule Online Session</h3>
            <form onSubmit={handleCreateMeeting} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300">Meeting Topic</label>
                <input
                  type="text" required value={meetingForm.title}
                  onChange={(e) => setMeetingForm({ ...meetingForm, title: e.target.value })}
                  className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-white mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-300">Date</label>
                  <input
                    type="date" required value={meetingForm.date}
                    onChange={(e) => setMeetingForm({ ...meetingForm, date: e.target.value })}
                    className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-white mt-1"
                  />
                </div>
                <div>
                  <label className="text-slate-300">Time</label>
                  <input
                    type="text" required value={meetingForm.time}
                    onChange={(e) => setMeetingForm({ ...meetingForm, time: e.target.value })}
                    className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-white mt-1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-300">Participant Capacity</label>
                  <input
                    type="number" value={meetingForm.participantCapacity}
                    onChange={(e) => setMeetingForm({ ...meetingForm, participantCapacity: Number(e.target.value) })}
                    className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-white mt-1"
                  />
                </div>
                <div>
                  <label className="text-slate-300">Provider</label>
                  <select
                    value={meetingForm.provider}
                    onChange={(e) => setMeetingForm({ ...meetingForm, provider: e.target.value })}
                    className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-white mt-1"
                  >
                    <option value="Manual">Manual Meet Link</option>
                    <option value="Zoom">Zoom API Integration</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-slate-300">Meeting Link (or Zoom Fallback)</label>
                <input
                  type="url" value={meetingForm.meetingLink}
                  onChange={(e) => setMeetingForm({ ...meetingForm, meetingLink: e.target.value })}
                  className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-white mt-1"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setNewMeetingModal(false)} className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white font-bold">Schedule</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD TEAM MEMBER */}
      {newTeamModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#0f172a] border border-indigo-500/30 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">Add Team Member</h3>
            <form onSubmit={handleCreateTeam} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300">Full Name</label>
                <input
                  type="text" required value={teamForm.name}
                  onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
                  className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-white mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-300">Designation</label>
                  <input
                    type="text" required value={teamForm.designation}
                    onChange={(e) => setTeamForm({ ...teamForm, designation: e.target.value })}
                    className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-white mt-1"
                  />
                </div>
                <div>
                  <label className="text-slate-300">Department</label>
                  <input
                    type="text" value={teamForm.department}
                    onChange={(e) => setTeamForm({ ...teamForm, department: e.target.value })}
                    className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-white mt-1"
                  />
                </div>
              </div>
              <div>
                <label className="text-slate-300">Short Bio</label>
                <textarea
                  rows={2} value={teamForm.shortBio}
                  onChange={(e) => setTeamForm({ ...teamForm, shortBio: e.target.value })}
                  className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-white mt-1"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setNewTeamModal(false)} className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-bold">Add Member</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD PLACEMENT */}
      {newPlacementModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#0f172a] border border-indigo-500/30 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">Add Student Placement Record</h3>
            <form onSubmit={handleCreatePlacement} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300">Student Name</label>
                <input
                  type="text" required value={placementForm.studentName}
                  onChange={(e) => setPlacementForm({ ...placementForm, studentName: e.target.value })}
                  className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-white mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-300">Company</label>
                  <input
                    type="text" required value={placementForm.company}
                    onChange={(e) => setPlacementForm({ ...placementForm, company: e.target.value })}
                    className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-white mt-1"
                  />
                </div>
                <div>
                  <label className="text-slate-300">Role</label>
                  <input
                    type="text" required value={placementForm.role}
                    onChange={(e) => setPlacementForm({ ...placementForm, role: e.target.value })}
                    className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-white mt-1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-300">College</label>
                  <input
                    type="text" required value={placementForm.college}
                    onChange={(e) => setPlacementForm({ ...placementForm, college: e.target.value })}
                    className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-white mt-1"
                  />
                </div>
                <div>
                  <label className="text-slate-300">Package / Stipend</label>
                  <input
                    type="text" value={placementForm.packageOrStipend}
                    onChange={(e) => setPlacementForm({ ...placementForm, packageOrStipend: e.target.value })}
                    className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-white mt-1"
                  />
                </div>
              </div>
              <div>
                <label className="text-slate-300">Success Story</label>
                <textarea
                  rows={2} value={placementForm.successStory}
                  onChange={(e) => setPlacementForm({ ...placementForm, successStory: e.target.value })}
                  className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-white mt-1"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setNewPlacementModal(false)} className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-bold">Add Placement</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
