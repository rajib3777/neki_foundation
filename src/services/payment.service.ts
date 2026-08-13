// Mock Payment Service Abstraction (bKash, Nagad, Card - Demo Environment)

import type { Payment, PaymentMethod } from '../types';

class PaymentService {
  async processDemoPayment(requestId: string, amount: number, method: PaymentMethod, payerMobile: string): Promise<Payment> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const txnId = `TXN-DEMO-${Math.floor(100000 + Math.random() * 900000)}`;
        const payment: Payment = {
          id: `pay-${Date.now()}`,
          transactionId: txnId,
          requestId,
          amount,
          processingFee: 15,
          totalAmount: amount + 15,
          paymentMethod: method,
          status: 'SUCCESS',
          payerName: 'ডেমো সেবাগ্রহীতা',
          payerMobile,
          createdAt: new Date().toISOString(),
          isDemo: true,
        };
        resolve(payment);
      }, 600);
    });
  }
}

export const paymentService = new PaymentService();
