'use client';

import React from 'react';
import { Target, Users, Zap, ShieldCheck, Rocket, Music, LifeBuoy, Code } from 'lucide-react';

export default function WhySS() {
  const pillars = [
    {
      title: 'Real Peer Problem Solving',
      problem: 'College can feel isolating when facing backlogs, tough professors, or personal anxieties.',
      solution: 'SS connects you with empathetic senior mentors and peer support clinics who have walked your exact path.',
      icon: LifeBuoy,
      color: 'text-rose-400',
      bg: 'bg-rose-500/10 border-rose-500/20'
    },
    {
      title: 'Verified Opportunities, Zero Fluff',
      problem: 'Exhausted by fake internships requiring fees, scam referral schemes, and ghost job postings.',
      solution: 'Every internship, campus drive, and project on SS is vetted directly with legitimate founders and partners.',
      icon: Rocket,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10 border-indigo-500/20'
    },
    {
      title: 'Real-World Production Experience',
      problem: 'Classroom theory does not prepare you for production software engineering or corporate event planning.',
      solution: 'Work directly on client codebases with SS IT Solutions or coordinate massive fests with SS Event Management.',
      icon: Code,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10 border-cyan-500/20'
    },
    {
      title: 'Youth Culture & Artistic Expression',
      problem: 'Engineering and college life without cultural expression leads to burnout and lost passion.',
      solution: 'Our famous SS Band and creative media squads let student musicians and creators rock real festival stages.',
      icon: Music,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20'
    }
  ];

  return (
    <section id="why-ss" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-3">
            <Target className="w-3.5 h-3.5" />
            <span>WHO ARE WE & WHAT DO WE DO?</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Why <span className="gradient-text">Struggle of Student?</span>
          </h2>
          <p className="mt-4 text-base text-slate-300">
            We started as a passionate group of students tired of seeing our peers struggle in silence. 
            Today, SS is the central nervous system for ambitious, creative, and resilient college students.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-slate-900/60 border border-white/5 hover:border-indigo-500/30 transition-all backdrop-blur-sm group"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3.5 rounded-2xl border ${pillar.bg} ${pillar.color} shrink-0 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {pillar.title}
                    </h3>
                    
                    <div className="space-y-2 text-sm">
                      <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5">
                        <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider block mb-0.5">The Student Struggle:</span>
                        <p className="text-slate-400 text-xs leading-relaxed">{pillar.problem}</p>
                      </div>

                      <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/20">
                        <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block mb-0.5">The SS Solution:</span>
                        <p className="text-slate-200 text-xs leading-relaxed font-medium">{pillar.solution}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Community Manifesto Card */}
        <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-slate-950 border border-indigo-500/30 text-center relative overflow-hidden">
          <div className="max-w-3xl mx-auto space-y-4">
            <h3 className="text-2xl font-bold text-white">
              “No student should feel powerless in their college journey.”
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Whether you need guidance on your first line of code, advice on overcoming backlog pressure, 
              a stage to sing your songs, or a direct line to top tech recruiters — 
              <span className="text-indigo-400 font-semibold"> Struggle of Student</span> is your safe space and launchpad.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
