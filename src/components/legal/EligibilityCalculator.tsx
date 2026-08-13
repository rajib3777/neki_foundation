import React, { useState } from 'react';
import { Calculator, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';

export const EligibilityCalculator: React.FC = () => {
  const [monthlyIncome, setMonthlyIncome] = useState<string>('BELOW_15000');
  const [caseType, setCaseType] = useState<string>('FAMILY');
  const [dependents, setDependents] = useState<number>(3);
  const navigate = useNavigate();

  const isFullWaiver = monthlyIncome === 'BELOW_15000' || monthlyIncome === '15000_25000' && dependents >= 4;

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 font-bangla">
      <div className="glass-card rounded-3xl p-8 shadow-2xl border-t-4 border-t-[#D97706] space-y-6">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-amber-500/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#0F172A] text-amber-400 flex items-center justify-center font-bold shadow-md">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-heading text-gray-900 leading-normal">
                আইনী সহায়তা যোগ্যতা ও ফি ক্যালকুলেটর
              </h3>
              <p className="text-xs text-gray-600 font-sans">
                আপনার তথ্যের ভিত্তিতে তৎক্ষণাৎ মওকুফ ও সহায়তার ক্যাটাগরি জানুন
              </p>
            </div>
          </div>
          <span className="px-3 py-1 bg-amber-100 text-[#D97706] text-xs font-bold rounded-full font-sans border border-amber-300">
            রিয়েল-টাইম অনলাইন টুল
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-sans">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700">মাসিক পারিবারিক আয়:</label>
            <select
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(e.target.value)}
              className="w-full px-4 py-2.5 text-xs font-bold text-gray-900 bg-white border border-amber-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="BELOW_15000">১৫,০০০ টাকার নিচে (দরিদ্র/দুস্থ)</option>
              <option value="15000_25000">১৫,০০০ — ২৫,০০০ টাকা (নিম্নবিত্ত)</option>
              <option value="25000_40000">২৫,০০০ — ৪০,০০০ টাকা (নিম্ন-মধ্যবিত্ত)</option>
              <option value="ABOVE_40000">৪০,০০০ টাকার উপরে (সাধারণ)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700">মামলার ধরণ:</label>
            <select
              value={caseType}
              onChange={(e) => setCaseType(e.target.value)}
              className="w-full px-4 py-2.5 text-xs font-bold text-gray-900 bg-white border border-amber-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="FAMILY">পারিবারিক বিরোধ / খোরপোশ</option>
              <option value="LAND">জমিজমা ও দখল উচ্ছেদ</option>
              <option value="CRIMINAL">ফৌজদারী অপরাধ / মিথ্যা মামলা</option>
              <option value="LABOR">শ্রম অধিকার ও বকেয়া বেতন</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700">পরিবারের নির্ভরশীল সদস্য:</label>
            <select
              value={dependents}
              onChange={(e) => setDependents(Number(e.target.value))}
              className="w-full px-4 py-2.5 text-xs font-bold text-gray-900 bg-white border border-amber-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value={1}>১-২ জন</option>
              <option value={3}>৩-৪ জন</option>
              <option value={5}>৫ জন বা তার বেশি</option>
            </select>
          </div>
        </div>

        {/* Calculation Result Display */}
        <div className={`p-6 rounded-2xl border transition-all duration-300 ${
          isFullWaiver ? 'bg-amber-50 border-amber-300' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                {isFullWaiver ? (
                  <CheckCircle2 className="w-5 h-5 text-[#D97706]" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-slate-600" />
                )}
                <h4 className="text-base font-bold font-heading text-gray-900">
                  {isFullWaiver ? '১০০% অবৈতনিক আইনী সহায়তা পাওয়ার যোগ্য' : 'স্বল্পমূল্যের আইনী সহায়তা (Subsidy Eligible)'}
                </h4>
              </div>
              <p className="text-xs text-gray-600 font-sans">
                {isFullWaiver
                  ? 'আপনার জন্য কোনো ওকালতনামা ফি বা আইনজীবী সম্মানীর প্রয়োজন হবে না। ফাউন্ডেশন সম্পূর্ণ খরচ বহন করবে।'
                  : 'আপনি নামমাত্র প্রসেসিং ফিতে (৫০০ টাকা) আমাদের প্যানেল আইনজীবীদের মাধ্যমে মামলা পরিচালনা করতে পারবেন।'}
              </p>
            </div>

            <Button
              variant="gold"
              size="md"
              onClick={() => navigate('/legal-assistance/apply')}
              className="shrink-0"
            >
              এখনই আবেদন করুন
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
};
