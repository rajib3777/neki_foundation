// Mock Admin Audit Logs Data

import type { AuditLog } from '../../types';

export const mockAuditLogs: AuditLog[] = [
  {
    id: 'audit-101',
    actor: 'এডমিন ডেমো ইউজার',
    role: 'ADMIN',
    action: 'আইনজীবী আবেদন অনুমোদন',
    resource: 'Lawyer #lawyer-demo-01 (Demo Lawyer 01)',
    details: 'বার সনদপত্র যাচাইপূর্বক প্রোফাইল অনুমোদিত ও পাবলিক ডিরেক্টরিতে দৃশ্যমান করা হয়েছে।',
    timestamp: '২০২৬-০৩-০৪ ১১:২০:১৫',
    status: 'SUCCESS',
  },
  {
    id: 'audit-102',
    actor: 'এডমিন ডেমো ইউজার',
    role: 'ADMIN',
    action: 'আইনী সহায়তা অ্যাসাইনমেন্ট',
    resource: 'Request #NF-LEG-2026-001',
    details: 'সুবিধাভোগী রহিম উল্লাহর আবেদনে Demo Lawyer 01-কে মনোনীত করা হয়েছে।',
    timestamp: '২০২৬-০৩-০২ ১১:৩০:০০',
    status: 'SUCCESS',
  },
  {
    id: 'audit-103',
    actor: 'পেমেন্ট সাবসিস্টেম (মক)',
    role: 'PUBLIC',
    action: 'পেমেন্ট কনফার্মেশন',
    resource: 'Payment #TXN-DEMO-9912',
    details: 'bKash মাধ্যমে ৫০০ টাকা প্রসেসিং ফি প্রাপ্তি নিশ্চায়ন।',
    timestamp: '২০২৬-০৩-০১ ১০:০৫:০০',
    status: 'SUCCESS',
  },
];
