'use client';

import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

interface JoinCommunityCTAProps {
  onOpenJoinModal: () => void;
}

export default function JoinCommunityCTA({ onOpenJoinModal }: JoinCommunityCTAProps) {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-14 bg-gradient-to-r from-indigo-900/80 via-purple-900/60 to-slate-900 border border-indigo-500/40 shadow-2xl shadow-indigo-950/60 overflow-hidden text-center">
          {/* Decorative Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Zero Fees • Lifetime Free Membership
            </span>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Ready to Turn Your College Struggles into Unstoppable Opportunities?
            </h2>

            <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
              Join 12,000+ passionate students across 50+ campuses. Access free peer mentorship, verified tech internships, live SS Band jams, and a network that has your back.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onOpenJoinModal}
                className="w-full sm:w-auto px-9 py-4 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-extrabold text-sm tracking-wide transition-all shadow-xl shadow-white/10 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-indigo-600" />
                Join Struggle of Student Now
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>

            <div className="pt-4 flex flex-wrap justify-center gap-6 text-xs text-indigo-200">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Instant Digital Member ID
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> WhatsApp & Discord Access
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 1-on-1 Mentorship Guarantee
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
