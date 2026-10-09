'use client';

import React, { useState } from 'react';
import { Video, Calendar, Clock, Users, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { OnlineMeeting } from '@/lib/types';
import MeetingRegisterModal from './modals/MeetingRegisterModal';

interface MeetingsSectionProps {
  meetings: OnlineMeeting[];
  onRefresh?: () => void;
}

export default function MeetingsSection({ meetings, onRefresh }: MeetingsSectionProps) {
  const [selectedMeeting, setSelectedMeeting] = useState<OnlineMeeting | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleRegisterClick = (m: OnlineMeeting) => {
    setSelectedMeeting(m);
    setModalOpen(true);
  };

  return (
    <section id="meetings" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold mb-3">
            <Video className="w-3.5 h-3.5" />
            <span>LIVE INTERACTIVE SESSIONS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Online <span className="gradient-text">Meetings & AMAs</span>
          </h2>
          <p className="mt-4 text-base text-slate-300">
            Join live peer counseling circles, resume roast sessions, and system design masterclasses from anywhere.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {meetings.map((meeting) => {
            const isFull = meeting.participantCount >= meeting.participantCapacity;
            return (
              <div
                key={meeting.id}
                className="p-8 rounded-3xl bg-slate-900/60 border border-white/5 hover:border-blue-500/30 transition-all flex flex-col justify-between backdrop-blur-sm shadow-xl shadow-black/40"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1.5">
                      <Zap className="w-3 h-3 text-blue-400" />
                      {meeting.provider === 'Zoom' ? 'Zoom Live Stage' : 'Virtual Classroom'}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                      <Users className="w-3.5 h-3.5 text-indigo-400" />
                      {meeting.participantCount} / {meeting.participantCapacity} Registered
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 leading-snug">{meeting.title}</h3>
                  <p className="text-xs text-slate-400 mb-6 leading-relaxed">{meeting.description}</p>

                  <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-950/70 border border-white/5 text-xs text-slate-300 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-indigo-400" />
                      <span>{meeting.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-purple-400" />
                      <span>{meeting.time} ({meeting.durationMinutes} mins)</span>
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => handleRegisterClick(meeting)}
                    disabled={isFull}
                    className={`w-full py-3 px-5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg ${
                      isFull
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-600/30'
                    }`}
                  >
                    <Video className="w-4 h-4" />
                    {isFull ? 'Session Fully Booked' : 'Register & Get Meeting Access Link'}
                    {!isFull && <ArrowRight className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <MeetingRegisterModal
        isOpen={modalOpen}
        meeting={selectedMeeting}
        onClose={() => setModalOpen(false)}
        onSuccess={onRefresh}
      />
    </section>
  );
}
