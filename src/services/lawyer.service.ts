// Lawyer Service Abstraction (Django REST Ready)

import type { Lawyer, LawyerStatus } from '../types';
import { mockLawyers } from '../data/mock/lawyers.data';

export interface LawyerFilterOptions {
  district?: string;
  upazila?: string;
  practiceArea?: string;
  searchQuery?: string;
  status?: LawyerStatus;
  minExperience?: number;
}

class LawyerService {
  private lawyersList: Lawyer[] = [...mockLawyers];

  async getLawyers(filters?: LawyerFilterOptions): Promise<Lawyer[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        let results = [...this.lawyersList];

        if (filters?.status) {
          results = results.filter((l) => l.status === filters.status);
        } else {
          // Public search only returns APPROVED lawyers
          results = results.filter((l) => l.status === 'APPROVED');
        }

        if (filters?.district) {
          results = results.filter((l) => l.district.toLowerCase() === filters.district?.toLowerCase());
        }

        if (filters?.upazila) {
          results = results.filter((l) => l.upazila.toLowerCase() === filters.upazila?.toLowerCase());
        }

        if (filters?.practiceArea) {
          results = results.filter((l) => l.practiceAreas.includes(filters.practiceArea!));
        }

        if (filters?.minExperience) {
          results = results.filter((l) => l.yearsOfExperience >= filters.minExperience!);
        }

        if (filters?.searchQuery) {
          const q = filters.searchQuery.toLowerCase();
          results = results.filter(
            (l) =>
              l.fullName.toLowerCase().includes(q) ||
              l.barAssociation.toLowerCase().includes(q) ||
              l.practiceAreas.some((p) => p.toLowerCase().includes(q))
          );
        }

        resolve(results);
      }, 250);
    });
  }

  async getLawyerById(id: string): Promise<Lawyer | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const found = this.lawyersList.find((l) => l.id === id);
        resolve(found || null);
      }, 150);
    });
  }

  async registerLawyerApplication(applicationData: Partial<Lawyer>): Promise<Lawyer> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newLawyer: Lawyer = {
          id: `lawyer-demo-${Date.now()}`,
          userId: `user-lawyer-${Date.now()}`,
          fullName: applicationData.fullName || 'Demo Lawyer Candidate',
          isDemo: true,
          designation: applicationData.designation || 'এডভোকেট',
          barAssociation: applicationData.barAssociation || 'জেলা বার',
          enrollmentNumber: applicationData.enrollmentNumber || 'DEMO/REG/2026',
          enrollmentYear: applicationData.enrollmentYear || 2026,
          district: applicationData.district || 'ঢাকা',
          upazila: applicationData.upazila || 'সদর',
          chamberAddress: applicationData.chamberAddress || 'ডেমো চেম্বার',
          yearsOfExperience: applicationData.yearsOfExperience || 1,
          practiceAreas: applicationData.practiceAreas || ['আইনী পরামর্শ'],
          bio: applicationData.bio || 'আবেদনাধীন নতুন প্যানেল আইনজীবী ডেমো প্রোফাইল।',
          languages: ['বাংলা'],
          status: 'UNDER_REVIEW',
          isVerified: false,
          createdAt: new Date().toISOString(),
          profileCompletionPercentage: 80,
        };
        this.lawyersList.unshift(newLawyer);
        resolve(newLawyer);
      }, 400);
    });
  }

  async updateLawyerStatus(lawyerId: string, status: LawyerStatus, reason?: string): Promise<Lawyer> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.lawyersList.findIndex((l) => l.id === lawyerId);
        if (index === -1) {
          reject(new Error('Lawyer not found'));
          return;
        }
        this.lawyersList[index].status = status;
        this.lawyersList[index].isVerified = status === 'APPROVED';
        if (reason) this.lawyersList[index].rejectionReason = reason;
        resolve(this.lawyersList[index]);
      }, 300);
    });
  }
}

export const lawyerService = new LawyerService();
