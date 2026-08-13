// Mock Users for Demo Authentication Switcher

import type { User } from '../../types';

export const mockUsers: Record<string, User> = {
  beneficiary: {
    id: 'user-beneficiary-01',
    name: 'রহিম উল্লাহ (ডেমো সুবিধাভোগী)',
    email: 'beneficiary.demo@neki.org',
    mobile: '01700-000001',
    role: 'BENEFICIARY',
    district: 'ঢাকা',
    upazila: 'ধানমন্ডি',
    createdAt: '2026-01-10T00:00:00Z',
  },
  lawyer: {
    id: 'user-lawyer-01',
    name: 'Demo Lawyer 01 (আইনজীবী ডেমো ০১)',
    email: 'lawyer01.demo@neki.org',
    mobile: '01800-000001',
    role: 'LAWYER',
    district: 'ঢাকা',
    upazila: 'ধানমন্ডি',
    createdAt: '2025-01-15T00:00:00Z',
  },
  admin: {
    id: 'user-admin-01',
    name: 'এডমিন ডেমো ইউজার',
    email: 'admin.demo@neki.org',
    mobile: '01900-000001',
    role: 'ADMIN',
    district: 'ঢাকা',
    createdAt: '2024-12-01T00:00:00Z',
  },
};
