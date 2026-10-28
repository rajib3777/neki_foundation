const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

console.log('Testing browser PDF generator...');

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

console.log('Found browser:', browserPath);

const tmpDir = path.resolve(__dirname, 'tmp_browser_data');
if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);

const testHtml = path.resolve(__dirname, 'test.html');
const testPdf = path.resolve(__dirname, 'test.pdf');
fs.writeFileSync(testHtml, '<html><body><h1>নেকী ফাউন্ডেশন টেস্ট</h1><p>বাংলা টেক্সট ও PDF টেস্ট</p></body></html>', 'utf8');

const args = [
  '--headless=new',
  '--no-sandbox',
  '--disable-gpu',
  '--disable-crash-reporter',
  '--disable-breakpad',
  '--disable-dev-shm-usage',
  `--user-data-dir=${tmpDir}`,
  '--no-pdf-header-footer',
  `--print-to-pdf=${testPdf}`,
  testHtml
];

try {
  execFileSync(browserPath, args, { stdio: 'inherit' });
  console.log('PDF generated successfully!');
  if (fs.existsSync(testPdf)) {
    console.log('PDF file size:', fs.statSync(testPdf).size, 'bytes');
  }
} catch (err) {
  console.error('Error generating PDF with chrome:', err.message);
}
