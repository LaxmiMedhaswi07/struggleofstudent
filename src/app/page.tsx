'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import StatsBar from '@/components/StatsBar';
import WhySS from '@/components/WhySS';
import OpportunitiesSection from '@/components/OpportunitiesSection';
import EventsSection from '@/components/EventsSection';
import VolunteerSection from '@/components/VolunteerSection';
import MeetingsSection from '@/components/MeetingsSection';
import ServicesSection from '@/components/ServicesSection';
import PlacementsSection from '@/components/PlacementsSection';
import TeamSection from '@/components/TeamSection';
import LeadershipSection from '@/components/LeadershipSection';
import JoinCommunityCTA from '@/components/JoinCommunityCTA';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import JoinCommunityModal from '@/components/modals/JoinCommunityModal';
import { initialData } from '@/lib/seed';
import { DBData } from '@/lib/types';

export default function HomePage() {
  const [dbData, setDbData] = useState<DBData>(initialData);
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchAppData = async () => {
    try {
      // Fetch latest stats, opportunities, events, etc.
      const [oppRes, evtRes, meetRes, srvRes, teamRes, leadRes, plcRes, statsRes] = await Promise.all([
        fetch('/api/opportunities'),
        fetch('/api/events'),
        fetch('/api/meetings'),
        fetch('/api/services'),
        fetch('/api/team'),
        fetch('/api/leadership'),
        fetch('/api/placements'),
        fetch('/api/stats'),
      ]);

      const oppData = await oppRes.json();
      const evtData = await evtRes.json();
      const meetData = await meetRes.json();
      const srvData = await srvRes.json();
      const teamData = await teamRes.json();
      const leadData = await leadRes.json();
      const plcData = await plcRes.json();
      const statsData = await statsRes.json();

      setDbData(prev => ({
        ...prev,
        opportunities: oppData.opportunities || prev.opportunities,
        events: evtData.events || prev.events,
        onlineMeetings: meetData.meetings || prev.onlineMeetings,
        services: srvData.services || prev.services,
        teamMembers: teamData.members || prev.teamMembers,
        leadership: leadData.leadership || prev.leadership,
        placements: plcData.placements || prev.placements,
        stats: statsData.stats || prev.stats,
      }));
    } catch (err) {
      console.warn('Using seeded data as fallback while API hydrates:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppData();
  }, []);

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Navigation */}
      <Navbar onOpenJoinModal={() => setJoinModalOpen(true)} />

      {/* Hero Section */}
      <main className="flex-1">
        <Hero onOpenJoinModal={() => setJoinModalOpen(true)} />

        {/* Impact Statistics Counter */}
        <StatsBar stats={dbData.stats} />

        {/* Why SS (Who are we? What do we do?) */}
        <WhySS />

        {/* Opportunities (Internships, Jobs, Ambassador, Showcase, etc.) */}
        <OpportunitiesSection
          opportunities={dbData.opportunities}
          onRefresh={fetchAppData}
        />

        {/* Upcoming Events */}
        <EventsSection
          events={dbData.events}
          onRefresh={fetchAppData}
        />

        {/* Volunteer System (Capacity Counter & Auto-Full disable) */}
        <VolunteerSection
          events={dbData.events}
          onRefresh={fetchAppData}
        />

        {/* Online Meetings & Zoom AMAs */}
        <MeetingsSection
          meetings={dbData.onlineMeetings}
          onRefresh={fetchAppData}
        />

        {/* SS Services (Band, Event Management, IT Solutions, Guidance, Career) */}
        <ServicesSection
          services={dbData.services}
          onRefresh={fetchAppData}
        />

        {/* Student Placements / Impact */}
        <PlacementsSection placements={dbData.placements} />

        {/* SS Team */}
        <TeamSection teamMembers={dbData.teamMembers} />

        {/* Founder & Leadership */}
        <LeadershipSection leadership={dbData.leadership} />

        {/* Final CTA to Join Community */}
        <JoinCommunityCTA onOpenJoinModal={() => setJoinModalOpen(true)} />

        {/* Contact & Helpdesk */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Join Community Registration Modal */}
      <JoinCommunityModal
        isOpen={joinModalOpen}
        onClose={() => setJoinModalOpen(false)}
        onSuccess={fetchAppData}
      />
    </div>
  );
}
