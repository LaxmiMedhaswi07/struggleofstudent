'use client';

import React from 'react';
import { Users, GraduationCap, Calendar, School, Clock } from 'lucide-react';
import { HomepageStats } from '@/lib/types';

interface StatsBarProps {
  stats: HomepageStats;
}

export default function StatsBar({ stats }: StatsBarProps) {
  const statItems = [
    {
      label: 'Community Members',
      value: `${(stats?.communityMembers || 12450).toLocaleString()}+`,
      sub: 'Across 50+ college campuses',
      icon: Users,
      color: 'from-indigo-500 to-indigo-600',
      textColor: 'text-indigo-400'
    },
    {
      label: 'Students Placed',
      value: `${stats?.studentsPlaced || 480}+`,
      sub: 'Top tech, product & core roles',
      icon: GraduationCap,
      color: 'from-emerald-500 to-emerald-600',
      textColor: 'text-emerald-400'
    },
    {
      label: 'Events & Summits',
      value: `${stats?.eventsHosted || 135}+`,
      sub: 'Concerts, hackathons & AMAs',
      icon: Calendar,
      color: 'from-purple-500 to-purple-600',
      textColor: 'text-purple-400'
    },
    {
      label: 'Partner Colleges',
      value: `${stats?.partnerColleges || 52}+`,
      sub: 'Active student chapters',
      icon: School,
      color: 'from-cyan-500 to-cyan-600',
      textColor: 'text-cyan-400'
    },
    {
      label: 'Volunteer Hours',
      value: `${(stats?.volunteerHours || 18200).toLocaleString()}+`,
      sub: 'Given back to the community',
      icon: Clock,
      color: 'from-amber-500 to-amber-600',
      textColor: 'text-amber-400'
    }
  ];

  return (
    <section className="relative z-10 -mt-6 sm:-mt-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 p-4 sm:p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl shadow-2xl shadow-indigo-950/40">
        {statItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`p-4 rounded-2xl bg-slate-950/50 border border-white/5 hover:border-white/10 transition-all ${
                idx === statItems.length - 1 ? 'col-span-2 md:col-span-1' : ''
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`p-2 rounded-xl bg-gradient-to-br ${item.color} text-white shadow-md`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{item.label}</span>
              </div>
              <div className={`text-2xl sm:text-3xl font-extrabold ${item.textColor} tracking-tight`}>
                {item.value}
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5 truncate">{item.sub}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
