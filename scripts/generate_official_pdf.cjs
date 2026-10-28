const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

console.log('Generating Official Neki Foundation PDF Report...');

const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const docsDir = path.join(publicDir, 'docs');
if (!fs.existsSync(docsDir)) fs.mkdirSync(docsDir, { recursive: true });

// Convert images to base64
function getBase64Image(relativePath) {
  const fullPath = path.join(publicDir, relativePath);
  if (fs.existsSync(fullPath)) {
    const ext = path.extname(fullPath).slice(1);
    const data = fs.readFileSync(fullPath).toString('base64');
    return `data:image/${ext === 'jpg' ? 'jpeg' : ext};base64,${data}`;
  }
  return '';
}

const logoBase64 = getBase64Image('images/logo.jpg');
const land1Base64 = getBase64Image('images/neki_land_1.jpg');
const land2Base64 = getBase64Image('images/neki_land_2.jpg');
const land3Base64 = getBase64Image('images/neki_land_3.jpg');

const htmlContent = `<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8">
  <title>নেকী ফাউন্ডেশন — প্রকল্প অগ্রগতি ও বাস্তবায়ন রিপোর্ট</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Tiro+Bangla&family=Inter:wght@400;500;600;700&display=swap');

    @page {
      size: A4 portrait;
      margin: 10mm 12mm 10mm 12mm;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Hind Siliguri', 'SolaimanLipi', 'Nirmala UI', 'Segoe UI', sans-serif;
      color: #1e293b;
      background: #ffffff;
      line-height: 1.45;
      font-size: 9.5pt;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .report-container {
      width: 100%;
      max-width: 100%;
      margin: 0 auto;
    }

    /* HEADER */
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 2.5px solid #064E3B;
      padding-bottom: 8px;
      margin-bottom: 12px;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .header-logo {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid #D97706;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    }

    .org-title {
      font-size: 18pt;
      font-weight: 700;
      color: #064E3B;
      letter-spacing: -0.3px;
      line-height: 1.2;
    }

    .org-subtitle {
      font-size: 8.5pt;
      color: #334155;
      font-weight: 500;
      margin-top: 1px;
    }

    .org-meta {
      font-size: 7.5pt;
      color: #64748b;
      margin-top: 2px;
    }

    .header-right {
      text-align: right;
    }

    .partner-badge {
      display: inline-block;
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      padding: 4px 10px;
      border-radius: 6px;
    }

    .partner-label {
      font-size: 7pt;
      color: #64748b;
      text-transform: uppercase;
      font-weight: 600;
    }

    .partner-name {
      font-size: 10pt;
      font-weight: 700;
      color: #D97706;
      font-family: 'Inter', sans-serif;
    }

    .partner-url {
      font-size: 7pt;
      color: #0284c7;
      text-decoration: none;
    }

    /* REPORT BANNER */
    .report-banner {
      background: linear-gradient(135deg, #064E3B 0%, #04382A 100%);
      color: #ffffff;
      padding: 12px 16px;
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 18px;
      border-left: 6px solid #D97706;
    }

    .banner-title {
      font-size: 13pt;
      font-weight: 700;
      color: #ffffff;
      line-height: 1.3;
    }

    .banner-desc {
      font-size: 8.5pt;
      color: #e2e8f0;
      margin-top: 2px;
    }

    .banner-meta {
      text-align: right;
      font-size: 8.5pt;
      color: #fef08a;
      line-height: 1.4;
    }

    /* SECTIONS */
    .section {
      margin-bottom: 9px;
      page-break-inside: avoid;
    }

    .section-title {
      font-size: 11.5pt;
      font-weight: 700;
      color: #064E3B;
      border-bottom: 1.5px solid #e2e8f0;
      padding-bottom: 3px;
      margin-bottom: 7px;
      display: flex;
      align-items: center;
      gap: 7px;
    }

    .section-title span.num {
      background: #D97706;
      color: #ffffff;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 8.5pt;
      font-weight: 700;
    }

    p.lead-text {
      font-size: 9pt;
      color: #334155;
      text-align: justify;
      line-height: 1.5;
      margin-bottom: 8px;
    }

    /* TABLES */
    table.data-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 8px;
      font-size: 8pt;
    }

    table.data-table th {
      background: #064E3B;
      color: #ffffff;
      font-weight: 600;
      padding: 5px 8px;
      text-align: left;
      border: 1px solid #064E3B;
    }

    table.data-table td {
      padding: 4.5px 8px;
      border: 1px solid #e2e8f0;
      vertical-align: top;
    }

    table.data-table tr:nth-child(even) td {
      background: #f8fafc;
    }

    .status-done {
      display: inline-block;
      background: #dcfce7;
      color: #15803d;
      font-weight: 700;
      padding: 1.5px 6px;
      border-radius: 4px;
      font-size: 7pt;
      border: 1px solid #86efac;
      white-space: nowrap;
    }

    .status-pending {
      display: inline-block;
      background: #fef3c7;
      color: #b45309;
      font-weight: 700;
      padding: 1.5px 6px;
      border-radius: 4px;
      font-size: 7pt;
      border: 1px solid #fde68a;
      white-space: nowrap;
    }

    /* ROLE CARDS GRID */
    .role-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      margin-bottom: 8px;
    }

    .role-card {
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      background: #ffffff;
      padding: 8px;
      border-top: 3px solid #064E3B;
    }

    .role-card.lawyer {
      border-top-color: #D97706;
    }

    .role-card.admin {
      border-top-color: #0284c7;
    }

    .role-card h4 {
      font-size: 9pt;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 4px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .role-card ul {
      list-style-type: none;
      padding-left: 0;
    }

    .role-card li {
      font-size: 7.5pt;
      color: #334155;
      margin-bottom: 3px;
      line-height: 1.35;
      padding-left: 11px;
      position: relative;
    }

    .role-card li::before {
      content: "✓";
      color: #16a34a;
      font-weight: bold;
      position: absolute;
      left: 0;
    }

    /* PHOTO GALLERY */
    .land-gallery {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 7px;
      margin-bottom: 7px;
    }

    .land-item {
      border: 1px solid #cbd5e1;
      border-radius: 5px;
      overflow: hidden;
      background: #f8fafc;
    }

    .land-item img {
      width: 100%;
      height: 78px;
      object-fit: cover;
      display: block;
    }

    .land-caption {
      padding: 4px 6px;
    }

    .land-tag {
      display: inline-block;
      background: #dbeafe;
      color: #1e40af;
      font-size: 6.5pt;
      font-weight: 700;
      padding: 1px 4px;
      border-radius: 3px;
      margin-bottom: 2px;
    }

    .land-title {
      font-size: 7.5pt;
      font-weight: 700;
      color: #0f172a;
      line-height: 1.25;
    }

    .land-desc {
      font-size: 6.5pt;
      color: #64748b;
      margin-top: 1px;
      line-height: 1.25;
    }

    /* CALLOUT BOX */
    .callout-box {
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-left: 3.5px solid #16a34a;
      padding: 5px 9px;
      border-radius: 5px;
      font-size: 7.8pt;
      color: #166534;
      margin-bottom: 7px;
      line-height: 1.35;
    }

    .callout-box.info {
      background: #eff6ff;
      border-color: #bfdbfe;
      border-left-color: #2563eb;
      color: #1e40af;
    }

    /* SIGN-OFF BLOCK */
    .sign-off-block {
      margin-top: 14px;
      padding-top: 10px;
      border-top: 1px dashed #94a3b8;
      display: flex;
      justify-content: space-between;
      page-break-inside: avoid;
    }

    .sign-col {
      width: 30%;
      text-align: center;
    }

    .sign-line {
      border-bottom: 1px solid #475569;
      height: 28px;
      margin-bottom: 4px;
    }

    .sign-name {
      font-size: 8pt;
      font-weight: 700;
      color: #0f172a;
    }

    .sign-role {
      font-size: 7pt;
      color: #64748b;
    }

    .page-break {
      page-break-after: always;
    }
  </style>
</head>
<body>

<div class="report-container">

  <!-- HEADER -->
  <header class="header">
    <div class="header-left">
      ${logoBase64 ? `<img src="${logoBase64}" alt="Logo" class="header-logo" />` : ''}
      <div>
        <h1 class="org-title">নেকী ফাউন্ডেশন (Neki Foundation)</h1>
        <p class="org-subtitle">গণপ্রজাতন্ত্রী বাংলাদেশ সরকার কর্তৃক অনুমোদিত অলাভজনক সামাজিক উন্নয়ন সংস্থা</p>
        <p class="org-meta">
          সরকারি রেজি: নং: <strong>NF-BD-2026/0491</strong> | প্রধান কার্যালয়: <strong>বালুড়া, গদখালী, ঝিকরগাছা, যশোর</strong>
        </p>
      </div>
    </div>
    <div class="header-right">
      <div class="partner-badge">
        <div class="partner-label">কারিগরি সহায়তা ও উন্নয়নে</div>
        <div class="partner-name">CodeAstro</div>
        <a href="https://www.codeastro.dev" class="partner-url">www.codeastro.dev</a>
      </div>
    </div>
  </header>

  <!-- REPORT BANNER -->
  <div class="report-banner">
    <div>
      <div class="banner-title">প্রকল্প অগ্রগতি ও পূর্ণাঙ্গ বাস্তবায়ন স্ট্যাটাস রিপোর্ট</div>
      <div class="banner-desc">ডিজিটাল আইনী সেবা প্ল্যাটফর্ম, ৬৪ জেলা আইনজীবী ডিরেক্টরি ও প্রশাসনিক ম্যানেজমেন্ট সিস্টেম</div>
    </div>
    <div class="banner-meta">
      <div>তারিখ: <strong>২৮ অক্টোবর ২০২৬</strong></div>
      <div>ডকুমেন্ট আইডি: <strong>NF-REP-2026-OCT-01</strong></div>
      <div>বর্তমান সংস্করণ: <strong>১.০.৪ (রিলিজ ক্যান্ডিডেট)</strong></div>
    </div>
  </div>

  <!-- SECTION 1: EXECUTIVE SUMMARY -->
  <div class="section">
    <h2 class="section-title"><span class="num">১</span> নির্বাহী সারসংক্ষেপ (Executive Summary)</h2>
    <p class="lead-text">
      প্রস্তাবিত আইনী প্ল্যাটফর্মের মূল লক্ষ্য হলো বাংলাদেশের ৬৪ জেলার প্রান্তিক ও দুস্থ নাগরিকদের মাঝে বিনামূল্যে আইনী সেবা পৌঁছে দেওয়া, অভিজ্ঞ প্যানেল আইনজীবীদের সাথে সরাসরি সংযোগ তৈরি করা এবং স্বচ্ছ প্রশাসনিক জবাবদিহিতা নিশ্চিত করা। 
      নেকী ফাউন্ডেশনের প্রাতিষ্ঠানিক নির্দেশনানুযায়ী <strong>পাবলিক ওয়েবসাইট</strong>, <strong>সেবাগ্রহীতা ড্যাশবোর্ড</strong>, <strong>প্যানেল আইনজীবী পোর্টাল</strong> এবং <strong>সুপার এডমিন কন্ট্রোল সেন্টার</strong>—এই ৪টি মূল অংশের ফ্রন্টএন্ড ইন্টারফেস ও সম্পূর্ণ ক্লায়েন্ট-সাইড লজিক শতভাগ সফলভাবে বাস্তবায়ন করা হয়েছে।
    </p>
  </div>

  <!-- SECTION 2: COMPLETED WORK TABLE -->
  <div class="section">
    <h2 class="section-title"><span class="num">২</span> সম্পন্নকৃত কার্যাবলী ও ডেলিভারেবলস (Completed Deliverables)</h2>

    <table class="data-table">
      <thead>
        <tr>
          <th style="width: 25%;">পেজ ও মডিউল</th>
          <th style="width: 55%;">বাস্তবায়িত মূল ফিচারসমূহ</th>
          <th style="width: 20%; text-align: center;">স্ট্যাটাস</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>১. হোম পেজ (/)</strong></td>
          <td>হিরো সেকশন, ৬৪ জেলায় দ্রুত আইনজীবী সার্চ, লাইভ ট্র্যাকিং আইডি বার, ৪ মানবিক স্তম্ভ, ৮ বিভাগের ডিস্ট্রিক্ট এক্সপ্লোরার, <strong>ক্রয়কৃত নিজস্ব জমির এক্সক্লুসিভ গ্যালারি</strong>, অডিট অনুপাত (৮২% সরাসরি কেস খরচ), FAQ।</td>
          <td style="text-align: center;"><span class="status-done">✓ ১০০% সম্পন্ন</span></td>
        </tr>
        <tr>
          <td><strong>২. পরিচিতি (/about)</strong></td>
          <td>ফাউন্ডেশনের আত্মপরিচয়, সরকারি রেজিস্ট্রেশন, বালুড়ায় নিজস্ব ভূমি ও কমপ্লেক্স মাস্টারপ্ল্যান, পরিচালনা পর্ষদ ও মূল্যবোধ।</td>
          <td style="text-align: center;"><span class="status-done">✓ ১০০% সম্পন্ন</span></td>
        </tr>
        <tr>
          <td><strong>৩. সেবাসমূহ (/services)</strong></td>
          <td>আইনী সহায়তা, দেশব্যাপী বৃক্ষরোপণ, জরুরি রক্তদান এবং সামাজিক সুরক্ষা—৪টি প্রধান সেবার সচিত্র বিবরণ ও আবেদন প্রক্রিয়া।</td>
          <td style="text-align: center;"><span class="status-done">✓ ১০০% সম্পন্ন</span></td>
        </tr>
        <tr>
          <td><strong>৪. আইনী আবেদন (/legal-assistance)</strong></td>
          <td>স্বয়ংক্রিয় ফি ক্যালকুলেটর, মাল্টি-স্টেপ কেস সাবমিশন ফর্ম, তাৎক্ষণিক ইউনিক ট্র্যাকিং কোড (<code style="font-size:7.5pt">NF-LEG-2026-XXX</code>) জেনারেশন।</td>
          <td style="text-align: center;"><span class="status-done">✓ ১০০% সম্পন্ন</span></td>
        </tr>
        <tr>
          <td><strong>৫. আইনজীবী ডিরেক্টরি (/lawyers)</strong></td>
          <td>৬৪ জেলার অ্যাডভোকেট ডিরেক্টরি, প্র্যাকটিস ফিল্টার, বার সনদ ভেরিফাইড ব্যাজ, চেম্বার শিফট ও সরাসরি অ্যাপয়েন্টমেন্ট মডাল।</td>
          <td style="text-align: center;"><span class="status-done">✓ ১০০% সম্পন্ন</span></td>
        </tr>
        <tr>
          <td><strong>৬. সংবাদ ও স্বচ্ছতা নীতি</strong></td>
          <td>আইনী বুলেটিন, বার্ষিক অডিট রিপোর্ট, হিসাব নিরীক্ষা খতিয়ান এবং যোগাযোগ ও হেল্পডেস্ক পেজ।</td>
          <td style="text-align: center;"><span class="status-done">✓ ১০০% সম্পন্ন</span></td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- SECTION 3: 3 USER ROLES -->
  <div class="section">
    <h2 class="section-title"><span class="num">৩</span> ব্যবহারকারী রোলভিত্তিক পূর্ণাঙ্গ ড্যাশবোর্ড ও ওয়ার্কফ্লো (১০০% সম্পন্ন)</h2>
    <div class="role-grid">
      
      <!-- Role 1: Beneficiary -->
      <div class="role-card">
        <h4>১. সেবাগ্রহীতা (Beneficiary) <span class="status-done">১০০%</span></h4>
        <ul>
          <li><strong>লাইভ কেস ট্র্যাকার:</strong> ৫-ধাপের ভিজ্যুয়াল প্রোগ্রেস বার।</li>
          <li><strong>দায়িত্বপ্রাপ্ত আইনজীবী:</strong> নাম, বার সনদ ও পরবর্তী শুনানির ডেট।</li>
          <li><strong>নথিপত্র ভল্ট:</strong> NID ও মামলার পর্চা আপলোড ও স্ট্যাটাস।</li>
          <li><strong>মানি রিসিপ্ট মডাল:</strong> নেকী ফাউন্ডেশনের সরকারি সিল ও QR সম্বলিত অফিশিয়াল মানি রসিদ ডাউনলোড ও প্রিন্ট সুবিধা।</li>
          <li><strong>প্রোফাইল ও নোটিফিকেশন:</strong> বিকল্প ঠিকানা ও SMS অ্যালার্ট টগল।</li>
        </ul>
      </div>

      <!-- Role 2: Lawyer -->
      <div class="role-card lawyer">
        <h4>২. প্যানেল আইনজীবী (Lawyer) <span class="status-done">১০০%</span></h4>
        <ul>
          <li><strong>সনদ পরিচয়পত্র:</strong> যশোর বার সনদ নং ১৫৮২/২০০৮।</li>
          <li><strong>তাৎক্ষণিক সিদ্ধান্ত:</strong> মক্কেলের কেস এক ক্লিকে গ্রহণ/প্রত্যাখ্যান উইজেট।</li>
          <li><strong>কেস ডকেট ও নোট:</strong> শুনানির তারিখ ও ক্লায়েন্ট পরামর্শ আপডেট।</li>
          <li><strong>ক্যালেন্ডার ও অটো SMS:</strong> শুনানির ২৪ ঘণ্টা আগে মক্কেলকে স্বয়ংক্রিয় এসএমএস অ্যালার্ট পাঠানোর কনফিগারেশন।</li>
          <li><strong>প্রোফাইল এডিটর:</strong> লাইভ পাবলিক ডিরেক্টরি কার্ড প্রিভিউ।</li>
        </ul>
      </div>

      <!-- Role 3: Admin -->
      <div class="role-card admin">
        <h4>৩. সুপার এডমিন (Super Admin) <span class="status-done">১০০%</span></h4>
        <ul>
          <li><strong>কেন্দ্রীয় অনুমোদন:</strong> নতুন আইনজীবীদের সনদ যাচাই ও অ্যাপ্রুভাল।</li>
          <li><strong>ইউজার কন্ট্রোল:</strong> অ্যাকাউন্ট স্থগিত/সক্রিয়করণ ও মনিটরিং।</li>
          <li><strong>কনটেন্ট ম্যানেজমেন্ট (CMS):</strong> নিউজ, FAQ ও নোটিশ এডিটর।</li>
          <li><strong>৬৪ জেলা CSV এক্সপোর্ট:</strong> বাংলা ফন্ট সাপোর্টেড ডেটা এক্সপোর্ট ও সিলযুক্ত প্রিন্টযোগ্য এক্সিকিউটিভ রিপোর্ট।</li>
          <li><strong>সিস্টেম অডিট ও গেটওয়ে:</strong> অপরিবর্তনীয় অডিট লগ, bKash ও SMS সুইচ।</li>
        </ul>
      </div>

    </div>
  </div>

  <!-- SECTION 4: PURCHASED LAND SHOWCASE -->
  <div class="section">
    <h2 class="section-title"><span class="num">৪</span> নেকী ফাউন্ডেশনের ক্রয়কৃত নিজস্ব ভূমি ও সেবা কমপ্লেক্স (সচিত্র বিবরণী)</h2>
    <div class="callout-box">
      <strong>যশোর জেলার বালুড়ায় স্থায়ী নিজস্ব ঠিকানা:</strong> ফাউন্ডেশনের সুদূরপ্রসারী সেবা নিশ্চিত করতে যশোরের ঝিকরগাছা উপজেলার বালুড়ায় নিজস্ব অর্থায়নে জমি ক্রয় সম্পন্ন হয়েছে। এখানে গড়ে উঠছে স্থায়ী আইনী পরামর্শ কেন্দ্র, বৃক্ষরোপণ নার্সারি এবং সার্বক্ষণিক মানবিক সেবা হাব।
    </div>

    <div class="land-gallery">
      <div class="land-item">
        ${land1Base64 ? `<img src="${land1Base64}" alt="জমি ক্রয় সম্পন্ন" />` : ''}
        <div class="land-caption">
          <span class="land-tag">জমি ক্রয় সম্পন্ন</span>
          <div class="land-title">স্থায়ী কার্যালয় ও কমপ্লেক্স ভূমি</div>
          <div class="land-desc">বালুড়া, গদখালী, ঝিকরগাছা, যশোর। সীমানা নির্ধারণ ও প্রাথমিক উন্নয়ন সম্পন্ন।</div>
        </div>
      </div>

      <div class="land-item">
        ${land2Base64 ? `<img src="${land2Base64}" alt="প্রাথমিক অবকাঠামো" />` : ''}
        <div class="land-caption">
          <span class="land-tag">প্রাথমিক অবকাঠামো</span>
          <div class="land-title">মাঠ সমন্বয় কেন্দ্র ও চেম্বার শেড</div>
          <div class="land-desc">সেবাগ্রহীতাদের আবেদন গ্রহণ ও ফিল্ড পর্যায়ে কার্যক্রম পরিচালনার প্রাথমিক কার্যালয়।</div>
        </div>
      </div>

      <div class="land-item">
        ${land3Base64 ? `<img src="${land3Base64}" alt="উন্নয়ন চলমান" />` : ''}
        <div class="land-caption">
          <span class="land-tag">উন্নয়ন কার্যক্রম চলমান</span>
          <div class="land-title">ভিটা উন্নয়ন ও মাটি ভরাট কাজ</div>
          <div class="land-desc">স্থায়ী পাকা সেবা কমপ্লেক্স ও সেন্ট্রাল নার্সারি নির্মাণের লক্ষ্যে ভূমি প্রস্তুতি চলমান।</div>
        </div>
      </div>
    </div>
  </div>

  <!-- SECTION 5: DESIGN & UX POLISHING -->
  <div class="section">
    <h2 class="section-title"><span class="num">৫</span> ডিজাইন, ব্র্যান্ডিং ও প্রযুক্তিগত সমাধান (১০০% সম্পন্ন)</h2>
    <table class="data-table">
      <thead>
        <tr>
          <th style="width: 30%;">বিষয় / সমস্যা</th>
          <th style="width: 55%;">প্রযুক্তিক সমাধান</th>
          <th style="width: 15%; text-align: center;">ফলাফল</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>বাংলা টাইটেল ওভারল্যাপিং</strong></td>
          <td>বাংলা ফন্টের কার-চিহ্ন ও মাত্রার উচ্চতা সমন্বয় করে গ্লোবাল <code style="font-size:7.5pt">line-height: 1.45</code> এবং টাইটেলের মাঝে সুষম মার্জিন কন্টেইনার যুক্ত করা হয়েছে।</td>
          <td style="text-align: center;"><span class="status-done">✓ সমাধানকৃত</span></td>
        </tr>
        <tr>
          <td><strong>পেজ স্ক্রল নিচ থেকে শুরু হওয়া</strong></td>
          <td>রাউটার লেভেলে ডেডিকেটেড <code style="font-size:7.5pt">ScrollToTop</code> কম্পোনেন্ট স্থাপন করা হয়েছে। লিংকে ক্লিক করার সাথে সাথে স্ক্রল উপরে চলে যায়।</td>
          <td style="text-align: center;"><span class="status-done">✓ সমাধানকৃত</span></td>
        </tr>
        <tr>
          <td><strong>ডেমো টেক্সট ও ব্র্যান্ডিং</strong></td>
          <td>কোডবেসের সমস্ত 'ডেমো' টেক্সট অপসারণ করে নেকী ফাউন্ডেশনের সরকারি তথ্য ও ডিপ এমারেল্ড এবং গোল্ড থিম প্রয়োগ করা হয়েছে।</td>
          <td style="text-align: center;"><span class="status-done">✓ সমাধানকৃত</span></td>
        </tr>
        <tr>
          <td><strong>ফুটার ক্রেডিট আপডেট</strong></td>
          <td>ফুটারের অপ্রয়োজনীয় টেক্সট সরিয়ে আনুষ্ঠানিকভাবে <strong>কারিগরি সহায়তা ও উন্নয়নে: CodeAstro (www.codeastro.dev)</strong> সংযুক্ত করা হয়েছে।</td>
          <td style="text-align: center;"><span class="status-done">✓ সমাধানকৃত</span></td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- SECTION 6: REMAINING WORK / FUTURE PHASES -->
  <div class="section">
    <h2 class="section-title"><span class="num">৬</span> অবশিষ্ট কারিগরি কাজসমূহ (পরবর্তী ব্যাকএন্ড ও ডেপ্লয়মেন্ট ফেজ)</h2>
    <div class="callout-box info">
      <strong>প্রস্তুত ভিত্তি:</strong> ফ্রন্টএন্ডে সম্পূর্ণ মক ও সার্ভিস লেয়ার অ্যাবস্ট্রাকশন তৈরি থাকায় ব্যাকএন্ড তৈরি হওয়ামাত্রই খুব সহজে কোনো ফ্রন্টএন্ড রি-ডিজাইন ছাড়াই সিস্টেমটি লাইভ হয়ে যাবে।
    </div>

    <table class="data-table">
      <thead>
        <tr>
          <th style="width: 30%;">পরবর্তী ধাপ</th>
          <th style="width: 55%;">প্রয়োজনীয় প্রযুক্তি ও কার্যক্রম</th>
          <th style="width: 15%; text-align: center;">স্ট্যাটাস</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>১. জ্যাঙ্গো ব্যাকএন্ড ও PostgreSQL</strong></td>
          <td>Python Django REST Framework প্রজেক্ট গঠন, ডাটাবেস স্কিমা তৈরি (<code style="font-size:7.5pt">User</code>, <code style="font-size:7.5pt">LawyerProfile</code>, <code style="font-size:7.5pt">LegalAidRequest</code>) এবং এন্ডপয়েন্ট কানেকশন।</td>
          <td style="text-align: center;"><span class="status-pending">পরবর্তী ধাপ</span></td>
        </tr>
        <tr>
          <td><strong>২. লাইভ bKash ও SMS গেটওয়ে</strong></td>
          <td>ফাউন্ডেশনের লাইভ bKash মার্চেন্ট অ্যাকাউন্ট ক্রেডেনশিয়াল এবং বাল্ক এসএমএস গেটওয়ে API ইন্টিগ্রেশন।</td>
          <td style="text-align: center;"><span class="status-pending">ক্রেডেনশিয়াল সাপেক্ষ</span></td>
        </tr>
        <tr>
          <td><strong>৩. লাইভ ডোমেইন ও SSL হোস্টিং</strong></td>
          <td>ফাউন্ডেশনের নিজস্ব ডোমেইনে (যেমন: <code style="font-size:7.5pt">nekifoundation.org</code>) ক্লাউড হোস্টিং পয়েন্ট করা এবং SSL/HTTPS স্থাপন।</td>
          <td style="text-align: center;"><span class="status-pending">চূড়ান্ত ফেজ</span></td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- SECTION 7: SUMMARY SCORECARD -->
  <div class="section">
    <h2 class="section-title"><span class="num">৭</span> প্রকল্পের অগ্রগতি স্কোরকার্ড (Progress Scorecard)</h2>
    <table class="data-table" style="font-size: 8pt;">
      <thead>
        <tr>
          <th>ক্যাটাগরি</th>
          <th style="text-align: center;">অগ্রগতি হার</th>
          <th style="text-align: center;">স্ট্যাটাস</th>
          <th>মন্তব্য</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>পাবলিক ওয়েবসাইট ও ৭টি প্রধান পেজ</strong></td>
          <td style="text-align: center; font-weight: bold; color: #15803d;">১০০%</td>
          <td style="text-align: center;"><span class="status-done">সম্পন্ন</span></td>
          <td>ফুল রেসপনসিভ ও প্রোডাকশন রেডি</td>
        </tr>
        <tr>
          <td><strong>সেবাগ্রহীতা, আইনজীবী ও এডমিন ড্যাশবোর্ড</strong></td>
          <td style="text-align: center; font-weight: bold; color: #15803d;">১০০%</td>
          <td style="text-align: center;"><span class="status-done">সম্পন্ন</span></td>
          <td>৩টি রোলের পূর্ণাঙ্গ ইন্টারফেস ও ওয়ার্কফ্লো সক্রিয়</td>
        </tr>
        <tr>
          <td><strong>ব্র্যান্ডিং, জমি গ্যালারি ও টেক্সট ফিক্স</strong></td>
          <td style="text-align: center; font-weight: bold; color: #15803d;">১০০%</td>
          <td style="text-align: center;"><span class="status-done">সম্পন্ন</span></td>
          <td>কোনো ওভারল্যাপিং নেই, ৩টি বাস্তব ছবি সংযুক্ত</td>
        </tr>
        <tr>
          <td><strong>জ্যাঙ্গো ব্যাকএন্ড ও ডাটাবেস</strong></td>
          <td style="text-align: center; font-weight: bold; color: #b45309;">০%</td>
          <td style="text-align: center;"><span class="status-pending">বাকি</span></td>
          <td>পরবর্তী ইঞ্জিনিয়ারিং ফেজ</td>
        </tr>
        <tr>
          <td><strong>লাইভ পেমেন্ট ও এসএমএস গেটওয়ে</strong></td>
          <td style="text-align: center; font-weight: bold; color: #b45309;">০%</td>
          <td style="text-align: center;"><span class="status-pending">বাকি</span></td>
          <td>ফাউন্ডেশনের লাইভ API কি পাওয়ার পর সম্পন্ন হবে</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- SIGN-OFF BLOCK -->
  <div class="sign-off-block">
    <div class="sign-col">
      <div class="sign-line"></div>
      <div class="sign-name">ইঞ্জিনিয়ারিং টিম প্রধান</div>
      <div class="sign-role">CodeAstro (কারিগরি সহযোগী)</div>
    </div>
    <div class="sign-col">
      <div class="sign-line"></div>
      <div class="sign-name">প্যানেল সমন্বয়কারী</div>
      <div class="sign-role">আইন ও সালিশ বিভাগ, নেকী ফাউন্ডেশন</div>
    </div>
    <div class="sign-col">
      <div class="sign-line"></div>
      <div class="sign-name">নির্বাহী পরিচালক / সাধারণ সম্পাদক</div>
      <div class="sign-role">নেকী ফাউন্ডেশন (কেন্দ্রীয় কমিটি)</div>
    </div>
  </div>

</div>

</body>
</html>
`;

