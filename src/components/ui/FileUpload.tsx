import React, { useState } from 'react';
import { UploadCloud, File, X, CheckCircle } from 'lucide-react';
import { documentService } from '../../services/document.service';
import type { RequestDocument } from '../../types';

export interface FileUploadProps {
  label?: string;
  helperText?: string;
  onUploadSuccess?: (doc: RequestDocument) => void;
  accept?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  label = 'নথিপত্র সংযুক্ত করুন',
  helperText = 'PDF, PNG, JPG (সর্বোচ্চ ১০ মেগাবাইট)',
  onUploadSuccess,
  accept = '.pdf,.png,.jpg,.jpeg',
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedDoc, setUploadedDoc] = useState<RequestDocument | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const doc = await documentService.uploadDocument(file);
      setUploadedDoc(doc);
      if (onUploadSuccess) onUploadSuccess(doc);
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setUploadedDoc(null);
  };

  return (
    <div className="w-full space-y-2">
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      {!uploadedDoc ? (
        <label className="relative flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50/50 hover:bg-gray-100/50 hover:border-[#1B4D3E] transition-colors">
          <UploadCloud className="w-8 h-8 text-[#1B4D3E] mb-2" />
          <span className="text-sm font-medium text-gray-700">ফাইল নির্বাচন বা ড্র্যাগ করুন</span>
          <span className="text-xs text-gray-500 mt-1">{helperText}</span>
          <input
            type="file"
            className="sr-only"
            accept={accept}
            onChange={handleFileChange}
            disabled={isUploading}
          />
          {isUploading && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-lg">
              <span className="text-xs font-medium text-[#1B4D3E] animate-pulse">আপলোড হচ্ছে...</span>
            </div>
          )}
        </label>
      ) : (
        <div className="flex items-center justify-between p-3 border border-emerald-200 bg-emerald-50/50 rounded-lg">
          <div className="flex items-center gap-3">
            <File className="w-5 h-5 text-emerald-700" />
            <div>
              <p className="text-sm font-medium text-gray-900">{uploadedDoc.fileName}</p>
              <p className="text-xs text-gray-500">
                {uploadedDoc.fileSize} • {uploadedDoc.fileType}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <button
              onClick={handleRemove}
              className="p-1 text-gray-400 hover:text-red-600 transition-colors"
              type="button"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
