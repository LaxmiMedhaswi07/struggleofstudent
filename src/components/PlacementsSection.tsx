'use client';

import React from 'react';
import { Award, Briefcase, GraduationCap, Building2, Quote, Sparkles } from 'lucide-react';
import { StudentPlacement } from '@/lib/types';

interface PlacementsSectionProps {
  placements: StudentPlacement[];
}

export default function PlacementsSection({ placements }: PlacementsSectionProps) {
  // Aggregate company statistics
  const companyCounts = placements.reduce((acc: Record<string, number>, p) => {
    acc[p.company] = (acc[p.company] || 0) + 1;
    return acc;
  }, {});

  return (
    <section id="placements" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>REAL CAREER OUTCOMES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Student <span className="gradient-text">Placements & Impact</span>
          </h2>
          <p className="mt-4 text-base text-slate-300">
            From tier-3 engineering colleges to Fortune 500 tech companies and high-growth startups. 
            Real students, real struggles overcome, and life-changing offers.
          </p>
        </div>

        {/* Company Placement Ticker Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
          {Object.entries(companyCounts).map(([company, count]) => (
            <div
              key={company}
              className="px-4 py-2 rounded-xl bg-slate-900/80 border border-white/10 flex items-center gap-2.5 backdrop-blur-sm"
            >
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-white">{company}</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {count}+ Placed
              </span>
            </div>
          ))}
        </div>

        {/* Success Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {placements.map((plc) => (
            <div
              key={plc.id}
              className="p-6 rounded-3xl bg-slate-900/60 border border-white/5 hover:border-emerald-500/30 transition-all flex flex-col justify-between backdrop-blur-sm shadow-xl shadow-black/40 group hover:-translate-y-1"
            >
              <div>
                {/* Header with Student Photo & Company */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={plc.studentPhoto}
                      alt={plc.studentName}
                      className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500/40"
                    />
                    <div>
                      <h4 className="text-base font-bold text-white leading-tight">{plc.studentName}</h4>
                      <p className="text-xs text-slate-400 truncate max-w-[170px]">{plc.college}</p>
                      <span className="text-[10px] font-medium text-slate-500">{plc.batch}</span>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-xl text-xs font-extrabold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-mono">
                    {plc.packageOrStipend}
                  </span>
                </div>

                {/* Role & Company Tag */}
                <div className="p-3 rounded-2xl bg-slate-950/70 border border-white/5 mb-4 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Placed Company:</span>
                    <span className="font-bold text-white">{plc.company}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Role:</span>
                    <span className="font-semibold text-emerald-400">{plc.role}</span>
                  </div>
                </div>

                {/* Testimonial / Story */}
                <div className="relative">
                  <Quote className="w-5 h-5 text-emerald-500/30 mb-1" />
                  <p className="text-xs text-slate-300 italic leading-relaxed pl-2 border-l border-emerald-500/30">
                    &ldquo;{plc.successStory}&rdquo;
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1 text-emerald-400">
                  <Sparkles className="w-3 h-3" /> SS Placement Network
                </span>
                <span>Verified Offer</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
