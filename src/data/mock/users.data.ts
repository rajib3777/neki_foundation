// Mock Users for Demo Authentication Switcher

import type { User } from '../../types';

export const mockUsers: Record<string, User> = {
  beneficiary: {
    id: 'user-beneficiary-01',
    name: 'মোঃ রহিম উল্লাহ',
    email: 'rahim.ullah@neki.org',
    mobile: '01712-345678',
    role: 'BENEFICIARY',
    district: 'যশোর',
    upazila: 'ঝিকরগাছা',
    createdAt: '2026-01-10T00:00:00Z',
  },
  lawyer: {
    id: 'user-lawyer-01',
    name: 'এডভোকেট সৈয়দ রেজওয়ান হোসেন',
    email: 'adv.rezwan@neki.org',
    mobile: '01819-234567',
    role: 'LAWYER',
    district: 'ঢাকা',
    upazila: 'ধানমন্ডি',
    createdAt: '2025-01-15T00:00:00Z',
  },
  admin: {
    id: 'user-admin-01',
    name: 'তানভীর আহমেদ (সমন্বয়ক)',
    email: 'admin@neki.org',
    mobile: '01911-889900',
    role: 'ADMIN',
    district: 'ঢাকা',
    createdAt: '2024-12-01T00:00:00Z',
  },
};
