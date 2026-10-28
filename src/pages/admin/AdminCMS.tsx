import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { 
  FileText, 
  Plus, 
  Search, 
  HelpCircle, 
  Scale, 
  Megaphone, 
  CheckCircle2, 
  Trash2, 
  Edit3, 
  Eye, 
  EyeOff, 
  X,
  Calendar,
  Tag,
  Check
} from 'lucide-react';

interface ArticleItem {
  id: string;
  title: string;
  category: string;
  author: string;
  date: string;
  isPublished: boolean;
  views: number;
}

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  isPublished: boolean;
}

interface PracticeAreaItem {
  id: string;
  title: string;
  description: string;
  lawyerCount: number;
  isActive: boolean;
}

interface NoticeItem {
  id: string;
  title: string;
  type: 'URGENT' | 'GENERAL' | 'EVENT';
  displayUntil: string;
  isActive: boolean;
}

export const AdminCMS: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'NEWS' | 'FAQ' | 'PRACTICE' | 'NOTICES'>('NEWS');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initial State for CMS Items
  const [articles, setArticles] = useState<ArticleItem[]>([
    {
      id: 'art-1',
      title: 'পারিবারিক বিরোধ নিষ্পত্তি ও দেনমোহর আদায়ে আইনী সুরক্ষা বিধান',
      category: 'পারিবারিক আইন',
      author: 'সৈয়দ রেজওয়ান হোসেন',
      date: '২৪ জানুয়ারি ২০২৬',
      isPublished: true,
      views: 1240,
    },
    {
      id: 'art-2',
      title: 'ভূমি সংক্রান্ত প্রতারণা রোধে ডিজিটাল পর্চা ও নামজারি যাচাইয়ের সহজ নিয়ম',
      category: 'ভূমি ও দেওয়ানি',
      author: 'আইন গবেষণা সেল, নেকী ফাউন্ডেশন',
      date: '১৮ জানুয়ারি ২০২৬',
      isPublished: true,
      views: 2890,
    },
    {
      id: 'art-3',
      title: 'যৌতুক নিরোধ আইন ২০১৮: অপপ্রয়োগ রোধ ও ভুক্তভোগীর অধিকার',
      category: 'নারী ও শিশু সুরক্ষা',
      author: 'ব্যারিস্টার কামরুল হাসান',
      date: '১০ জানুয়ারি ২০২৬',
      isPublished: false,
      views: 450,
    },
  ]);

  const [faqs, setFaqs] = useState<FaqItem[]>([
    {
      id: 'faq-1',
      question: 'নেকী ফাউন্ডেশনের মাধ্যমে আইনী পরামর্শ কি সম্পূর্ণ বিনামূল্যে পাওয়া যায়?',
      answer: 'হ্যাঁ, আর্থিকভাবে অসচ্ছল ও প্রান্তিক জনগোষ্ঠীর জন্য আমাদের প্রাথমিক পরামর্শ ও মধ্যস্থতা সেবা সম্পূর্ণ অলাভজনক ও বিনামূল্যে প্রদান করা হয়।',
      category: 'সাধারণ তথ্য',
      isPublished: true,
    },
    {
      id: 'faq-2',
      question: 'আদালতের মামলার ক্ষেত্রে কোর্ট ফি ও আইনজীবীর খরচ কারা বহন করে?',
      answer: 'যাচাই-বাছাই সাপেক্ষে যোগ্য আবেদনকারীদের কোর্ট ফি এবং প্যানেল আইনজীবীর সম্মানী নেকী ফাউন্ডেশনের আইন সহায়তা তহবিল থেকে অনুদান আকারে বহন করা হয়।',
      category: 'খরচ ও অর্থায়ন',
      isPublished: true,
    },
    {
      id: 'faq-3',
      question: 'কোন কোন জেলায় নেকী ফাউন্ডেশনের প্যানেল আইনজীবী রয়েছে?',
      answer: 'বর্তমানে বাংলাদেশের ৬৪টি জেলা বার অ্যাসোসিয়েশনেই আমাদের তালিকাভুক্ত অভিজ্ঞ প্যানেল আইনজীবী ও প্যারা-লিগ্যাল স্বেচ্ছাসেবী রয়েছেন।',
      category: 'নেটওয়ার্ক',
      isPublished: true,
    },
  ]);

  const [practices, setPractices] = useState<PracticeAreaItem[]>([
    {
      id: 'pr-1',
      title: 'জমি ও সম্পত্তি বিরোধ',
      description: 'রেকর্ড সংশোধন, দলিলের সত্যতা নিরূপণ, বণ্টন মামলা ও বেদখল উদ্ধার।',
      lawyerCount: 42,
      isActive: true,
    },
    {
      id: 'pr-2',
      title: 'পারিবারিক ও দেনমোহর আইন',
      description: 'বিবাহ বিচ্ছেদ, খোরপোষ ও দেনমোহর আদায়, অভিভাবকত্ব ও শিশু হেফাজত।',
      lawyerCount: 38,
      isActive: true,
    },
    {
      id: 'pr-3',
      title: 'ফৌজদারি মামলা ও জামিন সুরক্ষা',
      description: 'মিথ্যা মামলায় আইনী সহায়তা, ম্যাজিস্ট্রেট ও দায়রা আদালতে দ্রুত জামিন শুনানি।',
      lawyerCount: 51,
      isActive: true,
    },
    {
      id: 'pr-4',
      title: 'নারী ও শিশু নির্যাতন দমন',
      description: 'যৌতুক, পারিবারিক সহিংসতা ও ভুক্তভোগী সুরক্ষা ট্রাইব্যুনালে সরাসরি মামলা পরিচালনা।',
      lawyerCount: 29,
      isActive: true,
    },
  ]);

  const [notices, setNotices] = useState<NoticeItem[]>([
    {
      id: 'nt-1',
      title: 'যশোর ও খুলনা অঞ্চলে প্রাক-আইনী ভ্রাম্যমাণ হেল্পডেস্ক ক্যাম্পেইন শুরু',
      type: 'URGENT',
      displayUntil: '২৮ ফেব্রুয়ারি ২০২৬',
      isActive: true,
    },
    {
      id: 'nt-2',
      title: 'প্যানেল আইনজীবী হিসেবে তালিকাভুক্তির জন্য নতুন আবেদন গ্রহণ চলছে',
      type: 'GENERAL',
      displayUntil: '১৫ মার্চ ২০২৬',
      isActive: true,
    },
  ]);

  // Modal State for adding new item
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newContent, setNewContent] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAddNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    if (activeTab === 'NEWS') {
      const item: ArticleItem = {
        id: `art-${Date.now()}`,
        title: newTitle,
        category: newCategory || 'আইনী পরামর্শ',
        author: 'সুপার এডমিন',
        date: new Date().toLocaleDateString('bn-BD'),
        isPublished: true,
        views: 0,
      };
      setArticles([item, ...articles]);
      showToast('নতুন আইনী নিবন্ধ সফলভাবে প্রকাশ করা হয়েছে।');
    } else if (activeTab === 'FAQ') {
      const item: FaqItem = {
        id: `faq-${Date.now()}`,
        question: newTitle,
        answer: newContent || 'উত্তর প্রক্রিয়াধীন।',
        category: newCategory || 'সাধারণ',
        isPublished: true,
      };
      setFaqs([item, ...faqs]);
      showToast('নতুন জিজ্ঞাসা (FAQ) সফলভাবে যুক্ত করা হয়েছে।');
    } else if (activeTab === 'PRACTICE') {
      const item: PracticeAreaItem = {
        id: `pr-${Date.now()}`,
        title: newTitle,
        description: newContent || 'আইনী সেবা ক্ষেত্র বিবরণী।',
        lawyerCount: 0,
        isActive: true,
      };
      setPractices([item, ...practices]);
      showToast('নতুন আইনী সেবার ক্ষেত্র যুক্ত হয়েছে।');
    } else if (activeTab === 'NOTICES') {
      const item: NoticeItem = {
        id: `nt-${Date.now()}`,
        title: newTitle,
        type: 'GENERAL',
        displayUntil: '৩১ মার্চ ২০২৬',
        isActive: true,
      };
      setNotices([item, ...notices]);
      showToast('নতুন নোটিশ ব্যানার সক্রিয় করা হয়েছে।');
    }

    setNewTitle('');
    setNewCategory('');
    setNewContent('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-[#064E3B] flex items-center justify-between text-sm shadow-md animate-fade-in font-bangla font-semibold">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-emerald-700 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
            <FileText className="w-4 h-4" />
            <span>প্লাটফর্ম কনটেন্ট ও প্রকাশনা প্রশাসন</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading">ওয়েবসাইট কনটেন্ট ম্যানেজমেন্ট (CMS)</h1>
          <p className="text-sm text-slate-600 font-bangla mt-1">
            পাবলিক ওয়েবসাইটের আইনী সংবাদ, সচরাচর জিজ্ঞাসা, প্র্যাকটিস এরিয়া এবং নোটিশ নিয়ন্ত্রণ করুন।
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#064E3B] hover:bg-[#043E2F] text-white flex items-center gap-2 text-sm font-bold shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>
            {activeTab === 'NEWS' && 'নতুন আইনী নিবন্ধ লিখুন'}
            {activeTab === 'FAQ' && 'নতুন প্রশ্ন যোগ করুন'}
            {activeTab === 'PRACTICE' && 'নতুন প্র্যাকটিস এরিয়া'}
            {activeTab === 'NOTICES' && 'নতুন নোটিশ যোগ করুন'}
          </span>
        </Button>
      </div>

      {/* CMS Navigation Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 border-b border-slate-200 font-bangla">
        {[
          { id: 'NEWS', label: 'আইনী সংবাদ ও নিবন্ধ', icon: FileText, count: articles.length },
          { id: 'FAQ', label: 'সচরাচর জিজ্ঞাসা (FAQ)', icon: HelpCircle, count: faqs.length },
          { id: 'PRACTICE', label: 'আইনী সেবার ক্ষেত্র', icon: Scale, count: practices.length },
          { id: 'NOTICES', label: 'ব্যানার ও নোটিশ', icon: Megaphone, count: notices.length },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-[#064E3B] text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'}`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Articles / News */}
      {activeTab === 'NEWS' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div className="relative max-w-sm w-full">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="নিবন্ধের শিরোনাম বা লেখক দিয়ে খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white font-bangla"
              />
            </div>
            <p className="text-xs text-slate-500 font-bangla">মোট নিবন্ধ: {articles.length} টি</p>
          </div>

          <div className="divide-y divide-slate-100">
            {articles
              .filter(a => a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.category.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((art) => (
                <div key={art.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {art.category}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {art.date}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Eye className="w-3 h-3 text-slate-400" /> {art.views} বার পঠিত
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{art.title}</h3>
                    <p className="text-xs text-slate-500 font-bangla">লেখক: {art.author}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        setArticles(articles.map(a => a.id === art.id ? { ...a, isPublished: !a.isPublished } : a));
                        showToast(`নিবন্ধটি ${art.isPublished ? 'ড্রাফট' : 'পাবলিশ'} করা হয়েছে।`);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                        art.isPublished
                          ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                          : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
                      }`}
                    >
                      {art.isPublished ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <EyeOff className="w-3.5 h-3.5 text-amber-600" />}
                      <span>{art.isPublished ? 'প্রকাশিত' : 'ড্রাফট'}</span>
                    </button>

                    <button
                      onClick={() => {
                        setArticles(articles.filter(a => a.id !== art.id));
                        showToast('নিবন্ধটি মুছে ফেলা হয়েছে।');
                      }}
                      className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="মুছুন"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Tab 2: FAQ */}
      {activeTab === 'FAQ' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 font-heading">সচরাচর জিজ্ঞাসা ও প্রশ্নোত্তর তালিকা</h3>
            <span className="text-xs text-slate-500 font-bangla">{faqs.length} টি সক্রিয় FAQ</span>
          </div>

          <div className="divide-y divide-slate-100">
            {faqs.map((f) => (
              <div key={f.id} className="p-5 space-y-2 hover:bg-slate-50/60 transition-colors">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {f.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setFaqs(faqs.filter(item => item.id !== f.id));
                        showToast('FAQ মুছে ফেলা হয়েছে।');
                      }}
                      className="text-slate-400 hover:text-red-600 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{f.question}</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Practice Areas */}
      {activeTab === 'PRACTICE' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {practices.map((pr) => (
            <div key={pr.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-[#064E3B] flex items-center justify-center font-bold">
                  <Scale className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {pr.lawyerCount} জন অভিজ্ঞ আইনজীবী
                </span>
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">{pr.title}</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{pr.description}</p>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-emerald-700 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> সক্রিয় সার্ভিস ক্ষেত্র
                </span>
                <button
                  onClick={() => {
                    setPractices(practices.filter(item => item.id !== pr.id));
                    showToast('সেবা ক্ষেত্র অপসারিত হয়েছে।');
                  }}
                  className="text-red-600 hover:underline font-bold"
                >
                  মুছুন
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Notices & Banners */}
      {activeTab === 'NOTICES' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 font-heading">সক্রিয় নোটিশ ও ক্যাম্পেইন ব্যানার</h3>
            <span className="text-xs text-slate-500 font-bangla">{notices.length} টি সক্রিয় নোটিশ</span>
          </div>

          <div className="divide-y divide-slate-100">
            {notices.map((nt) => (
              <div key={nt.id} className="p-5 flex items-center justify-between gap-4 hover:bg-slate-50/60">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    nt.type === 'URGENT' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                  }`}>
                    <Megaphone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{nt.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">প্রদর্শনের শেষ তারিখ: {nt.displayUntil}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                    nt.type === 'URGENT' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {nt.type === 'URGENT' ? 'জরুরী বিজ্ঞপ্তি' : 'সাধারণ তথ্য'}
                  </span>
                  <button
                    onClick={() => {
                      setNotices(notices.filter(item => item.id !== nt.id));
                      showToast('নোটিশ অপসারিত হয়েছে।');
                    }}
                    className="p-1.5 text-slate-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add New Content Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs font-bangla animate-fade-in">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-[#064E3B] text-white p-5 flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4" />
                <span>
                  {activeTab === 'NEWS' && 'নতুন আইনী নিবন্ধ প্রকাশ করুন'}
                  {activeTab === 'FAQ' && 'নতুন সচরাচর জিজ্ঞাসা যোগ করুন'}
                  {activeTab === 'PRACTICE' && 'নতুন আইনী সেবার ক্ষেত্র যোগ করুন'}
                  {activeTab === 'NOTICES' && 'নতুন নোটিশ ব্যানার যোগ করুন'}
                </span>
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-white/80 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddNew} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {activeTab === 'NEWS' ? 'নিবন্ধের শিরোনাম *' : activeTab === 'FAQ' ? 'প্রশ্ন *' : 'শিরোনাম *'}
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="শিরোনাম বা প্রশ্ন লিখুন..."
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#064E3B]"
                />
              </div>

              {(activeTab === 'NEWS' || activeTab === 'FAQ') && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ক্যাটাগরি / বিভাগ</label>
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="যেমন: দেওয়ানি, পারিবারিক, নারী সুরক্ষা..."
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#064E3B]"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {activeTab === 'FAQ' ? 'উত্তর বিবরণী *' : activeTab === 'NEWS' ? 'নিবন্ধের মূল বিষয়বস্তু *' : 'বিবরণ *'}
                </label>
                <textarea
                  rows={4}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="বিস্তারিত বিবরণ লিখুন..."
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#064E3B]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <Button variant="outline" type="button" onClick={() => setIsAddModalOpen(false)} className="text-xs">
                  বাতিল
                </Button>
                <Button variant="primary" type="submit" className="bg-[#064E3B] text-white text-xs">
                  সংরক্ষণ ও প্রকাশ করুন
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
