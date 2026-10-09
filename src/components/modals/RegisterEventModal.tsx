'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, Ticket, Calendar, MapPin, Loader2 } from 'lucide-react';
import { EventItem } from '@/lib/types';

interface RegisterEventModalProps {
  isOpen: boolean;
  event: EventItem | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function RegisterEventModal({ isOpen, event, onClose, onSuccess }: RegisterEventModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [ticketData, setTicketData] = useState<any>(null);

  if (!isOpen || !event) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/events/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: event.id,
          ...formData
        })
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to register');
      }

      setTicketData(data.registration);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setTicketData(null);
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-md my-8 bg-[#0f172a] border border-indigo-500/30 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-purple-950/80 to-slate-900 border-b border-indigo-500/20 flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-white leading-tight">Register for Event</h3>
            <p className="text-xs text-indigo-300 mt-1 line-clamp-1">{event.title}</p>
          </div>
          <button onClick={handleClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {ticketData ? (
            <div className="text-center py-4 space-y-5">
              <div className="inline-flex p-3 rounded-full bg-emerald-500/20 text-emerald-400 ring-8 ring-emerald-500/10">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h4 className="text-xl font-bold text-white">Registration Confirmed!</h4>
                <p className="text-xs text-slate-400 mt-1">Here is your digital attendee pass.</p>
              </div>

              {/* Event Ticket Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/80 to-slate-900 border-2 border-dashed border-indigo-500/50 text-left relative shadow-lg">
                <div className="flex justify-between items-start border-b border-white/10 pb-3 mb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">OFFICIAL EVENT PASS</span>
                    <h5 className="font-bold text-sm text-white line-clamp-1">{event.title}</h5>
                  </div>
                  <Ticket className="w-6 h-6 text-indigo-400" />
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{event.date} • {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="truncate">{event.location}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Attendee</span>
                    <span className="text-xs font-semibold text-white">{ticketData.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">Ticket Code</span>
                    <span className="text-sm font-mono font-bold text-emerald-400">{ticketData.ticketCode}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all"
              >
                Close & View Event
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 text-xs text-red-300 bg-red-500/10 border border-red-500/30 rounded-xl">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your full name"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:border-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@college.edu / gmail.com"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:border-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number (WhatsApp) *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:border-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">College / University *</label>
                <input
                  type="text"
                  required
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  placeholder="Your college name"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:border-indigo-500 outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Ticket className="w-4 h-4" />}
                Confirm Free Registration
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
