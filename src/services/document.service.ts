// Document Service Abstraction (Django REST Ready)

import type { RequestDocument } from '../types';

class DocumentService {
  async uploadDocument(file: File): Promise<RequestDocument> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockDoc: RequestDocument = {
          id: `doc-${Date.now()}`,
          fileName: file.name,
          fileType: file.name.substring(file.name.lastIndexOf('.')).toUpperCase() || 'FILE',
          fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
          uploadDate: new Date().toISOString().split('T')[0],
          status: 'PENDING',
          url: URL.createObjectURL(file),
        };
        resolve(mockDoc);
      }, 500);
    });
  }

  async verifyDocument(_documentId: string, _status: 'VERIFIED' | 'REJECTED'): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 200);
    });
  }
}

export const documentService = new DocumentService();
