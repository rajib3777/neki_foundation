// Admin Service Abstraction (Django REST Ready)

import type { AuditLog } from '../types';
import { mockAuditLogs } from '../data/mock/audit.data';

class AdminService {
  private auditLogs: AuditLog[] = [...mockAuditLogs];

  async getAuditLogs(): Promise<AuditLog[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.auditLogs), 200);
    });
  }

  async logAction(action: string, resource: string, details: string, actor: string = 'এডমিন ডেমো ইউজার'): Promise<AuditLog> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const log: AuditLog = {
          id: `audit-${Date.now()}`,
          actor,
          role: 'ADMIN',
          action,
          resource,
          details,
          timestamp: new Date().toLocaleString('bn-BD'),
          status: 'SUCCESS',
        };
        this.auditLogs.unshift(log);
        resolve(log);
      }, 150);
    });
  }

  async getDashboardStats() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          pendingLawyersCount: 1,
          approvedLawyersCount: 4,
          totalBeneficiariesCount: 28,
          activeRequestsCount: 2,
          totalPaymentsCollected: 1000,
        });
      }, 200);
    });
  }
}

export const adminService = new AdminService();
