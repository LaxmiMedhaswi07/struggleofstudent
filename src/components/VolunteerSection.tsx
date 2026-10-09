'use client';

import React, { useState } from 'react';
import { HeartHandshake, CheckCircle2, AlertCircle, Sparkles, Users, Award, ShieldCheck, ChevronRight } from 'lucide-react';
import { EventItem } from '@/lib/types';
import VolunteerApplyModal from './modals/VolunteerApplyModal';

interface VolunteerSectionProps {
  events: EventItem[];
  onRefresh?: () => void;
}

export default function VolunteerSection({ events, onRefresh }: VolunteerSectionProps) {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleApplyClick = (event: EventItem) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  return (
    <section id="volunteer" className="py-24 relative overflow-hidden bg-slate-950/60 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold mb-3">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>COMMUNITY POWER & LEADERSHIP</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Volunteer with <span className="gradient-text">Struggle of Student</span>
          </h2>
          <p className="mt-4 text-base text-slate-300">
            Be the backbone of real impact. Gain backstage experience, leadership credentials, and network directly with guest founders and artists.
          </p>
        </div>

        {/* Value Perks Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/5 backdrop-blur-sm">
            <div className="p-3 w-fit rounded-xl bg-cyan-500/10 text-cyan-400 mb-3 border border-cyan-500/20">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white mb-1">Official Volunteer Certificate</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Earn certified volunteer hours and a letter of recommendation for your master&apos;s or job applications.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/5 backdrop-blur-sm">
            <div className="p-3 w-fit rounded-xl bg-purple-500/10 text-purple-400 mb-3 border border-purple-500/20">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white mb-1">Backstage Access & Networking</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Work alongside tech founders, keynote speakers, and the SS Band crew during premier campus summits.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/5 backdrop-blur-sm">
            <div className="p-3 w-fit rounded-xl bg-indigo-500/10 text-indigo-400 mb-3 border border-indigo-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white mb-1">Fast-Track Leadership Council</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Top volunteers are promoted directly to Core Council Heads and Campus Ambassador Directors.
            </p>
          </div>
        </div>

        {/* Live Event Volunteer Capacity Table / Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-lg font-bold text-white">Live Event Volunteer Openings:</h3>
            <span className="text-xs text-slate-400">Slots auto-lock when capacity is filled</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {events.map((evt) => {
              const isFull = evt.volunteerFilled >= evt.volunteerCapacity;
              const fillPercent = Math.min(
                100,
                Math.round((evt.volunteerFilled / Math.max(1, evt.volunteerCapacity)) * 100)
              );

              return (
                <div
                  key={evt.id}
                  className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 hover:border-cyan-500/30 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 bg-slate-950 px-2.5 py-1 rounded-md border border-white/5">
                        {evt.date} • {evt.type}
                      </span>
                      {isFull ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          Volunteer Slots Full
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          Open For Volunteers
                        </span>
                      )}
                    </div>

                    <h4 className="text-lg font-bold text-white mb-2 leading-snug">{evt.title}</h4>
                    <p className="text-xs text-slate-400 mb-4 line-clamp-2">{evt.description}</p>

                    {/* Prominent Slot Tracker */}
                    <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/5 space-y-2 mb-4">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400 font-medium">Volunteer Slots:</span>
                        <span
                          className={`font-mono font-bold text-sm ${
                            isFull ? 'text-rose-400' : 'text-cyan-400'
                          }`}
                        >
                          {evt.volunteerFilled} / {evt.volunteerCapacity} Volunteer Slots Filled
                        </span>
                      </div>

                      {/* Visual progress bar */}
                      <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-700 ${
                            isFull
                              ? 'bg-rose-500'
                              : 'bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500'
                          }`}
                          style={{ width: `${fillPercent}%` }}
                        />
                      </div>

                      <div className="flex justify-between items-center text-[10px] text-slate-500">
                        <span>{fillPercent}% filled</span>
                        <span>{Math.max(0, evt.volunteerCapacity - evt.volunteerFilled)} remaining</span>
                      </div>
                    </div>
                  </div>

                  {/* Application Action Button */}
                  <div>
                    {isFull ? (
                      <button
                        disabled
                        className="w-full py-2.5 px-4 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-500 font-semibold text-xs cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        <AlertCircle className="w-4 h-4 text-rose-400" />
                        Volunteer Slots Full.
                      </button>
                    ) : (
                      <button
                        onClick={() => handleApplyClick(evt)}
                        className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs transition-all shadow-md shadow-cyan-600/20 flex items-center justify-center gap-2"
                      >
                        <Sparkles className="w-4 h-4" />
                        Apply as Volunteer ({evt.volunteerCapacity - evt.volunteerFilled} slots left)
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <VolunteerApplyModal
        isOpen={modalOpen}
        event={selectedEvent}
        onClose={() => setModalOpen(false)}
        onSuccess={onRefresh}
      />
    </section>
  );
}
