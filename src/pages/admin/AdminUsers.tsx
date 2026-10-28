import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { 
  Users, 
  Search, 
  ShieldCheck, 
  CheckCircle2, 
  Ban, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  X
} from 'lucide-react';

interface ManagedUser {
  id: string;
  name: string;
  role: 'BENEFICIARY' | 'LAWYER' | 'ADMIN';
  email: string;
  mobile: string;
  district: string;
  registeredDate: string;
  caseCount: number;
  status: 'ACTIVE' | 'SUSPENDED';
}

export const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<ManagedUser[]>([
    {
      id: 'usr-1',
      name: 'মোঃ রহিম উল্লাহ',
      role: 'BENEFICIARY',
      email: 'rahim.ullah@neki.org',
      mobile: '01712-345678',
      district: 'যশোর',
      registeredDate: '১০ জানুয়ারি ২০২৬',
      caseCount: 2,
      status: 'ACTIVE',
    },
    {
      id: 'usr-2',
      name: 'সাদিয়া আক্তার',
      role: 'BENEFICIARY',
      email: 'sadia.akter@neki.org',
      mobile: '01811-998877',
      district: 'যশোর',
      registeredDate: '১৫ জানুয়ারি ২০২৬',
      caseCount: 1,
      status: 'ACTIVE',
    },
    {
      id: 'usr-3',
      name: 'এডভোকেট সৈয়দ রেজওয়ান হোসেন',
      role: 'LAWYER',
      email: 'adv.rezwan@neki.org',
      mobile: '01819-234567',
      district: 'যশোর',
      registeredDate: '১৫ জানুয়ারি ২০২৫',
      caseCount: 6,
      status: 'ACTIVE',
    },
    {
      id: 'usr-4',
      name: 'এডভোকেট ফাহমিদা সুলতানা',
      role: 'LAWYER',
      email: 'adv.fahmida@neki.org',
      mobile: '01711-223344',
      district: 'ঢাকা',
      registeredDate: '২০ ফেব্রুয়ারি ২০২৫',
      caseCount: 4,
      status: 'ACTIVE',
    },
    {
      id: 'usr-5',
      name: 'আব্দুল করিম',
      role: 'BENEFICIARY',
      email: 'karim.user@neki.org',
      mobile: '01912-887766',
      district: 'খুলনা',
      registeredDate: '০১ মার্চ ২০২৬',
      caseCount: 1,
      status: 'ACTIVE',
    },
  ]);

  const [roleFilter, setRoleFilter] = useState<'ALL' | 'BENEFICIARY' | 'LAWYER'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<ManagedUser | null>(null);
  const [actionNotice, setActionNotice] = useState('');

  const toggleStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const newStatus = u.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
          setActionNotice(`${u.name}-এর অ্যাকাউন্ট ${newStatus === 'ACTIVE' ? 'সক্রিয়' : 'স্থগিত'} করা হয়েছে।`);
          setTimeout(() => setActionNotice(''), 3000);
          return { ...u, status: newStatus };
        }
        return u;
      })
    );
  };

  const filteredUsers = users.filter((u) => {
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    const matchesSearch = 
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.mobile.includes(searchQuery) ||
      u.district.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <div className="space-y-6 font-bangla pb-12">

      {/* Header */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-slate-900">সেবাগ্রহীতা ও ইউজার অ্যাকাউন্ট নিয়ন্ত্রণ</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            প্ল্যাটফর্মের সকল সেবাগ্রহীতা ও আইনজীবীর অ্যাকাউন্ট পর্যবেক্ষণ, অ্যাক্টিভেশন ও সুরক্ষা নিয়ন্ত্রণ
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 text-[#064E3B] px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 shrink-0">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>মোট ইউজার: {users.length} জন</span>
        </div>
      </div>

      {actionNotice && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-[#064E3B] flex items-center gap-2 font-bold text-xs animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs">
          {[
            { id: 'ALL', label: 'সকল অ্যাকাউন্ট' },
            { id: 'BENEFICIARY', label: 'সেবাগ্রহীতা / কাস্টমার' },
            { id: 'LAWYER', label: 'নিবন্ধিত আইনজীবী' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setRoleFilter(tab.id as typeof roleFilter)}
              className={`px-3.5 py-2 rounded-xl font-bold transition-all whitespace-nowrap ${
                roleFilter === tab.id
                  ? 'bg-[#064E3B] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="নাম, মোবাইল বা জেলা..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs font-bangla border border-slate-200 rounded-xl focus:outline-none focus:border-[#064E3B]"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-bangla">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-5">নাম ও ইমেইল</th>
                <th className="py-3.5 px-4">ভূমিকা (Role)</th>
                <th className="py-3.5 px-4">মোবাইল নম্বর</th>
                <th className="py-3.5 px-4">জেলা</th>
                <th className="py-3.5 px-4">নিবন্ধন তারিখ</th>
                <th className="py-3.5 px-4">অ্যাকাউন্ট স্ট্যাটাস</th>
                <th className="py-3.5 px-5 text-right">কার্যক্রম</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 px-5">
                    <p className="font-bold text-slate-900 text-xs sm:text-sm">{u.name}</p>
                    <span className="text-[11px] text-slate-400 font-sans">{u.email}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                      u.role === 'LAWYER' 
                        ? 'bg-amber-100 text-amber-900 border border-amber-200' 
                        : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                    }`}>
                      {u.role === 'LAWYER' ? 'আইনজীবী' : 'সেবাগ্রহীতা'}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-mono font-medium text-slate-800">{u.mobile}</td>
                  <td className="py-4 px-4 font-medium text-slate-800">{u.district}</td>
                  <td className="py-4 px-4 font-sans text-slate-500">{u.registeredDate}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                      u.status === 'ACTIVE' 
                        ? 'bg-emerald-100 text-[#064E3B]' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {u.status === 'ACTIVE' ? 'সক্রিয়' : 'স্থগিত'}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedUser(u)}
                        className="text-xs"
                      >
                        বিস্তারিত
                      </Button>
                      <button
                        onClick={() => toggleStatus(u.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                          u.status === 'ACTIVE'
                            ? 'bg-red-50 text-red-600 hover:bg-red-100'
                            : 'bg-emerald-50 text-[#064E3B] hover:bg-emerald-100'
                        }`}
                      >
                        {u.status === 'ACTIVE' ? 'স্থগিত করুন' : 'সক্রিয় করুন'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* USER DETAIL MODAL */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold font-heading text-slate-900">{selectedUser.name}</h3>
                <span className="text-[11px] text-emerald-800 font-bold">আইডি: {selectedUser.id}</span>
              </div>
              <button 
                onClick={() => setSelectedUser(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <p><strong>মোবাইল:</strong> {selectedUser.mobile}</p>
                <p><strong>ইমেইল:</strong> {selectedUser.email}</p>
                <p><strong>জেলা:</strong> {selectedUser.district}</p>
                <p><strong>নিবন্ধন তারিখ:</strong> {selectedUser.registeredDate}</p>
                <p><strong>সম্পর্কিত কেস সংখ্যা:</strong> {selectedUser.caseCount} টি</p>
                <p><strong>বর্তমান অবস্থা:</strong> {selectedUser.status === 'ACTIVE' ? 'সক্রিয়' : 'সাময়িক স্থগিত'}</p>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button variant="primary" size="sm" onClick={() => setSelectedUser(null)}>বন্ধ করুন</Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
