import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { 
  Settings, 
  CreditCard, 
  MessageSquare, 
  Mail, 
  ShieldCheck, 
  CheckCircle2, 
  Save, 
  Key, 
  Lock, 
  Globe,
  Bell,
  Smartphone
} from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const [isSaved, setIsSaved] = useState(false);

  // Gateway & System States
  const [bKashEnabled, setBkashEnabled] = useState(true);
  const [bKashMerchantNumber, setBkashMerchantNumber] = useState('01819-234567');
  const [bKashAppKey, setBkashAppKey] = useState('bkash_sec_live_9921448a7b');
  const [processingFee, setProcessingFee] = useState('১৫');

  const [smsGatewayEnabled, setSmsGatewayEnabled] = useState(true);
  const [smsSenderId, setSmsSenderId] = useState('NEKI-FNDN');
  const [autoSmsHearings, setAutoSmsHearings] = useState(true);
  const [autoSmsAppointments, setAutoSmsAppointments] = useState(true);

  const [smtpHost, setSmtpHost] = useState('smtp.neki.org');
  const [smtpPort, setSmtpPort] = useState('587');
  const [smtpSender, setSmtpSender] = useState('legal-aid@neki.org');

  const [districtDirectoryActive, setDistrictDirectoryActive] = useState(true);
  const [lawyerRegistrationOpen, setLawyerRegistrationOpen] = useState(true);
  const [publicAssistanceOpen, setPublicAssistanceOpen] = useState(true);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {isSaved && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-[#064E3B] flex items-center gap-2 text-sm shadow-md animate-fade-in font-bangla font-semibold">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>প্লাটফর্ম সেটিংস, গেটওয়ে ক্রেডেনশিয়াল ও নোটিফিকেশন কনফিগারেশন সফলভাবে সংরক্ষিত হয়েছে।</span>
        </div>
      )}

      {/* Page Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
            <Settings className="w-4 h-4" />
            <span>সিস্টেম কনফিগারেশন ও ইন্টিগ্রেশন প্রশাসন</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading">প্লাটফর্ম সেটিংস ও গেটওয়ে ইন্টিগ্রেশন</h1>
          <p className="text-sm text-slate-600 font-bangla mt-1">
            পেমেন্ট গেটওয়ে, এসএমএস সার্ভিস, স্বয়ংক্রিয় কেস রিমাইন্ডার এবং ৬৪ জেলার ডিরেক্টরি সেটিংস পরিচালনা করুন।
          </p>
        </div>

        <Button
          variant="primary"
          onClick={handleSaveSettings}
          className="bg-[#064E3B] hover:bg-[#043E2F] text-white flex items-center gap-2 text-sm font-bold shadow-md"
        >
          <Save className="w-4 h-4" />
          <span>সেটিংস সংরক্ষণ করুন</span>
        </Button>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6 font-bangla">
        {/* Payment Gateway (bKash & Bank) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-pink-50 border border-pink-200 text-pink-700 flex items-center justify-center font-bold">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">পেমেন্ট গেটওয়ে কনফিগারেশন (bKash & Bank)</h3>
                <p className="text-xs text-slate-500">পরামর্শ ফি ও অনুদান সংগ্রহের জন্য মার্চেন্ট ইন্টিগ্রেশন</p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={bKashEnabled}
                onChange={(e) => setBkashEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">bKash মার্চেন্ট নম্বর</label>
              <input
                type="text"
                value={bKashMerchantNumber}
                onChange={(e) => setBkashMerchantNumber(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">API App Key</label>
              <input
                type="password"
                value={bKashAppKey}
                onChange={(e) => setBkashAppKey(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">সফটওয়্যার প্রসেসিং ফি (টাকা)</label>
              <input
                type="text"
                value={processingFee}
                onChange={(e) => setProcessingFee(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* SMS Gateway & Automated Notifications */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center font-bold">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">এসএমএস গেটওয়ে ও অটোমেটেড রিমাইন্ডার</h3>
                <p className="text-xs text-slate-500">আদালতের শুনানির তারিখ ও সাক্ষাতের এসএমএস নোটিফিকেশন সার্ভিস</p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={smsGatewayEnabled}
                onChange={(e) => setSmsGatewayEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">অনুমোদিত এসএমএস সেন্ডার আইডি (Masking)</label>
              <input
                type="text"
                value={smsSenderId}
                onChange={(e) => setSmsSenderId(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white font-mono"
              />
            </div>
            <div className="space-y-2 pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                <input
                  type="checkbox"
                  checked={autoSmsHearings}
                  onChange={(e) => setAutoSmsHearings(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span>আদালতের শুনানির ২৪ ঘণ্টা আগে সেবাগ্রহীতাকে স্বয়ংক্রিয় SMS রিমাইন্ডার প্রেরণ</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                <input
                  type="checkbox"
                  checked={autoSmsAppointments}
                  onChange={(e) => setAutoSmsAppointments(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span>চেম্বার সাক্ষাতের সময় নির্ধারণে আইনজীবী ও মক্কেল উভয়কে নিশ্চিতকরণ SMS পাঠানো</span>
              </label>
            </div>
          </div>
        </div>

        {/* Email & Communication Settings */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center font-bold">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">ইমেইল নোটিফিকেশন সার্ভার (SMTP)</h3>
              <p className="text-xs text-slate-500">অফিশিয়াল আইনী প্রতিবেদন ও রিসিপ্ট প্রেরণের সার্ভার কনফিগারেশন</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">SMTP হোস্ট সার্ভার</label>
              <input
                type="text"
                value={smtpHost}
                onChange={(e) => setSmtpHost(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">পোর্ট (Port)</label>
              <input
                type="text"
                value={smtpPort}
                onChange={(e) => setSmtpPort(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">প্রেরক ইমেইল (From Address)</label>
              <input
                type="email"
                value={smtpSender}
                onChange={(e) => setSmtpSender(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white font-mono"
              />
            </div>
          </div>
        </div>

        {/* Platform Directory & Registration Controls */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-[#064E3B] flex items-center justify-center font-bold">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">সারাদেশীয় ডিরেক্টরি ও অ্যাক্সেস কন্ট্রোল</h3>
              <p className="text-xs text-slate-500">পাবলিক ওয়েবসাইটে ৬৪ জেলার আইনজীবী ডিরেক্টরি ও রেজিস্ট্রেশন সুইচ</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <p className="text-sm font-bold text-slate-900">৬৪ জেলা আইনজীবী ডিরেক্টরি প্রকাশনা</p>
                <p className="text-xs text-slate-500">পাবলিক ভিজিটররা যাতে জেলা ও স্পেশালাইজেশন অনুসারে আইনজীবী খুঁজতে পারেন।</p>
              </div>
              <input
                type="checkbox"
                checked={districtDirectoryActive}
                onChange={(e) => setDistrictDirectoryActive(e.target.checked)}
                className="w-5 h-5 rounded text-[#064E3B] focus:ring-emerald-500"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <p className="text-sm font-bold text-slate-900">নতুন আইনজীবী নিবন্ধন পোর্টাল সক্রিয় রাখুন</p>
                <p className="text-xs text-slate-500">বার কাউন্সিল অ্যাডভোকেটগণ স্বতঃস্ফূর্তভাবে আবেদন করতে পারবেন।</p>
              </div>
              <input
                type="checkbox"
                checked={lawyerRegistrationOpen}
                onChange={(e) => setLawyerRegistrationOpen(e.target.checked)}
                className="w-5 h-5 rounded text-[#064E3B] focus:ring-emerald-500"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <p className="text-sm font-bold text-slate-900">নাগরিক আইনী সহায়তা আবেদন উইন্ডো</p>
                <p className="text-xs text-slate-500">সাধারণ জনগণ ও অসচ্ছল পরিবার সরাসরি অনলাইন ফর্মের মাধ্যমে মামলা দাখিল করতে পারবেন।</p>
              </div>
              <input
                type="checkbox"
                checked={publicAssistanceOpen}
                onChange={(e) => setPublicAssistanceOpen(e.target.checked)}
                className="w-5 h-5 rounded text-[#064E3B] focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Submit Bar */}
        <div className="flex justify-end pt-2">
          <Button
            variant="primary"
            type="submit"
            className="bg-[#064E3B] hover:bg-[#043E2F] text-white flex items-center gap-2 text-sm font-bold px-6 py-2.5 shadow-md"
          >
            <Save className="w-4 h-4" />
            <span>সকল পরিবর্তন সংরক্ষণ করুন</span>
          </Button>
        </div>
      </form>
    </div>
  );
};
