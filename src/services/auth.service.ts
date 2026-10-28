// Auth Service Abstraction (Django REST Ready)

import type { User, UserRole } from '../types';
import { mockUsers } from '../data/mock/users.data';

class AuthService {
  private currentUser: User | null = null;

  constructor() {
    try {
      const saved = localStorage.getItem('neki_auth_role') as UserRole | null;
      if (saved === 'BENEFICIARY') this.currentUser = mockUsers.beneficiary;
      else if (saved === 'LAWYER') this.currentUser = mockUsers.lawyer;
      else if (saved === 'ADMIN') this.currentUser = mockUsers.admin;
    } catch {
      // Ignore localStorage errors in SSR or restricted environments
    }
  }

  async getCurrentUser(): Promise<User | null> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.currentUser), 100);
    });
  }

  async switchRole(role: UserRole): Promise<User> {
    return new Promise((resolve) => {
      setTimeout(() => {
        let user: User;
        if (role === 'BENEFICIARY') user = mockUsers.beneficiary;
        else if (role === 'LAWYER') user = mockUsers.lawyer;
        else if (role === 'ADMIN') user = mockUsers.admin;
        else {
          user = {
            id: 'user-public-guest',
            name: 'অতিথি দর্শনার্থী',
            email: 'guest@neki.org',
            mobile: 'N/A',
            role: 'PUBLIC',
            district: 'ঢাকা',
            createdAt: new Date().toISOString(),
          };
        }
        this.currentUser = user;
        localStorage.setItem('neki_auth_role', role);
        resolve(user);
      }, 200);
    });
  }

  async login(_emailOrMobile: string, _password: string, role: UserRole): Promise<User> {
    return this.switchRole(role);
  }

  async logout(): Promise<void> {
    this.currentUser = null;
    localStorage.removeItem('neki_auth_role');
  }
}

export const authService = new AuthService();
