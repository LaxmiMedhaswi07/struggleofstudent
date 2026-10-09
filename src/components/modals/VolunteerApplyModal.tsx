'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, HeartHandshake, Loader2, AlertCircle, Sparkles } from 'lucide-react';
import { EventItem } from '@/lib/types';

interface VolunteerApplyModalProps {
  isOpen: boolean;
  event: EventItem | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function VolunteerApplyModal({ isOpen, event, onClose, onSuccess }: VolunteerApplyModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    preferredRole: 'Logistics & Guest Coordination',
    experience: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !event) return null;

  const isFull = event.volunteerFilled >= event.volunteerCapacity;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isFull) {
      setError('Volunteer Slots Full.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/volunteer/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: event.id,
          ...formData
        })
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit application');
      }

      setIsSuccess(true);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.message || 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg my-8 bg-[#0f172a] border border-indigo-500/30 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-cyan-950/80 via-indigo-950/80 to-slate-900 border-b border-indigo-500/20 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-300">
                <HeartHandshake className="w-4 h-4" />
              </span>
              <h3 className="text-lg font-bold text-white leading-tight">Volunteer for Event</h3>
            </div>
            <p className="text-xs text-slate-300 mt-1 line-clamp-1">{event.title}</p>
          </div>
          <button onClick={handleClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Capacity Indicator Banner */}
        <div className="px-6 py-3.5 bg-slate-900/90 border-b border-white/5">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-semibold text-slate-300">Volunteer Slots Availability:</span>
            <span className={`text-xs font-bold ${isFull ? 'text-rose-400' : 'text-emerald-400'}`}>
              {event.volunteerFilled} / {event.volunteerCapacity} Volunteer Slots Filled
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                isFull ? 'bg-rose-500' : 'bg-gradient-to-r from-cyan-500 to-indigo-500'
              }`}
              style={{
                width: `${Math.min(100, Math.round((event.volunteerFilled / Math.max(1, event.volunteerCapacity)) * 100))}%`
              }}
            />
          </div>

          {isFull && (
            <div className="mt-2.5 flex items-center gap-2 p-2 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-semibold">
              <AlertCircle className="w-4 h-4 shrink-0" />
              Volunteer Slots Full. Applications are currently closed for this event.
            </div>
          )}
        </div>

        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-6 space-y-4">
              <div className="inline-flex p-3 rounded-full bg-emerald-500/20 text-emerald-400 ring-8 ring-emerald-500/10">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h4 className="text-xl font-bold text-white">Application Received!</h4>
              <p className="text-sm text-slate-300 max-w-sm mx-auto">
                Thank you for stepping up to power the Struggle of Student community! Our volunteer coordinator will review your profile and reach out via WhatsApp/Phone.
              </p>
              <div className="pt-2">
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm transition-all"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 text-xs text-rose-300 bg-rose-500/10 border border-rose-500/30 rounded-xl">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    disabled={isFull}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Full name"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:border-cyan-500 outline-none disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    disabled={isFull}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@gmail.com"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:border-cyan-500 outline-none disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    disabled={isFull}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:border-cyan-500 outline-none disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">College *</label>
                  <input
                    type="text"
                    required
                    disabled={isFull}
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                    placeholder="Your college"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:border-cyan-500 outline-none disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Preferred Volunteer Role *</label>
                <select
                  disabled={isFull}
                  value={formData.preferredRole}
                  onChange={(e) => setFormData({ ...formData, preferredRole: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:border-cyan-500 outline-none disabled:opacity-50"
                >
                  <option value="Logistics & Guest Coordination">Logistics & Guest Coordination</option>
                  <option value="Crowd Management & Security">Crowd Management & Security</option>
                  <option value="Audio-Visual & Technical Crew">Audio-Visual & Technical Crew</option>
                  <option value="Media, Photography & Reels">Media, Photography & Reels</option>
                  <option value="Stage Anchoring & Assistance">Stage Anchoring & Assistance</option>
                  <option value="Registration Desk & Ticketing">Registration Desk & Ticketing</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Relevant Experience / Why Volunteer?</label>
                <textarea
                  rows={2}
                  disabled={isFull}
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  placeholder="Tell us about past club events or your passion..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:border-cyan-500 outline-none resize-none disabled:opacity-50"
                />
              </div>

              <button
                type="submit"
                disabled={isFull || loading}
                className={`w-full py-2.5 px-4 rounded-xl font-semibold text-sm transition-all shadow-lg flex items-center justify-center gap-2 ${
                  isFull 
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700' 
                    : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-600/30'
                }`}
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : isFull ? (
                  'Volunteer Slots Full'
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Submit Volunteer Application
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
