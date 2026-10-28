import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  PlusCircle, 
  Bell, 
  Trash2, 
  X, 
  ShieldCheck, 
  Phone, 
  Video
} from 'lucide-react';

interface CourtHearing {
  id: string;
  trackingNumber: string;
  clientName: string;
  courtName: string;
  date: string;
  time: string;
  stage: string;
  remindSms: boolean;
}

export const LawyerAvailability: React.FC = () => {
  const [schedule, setSchedule] = useState([
    { day: 'রবিবার', active: true, time: 'বিকাল ৪:০০ - রাত ৮:০০', mode: 'সরাসরি চেম্বার ও ফোন' },
    { day: 'সোমবার', active: true, time: 'বিকাল ৪:০০ - রাত ৮:০০', mode: 'সরাসরি চেম্বার ও ফোন' },
    { day: 'মঙ্গলবার', active: true, time: 'বিকাল ৪:০০ - রাত ৮:০০', mode: 'সরাসরি চেম্বার ও ফোন' },
    { day: 'বুধবার', active: true, time: 'বিকাল ৪:০০ - রাত ৮:০০', mode: 'সরাসরি চেম্বার ও ফোন' },
    { day: 'বৃহস্পতিবার', active: true, time: 'বিকাল ৩:০০ - সন্ধ্যা ৬:০০', mode: 'ভার্চুয়াল ও ফোন' },
    { day: 'শুক্রবার', active: false, time: 'ছুটি (জরুরি হটলাইন ব্যতীত বন্ধ)', mode: 'বন্ধ' },
    { day: 'শনিবার', active: true, time: 'সকাল ১০:০০ - দুপুর ১:০০', mode: 'শুধুমাত্র পূর্বনির্ধারিত সাক্ষাৎ' },
  ]);

  const [hearings, setHearings] = useState<CourtHearing[]>([
    {
      id: 'h-1',
      trackingNumber: 'NF-LEG-2026-001',
      clientName: 'মোঃ রহিম উল্লাহ',
      courtName: 'পারিবারিক আদালত, যশোর',
      date: '১৮ এপ্রিল ২০২৬',
      time: 'সকাল ১০:৩০ মিনিট',
      stage: 'জবাব দাখিল ও নোটিশ নিরীক্ষা',
      remindSms: true,
    },
    {
      id: 'h-2',
      trackingNumber: 'NF-LEG-2026-002',
      clientName: 'সাদিয়া আক্তার',
      courtName: 'যুগ্ম জেলা জজ ১ম আদালত, যশোর',
      date: '২৫ এপ্রিল ২০২৬',
      time: 'সকাল ১১:০০ মিনিট',
      stage: 'নিষেধাজ্ঞা আবেদনের শুনানি ও নথি পেশ',
      remindSms: true,
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newHearing, setNewHearing] = useState({
    trackingNumber: 'NF-LEG-2026-001',
    clientName: 'মোঃ রহিম উল্লাহ',
    courtName: 'জেলা ও দায়রা জজ আদালত, যশোর',
    date: '০৫ মে ২০২৬',
    time: 'সকাল ১০:০০ মিনিট',
    stage: 'সাক্ষ্য গ্রহণ ও জবানবন্দি',
    remindSms: true,
  });

  const [saveToast, setSaveToast] = useState('');

  const handleToggleDay = (idx: number) => {
    const updated = [...schedule];
    updated[idx].active = !updated[idx].active;
    setSchedule(updated);
  };

  const handleAddHearing = (e: React.FormEvent) => {
    e.preventDefault();
    const item: CourtHearing = {
      id: `h-${Date.now()}`,
      ...newHearing,
    };
    setHearings([...hearings, item]);
    setIsAddModalOpen(false);
    setSaveToast('নতুন শুনানির তারিখ ও অটোমেটিক রিমাইন্ডার সফলভাবে যুক্ত হয়েছে!');
    setTimeout(() => setSaveToast(''), 3000);
  };

  const handleDeleteHearing = (id: string) => {
    setHearings(hearings.filter((h) => h.id !== id));
  };

  return (
    <div className="space-y-6 font-bangla pb-12">

      {/* Header */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-slate-900">সময়সূচী, চেম্বার স্লট ও আদালতের তারিখ</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            পরামর্শের দিনক্ষণ নির্ধারণ এবং অটোমেটেড কেস রিমাইন্ডার (Automated Case-Date Reminders) পরিচালনা করুন
          </p>
        </div>

        <Button
          variant="gold"
          size="md"
          onClick={() => setIsAddModalOpen(true)}
          className="gap-2 shrink-0 shadow-md"
        >
          <PlusCircle className="w-4 h-4 text-slate-950" />
          <span>নতুন শুনানির তারিখ যোগ করুন</span>
        </Button>
      </div>

      {saveToast && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-[#064E3B] flex items-center gap-2 font-bold text-xs animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{saveToast}</span>
        </div>
      )}

      {/* Automated Reminder Feature Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-[#064E3B] to-[#022C22] text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-emerald-900/30">
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
            <Bell className="w-3.5 h-3.5 text-amber-400" />
            অটোমেটেড এসএমএস ও ইমেইল নোটিফিকেশন সিস্টেম
          </span>
          <h3 className="text-lg font-bold font-heading text-white pt-1">
            আদালতের শুনানির ৩ দিন ও ২৪ ঘণ্টা পূর্বে স্বয়ংক্রিয় রিমাইন্ডার
          </h3>
          <p className="text-xs text-emerald-100/90">
            এখানে যুক্ত প্রতিটি শুনানির জন্য সংশ্লিষ্ট সেবাগ্রহীতার মোবাইলে স্বয়ংক্রিয় এসএমএস সতর্কতা পৌঁছে যায়।
          </p>
        </div>
        <div className="shrink-0 bg-white/10 px-4 py-2 rounded-2xl text-xs font-bold border border-white/20 text-amber-300">
          সিস্টেম স্ট্যাটাস: সক্রিয়
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* 1. UPCOMING COURT HEARINGS CALENDAR */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#064E3B]" />
              <h3 className="text-base font-bold font-heading text-slate-900">আসন্ন আদালত শুনানি ও ডায়েরি</h3>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full">
              {hearings.length} টি নির্ধারিত
            </span>
          </div>

          <div className="space-y-3">
            {hearings.map((h) => (
              <div 
                key={h.id} 
                className="p-4 rounded-2xl border border-slate-200 hover:border-amber-400/80 transition-all bg-[#FFFCF6] space-y-2 relative group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="text-xs font-mono font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                      {h.trackingNumber}
                    </span>
                    <h4 className="text-sm font-bold font-heading text-slate-900 pt-1">
                      {h.courtName}
                    </h4>
                  </div>
                  <button
                    onClick={() => handleDeleteHearing(h.id)}
                    className="p-1 text-slate-400 hover:text-red-600 rounded"
                    title="বাতিল করুন"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 pt-1">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="font-bold">{h.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>{h.time}</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 text-xs">
                  <p className="font-bold text-slate-800">পর্যায়: {h.stage}</p>
                  <p className="text-[11px] text-slate-500">ক্লায়েন্ট: {h.clientName}</p>
                </div>

                <div className="flex items-center justify-between text-[11px] text-emerald-800 pt-1">
                  <span className="flex items-center gap-1 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    অটো-এসএমএস রিমাইন্ডার সক্রিয়
                  </span>
                  <span className="text-slate-400 font-sans">NF-REMIND-OK</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. WEEKLY CONSULTATION SLOTS */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-500" />
              <h3 className="text-base font-bold font-heading text-slate-900">সাপ্তাহিক চেম্বার ও পরামর্শের স্লট</h3>
            </div>
            <span className="text-xs text-slate-500">সপ্তাহের ৭ দিন</span>
          </div>

          <div className="space-y-2">
            {schedule.map((item, idx) => (
              <div 
                key={item.day} 
                className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                  item.active 
                    ? 'bg-slate-50/70 border-slate-200' 
                    : 'bg-slate-50/30 border-slate-100 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleToggleDay(idx)}
                    className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center transition-colors ${
                      item.active ? 'bg-[#064E3B] text-white' : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {item.active ? '✓' : '✕'}
                  </button>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{item.day}</h4>
                    <p className="text-[11px] text-slate-500">{item.time}</p>
                  </div>
                </div>

                <span className="text-[11px] font-bold text-slate-600 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shrink-0">
                  {item.mode}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Button
              variant="outline"
              size="sm"
              isFullWidth
              onClick={() => {
                setSaveToast('সাপ্তাহিক সময়সূচী সফলভাবে সংরক্ষিত হয়েছে!');
                setTimeout(() => setSaveToast(''), 3000);
              }}
              className="text-xs"
            >
              সময়সূচী আপডেট সংরক্ষণ করুন
            </Button>
          </div>
        </div>

      </div>

      {/* ADD COURT HEARING MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-7 space-y-5">
            
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold font-heading text-slate-900">নতুন শুনানির তারিখ যোগ করুন</h3>
                <p className="text-xs text-slate-500 mt-0.5">আদালত ও তারিখ নির্ধারণ করলে ক্লায়েন্টকে অটোমেটিক এসএমএস পাঠানো হবে</p>
              </div>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddHearing} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="কেস ট্র্যাকিং নম্বর *"
                  isRequired
                  value={newHearing.trackingNumber}
                  onChange={(e) => setNewHearing({ ...newHearing, trackingNumber: e.target.value })}
                />
                <Input
                  label="ক্লায়েন্টের নাম *"
                  isRequired
                  value={newHearing.clientName}
                  onChange={(e) => setNewHearing({ ...newHearing, clientName: e.target.value })}
                />
              </div>

              <Input
                label="আদালতের নাম ও জেলা *"
                isRequired
                value={newHearing.courtName}
                onChange={(e) => setNewHearing({ ...newHearing, courtName: e.target.value })}
              />

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="শুনানির তারিখ *"
                  isRequired
                  value={newHearing.date}
                  onChange={(e) => setNewHearing({ ...newHearing, date: e.target.value })}
                  placeholder="যেমন: ১৮ মে ২০২৬"
                />
                <Input
                  label="সময় *"
                  isRequired
                  value={newHearing.time}
                  onChange={(e) => setNewHearing({ ...newHearing, time: e.target.value })}
                  placeholder="যেমন: সকাল ১০:৩০ মিনিট"
                />
              </div>

              <Input
                label="মামলার ধাপ / উদ্দেশ্য *"
                isRequired
                value={newHearing.stage}
                onChange={(e) => setNewHearing({ ...newHearing, stage: e.target.value })}
                placeholder="যেমন: জবাব দাখিল / সাক্ষ্য গ্রহণ / সমন জারি"
              />

              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
                <label className="flex items-center gap-2 cursor-pointer font-bold">
                  <input
                    type="checkbox"
                    checked={newHearing.remindSms}
                    onChange={(e) => setNewHearing({ ...newHearing, remindSms: e.target.checked })}
                    className="w-4 h-4 rounded text-[#064E3B]"
                  />
                  <span>ক্লায়েন্টকে স্বয়ংক্রিয় এসএমএস ও ইমেইল রিমাইন্ডার পাঠান</span>
                </label>
                <p className="text-[11px] text-emerald-800/80">শুনানির ৩ দিন আগে এবং আগের দিন সন্ধ্যা ৬টায় দুটি রিমাইন্ডার পাঠানো হবে।</p>
              </div>

              <div className="pt-2 flex justify-end gap-2.5">
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsAddModalOpen(false)}
                >
                  বাতিল
                </Button>
                <Button 
                  type="submit" 
                  variant="primary" 
                  size="sm"
                >
                  তারিখ সংরক্ষণ করুন
                </Button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
