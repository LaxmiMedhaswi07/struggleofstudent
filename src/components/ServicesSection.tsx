'use client';

import React, { useState } from 'react';
import { Music, CalendarDays, Code2, HeartPulse, Briefcase, PlusCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { ServiceItem } from '@/lib/types';
import ServiceEnquiryModal from './modals/ServiceEnquiryModal';

interface ServicesSectionProps {
  services: ServiceItem[];
  onRefresh?: () => void;
}

const SERVICE_ICONS: Record<string, any> = {
  'srv-band': Music,
  'srv-events': CalendarDays,
  'srv-it': Code2,
  'srv-guidance': HeartPulse,
  'srv-career': Briefcase,
  'srv-other': PlusCircle
};

export default function ServicesSection({ services, onRefresh }: ServicesSectionProps) {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleEnquireClick = (srv: ServiceItem) => {
    setSelectedService(srv);
    setModalOpen(true);
  };

  return (
    <section id="services" className="py-24 relative overflow-hidden bg-slate-950/40 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3">
            <Code2 className="w-3.5 h-3.5" />
            <span>SOLUTIONS & VERTICALS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            SS <span className="gradient-text">Services</span>
          </h2>
          <p className="mt-4 text-base text-slate-300">
            From premier live musical concerts by SS Band to bespoke full-stack IT development, campus event production, and confidential student mental wellness clinics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv) => {
            const Icon = SERVICE_ICONS[srv.id] || Code2;
            return (
              <div
                key={srv.id}
                className="flex flex-col justify-between rounded-3xl bg-slate-900/60 border border-white/5 hover:border-indigo-500/30 overflow-hidden transition-all backdrop-blur-sm group hover:-translate-y-1.5 shadow-xl shadow-black/40"
              >
                <div>
                  {/* Service Banner Image */}
                  <div className="relative h-44 w-full overflow-hidden">
                    <img
                      src={srv.image}
                      alt={srv.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                    
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-900/80 text-indigo-200 border border-indigo-400/30 backdrop-blur-md">
                        {srv.badge}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-4 flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-md">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold text-white">{srv.name}</h3>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <p className="text-xs font-semibold text-indigo-300">
                      {srv.tagline}
                    </p>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {srv.description}
                    </p>

                    {/* Features checklist */}
                    <div className="space-y-2 pt-2 border-t border-white/5">
                      {srv.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-tight">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => handleEnquireClick(srv)}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-indigo-600 text-white font-bold text-xs transition-all border border-slate-700 hover:border-indigo-500 flex items-center justify-center gap-2 shadow-md group-hover:shadow-indigo-600/30"
                  >
                    <span>{srv.contactCta || 'Enquire Now'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ServiceEnquiryModal
        isOpen={modalOpen}
        service={selectedService}
        onClose={() => setModalOpen(false)}
        onSuccess={onRefresh}
      />
    </section>
  );
}
