// Legal Aid Service Abstraction (Django REST Ready)

import type { LegalAidRequest, LegalAidRequestStatus } from '../types';
import { mockLegalAidRequests } from '../data/mock/requests.data';

class LegalAidService {
  private requests: LegalAidRequest[] = [...mockLegalAidRequests];

  async getRequests(filter?: { beneficiaryId?: string; lawyerId?: string; status?: LegalAidRequestStatus }): Promise<LegalAidRequest[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        let res = [...this.requests];
        if (filter?.beneficiaryId) res = res.filter((r) => r.beneficiaryId === filter.beneficiaryId);
        if (filter?.lawyerId) res = res.filter((r) => r.lawyerId === filter.lawyerId);
        if (filter?.status) res = res.filter((r) => r.status === filter.status);
        resolve(res);
      }, 200);
    });
  }

  async getRequestByTrackingNumber(trackingNumber: string): Promise<LegalAidRequest | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const found = this.requests.find((r) => r.trackingNumber.toLowerCase() === trackingNumber.toLowerCase());
        resolve(found || null);
      }, 150);
    });
  }

  async createRequest(payload: Partial<LegalAidRequest>): Promise<LegalAidRequest> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tracking = `NF-LEG-2026-${Math.floor(100 + Math.random() * 900)}`;
        const newReq: LegalAidRequest = {
          id: `req-${Date.now()}`,
          trackingNumber: tracking,
          beneficiaryId: payload.beneficiaryId || 'user-beneficiary-01',
          beneficiaryName: payload.beneficiaryName || 'মোঃ রহিম উল্লাহ (সেবাগ্রহীতা)',
          beneficiaryMobile: payload.beneficiaryMobile || '01700-000001',
          district: payload.district || 'ঢাকা',
          legalCategory: payload.legalCategory || 'সাধারণ আইনী পরামর্শ',
          lawyerId: payload.lawyerId,
          lawyerName: payload.lawyerName,
          caseSummary: payload.caseSummary || '',
          urgencyLevel: payload.urgencyLevel || 'MEDIUM',
          status: 'SUBMITTED',
          feeAmount: 500,
          isFeePaid: false,
          documents: payload.documents || [],
          timeline: [
            {
              id: `tl-${Date.now()}`,
              title: 'আইনী সহায়তা আবেদন জমাদান',
              description: 'অনলাইন সিস্টেমের মাধ্যমে প্রাথমিক বিবরণ জমা দেয়া হয়েছে।',
              timestamp: new Date().toLocaleString('bn-BD'),
              actor: payload.beneficiaryName || 'সেবাগ্রহীতা',
              status: 'SUBMITTED',
            },
          ],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        this.requests.unshift(newReq);
        resolve(newReq);
      }, 350);
    });
  }

  async updateRequestStatus(id: string, status: LegalAidRequestStatus, actor: string, note?: string): Promise<LegalAidRequest> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.requests.findIndex((r) => r.id === id);
        if (index === -1) {
          reject(new Error('Request not found'));
          return;
        }
        const req = this.requests[index];
        req.status = status;
        if (status === 'PAYMENT_CONFIRMED') req.isFeePaid = true;

        req.timeline.push({
          id: `tl-${Date.now()}`,
          title: `স্ট্যাটাস পরিবর্তন: ${status}`,
          description: note || 'আবেদনের বর্তমান অবস্থা আপডেট করা হয়েছে।',
          timestamp: new Date().toLocaleString('bn-BD'),
          actor,
          status,
        });

        req.updatedAt = new Date().toISOString();
        resolve(req);
      }, 250);
    });
  }
}

export const legalAidService = new LegalAidService();
