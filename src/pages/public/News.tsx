import React from 'react';
import { Link } from 'react-router-dom';
import { mockNewsArticles } from '../../data/mock/news.data';
import { imageConfig } from '../../config/image.config';
import { ArrowRight, Calendar } from 'lucide-react';

export const News: React.FC = () => {
  const images = [imageConfig.legalDesk, imageConfig.treeEnv, imageConfig.healthCare];

  return (
    <div className="space-y-12 pb-20 font-bangla">
      {/* Header Banner */}
      <section className="bg-[#0F172A] text-white border-b-2 border-amber-500/40 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute -bottom-12 -left-12 w-56 h-56 rounded-full bg-amber-500/8 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 lg:py-24 relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold border border-amber-400/40 uppercase tracking-widest mb-5">
            সংবাদ ও আপডেট
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white block">
            সাম্প্রতিক কার্যক্রম{' '}
            <span className="text-gold-gradient font-heading">ও নোটিশ</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-sans leading-relaxed mt-5">
            নেকী ফাউন্ডেশনের সর্বশেষ আইনী সহায়তা উদ্যোগ, বৃক্ষরোপণ, জরুরি রক্তদান এবং গুরুত্বপূর্ণ সামাজিক বিজ্ঞপ্তি।
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockNewsArticles.map((article, index) => {
            const img = images[index % images.length];
            return (
              <div
                key={article.id}
                className="glass-card rounded-3xl overflow-hidden shadow-xl border border-amber-500/20 flex flex-col justify-between group hover:-translate-y-1.5 transition-all duration-300"
              >
                <div>
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={img}
                      alt={article.titleBn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#0F172A]/90 backdrop-blur-md text-amber-400 px-3 py-1 rounded-full text-xs font-bold border border-amber-400/30">
                      {article.categoryBn}
                    </div>
                  </div>

                  <div className="p-6 space-y-3 font-sans">
                    <h3 className="text-lg font-bold text-gray-900 font-heading leading-snug line-clamp-2">
                      {article.titleBn}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                      {article.excerptBn}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-amber-500/15 flex items-center justify-between text-xs text-gray-500 font-sans mt-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#D97706]" />
                    {article.publishedAt}
                  </span>
                  <Link
                    to={`/news/${article.slug}`}
                    className="text-[#D97706] font-bold flex items-center gap-1 hover:underline"
                  >
                    বিস্তারিত <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
