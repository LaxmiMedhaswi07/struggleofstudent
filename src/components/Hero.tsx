'use client';

import React from 'react';
import { Sparkles, ArrowRight, Compass, Users, Award, ShieldAlert, HeartHandshake } from 'lucide-react';

interface HeroProps {
  onOpenJoinModal: () => void;
}

export default function Hero({ onOpenJoinModal }: HeroProps) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background radial gradient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-cyan-500/10 blur-[130px] -z-10 pointer-events-none rounded-full" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-pink-500/10 blur-[100px] -z-10 pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        {/* Official SS Logo – prominent hero brand placement */}
        <div className="flex justify-center mb-8">
          <img
            src="/official-ss-logo.jpg"
            alt="Struggle of Student"
            className="h-36 sm:h-44 w-auto object-contain"
          />
        </div>

        {/* Gen-Z / Youthful badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-6 animate-pulse-slow">
          <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-ping" />
          <span>A platform built by students, for students.</span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] max-w-5xl mx-auto">
          Your <span className="gradient-text">Struggles.</span>{' '}
          Your <span className="gradient-text-warm">Opportunities.</span>{' '}
          <br className="hidden sm:inline" />
          Your <span className="text-white underline decoration-indigo-500 decoration-wavy underline-offset-8">Community.</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
          From exam anxiety and placement stress to campus band concerts and tech hackathons. 
          <strong className="text-white font-semibold"> Struggle of Student (SS)</strong> empowers college students 
          to conquer hardships, unlock verified internships, build standout portfolios, and grow together.
        </p>

        {/* Dual Primary Action Buttons */}
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button
            onClick={onOpenJoinModal}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm tracking-wide transition-all shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 glow-btn"
          >
            <Sparkles className="w-4 h-4" />
            Join Community (Free)
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>

          <a
            href="#opportunities"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-500 font-semibold text-sm transition-all flex items-center justify-center gap-2 backdrop-blur-md"
          >
            <Compass className="w-4 h-4 text-cyan-400" />
            Explore Opportunities
          </a>
        </div>

        {/* Quick Proof Pill Highlights */}
        <div className="mt-14 pt-8 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-300 bg-slate-900/40 p-2.5 rounded-xl border border-white/5">
            <Users className="w-4 h-4 text-indigo-400" />
            <span>12,000+ Student Members</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-300 bg-slate-900/40 p-2.5 rounded-xl border border-white/5">
            <Award className="w-4 h-4 text-amber-400" />
            <span>480+ Dream Placements</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-300 bg-slate-900/40 p-2.5 rounded-xl border border-white/5">
            <HeartHandshake className="w-4 h-4 text-rose-400" />
            <span>24/7 Peer Guidance</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-300 bg-slate-900/40 p-2.5 rounded-xl border border-white/5">
            <ShieldAlert className="w-4 h-4 text-cyan-400" />
            <span>Zero Fees • 100% Student-Led</span>
          </div>
        </div>
      </div>
    </section>
  );
}
