'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Sparkles, Shield, ChevronRight } from 'lucide-react';

interface NavbarProps {
  onOpenJoinModal: () => void;
}

export default function Navbar({ onOpenJoinModal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Why SS', href: '#why-ss' },
    { name: 'Opportunities', href: '#opportunities' },
    { name: 'Events', href: '#events' },
    { name: 'Volunteer', href: '#volunteer' },
    { name: 'Online Meetings', href: '#meetings' },
    { name: 'Services', href: '#services' },
    { name: 'Placements', href: '#placements' },
    { name: 'Team', href: '#team' },
    { name: 'Leadership', href: '#leadership' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#090d16]/90 backdrop-blur-md border-b border-indigo-500/20 py-2.5 shadow-lg shadow-black/50'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Official SS Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img
                src="/official-ss-logo.jpg"
                alt="Struggle of Student Logo"
                className="h-14 sm:h-16 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1.5 bg-slate-900/60 p-1 rounded-full border border-white/5 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/admin"
              className="px-3 py-1.5 text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <Shield className="w-3.5 h-3.5 text-indigo-400" />
              Admin Portal
            </Link>

            <button
              onClick={onOpenJoinModal}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs tracking-wide transition-all shadow-md shadow-indigo-600/30 flex items-center gap-2 glow-btn"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Join Community
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenJoinModal}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-bold text-xs"
            >
              Join
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/10"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0c101c] border-b border-indigo-500/20 px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 pb-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors flex items-center justify-between"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-3 h-3 text-slate-500" />
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenJoinModal();
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs text-center flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Join Community (Free)
            </button>

            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold text-center flex items-center justify-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5 text-indigo-400" />
              Admin Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
