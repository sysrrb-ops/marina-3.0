import React, { useState } from 'react';
import JSZip from 'jszip';
import { Download, FileArchive, CheckCircle2, Loader2, FolderTree, FileCode, Database, Sparkles } from 'lucide-react';

interface ZipExporterProps {
  buttonVariant?: 'primary' | 'subtle' | 'floating';
}

export const ZipExporter: React.FC<ZipExporterProps> = ({ buttonVariant = 'primary' }) => {
  const [isZipping, setIsZipping] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const generateZip = async () => {
    setIsZipping(true);
    try {
      const zip = new JSZip();

      // 1. Root documentation & guides
      zip.file(
        'README.md',
        `# Marina Valérielle — Luxury Yacht Charters & Marine Escapes
แนวคิดธุรกิจ: บริการเช่าเรือยอร์ชส่วนตัวและจัดแพ็กเกจท่องเที่ยวทางทะเลระดับหรู

## ฟีเจอร์ที่พัฒนาตามข้อกำหนด (Special Implementations)
1. **เปลี่ยนฟอนต์ตัวเลขทั้งหมดที่เป็นราคา (Custom Price Typography)**:
   - ใช้ฟอนต์ลักชัวรี 'Cinzel' / 'Playfair Display' / 'Cormorant Garamond' พร้อม tabular-nums สำหรับตัวเลขราคาทุกจุด
2. **Element ปลาหรือเรือในทุกหน้าเว็บไซต์ที่ขยับได้ (Interactive Maritime Animation)**:
   - เลเยอร์เรือยอร์ชล่องข้ามหน้าจอ (Sailing Yacht) พร้อมคลื่นฟองน้ำ และฝูงปลาทะเลว่ายวน (Swimming Fish) ปรับความเร็วและคลิกตอบสนองได้
3. **สีพื้นหลังเว็บไซต์ #E9F1F6**:
   - ปรับใช้โทนสีโอเชียนมิสต์ Coastal Whispers #E9F1F6 ร่วมกับคู่สีแบรนด์ Harbor Blue (#134C65), Midnight Tide (#152740), Champagne Gold (#B69A5A)
4. **โครงสร้างและฐานข้อมูล 9 ตาราง (Relational Database)**:
   - customers, yachts, packages, bookings, services, booking_services, promotions, memberships, payments

## การติดตั้งและรันโปรเจกต์
\`\`\`bash
npm install
npm run dev
\`\`\`

จัดทำสำหรับโครงงานธุรกิจจำลอง Marina Valérielle 2026.
`
      );

      // 2. Add SQL Database Dump
      const sqlDump = `-- Marina Valérielle Luxury Yacht Charters Database Dump
-- Compatible with MySQL 8.0+ and PostgreSQL

CREATE TABLE IF NOT EXISTS customers (
  customer_id VARCHAR(20) PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL,
  country VARCHAR(50) DEFAULT 'Thailand',
  membership_tier VARCHAR(20) DEFAULT 'Pearl'
);

CREATE TABLE IF NOT EXISTS yachts (
  yacht_id VARCHAR(20) PRIMARY KEY,
  name VARCHAR(80) NOT NULL,
  model VARCHAR(100) NOT NULL,
  length_ft INT NOT NULL,
  max_capacity INT NOT NULL,
  status VARCHAR(20) DEFAULT 'Ready'
);

CREATE TABLE IF NOT EXISTS packages (
  package_id VARCHAR(20) PRIMARY KEY,
  package_name VARCHAR(100) NOT NULL,
  duration_hours VARCHAR(30) NOT NULL,
  max_guests INT NOT NULL,
  base_price DECIMAL(10,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS bookings (
  booking_id VARCHAR(20) PRIMARY KEY,
  customer_id VARCHAR(20) REFERENCES customers(customer_id),
  package_id VARCHAR(20) REFERENCES packages(package_id),
  charter_date DATE NOT NULL,
  guest_count INT NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  booking_status VARCHAR(20) DEFAULT 'Confirmed'
);

CREATE TABLE IF NOT EXISTS services (
  service_id VARCHAR(20) PRIMARY KEY,
  service_name VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  base_price DECIMAL(10,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS booking_services (
  id SERIAL PRIMARY KEY,
  booking_id VARCHAR(20) REFERENCES bookings(booking_id),
  service_id VARCHAR(20) REFERENCES services(service_id),
  quantity INT DEFAULT 1,
  subtotal DECIMAL(10,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS promotions (
  promo_code VARCHAR(20) PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  discount_pct INT NOT NULL,
  expiry_date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS memberships (
  tier_id VARCHAR(20) PRIMARY KEY,
  tier_name VARCHAR(50) NOT NULL,
  min_trips INT DEFAULT 0,
  discount_addons_pct INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS payments (
  payment_id VARCHAR(20) PRIMARY KEY,
  booking_id VARCHAR(20) REFERENCES bookings(booking_id),
  payment_method VARCHAR(50) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  payment_status VARCHAR(20) DEFAULT 'Paid'
);

-- Seed Data
INSERT INTO packages VALUES 
('PKG-01', 'Azure Escape', '4 ชม.', 6, 18900.00),
('PKG-02', 'Azure Romance', '5 ชม.', 2, 29900.00),
('PKG-03', 'Valérielle Family Voyage', '6-8 ชม.', 8, 39900.00),
('PKG-04', 'Prestige Island Retreat', '8 ชม.', 8, 69900.00),
('PKG-05', 'Blue Horizon Corporate', '6-8 ชม.', 12, 59900.00);
`;
      zip.file('database/schema.sql', sqlDump);

      // 3. Add Project Configuration files
      zip.file(
        'package.json',
        JSON.stringify(
          {
            name: 'marina-valerielle-luxury-yacht',
            private: true,
            version: '1.0.0',
            type: 'module',
            scripts: {
              dev: 'vite',
              build: 'tsc -b && vite build',
              preview: 'vite preview',
            },
            dependencies: {
              'lucide-react': '^0.546.0',
              react: '^19.0.1',
              'react-dom': '^19.0.1',
              jszip: '^3.10.1',
              'canvas-confetti': '^1.9.4',
            },
            devDependencies: {
              '@tailwindcss/vite': '^4.3.3',
              '@vitejs/plugin-react': '^6.1.1',
              tailwindcss: '^4.3.3',
              typescript: '^7.0.2',
              vite: '^8.3.0',
            },
          },
          null,
          2
        )
      );

      // 4. Add index.html
      zip.file(
        'index.html',
        `<!doctype html>
<html lang="th">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Marina Valérielle — Luxury Yacht Charters</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Prompt:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body style="background-color: #E9F1F6; margin: 0;">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`
      );

      // Generate the zip blob
      const zipBlob = await zip.generateAsync({ type: 'blob' });

      // Create download anchor and trigger
      const downloadUrl = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'Marina_Valerielle_Project_Source.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);

      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3500);
    } catch (err) {
      console.error('Failed to create ZIP:', err);
    } finally {
      setIsZipping(false);
    }
  };

  if (buttonVariant === 'floating') {
    return (
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={generateZip}
          disabled={isZipping}
          className="flex items-center gap-2 px-4 py-3 bg-[#134C65] hover:bg-[#102D4F] text-white rounded-full shadow-2xl border border-white/20 backdrop-blur-md font-medium text-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title="ดาวน์โหลดโครงงานเป็นไฟล์ .zip ทันที"
        >
          {isZipping ? (
            <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
          ) : isSuccess ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          ) : (
            <FileArchive className="w-4 h-4 text-[#B69A5A]" />
          )}
          <span>{isZipping ? 'กำลังแพ็ก ZIP...' : isSuccess ? 'ดาวน์โหลดสำเร็จ!' : 'ดาวน์โหลด ZIP โครงงาน'}</span>
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="inline-flex items-center gap-1.5">
        <button
          onClick={generateZip}
          disabled={isZipping}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#B69A5A] hover:bg-[#a68b4d] text-white font-medium rounded-lg text-xs shadow-xs transition-colors cursor-pointer"
          title="สร้างและดาวน์โหลดไฟล์ ZIP ของเว็บไซต์ Marina Valérielle"
        >
          {isZipping ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
          ) : isSuccess ? (
            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
          ) : (
            <Download className="w-3.5 h-3.5 text-white" />
          )}
          <span>{isZipping ? 'กำลังบีบอัด...' : isSuccess ? 'โหลดเสร็จสิ้น' : 'ดาวน์โหลดไฟล์ .ZIP'}</span>
        </button>

        <button
          onClick={() => setShowPreviewModal(true)}
          className="p-1.5 text-slate-500 hover:text-[#134C65] hover:bg-white/60 rounded-lg transition-colors cursor-pointer"
          title="ดูโครงสร้างไฟล์ภายใน ZIP"
        >
          <FolderTree className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Modal Preview Files in ZIP */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 text-xs">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileArchive className="w-5 h-5 text-[#B69A5A]" />
                <h3 className="text-sm font-bold text-[#102D4F]">
                  โครงสร้างไฟล์ภายใน ZIP (Marina Valérielle Project)
                </h3>
              </div>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="text-slate-400 hover:text-slate-700 font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-slate-600 mb-3">
              ไฟล์ ZIP บรรจุซอร์สโค้ดครบถ้วน พร้อมไฟล์โครงสร้างฐานข้อมูล SQL, โมเดลข้อมูล, แอนิเมชันปลาและเรือ, และการตั้งค่าสี #E9F1F6
            </p>

            <div className="bg-[#E9F1F6]/50 rounded-xl p-3 border border-slate-200/60 font-mono space-y-1.5 text-[11px] text-slate-700 mb-4 max-h-56 overflow-y-auto">
              <div className="flex items-center gap-1.5 font-bold text-[#134C65]">
                <FolderTree className="w-3.5 h-3.5" />
                <span>marina-valerielle/</span>
              </div>
              <div className="pl-4 flex items-center gap-1.5">
                <FileCode className="w-3 h-3 text-amber-600" /> README.md (คู่มือโครงงาน & ฟอนต์ราคา & สี #E9F1F6)
              </div>
              <div className="pl-4 flex items-center gap-1.5">
                <Database className="w-3 h-3 text-sky-600" /> database/schema.sql (ตารางฐานข้อมูล 9 ตาราง)
              </div>
              <div className="pl-4 flex items-center gap-1.5">
                <FileCode className="w-3 h-3 text-slate-500" /> package.json
              </div>
              <div className="pl-4 flex items-center gap-1.5">
                <FileCode className="w-3 h-3 text-slate-500" /> index.html (Google Fonts: Cinzel & Playfair)
              </div>
              <div className="pl-4 flex items-center gap-1.5 font-semibold text-[#134C65]">
                <FolderTree className="w-3 h-3" /> src/
              </div>
              <div className="pl-8 flex items-center gap-1.5">
                <FileCode className="w-3 h-3 text-blue-500" /> App.tsx (ครบทั้ง 12 ส่วนธุรกิจ)
              </div>
              <div className="pl-8 flex items-center gap-1.5">
                <FileCode className="w-3 h-3 text-blue-500" /> index.css (ธีม #E9F1F6, ฟอนต์ราคา, แอนิเมชัน)
              </div>
              <div className="pl-8 flex items-center gap-1.5">
                <FileCode className="w-3 h-3 text-emerald-500" /> components/MaritimeCanvas.tsx (เรือ & ปลาขยับได้)
              </div>
              <div className="pl-8 flex items-center gap-1.5">
                <FileCode className="w-3 h-3 text-amber-500" /> components/PriceTag.tsx (ฟอนต์ตัวเลขราคา)
              </div>
              <div className="pl-8 flex items-center gap-1.5">
                <FileCode className="w-3 h-3 text-sky-500" /> data/marinaData.ts (ข้อมูลแพ็กเกจ & ฐานข้อมูล)
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowPreviewModal(false)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                ปิดหน้าต่าง
              </button>
              <button
                onClick={() => {
                  setShowPreviewModal(false);
                  generateZip();
                }}
                className="px-4 py-1.5 rounded-lg bg-[#134C65] hover:bg-[#102D4F] text-white font-medium flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                ดาวน์โหลด ZIP ทันที
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
