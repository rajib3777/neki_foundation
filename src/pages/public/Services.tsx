import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Scale, Trees, HeartHandshake, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { servicesConfig } from '../../config/services.config';
import { imageConfig } from '../../config/image.config';

export const Services: React.FC = () => {
  const { slug } = useParams();
  const selectedService = slug ? servicesConfig.find((s) => s.slug === slug) : null;

  const getImageForCategory = (category: string) => {
    switch (category) {
      case 'LEGAL': return imageConfig.legalDesk;
      case 'ENVIRONMENT': return imageConfig.treeEnv;
      case 'HEALTH': return imageConfig.healthCare;
      default: return imageConfig.legalDesk;
    }
  };

  return (
    <div className="space-y-16 pb-24 font-bangla">
      {/* HERO HEADER */}
      <section className="relative bg-gradient-to-r from-[#064E3B] via-[#047857] to-[#0F172A] text-white overflow-hidden border-b-2 border-emerald-600/30">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src={imageConfig.heroCourt} alt="Services Hero" className="w-full h-full object-cover" />
        </div>
        <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-amber-500/10 blur-3xl z-0" />
        <div className="absolute -bottom-12 -left-12 w-56 h-56 rounded-full bg-emerald-500/10 blur-3xl z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center py-20 lg:py-24 flex flex-col items-center">
          <div className="mb-4">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30 uppercase tracking-widest">
              আমাদের সেবাসমূহ
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white font-heading leading-tight sm:leading-snug">
            {selectedService ? selectedService.titleBn : 'নেকী ফাউন্ডেশনের সেবাসমূহ'}
          </h1>
          <p className="text-base sm:text-lg text-emerald-100 max-w-3xl mx-auto leading-relaxed font-sans font-normal pt-4">
            {selectedService
              ? selectedService.shortDescriptionBn
              : 'আমরা সমাজে ন্যায়বিচার ও সমতা প্রতিষ্ঠায় আইনী সহায়তা এবং পরিবেশ ও সামাজিক সুরক্ষামূলক বহুমুখী সেবা প্রদান করছি।'}
          </p>
        </div>
      </section>

      {/* SERVICES GRID WITH REAL IMAGES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicesConfig.map((service) => {
            const img = getImageForCategory(service.category);
            return (
              <div
                key={service.id}
                className="glass-card rounded-3xl overflow-hidden shadow-xl border border-slate-200 flex flex-col justify-between group hover:-translate-y-1.5 transition-all duration-300"
              >
                <div>
                  {/* Real Image Header */}
                  <div className="h-56 overflow-hidden relative">
                    <img
                      src={img}
                      alt={service.titleBn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex items-end p-5">
                      <div className="flex items-center gap-3 text-white">
                        <div className="w-11 h-11 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-lg shrink-0">
                          {service.category === 'LEGAL' && <Scale className="w-6 h-6" />}
                          {service.category === 'ENVIRONMENT' && <Trees className="w-6 h-6" />}
                          {service.category === 'HEALTH' && <HeartHandshake className="w-6 h-6" />}
                          {service.category === 'SOCIAL_PROTECTION' && <ShieldCheck className="w-6 h-6" />}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold font-heading leading-tight">{service.titleBn}</h3>
                          <p className="text-xs text-amber-300 font-sans">{service.titleEn}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <p className="text-sm text-slate-700 font-sans leading-relaxed">
                      {service.shortDescriptionBn}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <p className="text-xs font-extrabold text-[#064E3B] uppercase tracking-wider font-sans">
                        বাস্তব প্রভাব ও পরিসংখ্যান:
                      </p>
                      {service.impactMetrics.map((m, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-sans">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>
                            {m.label}: <strong className="text-slate-900 font-heading">{m.value}</strong>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={service.category === 'LEGAL' ? '/legal-assistance/apply' : '/contact'}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#064E3B] hover:text-[#D97706] pt-3"
                  >
                    আবেদন বা যুক্ত হোন <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
