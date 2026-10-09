'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, Video, Calendar, Clock, ExternalLink, Loader2, Copy } from 'lucide-react';
import { OnlineMeeting } from '@/lib/types';

interface MeetingRegisterModalProps {
  isOpen: boolean;
  meeting: OnlineMeeting | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function MeetingRegisterModal({ isOpen, meeting, onClose, onSuccess }: MeetingRegisterModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    college: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [registered, setRegistered] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen || !meeting) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/meetings/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          meetingId: meeting.id,
          ...formData
        })
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to register');
      }

      setRegistered(true);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(meeting.meetingLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    setRegistered(false);
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-md my-8 bg-[#0f172a] border border-indigo-500/30 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-blue-950/80 to-slate-900 border-b border-indigo-500/20 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <Video className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-300">
                {meeting.provider === 'Zoom' ? 'Zoom Live Session' : 'Interactive Meeting'}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mt-1 leading-snug">{meeting.title}</h3>
          </div>
          <button onClick={handleClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {registered ? (
            <div className="text-center py-4 space-y-5">
              <div className="inline-flex p-3 rounded-full bg-emerald-500/20 text-emerald-400 ring-8 ring-emerald-500/10">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h4 className="text-xl font-bold text-white">Spot Reserved!</h4>
                <p className="text-xs text-slate-300 mt-1">
                  You are registered for this online session. Save the session details below:
                </p>
              </div>

              {/* Meeting Access Card */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-indigo-500/30 text-left space-y-2.5">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Calendar className="w-4 h-4 text-indigo-400" />
                  <span>{meeting.date} at {meeting.time}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Clock className="w-4 h-4 text-indigo-400" />
                  <span>{meeting.durationMinutes} Minutes Duration</span>
                </div>

                {meeting.zoomMeetingId && (
                  <div className="pt-2 border-t border-white/10 text-xs">
                    <p className="text-slate-400">Meeting ID: <span className="text-white font-mono font-bold">{meeting.zoomMeetingId}</span></p>
                    {meeting.zoomPassword && (
                      <p className="text-slate-400">Passcode: <span className="text-white font-mono font-bold">{meeting.zoomPassword}</span></p>
                    )}
                  </div>
                )}

                <div className="pt-2 border-t border-white/10 flex items-center gap-2">
                  <a
                    href={meeting.meetingLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs text-center flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Open Meeting Link
                  </a>
                  <button
                    onClick={handleCopyLink}
                    className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1 transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-all"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 text-xs text-rose-300 bg-rose-500/10 border border-rose-500/30 rounded-xl">
                  {error}
                </div>
              )}

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-400" />
                  <span>{meeting.date} • {meeting.time}</span>
                </div>
                <span className="text-indigo-400 font-semibold">{meeting.durationMinutes} mins</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Priyanshu Gupta"
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
                  placeholder="name@gmail.com"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:border-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">College *</label>
                <input
                  type="text"
                  required
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  placeholder="Your college / university"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:border-indigo-500 outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Video className="w-4 h-4" />}
                Register & Get Access Link
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
