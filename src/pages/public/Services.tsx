import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Scale, Trees, HeartHandshake, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { servicesConfig } from '../../config/services.config';
import { imageConfig } from '../../config/image.config';
import { Button } from '../../components/ui/Button';

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
    <div className="space-y-16 pb-20 font-bangla">
      {/* HERO HEADER */}
      <section className="relative bg-[#0F172A] text-white overflow-hidden border-b-2 border-amber-500/40">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src={imageConfig.heroCourt} alt="Services Hero" className="w-full h-full object-cover" />
        </div>
        <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-amber-500/10 blur-3xl z-0" />
        <div className="absolute -bottom-12 -left-12 w-56 h-56 rounded-full bg-amber-500/8 blur-3xl z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center py-20 lg:py-28">
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold border border-amber-400/40 uppercase tracking-widest mb-5">
            আমাদের সেবাসমূহ
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white font-heading block">
            {selectedService ? selectedService.titleBn : 'নেকী ফাউন্ডেশনের সেবাসমূহ'}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed font-sans mt-5">
            {selectedService
              ? selectedService.shortDescriptionBn
              : 'আমরা সমাজে ন্যায়বিচার ও সমতা প্রতিষ্ঠায় আইনী সহায়তা এবং সামাজিক সুরক্ষামূলক বহুমুখী সেবা প্রদান করছি।'}
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
                className="glass-card rounded-3xl overflow-hidden shadow-xl border border-amber-500/20 flex flex-col justify-between group hover:-translate-y-1.5 transition-all duration-300"
              >
                <div>
                  {/* Real Image Header */}
                  <div className="h-52 overflow-hidden relative">
                    <img
                      src={img}
                      alt={service.titleBn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-5">
                      <div className="flex items-center gap-3 text-white">
                        <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-lg">
                          {service.category === 'LEGAL' && <Scale className="w-5 h-5" />}
                          {service.category === 'ENVIRONMENT' && <Trees className="w-5 h-5" />}
                          {service.category === 'HEALTH' && <HeartHandshake className="w-5 h-5" />}
                          {service.category === 'SOCIAL_PROTECTION' && <ShieldCheck className="w-5 h-5" />}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold font-heading">{service.titleBn}</h3>
                          <p className="text-xs text-amber-300 font-sans">{service.titleEn}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <p className="text-sm text-gray-700 font-sans leading-relaxed">
                      {service.shortDescriptionBn}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-amber-500/15">
                      <p className="text-xs font-extrabold text-[#D97706] uppercase tracking-wider font-sans">
                        ইম্প্যাক্ট হাইলাইটস:
                      </p>
                      {service.impactMetrics.map((m, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-700 font-sans font-bold">
                          <CheckCircle2 className="w-4 h-4 text-[#D97706] shrink-0" />
                          <span>
                            {m.label}: <strong className="text-gray-900 font-heading">{m.value}</strong>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action Bar */}
                <div className="p-6 pt-0 flex items-center justify-between">
                  <Link
                    to={`/services/${service.slug}`}
                    className="text-xs font-bold text-[#D97706] hover:underline flex items-center gap-1 font-sans"
                  >
                    বিস্তারিত তথ্য <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  {service.category === 'LEGAL' && (
                    <Link to="/legal-assistance/apply">
                      <Button size="sm" variant="gold">
                        আবেদন করুন
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
