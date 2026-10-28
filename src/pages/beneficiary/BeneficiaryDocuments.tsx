import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { 
  FolderLock, 
  UploadCloud, 
  FileCheck2, 
  Download, 
  Eye, 
  Trash2, 
  ShieldCheck, 
  CheckCircle2, 
  X, 
  FileText,
  AlertCircle
} from 'lucide-react';

interface VaultDocument {
  id: string;
  name: string;
  category: string;
  trackingNumber: string;
  fileSize: string;
  fileType: string;
  uploadDate: string;
  status: 'VERIFIED' | 'PENDING' | 'REJECTED';
}

export const BeneficiaryDocuments: React.FC = () => {
  const [documents, setDocuments] = useState<VaultDocument[]>([
    {
      id: 'doc-1',
      name: 'জাতীয় পরিচয়পত্র (NID) রঙিন স্ক্যান কপি',
      category: 'জাতীয় পরিচয়পত্র',
      trackingNumber: 'NF-LEG-2026-001',
      fileSize: '1.2 MB',
      fileType: 'PDF',
      uploadDate: '২০২৬-০৩-০১',
      status: 'VERIFIED',
    },
    {
      id: 'doc-2',
      name: 'পারিবারিক অভিযোগ ও লিখিত বর্ণনা খসড়া',
      category: 'আদালতের আদেশ ও আবেদন',
      trackingNumber: 'NF-LEG-2026-001',
      fileSize: '850 KB',
      fileType: 'PDF',
      uploadDate: '২০২৬-০৩-০১',
      status: 'VERIFIED',
    },
    {
      id: 'doc-3',
      name: 'ঝিকরগাছা পৌরসভা ওয়ারিশান সনদপত্র',
      category: 'পারিবারিক সনদ',
      trackingNumber: 'NF-LEG-2026-001',
      fileSize: '920 KB',
      fileType: 'IMAGE',
      uploadDate: '২০২৬-০৩-০২',
      status: 'VERIFIED',
    },
    {
      id: 'doc-4',
      name: 'যশোর মৌজার খতিয়ান ও পর্চা সার্টিফাইড কপি',
      category: 'জমির রেকর্ড ও খতিয়ান',
      trackingNumber: 'NF-LEG-2026-002',
      fileSize: '3.4 MB',
      fileType: 'PDF',
      uploadDate: '২০২৬-০৩-০৫',
      status: 'VERIFIED',
    },
    {
      id: 'doc-5',
      name: 'স্থানীয় ইউনিয়ন ভূমি অফিস দাখিলা রশিদ',
      category: 'জমির রেকর্ড ও খতিয়ান',
      trackingNumber: 'NF-LEG-2026-002',
      fileSize: '1.1 MB',
      fileType: 'IMAGE',
      uploadDate: '২০২৬-০৩-০৫',
      status: 'PENDING',
    },
  ]);

  const [activeCategory, setActiveCategory] = useState('ALL');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<VaultDocument | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // New Upload Form
  const [uploadForm, setUploadForm] = useState({
    name: '',
    category: 'জাতীয় পরিচয়পত্র',
    trackingNumber: 'NF-LEG-2026-001',
  });

  const categories = [
    { id: 'ALL', label: 'সকল নথি' },
    { id: 'জাতীয় পরিচয়পত্র', label: 'জাতীয় পরিচয়পত্র' },
    { id: 'জমির রেকর্ড ও খতিয়ান', label: 'জমির রেকর্ড ও খতিয়ান' },
    { id: 'আদালতের আদেশ ও আবেদন', label: 'আদালতের আদেশ ও আবেদন' },
    { id: 'পারিবারিক সনদ', label: 'পারিবারিক সনদ' },
  ];

  const filteredDocs = documents.filter((doc) => {
    if (activeCategory === 'ALL') return true;
    return doc.category === activeCategory;
  });

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadForm.name.trim()) return;

    const newDoc: VaultDocument = {
      id: `doc-${Date.now()}`,
      name: uploadForm.name,
      category: uploadForm.category,
      trackingNumber: uploadForm.trackingNumber,
      fileSize: '1.5 MB',
      fileType: 'PDF',
      uploadDate: new Date().toLocaleDateString('bn-BD'),
      status: 'PENDING',
    };

    setDocuments([newDoc, ...documents]);
    setUploadSuccess(true);
    setTimeout(() => {
      setUploadSuccess(false);
      setIsUploadModalOpen(false);
      setUploadForm({
        name: '',
        category: 'জাতীয় পরিচয়পত্র',
        trackingNumber: 'NF-LEG-2026-001',
      });
    }, 1200);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('আপনি কি নিশ্চিত যে এই নথিটি ভল্ট থেকে মুছে ফেলতে চান?')) {
      setDocuments(documents.filter((d) => d.id !== id));
    }
  };

  return (
    <div className="space-y-6 font-bangla pb-12">

      {/* Header */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-slate-900">আইনী নথিপত্র ভল্ট</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            আপনার মামলার প্রয়োজনীয় সকল ডকুমেন্ট নিরাপদে সংরক্ষণ, যাচাই ও ডাউনলোড করুন
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => setIsUploadModalOpen(true)}
          className="gap-2 shrink-0 shadow-md"
        >
          <UploadCloud className="w-4 h-4" />
          <span>নতুন নথি আপলোড করুন</span>
        </Button>
      </div>

      {/* Security Banner */}
      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3.5 text-xs text-emerald-900">
        <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
        <p className="leading-relaxed">
          <strong>নিরাপত্তা নিশ্চয়তা:</strong> আপনার সংরক্ষিত সকল আইনী নথি ২৫৬-বিট এনক্রিপশনের মাধ্যমে সম্পূর্ণ সুরক্ষিত। এগুলো কেবল আপনার নিযুক্ত প্যানেল আইনজীবী এবং ফাউন্ডেশনের আইনী কমিটি যাচাইয়ের স্বার্থে পরিদর্শন করতে পারেন।
        </p>
      </div>

      {/* Categories Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2.5 rounded-2xl font-bold transition-all whitespace-nowrap ${
              activeCategory === cat.id
                ? 'bg-[#064E3B] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Documents Table / Cards */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-bangla">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-5">নথির বিবরণ ও নাম</th>
                <th className="py-3.5 px-4">ক্যাটাগরি</th>
                <th className="py-3.5 px-4">সংশ্লিষ্ট কেস আইডি</th>
                <th className="py-3.5 px-4">ফাইলের আকার</th>
                <th className="py-3.5 px-4">আপলোড তারিখ</th>
                <th className="py-3.5 px-4">যাচাইকরণ</th>
                <th className="py-3.5 px-5 text-right">কার্যক্রম</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-emerald-50 text-[#064E3B] shrink-0 border border-emerald-100">
                        <FileCheck2 className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-xs sm:text-sm">{doc.name}</p>
                        <span className="text-[10px] text-slate-400 font-sans">{doc.fileType} ফরম্যাট</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-medium text-slate-800">{doc.category}</td>
                  <td className="py-4 px-4 font-mono font-bold text-slate-800">
                    <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px]">{doc.trackingNumber}</span>
                  </td>
                  <td className="py-4 px-4 font-sans text-slate-500">{doc.fileSize}</td>
                  <td className="py-4 px-4 font-sans text-slate-500">{doc.uploadDate}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                      doc.status === 'VERIFIED'
                        ? 'bg-emerald-100 text-[#064E3B] border border-emerald-200'
                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}>
                      {doc.status === 'VERIFIED' ? '✓ যাচাইকৃত' : 'প্রক্রিয়াধীন'}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setPreviewDoc(doc)}
                        title="প্রিভিউ দেখুন"
                        className="p-1.5 rounded-lg text-slate-600 hover:text-[#064E3B] hover:bg-emerald-50 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => alert(`ডাউনলোড শুরু হয়েছে: ${doc.name}`)}
                        title="ডাউনলোড করুন"
                        className="p-1.5 rounded-lg text-slate-600 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(doc.id)}
                        title="মুছে ফেলুন"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
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
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-7 space-y-5">
            
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-bold font-heading text-slate-900">নথিপত্র ভল্টে আপলোড</h3>
                <p className="text-xs text-slate-500 mt-0.5">PDF, JPG বা PNG ফরম্যাটে সর্বোচ্চ ১০ মেগাবাইট ফাইল গ্রহণযোগ্য</p>
              </div>
              <button 
                onClick={() => setIsUploadModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {uploadSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#064E3B] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">নথি সফলভাবে আপলোড হয়েছে!</h4>
                <p className="text-xs text-slate-600">
                  আপনার ফাইলটি এনক্রিপ্ট করে ভল্টে যুক্ত করা হয়েছে এবং আইনী পর্যালোচনায় দৃশ্যমান।
                </p>
              </div>
            ) : (
              <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs sm:text-sm">
                
                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:border-[#064E3B] transition-colors cursor-pointer bg-slate-50/50">
                  <UploadCloud className="w-10 h-10 text-emerald-700 mx-auto mb-2" />
                  <p className="font-bold text-slate-800 text-xs">ফাইল ড্রপ করুন অথবা ব্রাউজ করুন</p>
                  <p className="text-[11px] text-slate-400 mt-1">PDF, JPG, PNG (সর্বোচ্চ ১০ MB)</p>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">নথির শিরোনাম / নাম *</label>
                  <input
                    type="text"
                    required
                    value={uploadForm.name}
                    onChange={(e) => setUploadForm({ ...uploadForm, name: e.target.value })}
                    placeholder="যেমন: জাতীয় পরিচয়পত্র স্ক্যান কপি"
                    className="w-full p-3 text-xs font-bangla border border-slate-200 rounded-xl focus:outline-none focus:border-[#064E3B]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-800">ক্যাটাগরি *</label>
                    <select
                      value={uploadForm.category}
                      onChange={(e) => setUploadForm({ ...uploadForm, category: e.target.value })}
                      className="w-full p-2.5 text-xs font-bangla border border-slate-200 rounded-xl focus:outline-none focus:border-[#064E3B]"
                    >
                      <option value="জাতীয় পরিচয়পত্র">জাতীয় পরিচয়পত্র</option>
                      <option value="জমির রেকর্ড ও খতিয়ান">জমির রেকর্ড ও খতিয়ান</option>
                      <option value="আদালতের আদেশ ও আবেদন">আদালতের আদেশ ও আবেদন</option>
                      <option value="পারিবারিক সনদ">পারিবারিক সনদ</option>
                      <option value="অন্যান্য">অন্যান্য</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-800">সংযুক্ত কেস আইডি *</label>
                    <select
                      value={uploadForm.trackingNumber}
                      onChange={(e) => setUploadForm({ ...uploadForm, trackingNumber: e.target.value })}
                      className="w-full p-2.5 text-xs font-mono border border-slate-200 rounded-xl focus:outline-none focus:border-[#064E3B]"
                    >
                      <option value="NF-LEG-2026-001">NF-LEG-2026-001</option>
                      <option value="NF-LEG-2026-002">NF-LEG-2026-002</option>
                    </select>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-end gap-2.5">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setIsUploadModalOpen(false)}
                  >
                    বাতিল
                  </Button>
                  <Button 
                    type="submit" 
                    variant="primary" 
                    size="sm"
                  >
                    আপলোড সম্পন্ন করুন
                  </Button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

      {/* DOCUMENT PREVIEW MODAL */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 p-6 sm:p-7 space-y-5">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-50 text-[#064E3B]">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-heading text-slate-900">{previewDoc.name}</h3>
                  <p className="text-xs text-slate-500 font-mono">{previewDoc.trackingNumber} • {previewDoc.fileSize}</p>
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
              <p className="text-xs font-bold text-slate-700">ডিজিটাল নথিপত্র ভিউয়ার</p>
              <p className="text-[11px] text-slate-500">
                এই নথিটি নেকী ফাউন্ডেশন এনক্রিপ্টেড ক্লাউডে সংরক্ষিত রয়েছে এবং বৈধভাবে সত্যায়িত।
              </p>
            </div>

            <div className="pt-2 flex justify-between items-center">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full">
                যাচাই স্ট্যাটাস: {previewDoc.status === 'VERIFIED' ? 'সম্পূর্ণ ও সঠিক' : 'পর্যালোচনাধীন'}
              </span>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  alert(`ডাউনলোড হচ্ছে: ${previewDoc.name}`);
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
