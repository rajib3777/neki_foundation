import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { 
  History, 
  Search, 
  Filter, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Download, 
  Clock, 
  User, 
  Lock, 
  Database,
  ArrowUpDown
} from 'lucide-react';
import { mockAuditLogs } from '../../data/mock/audit.data';
import type { AuditLog } from '../../types';

export const AdminAuditLogs: React.FC = () => {
  const [logs, setLogs] = useState<AuditLog[]>([
    ...mockAuditLogs,
    {
      id: 'audit-104',
      actor: 'প্রকৌশলী তানভীর আহমেদ (সুপার এডমিন)',
      role: 'ADMIN',
      action: 'পাসওয়ার্ড পরিবর্তন',
      resource: 'User #usr-1 (মোঃ রহিম উল্লাহ)',
      details: 'নিরাপত্তা পর্যালোচনার অংশ হিসেবে ব্যবহারকারী নিরাপত্তা প্রশ্নাবলী হালনাগাদ করা হয়েছে।',
      timestamp: '২০২৬-০৩-০৪ ১৫:৪৫:১২',
      status: 'SUCCESS',
    },
    {
      id: 'audit-105',
      actor: 'সিস্টেম ফায়ারওয়াল সিকিউরিটি',
      role: 'ADMIN',
      action: 'সন্দেহজনক লগইন প্রতিরোধ',
      resource: 'IP 182.16.24.110',
      details: 'অতিরিক্ত ব্যর্থ পাসওয়ার্ড চেষ্টার কারণে সাময়িক আইপি ব্লক আরোপিত হয়েছে।',
      timestamp: '২০২৬-০৩-০৩ ০২:১৪:৫০',
      status: 'SUCCESS',
    },
    {
      id: 'audit-106',
      actor: 'এডভোকেট সৈয়দ রেজওয়ান হোসেন',
      role: 'LAWYER',
      action: 'চেম্বার সময়সূচী আপডেট',
      resource: 'Lawyer #lawyer-demo-01',
      details: 'প্রতি রবিবার ও বুধবার সকাল ১০:০০ - দুপুর ১:০০ চেম্বার কনসাল্টেশন স্লট সক্রিয় করেছেন।',
      timestamp: '২০২৬-০৩-০২ ১৬:২০:০০',
      status: 'SUCCESS',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'ALL' | 'ADMIN' | 'LAWYER' | 'PUBLIC'>('ALL');

  const filteredLogs = logs.filter((log) => {
    const matchesSearch = 
      log.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === 'ALL' || log.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const exportLogsCSV = () => {
    const headers = ['লগ আইডি', 'অ্যাক্টর', 'ভূমিকা', 'অ্যাকশন', 'রিসোর্স', 'বিবরণ', 'তারিখ ও সময়', 'স্ট্যাটাস'];
    const rows = filteredLogs.map(l => [
      l.id,
      `"${l.actor}"`,
      l.role,
      `"${l.action}"`,
      `"${l.resource}"`,
      `"${l.details}"`,
      `"${l.timestamp}"`,
      l.status
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Neki_System_Audit_Logs_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
            <History className="w-4 h-4" />
            <span>সিস্টেম সিকিউরিটি ও অ্যাক্টিভিটি ট্রেইল</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading">সিস্টেম অডিট ও নিরাপত্তা লগ</h1>
          <p className="text-sm text-slate-600 font-bangla mt-1">
            প্লাটফর্মে সংঘটিত প্রতিটি অনুমোদন, ডাটা পরিবর্তন, পেমেন্ট ট্রানজেকশন ও প্রশাসনিক পদক্ষেপের অপরিবর্তনীয় রেকর্ড।
          </p>
        </div>

        <Button
          variant="outline"
          onClick={exportLogsCSV}
          className="flex items-center gap-1.5 text-xs font-bold border-slate-300 text-slate-700 hover:bg-slate-50"
        >
          <Download className="w-4 h-4" />
          <span>অডিট লগ এক্সপোর্ট (CSV)</span>
        </Button>
      </div>

      {/* Security Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <p className="text-xs font-bold text-slate-500">মোট লগ ইভেন্ট</p>
          <p className="text-2xl font-extrabold text-[#064E3B] mt-1 font-heading">{logs.length} টি</p>
          <p className="text-[11px] text-emerald-600 mt-0.5 font-bangla">সকল অ্যাকশন সংরক্ষিত</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <p className="text-xs font-bold text-slate-500">এডমিন অনুমোদন ও পদক্ষেপ</p>
          <p className="text-2xl font-extrabold text-blue-600 mt-1 font-heading">
            {logs.filter(l => l.role === 'ADMIN').length} টি
          </p>
          <p className="text-[11px] text-blue-600 mt-0.5 font-bangla">যাচাই ও নিয়ন্ত্রণ</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <p className="text-xs font-bold text-slate-500">স্বয়ংক্রিয় গেটওয়ে সিঙ্ক</p>
          <p className="text-2xl font-extrabold text-amber-600 mt-1 font-heading">
            {logs.filter(l => l.role === 'PUBLIC').length} টি
          </p>
          <p className="text-[11px] text-amber-600 mt-0.5 font-bangla">bKash / SMS অটোমেশন</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <p className="text-xs font-bold text-slate-500">নিরাপত্তা হুমকি / বিচ্যুতি</p>
          <p className="text-2xl font-extrabold text-emerald-700 mt-1 font-heading">০ টি</p>
          <p className="text-[11px] text-emerald-600 mt-0.5 font-bangla">সিস্টেম শতভাগ নিরাপদ</p>
        </div>
      </div>

      {/* Search and Role Filter */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="অ্যাক্টর, অ্যাকশন নাম বা রিসোর্স দিয়ে খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white font-bangla"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 font-bangla">
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5" /> ভূমিকা:
          </span>
          {[
            { id: 'ALL', label: 'সকল' },
            { id: 'ADMIN', label: 'এডমিন' },
            { id: 'LAWYER', label: 'আইনজীবী' },
            { id: 'PUBLIC', label: 'অটোমেশন/পাবলিক' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setRoleFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                roleFilter === tab.id
                  ? 'bg-[#064E3B] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm font-bangla">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold text-xs uppercase">
              <tr>
                <th className="py-3 px-4">সময় ও তারিখ</th>
                <th className="py-3 px-4">অ্যাক্টর ও রোল</th>
                <th className="py-3 px-4">সম্পাদিত অ্যাকশন</th>
                <th className="py-3 px-4">লক্ষ্যবস্তু / রিসোর্স</th>
                <th className="py-3 px-4">বিস্তারিত কার্যক্রম বিবরণ</th>
                <th className="py-3 px-4 text-center">স্ট্যাটাস</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="text-xs font-mono text-slate-600 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {log.timestamp}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <p className="text-xs font-bold text-slate-900">{log.actor}</p>
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold mt-0.5 ${
                      log.role === 'ADMIN'
                        ? 'bg-blue-50 text-blue-800 border border-blue-200'
                        : log.role === 'LAWYER'
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {log.role}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-bold text-slate-800 text-xs">
                    {log.action}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="text-xs font-mono text-[#064E3B] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {log.resource}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-xs text-slate-600 max-w-xs">
                    {log.details}
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-50 text-[#064E3B] border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
