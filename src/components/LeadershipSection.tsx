'use client';

import React from 'react';
import { Shield, Linkedin, Twitter, Award, CheckCircle2 } from 'lucide-react';
import { LeadershipProfile } from '@/lib/types';

interface LeadershipSectionProps {
  leadership: LeadershipProfile[];
}

export default function LeadershipSection({ leadership }: LeadershipSectionProps) {
  return (
    <section id="leadership" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-3">
            <Shield className="w-3.5 h-3.5" />
            <span>EXECUTIVE GOVERNANCE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Founder & <span className="gradient-text">Leadership</span>
          </h2>
          <p className="mt-4 text-base text-slate-300">
            Visionary student founders and academic directors steering Struggle of Student towards national impact.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {leadership.map((leader) => (
            <div
              key={leader.id}
              className="p-8 rounded-3xl bg-slate-900/70 border border-white/5 hover:border-purple-500/30 transition-all flex flex-col justify-between backdrop-blur-sm shadow-xl shadow-black/50 group"
            >
              <div>
                {/* Professional Photo */}
                <div className="relative mb-6 overflow-hidden rounded-2xl aspect-[4/4]">
                  <img
                    src={leader.photo}
                    alt={leader.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-900/90 text-purple-200 border border-purple-400/30 backdrop-blur-md">
                      {leader.designation}
                    </span>
                  </div>
                </div>

                {/* Name & Bio */}
                <h3 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
                  {leader.name}
                </h3>
                <p className="text-xs font-semibold text-purple-400 mt-1 mb-4">
                  {leader.designation}
                </p>

                <p className="text-xs text-slate-300 leading-relaxed mb-5">
                  {leader.bio}
                </p>

                {/* Responsibility Card */}
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-indigo-500/20 space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400 block">
                    Core Mandate & Responsibility:
                  </span>
                  <p className="text-xs text-slate-300 font-medium leading-relaxed">
                    {leader.responsibility}
                  </p>
                </div>
              </div>

              {/* Social links */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-3">
                {leader.linkedin && (
                  <a
                    href={leader.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-slate-950 text-slate-400 hover:text-purple-400 hover:bg-slate-800 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {leader.twitter && (
                  <a
                    href={leader.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-slate-950 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
