'use client';

import React, { useState } from 'react';
import { 
  Briefcase, Search, Filter, Calendar, MapPin, 
  ExternalLink, ChevronRight, CheckCircle2, Clock, Sparkles 
} from 'lucide-react';
import { Opportunity, OpportunityCategory } from '@/lib/types';
import ApplyOpportunityModal from './modals/ApplyOpportunityModal';

interface OpportunitiesSectionProps {
  opportunities: Opportunity[];
  onRefresh?: () => void;
}

export const CATEGORIES: Array<'All' | OpportunityCategory> = [
  'All',
  'Internships',
  'Jobs',
  'Campus Ambassador',
  'Volunteering',
  'Events',
  'Talent Showcase',
  'Leadership',
  'Workshops/Sessions',
  'Projects',
  'Collaborations'
];

export default function OpportunitiesSection({ opportunities, onRefresh }: OpportunitiesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<'All' | OpportunityCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Open' | 'Closed'>('All');
  const [activeOpportunity, setActiveOpportunity] = useState<Opportunity | null>(null);
  const [applyModalOpen, setApplyModalOpen] = useState(false);

  // Filter opportunities client-side for ultra-fast instant feedback
  const filtered = opportunities.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.companyOrOrg.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q);
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const handleApplyClick = (opp: Opportunity) => {
    setActiveOpportunity(opp);
    setApplyModalOpen(true);
  };

  return (
    <section id="opportunities" className="py-24 relative overflow-hidden bg-slate-950/40 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold mb-3">
              <Briefcase className="w-3.5 h-3.5" />
              <span>WHAT OPPORTUNITIES DO WE PROVIDE?</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Opportunities & <span className="gradient-text">Gigs</span>
            </h2>
            <p className="mt-3 text-sm text-slate-300 max-w-2xl">
              Curated tech internships, creative roles, campus ambassador fellowships, hackathons, and community leadership calls.
            </p>
          </div>

          {/* Search bar & Status filter */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search opportunities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 focus:border-indigo-500 text-xs text-white placeholder-slate-500 outline-none"
              />
            </div>

            <div className="flex items-center bg-slate-900 border border-slate-700 rounded-xl p-1">
              {(['All', 'Open', 'Closed'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    statusFilter === s ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 10 Category Horizontal Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Opportunities Card Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-3xl bg-slate-900/40 border border-white/5">
            <p className="text-slate-400 text-sm">No opportunities found matching your criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setStatusFilter('All');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((opp) => {
              const isOpen = opp.status === 'Open';
              return (
                <div
                  key={opp.id}
                  className="flex flex-col justify-between p-6 rounded-3xl bg-slate-900/60 border border-white/5 hover:border-indigo-500/30 transition-all backdrop-blur-sm group hover:-translate-y-1 shadow-lg shadow-black/40"
                >
                  <div>
                    {/* Card Top Pill & Status */}
                    <div className="flex justify-between items-center mb-4">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/15 text-indigo-300 border border-indigo-500/20">
                        {opp.category}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          isOpen
                            ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                            : 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                        }`}
                      >
                        {opp.status}
                      </span>
                    </div>

                    {/* Title & Company */}
                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">
                      {opp.title}
                    </h3>
                    <p className="text-xs font-medium text-slate-400 mt-1">
                      {opp.companyOrOrg}
                    </p>

                    {/* Meta info tags */}
                    <div className="flex flex-wrap gap-2 mt-4 text-[11px] text-slate-300">
                      <span className="flex items-center gap-1 bg-slate-950/60 px-2.5 py-1 rounded-lg border border-white/5">
                        <MapPin className="w-3 h-3 text-cyan-400" />
                        {opp.location}
                      </span>
                      <span className="flex items-center gap-1 bg-slate-950/60 px-2.5 py-1 rounded-lg border border-white/5">
                        <Clock className="w-3 h-3 text-purple-400" />
                        {opp.type}
                      </span>
                    </div>

                    {/* Stipend / Perks highlight */}
                    <div className="mt-3.5 p-2.5 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs font-semibold text-indigo-300 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span className="truncate">{opp.stipendOrPerks}</span>
                    </div>

                    {/* Description */}
                    <p className="mt-3.5 text-xs text-slate-400 leading-relaxed line-clamp-3">
                      {opp.description}
                    </p>

                    {/* Requirements Tags */}
                    {opp.requirements && opp.requirements.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {opp.requirements.slice(0, 3).map((req, rIdx) => (
                          <span
                            key={rIdx}
                            className="px-2 py-0.5 rounded-md bg-slate-950/50 text-[10px] text-slate-400 border border-white/5"
                          >
                            • {req}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Apply by: {opp.deadline}
                    </span>

                    <button
                      onClick={() => handleApplyClick(opp)}
                      disabled={!isOpen}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        isOpen
                          ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30'
                          : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      {isOpen ? 'Apply Now' : 'Closed'}
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Opportunity Application Modal */}
      <ApplyOpportunityModal
        isOpen={applyModalOpen}
        opportunity={activeOpportunity}
        onClose={() => setApplyModalOpen(false)}
        onSuccess={onRefresh}
      />
    </section>
  );
}
