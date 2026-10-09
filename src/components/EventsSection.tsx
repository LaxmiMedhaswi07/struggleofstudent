'use client';

import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Ticket, ArrowRight } from 'lucide-react';
import { EventItem } from '@/lib/types';
import RegisterEventModal from './modals/RegisterEventModal';

interface EventsSectionProps {
  events: EventItem[];
  onRefresh?: () => void;
}

export default function EventsSection({ events, onRefresh }: EventsSectionProps) {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);

  const handleRegisterClick = (event: EventItem) => {
    setSelectedEvent(event);
    setRegisterModalOpen(true);
  };

  return (
    <section id="events" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-3">
            <Calendar className="w-3.5 h-3.5" />
            <span>CAMPUS SUMMITS & CONCERTS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Upcoming <span className="gradient-text">Events</span>
          </h2>
          <p className="mt-4 text-base text-slate-300">
            Join thousands of energetic students at hackathons, tech masterclasses, career summits, and live SS Band performances.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex flex-col justify-between rounded-3xl bg-slate-900/60 border border-white/5 hover:border-purple-500/30 overflow-hidden transition-all backdrop-blur-sm group hover:-translate-y-1 shadow-xl shadow-black/40"
            >
              <div>
                {/* Event Image Banner with Badge */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={event.bannerImage}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-900/80 text-purple-200 border border-purple-400/30 backdrop-blur-md">
                      {event.type}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-200 font-medium">
                    <span className="flex items-center gap-1.5 bg-black/60 px-2.5 py-1 rounded-lg backdrop-blur-md">
                      <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-1.5 bg-black/60 px-2.5 py-1 rounded-lg backdrop-blur-md">
                      <Clock className="w-3.5 h-3.5 text-purple-400" />
                      {event.time}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  {/* Event Title */}
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors leading-snug">
                    {event.title}
                  </h3>

                  {/* Location & Capacity */}
                  <div className="space-y-2 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{event.registeredCount} / {event.maxCapacity} Attendees Registered</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {event.description}
                  </p>

                  {/* Featured Speakers */}
                  {event.speakers && event.speakers.length > 0 && (
                    <div className="pt-2 border-t border-white/5">
                      <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block mb-2">
                        Featured Speakers / Artists:
                      </span>
                      <div className="flex items-center gap-2">
                        {event.speakers.map((spk, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 bg-slate-950/60 p-1 pr-2 rounded-full border border-white/5">
                            <img src={spk.avatar} alt={spk.name} className="w-5 h-5 rounded-full object-cover" />
                            <span className="text-[10px] text-slate-300 font-medium">{spk.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Action */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => handleRegisterClick(event)}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs transition-all shadow-md shadow-purple-600/30 flex items-center justify-center gap-2"
                >
                  <Ticket className="w-4 h-4" />
                  Register For Event
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <RegisterEventModal
        isOpen={registerModalOpen}
        event={selectedEvent}
        onClose={() => setRegisterModalOpen(false)}
        onSuccess={onRefresh}
      />
    </section>
  );
}