// Write the complete standalone HTML
const htmlFilePath = path.join(docsDir, 'report_preview.html');
fs.writeFileSync(htmlFilePath, htmlContent, 'utf8');
console.log('HTML report written to:', htmlFilePath);

// Find browser
const browsers = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
];

let browserPath = null;
for (const b of browsers) {
  if (fs.existsSync(b)) {
    browserPath = b;
    break;
  }
}

if (!browserPath) {
  console.error('No suitable browser found for PDF printing.');
  process.exit(1);
}

const tmpUserDataDir = path.join(rootDir, 'scripts', 'tmp_pdf_user_data');
if (!fs.existsSync(tmpUserDataDir)) fs.mkdirSync(tmpUserDataDir, { recursive: true });

const outputPdf1 = path.join(rootDir, 'Neki_Foundation_Project_Status_Report.pdf');
const outputPdf2 = path.join(docsDir, 'Neki_Foundation_Project_Status_Report.pdf');
const artifactsDir = 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\2312807c-b478-4dac-a376-0521a9339c60';
const outputPdfArtifact = path.join(artifactsDir, 'Neki_Foundation_Project_Status_Report.pdf');

const printArgs = [
  '--headless=new',
  '--no-sandbox',
  '--disable-gpu',
  '--disable-crash-reporter',
  '--disable-breakpad',
  '--disable-dev-shm-usage',
  `--user-data-dir=${tmpUserDataDir}`,
  '--no-pdf-header-footer',
  `--print-to-pdf=${outputPdf1}`,
  htmlFilePath
];

