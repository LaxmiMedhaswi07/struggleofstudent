'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Instagram, Linkedin, MessageCircle, Youtube, Github, Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#060911] border-t border-white/5 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/5">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <img
                src="/official-ss-logo.jpg"
                alt="Struggle of Student"
                className="h-14 sm:h-16 w-auto object-contain"
              />
            </Link>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Struggle of Student (SS) is India&apos;s leading grassroots student community and launchpad. 
              Built by students, for students — solving academic roadblocks, powering live concerts, 
              delivering bespoke software, and unlocking career placements.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-pink-400 hover:bg-slate-800 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-white">Ecosystem</span>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#opportunities" className="hover:text-indigo-400 transition-colors">Opportunities Hub</a></li>
              <li><a href="#events" className="hover:text-indigo-400 transition-colors">Campus Events</a></li>
              <li><a href="#volunteer" className="hover:text-indigo-400 transition-colors">Volunteer System</a></li>
              <li><a href="#meetings" className="hover:text-indigo-400 transition-colors">Online AMAs & Zoom</a></li>
              <li><a href="#placements" className="hover:text-indigo-400 transition-colors">Placement Stories</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-white">SS Verticals</span>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#services" className="hover:text-indigo-400 transition-colors">SS Band Live Gig</a></li>
              <li><a href="#services" className="hover:text-indigo-400 transition-colors">SS Event Management</a></li>
              <li><a href="#services" className="hover:text-indigo-400 transition-colors">SS IT Solutions</a></li>
              <li><a href="#services" className="hover:text-indigo-400 transition-colors">Student Guidance Cell</a></li>
              <li><a href="#services" className="hover:text-indigo-400 transition-colors">Career Launchpad</a></li>
            </ul>
          </div>

          {/* Community & Admin */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-white">Community</span>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#why-ss" className="hover:text-indigo-400 transition-colors">Why SS Manifesto</a></li>
              <li><a href="#team" className="hover:text-indigo-400 transition-colors">Active SS Team</a></li>
              <li><a href="#leadership" className="hover:text-indigo-400 transition-colors">Leadership & Founder</a></li>
              <li><a href="#contact" className="hover:text-indigo-400 transition-colors">Helpdesk & Contact</a></li>
              <li>
                <Link href="/admin" className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1">
                  <Shield className="w-3 h-3" /> Admin Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Struggle of Student (SS). All rights reserved. Built with pride for student power.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>by the SS Student Collective</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
