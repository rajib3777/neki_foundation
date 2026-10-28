import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { 
  FileCheck2, 
  UploadCloud, 
  ShieldCheck, 
  Download, 
  Eye, 
  Trash2, 
  CheckCircle2, 
  X,
  Award
} from 'lucide-react';

interface LawyerDoc {
  id: string;
  title: string;
  type: string;
  fileSize: string;
  issueDate: string;
  status: 'VERIFIED' | 'UNDER_REVIEW';
}

export const LawyerDocuments: React.FC = () => {
  const [docs, setDocs] = useState<LawyerDoc[]>([
    {
      id: 'ld-1',
      title: 'বাংলাদেশ বার কাউন্সিল এডভোকেটশিপ মূল সনদপত্র',
      type: 'PDF',
      fileSize: '2.4 MB',
      issueDate: '২০০৮',
      status: 'VERIFIED',
    },
    {
      id: 'ld-2',
      title: 'যশোর জেলা ও দায়রা জজ আদালত বার মেম্বারশিপ সার্টিফিকেট',
      type: 'PDF',
      fileSize: '1.8 MB',
      issueDate: '২০০৮',
      status: 'VERIFIED',
    },
    {
      id: 'ld-3',
      title: 'এলএল.বি (অনার্স) ও এলএল.এম ডিগ্রি সনদপত্র',
      type: 'PDF',
      fileSize: '3.1 MB',
      issueDate: '২০০৬',
      status: 'VERIFIED',
    },
    {
      id: 'ld-4',
      title: 'জাতীয় পরিচয়পত্র ও ই-টিন (TIN) সার্টিফিকেট কপি',
      type: 'IMAGE',
      fileSize: '950 KB',
      issueDate: '২০২৩',
      status: 'VERIFIED',
    },
  ]);

  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [docTitle, setDocTitle] = useState('');
  const [previewDoc, setPreviewDoc] = useState<LawyerDoc | null>(null);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docTitle.trim()) return;

    const newDoc: LawyerDoc = {
      id: `ld-${Date.now()}`,
      title: docTitle,
      type: 'PDF',
      fileSize: '1.5 MB',
      issueDate: '২০২৬',
      status: 'UNDER_REVIEW',
    };

    setDocs([newDoc, ...docs]);
    setIsUploadOpen(false);
    setDocTitle('');
  };

  return (
    <div className="space-y-6 font-bangla pb-12">

      {/* Header */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-slate-900">আইনজীবী সনদপত্র ও যাচাইকৃত নথিপত্র</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            বার কাউন্সিল সনদ, শিক্ষাগত যোগ্যতা ও পেশাগত সত্যায়নের জন্য সংরক্ষিত নথিসমূহ
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => setIsUploadOpen(true)}
          className="gap-2 shrink-0 shadow-md"
        >
          <UploadCloud className="w-4 h-4" />
          <span>নতুন সনদ আপলোড করুন</span>
        </Button>
      </div>

      {/* Verification Shield Banner */}
      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3.5 text-xs text-emerald-900">
        <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
        <p className="leading-relaxed">
          <strong>যাচাইকরণ অবস্থা:</strong> আপনার বার সনদপত্র ও শিক্ষাগত যোগ্যতা নেকী ফাউন্ডেশন লিগ্যাল স্ক্রুটিনি কমিটি কর্তৃক সম্পূর্ণ যাচাই ও অনুমোদনপ্রাপ্ত। আপনি পাবলিক প্ল্যাটফর্মে ব্লু-টিক ভেরিফায়েড আইনজীবী হিসেবে তালিকাভুক্ত।
        </p>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-bangla">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-5">সনদ ও দলিলের নাম</th>
                <th className="py-3.5 px-4">ফাইলের ধরন</th>
                <th className="py-3.5 px-4">ফাইলের আকার</th>
                <th className="py-3.5 px-4">ইস্যু / পাসের সন</th>
                <th className="py-3.5 px-4">এডমিন যাচাই স্ট্যাটাস</th>
                <th className="py-3.5 px-5 text-right">কার্যক্রম</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {docs.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 shrink-0 border border-amber-200">
                        <Award className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-xs sm:text-sm">{doc.title}</p>
                        <span className="text-[10px] text-slate-400">বার ও পেশাগত সত্যায়ন নথি</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-mono font-bold text-slate-800">{doc.type}</td>
                  <td className="py-4 px-4 font-sans text-slate-500">{doc.fileSize}</td>
                  <td className="py-4 px-4 font-sans text-slate-700 font-bold">{doc.issueDate}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                      doc.status === 'VERIFIED'
                        ? 'bg-emerald-100 text-[#064E3B] border border-emerald-200'
                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}>
                      {doc.status === 'VERIFIED' ? '✓ যাচাইকৃত ও অনুমোদিত' : 'পর্যালোচনাধীন'}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setPreviewDoc(doc)}
                        className="p-1.5 rounded-lg text-slate-600 hover:text-[#064E3B] hover:bg-emerald-50 transition-colors"
                        title="প্রিভিউ দেখুন"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => alert(`ডাউনলোড শুরু হয়েছে: ${doc.title}`)}
                        className="p-1.5 rounded-lg text-slate-600 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                        title="ডাউনলোড করুন"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* UPLOAD MODAL */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-7 space-y-5">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold font-heading text-slate-900">নতুন সনদপত্র আপলোড</h3>
                <p className="text-xs text-slate-500 mt-0.5">PDF বা ইমেজ ফরম্যাটে বার সনদ বা ডিগ্রি আপলোড করুন</p>
              </div>
              <button 
                onClick={() => setIsUploadOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpload} className="space-y-4 text-xs sm:text-sm">
              <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:border-[#064E3B] transition-colors cursor-pointer bg-slate-50/50">
                <UploadCloud className="w-10 h-10 text-emerald-700 mx-auto mb-2" />
                <p className="font-bold text-slate-800 text-xs">ফাইল ড্রপ করুন অথবা ব্রাউজ করুন</p>
                <p className="text-[11px] text-slate-400 mt-1">PDF, JPG (সর্বোচ্চ ১০ MB)</p>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">সনদ / নথির শিরোনাম *</label>
                <input
                  type="text"
                  required
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                  placeholder="যেমন: সুপ্রিম কোর্ট হাইকোর্ট বিভাগ পারমিশন সনদ"
                  className="w-full p-2.5 text-xs font-bangla border border-slate-200 rounded-xl focus:outline-none focus:border-[#064E3B]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2.5">
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsUploadOpen(false)}
                >
                  বাতিল
                </Button>
                <Button 
                  type="submit" 
                  variant="primary" 
                  size="sm"
                >
                  আপলোড করুন
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PREVIEW MODAL */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 p-6 sm:p-7 space-y-5">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-heading text-slate-900">{previewDoc.title}</h3>
                  <p className="text-xs text-slate-500 font-mono">ইস্যু: {previewDoc.issueDate} • {previewDoc.fileSize}</p>
                </div>
              </div>
              <button 
                onClick={() => setPreviewDoc(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-100 rounded-2xl p-8 text-center space-y-3 border border-slate-200">
              <FileCheck2 className="w-16 h-16 text-emerald-700 mx-auto" />
              <p className="text-xs font-bold text-slate-700">ডিজিটাল সনদপত্র রেকর্ড</p>
              <p className="text-[11px] text-slate-500">
                এই সনদটি বাংলাদেশ বার কাউন্সিলের তালিকাভুক্ত তথ্যের সাথে যাচাইকৃত ও সত্যায়িত।
              </p>
            </div>

            <div className="pt-2 flex justify-between items-center">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full">
                স্ট্যাটাস: অনুমোদিত
              </span>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  alert(`ডাউনলোড হচ্ছে: ${previewDoc.title}`);
                  setPreviewDoc(null);
                }}
                className="gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>ডাউনলোড করুন</span>
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
