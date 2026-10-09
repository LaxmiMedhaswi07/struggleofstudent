'use client';

import React from 'react';
import { Users, Linkedin, Github, Sparkles } from 'lucide-react';
import { TeamMember } from '@/lib/types';

interface TeamSectionProps {
  teamMembers: TeamMember[];
}

export default function TeamSection({ teamMembers }: TeamSectionProps) {
  const activeMembers = teamMembers.filter((m) => m.isActive);

  return (
    <section id="team" className="py-24 relative overflow-hidden bg-slate-950/40 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>THE PASSIONATE SQUAD</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Meet the <span className="gradient-text">SS Team</span>
          </h2>
          
          {/* Prominent Active Members Badge */}
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold flex items-center gap-2 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Total Active Team Members: {activeMembers.length}
            </span>
          </div>

          <p className="mt-4 text-base text-slate-300">
            Student leaders, developers, musicians, and counselors volunteering their time to make college life better for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeMembers.map((member) => (
            <div
              key={member.id}
              className="p-6 rounded-3xl bg-slate-900/60 border border-white/5 hover:border-indigo-500/30 transition-all flex flex-col justify-between backdrop-blur-sm group hover:-translate-y-1 shadow-xl shadow-black/40"
            >
              <div>
                <div className="relative mb-5 overflow-hidden rounded-2xl aspect-[4/3]">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 text-indigo-300 border border-indigo-400/30 backdrop-blur-md">
                      {member.department}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {member.name}
                </h3>
                <p className="text-xs font-semibold text-indigo-400 mt-0.5">
                  {member.designation}
                </p>
                <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                  {member.shortBio}
                </p>
              </div>

              {/* Social links */}
              <div className="mt-5 pt-3 border-t border-white/5 flex items-center gap-3">
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg bg-slate-950 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    <Github className="w-4 h-4" />
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