try {
  console.log('Launching headless browser to compile PDF...');
  execFileSync(browserPath, printArgs, { stdio: 'inherit' });
  
  if (fs.existsSync(outputPdf1)) {
    const size = fs.statSync(outputPdf1).size;
    console.log(`PDF successfully created at ${outputPdf1} (${(size / 1024).toFixed(1)} KB)`);
    
    // Copy to public/docs and artifacts dir
    fs.copyFileSync(outputPdf1, outputPdf2);
    console.log(`PDF copied to public web docs: ${outputPdf2}`);
    
    if (fs.existsSync(artifactsDir)) {
      fs.copyFileSync(outputPdf1, outputPdfArtifact);
      console.log(`PDF copied to conversation artifacts: ${outputPdfArtifact}`);
    }
  } else {
    console.error('PDF file was not created.');
    process.exit(1);
  }
} catch (err) {
  console.error('Error generating PDF:', err.message);
  process.exit(1);
} finally {
  // Clean up test files if any
  try {
    const testPdf = path.join(rootDir, 'scripts', 'test.pdf');
    const testHtml = path.join(rootDir, 'scripts', 'test.html');
    if (fs.existsSync(testPdf)) fs.unlinkSync(testPdf);
    if (fs.existsSync(testHtml)) fs.unlinkSync(testHtml);
  } catch (e) {}
}
