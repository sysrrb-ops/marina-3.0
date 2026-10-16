import React, { useState, useEffect } from 'react';
import {
  Anchor,
  Compass,
  Ship,
  Sparkles,
  Heart,
  Users,
  Briefcase,
  Globe,
  Crown,
  Calendar,
  Clock,
  Shield,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  ChevronRight,
  Database,
  Type,
  FileArchive,
  Waves,
  Award,
  ArrowUpRight
} from 'lucide-react';
import {
  YACHTS_FLEET,
  TOUR_PACKAGES,
  ADD_ON_SERVICES,
  PROMOTIONS,
  MEMBERSHIP_TIERS,
  TARGET_AUDIENCES
} from './data/marinaData';
import { MaritimeCanvas, MaritimeMode } from './components/MaritimeCanvas';
import { PriceTag, PriceFontOption, PRICE_FONT_OPTIONS } from './components/PriceTag';
import { ZipExporter } from './components/ZipExporter';
import { BookingModal } from './components/BookingModal';
import { DatabaseViewer } from './components/DatabaseViewer';

export default function App() {
  // Navigation active tab
  const [activeSection, setActiveSection] = useState<string>('home');

  // Price Font Preference (Default to Cinzel Luxury Serif Numeral)
  const [activePriceFont, setActivePriceFont] = useState<PriceFontOption>('cinzel');

  // Maritime Mode (Yacht, Fish, Both)
  const [maritimeMode, setMaritimeMode] = useState<MaritimeMode>('both');

  // Booking Modal State
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [selectedBookingPkgId, setSelectedBookingPkgId] = useState<string | undefined>(undefined);

  // Active Membership Tab in loyalty section
  const [selectedMembershipTier, setSelectedMembershipTier] = useState<string>('mem-royalblue');

  // Update CSS custom variable when price font changes
  useEffect(() => {
    const fontObj = PRICE_FONT_OPTIONS.find(f => f.id === activePriceFont);
    if (fontObj) {
      document.documentElement.style.setProperty('--price-font-family', fontObj.fontFamily);
    }
  }, [activePriceFont]);

  const openBookingFor = (pkgId?: string) => {
    setSelectedBookingPkgId(pkgId);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen text-[#152740] relative selection:bg-[#B69A5A]/30 selection:text-[#102D4F]" style={{ backgroundColor: '#E9F1F6' }}>
      {/* 
        Mandatory Moving Maritime Element on EVERY page:
        Floating sailing luxury yacht + swimming school of tropical fish 
      */}
      <MaritimeCanvas mode={maritimeMode} onModeChange={setMaritimeMode} />

      {/* Top Banner: Price Font Switcher & Color Indicator */}
      <div className="bg-[#102D4F] text-white py-1.5 px-4 text-xs border-b border-[#134C65]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B69A5A] animate-pulse"></span>
            <span className="text-[11px] font-medium text-slate-300">
              ธีมสี Coastal Whispers <span className="font-mono text-[#D8F0F5]">#E9F1F6</span> · เรือ & ฝูงปลาขยับได้ทุกหน้า
            </span>
          </div>

          {/* Interactive Price Font Selector */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-300 hidden sm:inline flex items-center gap-1">
              <Type className="w-3 h-3 text-[#B69A5A]" /> ฟอนต์ตัวเลขราคา:
            </span>
            <div className="flex items-center bg-[#134C65] rounded-md p-0.5 border border-white/10">
              {PRICE_FONT_OPTIONS.map(font => (
                <button
                  key={font.id}
                  onClick={() => setActivePriceFont(font.id)}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                    activePriceFont === font.id
                      ? 'bg-[#B69A5A] text-white shadow-xs font-semibold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                  title={font.description}
                >
                  {font.name.split(' ')[0]}
                </button>
              ))}
            </div>
            <ZipExporter buttonVariant="subtle" />
          </div>
        </div>
      </div>

      {/* Top Bar Contract (1 Line Wordmark — 4-5 Clean Nav Links — 1 Primary Action) */}
      <header className="sticky top-0 z-30 bg-[#E9F1F6]/90 backdrop-blur-md border-b border-[#134C65]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Single Text Element Wordmark */}
          <a
            href="#home"
            onClick={e => {
              e.preventDefault();
              setActiveSection('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 text-[#102D4F] whitespace-nowrap shrink-0 group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#134C65] to-[#102D4F] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Anchor className="w-5 h-5 text-[#B69A5A]" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold tracking-tight font-serif text-[#102D4F]">
                Marina Valérielle
              </span>
              <span className="text-[9px] tracking-[0.25em] text-[#487F86] uppercase font-semibold">
                Luxury Yacht Charters
              </span>
            </div>
          </a>

          {/* Zone 2: 5 Nav Links (Single-line whitespace-nowrap) */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold tracking-wide text-slate-700">
            <button
              onClick={() => {
                setActiveSection('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`hover:text-[#134C65] transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer ${
                activeSection === 'home' ? 'text-[#134C65] font-bold border-b-2 border-[#B69A5A]' : ''
              }`}
            >
              หน้าแรก (Home)
            </button>
            <button
              onClick={() => {
                setActiveSection('packages');
                document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-[#134C65] transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer"
            >
              แพ็กเกจ (Packages)
            </button>
            <button
              onClick={() => {
                setActiveSection('experiences');
                document.getElementById('experiences')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-[#134C65] transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer"
            >
              กิจกรรม & บริการเสริม
            </button>
            <button
              onClick={() => {
                setActiveSection('promotions');
                document.getElementById('promotions')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-[#134C65] transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer"
            >
              โปรโมชั่น (Promotions)
            </button>
            <button
              onClick={() => {
                setActiveSection('membership');
                document.getElementById('membership')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-[#134C65] transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer"
            >
              ระบบสมาชิก (Privilege)
            </button>
            <button
              onClick={() => {
                setActiveSection('database');
                document.getElementById('database')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-[#134C65] transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer text-[#487F86]"
            >
              ฐานข้อมูล (Database)
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => openBookingFor()}
              className="px-5 py-2.5 text-xs font-bold tracking-wide text-white bg-gradient-to-r from-[#134C65] to-[#102D4F] hover:from-[#102D4F] hover:to-[#0B1E38] rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-2"
            >
              <Ship className="w-4 h-4 text-[#B69A5A]" />
              <span>จองเรือยอร์ชส่วนตัว</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-20 relative z-20">
        {/* HERO SECTION */}
        <section id="home" className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Proposition */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#134C65] uppercase">
                <Compass className="w-4 h-4 text-[#B69A5A]" />
                <span>Marina Valérielle · Private Yacht Experiences</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-[#102D4F] tracking-tight leading-[1.15] text-balance">
                Discover Your Perfect Escape
              </h1>

              <p className="text-base sm:text-lg text-slate-700 font-normal leading-relaxed text-balance">
                สัมผัสความหรูหรากลางท้องทะเลสีฟ้าคราม กับประสบการณ์ล่องเรือยอร์ชส่วนตัวที่ออกแบบเพื่อคุณโดยเฉพาะ ภายใต้แนวคิด 
                <span className="font-semibold text-[#134C65]"> “Your Ocean, Your Moment”</span> — ให้ทุกช่วงเวลาบนท้องทะเลเป็นความทรงจำระดับมาสเตอร์พีซ
              </p>

              {/* 3 Pillar Features */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="bg-white/70 backdrop-blur-xs p-3.5 rounded-2xl border border-[#134C65]/10 shadow-xs">
                  <div className="text-xs font-bold text-[#102D4F]">Romantic</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">ช่วงเวลาสุดพิเศษสองเรา</div>
                </div>
                <div className="bg-white/70 backdrop-blur-xs p-3.5 rounded-2xl border border-[#134C65]/10 shadow-xs">
                  <div className="text-xs font-bold text-[#102D4F]">Adventure</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">ผจญภัยอ่าวอันดามัน</div>
                </div>
                <div className="bg-white/70 backdrop-blur-xs p-3.5 rounded-2xl border border-[#134C65]/10 shadow-xs">
                  <div className="text-xs font-bold text-[#102D4F]">VIP Escape</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">ความเป็นส่วนตัวสูงสุด</div>
                </div>
              </div>

              {/* Action Strip */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => openBookingFor()}
                  className="px-6 py-3.5 bg-[#134C65] hover:bg-[#102D4F] text-white text-xs font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center gap-2"
                >
                  <span>สำรองเรือยอร์ชทันที</span>
                  <ChevronRight className="w-4 h-4 text-[#B69A5A]" />
                </button>
                <button
                  onClick={() => {
                    document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 bg-white/80 hover:bg-white text-[#134C65] border border-[#134C65]/20 text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  สำรวจทั้ง 5 แพ็กเกจ
                </button>
              </div>

              {/* Quick Info bar */}
              <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-300/60">
                <span>ราคาเริ่มต้น <PriceTag amount={18900} size="sm" variant="gold" activeFont={activePriceFont} /> / ทริป</span>
                <span>·</span>
                <span>กัปตันและลูกเรือมืออาชีพ</span>
                <span>·</span>
                <span>ประกันภัยสากล</span>
              </div>
            </div>

            {/* Right Column: Hero Visual Asset */}
            <div className="lg:col-span-6 relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80 relative aspect-16/10 group">
                <img
                  src="/src/assets/images/hero_luxury_yacht_1792177508211.jpg"
                  alt="Benetti Superyacht on crystal turquoise ocean"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102D4F]/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
                    <Crown className="w-4 h-4" />
                    <span>Flagship Fleet: Valérielle Sovereign 95ft</span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-white mt-1">
                    ความสมบูรณ์แบบบนท้องทะเลสีคราม
                  </h3>
                  <p className="text-xs text-slate-200 mt-1 max-w-md">
                    ดาดฟ้าจากุซซี่ สวีทหรูหรา และการบริการระดับบัตเลอร์ส่วนตัว
                  </p>
                </div>
              </div>

              {/* Floating Stat card */}
              <div className="absolute -bottom-6 -left-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-200/80 max-w-xs hidden sm:block">
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  ประสบการณ์ระดับเวิลด์คลาส
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold font-serif text-[#102D4F]">100%</span>
                  <span className="text-xs text-slate-600">ความเป็นส่วนตัวและมาตรฐานความปลอดภัยสูงสุด</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1: ข้อมูลธุรกิจ วิสัยทัศน์ & พันธกิจ (Business Details & Mission) */}
        <section className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-slate-200/80 shadow-md">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold text-[#487F86] uppercase tracking-widest">
              01. Business Profile & Strategic Vision
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#102D4F] mt-1">
              เกี่ยวกับ Marina Valérielle
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Marina Valérielle เป็นธุรกิจจำลองด้านการท่องเที่ยวทางทะเลระดับลักชัวรี (Luxury Marine Tourism) 
              ที่ให้บริการเช่าเรือยอร์ชส่วนตัว พร้อมจัดแพ็กเกจท่องเที่ยว กิจกรรมทางทะเล และบริการพิเศษที่ออกแบบให้เหมาะกับความต้องการของลูกค้าแต่ละกลุ่ม
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vision */}
            <div className="bg-[#E9F1F6]/60 rounded-2xl p-6 border border-slate-200/70 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#134C65] text-[#B69A5A] flex items-center justify-center font-bold">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#102D4F]">วิสัยทัศน์ (Vision)</h3>
              <p className="text-xs text-slate-700 leading-relaxed">
                มุ่งสู่การเป็นแบรนด์ท่องเที่ยวทางทะเลระดับพรีเมียมที่มอบประสบการณ์การพักผ่อนอย่างมีระดับ 
                พร้อมสร้างความประทับใจผ่านบริการที่เป็นส่วนตัวและใส่ใจในทุกรายละเอียด
              </p>
            </div>

            {/* Mission */}
            <div className="bg-[#E9F1F6]/60 rounded-2xl p-6 border border-slate-200/70 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#134C65] text-[#B69A5A] flex items-center justify-center font-bold">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#102D4F]">พันธกิจ (Mission)</h3>
              <ul className="text-xs text-slate-700 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#487F86] shrink-0 mt-0.5" />
                  <span>ให้บริการเช่าเรือยอร์ชส่วนตัวที่มีมาตรฐานด้านความปลอดภัยสูงสุด</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#487F86] shrink-0 mt-0.5" />
                  <span>ออกแบบแพ็กเกจท่องเที่ยวให้เหมาะกับลูกค้าหลากหลายกลุ่ม</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#487F86] shrink-0 mt-0.5" />
                  <span>มอบบริการที่สะดวกสบายและสามารถปรับเปลี่ยนตามความต้องการ (Bespoke)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#487F86] shrink-0 mt-0.5" />
                  <span>ส่งเสริมการท่องเที่ยวทางทะเลอย่างรับผิดชอบต่อสิ่งแวดล้อมและปะการัง</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: กลุ่มเป้าหมาย (Target Audience) */}
        <section>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-[#487F86] uppercase tracking-widest">
              02. Tailored Customer Segments
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#102D4F] mt-1">
              ออกแบบเพื่อตอบโจทย์ 6 กลุ่มเป้าหมาย
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              เราคัดสรรรายละเอียดของทริป อาหาร และกิจกรรมทางทะเลให้สอดคล้องกับความต้องการเฉพาะบุคคล
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TARGET_AUDIENCES.map((aud, index) => {
              const iconMap: Record<string, React.ReactNode> = {
                Heart: <Heart className="w-5 h-5 text-rose-500" />,
                Users: <Users className="w-5 h-5 text-sky-600" />,
                Sparkles: <Sparkles className="w-5 h-5 text-amber-500" />,
                Crown: <Crown className="w-5 h-5 text-[#B69A5A]" />,
                Briefcase: <Briefcase className="w-5 h-5 text-[#134C65]" />,
                Globe: <Globe className="w-5 h-5 text-emerald-600" />
              };

              return (
                <div
                  key={aud.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-[#E9F1F6] flex items-center justify-center">
                        {iconMap[aud.iconName]}
                      </div>
                      <span className="text-[11px] font-mono text-slate-400 font-semibold">
                        0{index + 1}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-[#102D4F]">{aud.title}</h3>
                      <div className="text-[11px] text-[#487F86] font-medium">{aud.englishTitle}</div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {aud.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-500">แพ็กเกจแนะนำ:</span>
                    <button
                      onClick={() => openBookingFor(aud.recommendedPackageId)}
                      className="font-semibold text-[#134C65] hover:text-[#B69A5A] flex items-center gap-1 cursor-pointer"
                    >
                      <span>ดูรายละเอียด</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 4: แพ็กเกจท่องเที่ยว (Tour Packages) - WITH CUSTOM PRICE FONT */}
        <section id="packages">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold text-[#487F86] uppercase tracking-widest">
                03. Curated Tour Packages
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#102D4F] mt-1">
                แพ็กเกจท่องเที่ยวทางทะเลระดับหรู
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                ราคาเสนอสมมติสำหรับโครงงาน แสดงผลด้วยฟอนต์ตัวเลขลักชัวรี <span className="font-semibold text-[#134C65] font-serif">Cinzel / Playfair</span>
              </p>
            </div>

            {/* Quick Price Font Indicator Badge */}
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-xs px-3 py-2 rounded-xl border border-slate-200 text-xs">
              <Type className="w-4 h-4 text-[#B69A5A]" />
              <span className="text-slate-600">ฟอนต์ราคาปัจจุบัน:</span>
              <span className="font-bold text-[#134C65] font-serif">{activePriceFont.toUpperCase()}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOUR_PACKAGES.map((pkg, idx) => (
              <div
                key={pkg.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Package Cover Image */}
                  <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-[#102D4F]/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-md backdrop-blur-xs">
                      {pkg.code}
                    </div>
                    <div className="absolute top-3 right-3 bg-white/90 text-[#134C65] text-[10px] font-bold px-2.5 py-1 rounded-md backdrop-blur-xs flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#487F86]" />
                      <span>{pkg.durationHours}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <div className="text-[10px] tracking-widest uppercase font-semibold text-[#487F86]">
                        {pkg.subtitle}
                      </div>
                      <h3 className="text-xl font-serif font-bold text-[#102D4F] mt-0.5">
                        {pkg.name}
                      </h3>
                      <div className="text-xs text-slate-500 mt-1">
                        {pkg.targetAudience}
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-1.5 text-xs text-slate-700">
                      {pkg.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#B69A5A] shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Price Box with SPECIAL PRICE FONT */}
                <div className="p-6 pt-4 border-t border-slate-100 bg-[#E9F1F6]/40 flex items-end justify-between">
                  <div>
                    <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">
                      ราคาเริ่มต้นต่อกลุ่ม
                    </div>
                    <div className="mt-1">
                      {/* Price Rendered with specialized font */}
                      <PriceTag
                        amount={pkg.basePrice}
                        size="2xl"
                        variant="navy"
                        activeFont={activePriceFont}
                      />
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {pkg.priceNote}
                    </div>
                  </div>

                  <button
                    onClick={() => openBookingFor(pkg.id)}
                    className="px-4 py-2.5 bg-[#134C65] hover:bg-[#102D4F] text-white text-xs font-bold rounded-xl transition-all shadow-xs hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1"
                  >
                    <span>จองทริป</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: บริการหลักและกิจกรรมเสริม (Experiences & Add-ons) */}
        <section id="experiences" className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-slate-200/80 shadow-md">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold text-[#487F86] uppercase tracking-widest">
              04. Bespoke Maritime Experiences
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#102D4F] mt-1">
              กิจกรรมทางทะเลและบริการเสริมพิเศษ
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              ลูกค้าสามารถเลือกเพิ่มบริการนอกเหนือจากแพ็กเกจหลัก เพื่อสร้างประสบการณ์ที่ตรงกับความต้องการมากยิ่งขึ้น
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ADD_ON_SERVICES.map(srv => (
              <div
                key={srv.id}
                className="bg-[#E9F1F6]/50 rounded-2xl p-5 border border-slate-200/80 hover:border-[#134C65]/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-16/9 rounded-xl overflow-hidden mb-4 bg-slate-200">
                    <img
                      src={srv.image}
                      alt={srv.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h3 className="text-base font-bold text-[#102D4F]">{srv.name}</h3>
                  <div className="text-xs text-[#487F86] font-medium">{srv.subtitle}</div>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {srv.description}
                  </p>

                  <div className="mt-3 space-y-1 text-[11px] text-slate-500">
                    {srv.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <span className="text-[#B69A5A]">·</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-slate-500">ราคาเสนอสมมติ</div>
                    <PriceTag amount={srv.priceRange} size="base" variant="navy" activeFont={activePriceFont} />
                  </div>
                  <button
                    onClick={() => openBookingFor()}
                    className="px-3 py-1.5 bg-[#134C65] hover:bg-[#102D4F] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    เพิ่มในทริป
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6: โปรโมชั่นพิเศษตามกลุ่มเป้าหมาย (Promotions) */}
        <section id="promotions">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-[#487F86] uppercase tracking-widest">
              05. Exclusive Privileges & Offers
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#102D4F] mt-1">
              โปรโมชั่นพิเศษตามกลุ่มเป้าหมาย
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              รับสิทธิประโยชน์และส่วนลดเฉพาะกลุ่มเมื่อทำการสำรองเรือล่วงหน้าตามเงื่อนไข
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROMOTIONS.map(promo => (
              <div
                key={promo.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#134C65] bg-[#E9F1F6] px-2.5 py-1 rounded-md">
                      CODE: {promo.code}
                    </span>
                    <span className="text-xs font-bold text-[#B69A5A] font-serif">
                      {promo.discountBadge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-[#102D4F]">{promo.title}</h3>
                    <div className="text-xs text-slate-500">{promo.target}</div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {promo.description}
                  </p>

                  <div className="bg-[#E9F1F6]/50 rounded-xl p-3 text-[11px] text-slate-600 space-y-1">
                    <div className="font-semibold text-[#134C65]">เงื่อนไขการใช้สิทธิ์:</div>
                    {promo.terms.map((t, idx) => (
                      <div key={idx}>· {t}</div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">เป้าหมาย: {promo.goal}</span>
                  <button
                    onClick={() => openBookingFor()}
                    className="text-xs font-bold text-[#134C65] hover:text-[#B69A5A] flex items-center gap-1 cursor-pointer"
                  >
                    <span>ใช้สิทธิ์</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 7: โปรแกรมสมาชิก Marina Valérielle Privilege (Membership) */}
        <section id="membership" className="bg-[#102D4F] text-white rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle wave shimmer decoration */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-[#134C65]/30 blur-3xl pointer-events-none"></div>

          <div className="max-w-2xl mb-8 relative z-10">
            <span className="text-xs font-bold text-[#B69A5A] uppercase tracking-widest flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>06. Marina Valérielle Privilege Club</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
              โปรแกรมสมาชิกลักชัวรีพริวิเลจ
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              ยกระดับทุกการเดินทางสู่ความเหนือระดับ ด้วยเอกสิทธิ์เฉพาะสมาชิกที่บันทึกข้อมูลและประวัติการล่องเรืออย่างเป็นระบบ
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Membership Tiers Selector */}
            <div className="lg:col-span-7 space-y-3">
              {MEMBERSHIP_TIERS.map(tier => {
                const isSelected = tier.id === selectedMembershipTier;
                return (
                  <div
                    key={tier.id}
                    onClick={() => setSelectedMembershipTier(tier.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white/15 border-[#B69A5A] shadow-lg'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-4 h-4 rounded-full border-2 border-white/40"
                          style={{ backgroundColor: tier.colorHex }}
                        />
                        <div>
                          <div className="font-bold text-white font-serif">{tier.tierName}</div>
                          <div className="text-[11px] text-slate-300">{tier.thaiName} · {tier.condition}</div>
                        </div>
                      </div>
                      {isSelected && (
                        <span className="text-xs font-semibold text-[#B69A5A] bg-[#B69A5A]/10 px-2 py-0.5 rounded-full border border-[#B69A5A]/30">
                          Active Tier
                        </span>
                      )}
                    </div>

                    {isSelected && (
                      <div className="mt-3 pt-3 border-t border-white/10 space-y-1 text-xs text-slate-200">
                        {tier.privileges.map((p, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <Sparkles className="w-3.5 h-3.5 text-[#B69A5A]" />
                            <span>{p}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Virtual Privilege Card Simulation */}
            <div className="lg:col-span-5 flex justify-center">
              {(() => {
                const activeTierObj =
                  MEMBERSHIP_TIERS.find(t => t.id === selectedMembershipTier) ||
                  MEMBERSHIP_TIERS[2];

                return (
                  <div className={`w-80 h-48 rounded-2xl p-5 shadow-2xl relative overflow-hidden flex flex-col justify-between border border-white/30 bg-gradient-to-br ${activeTierObj.cardAccent}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 font-bold font-serif text-sm tracking-wider">
                        <Anchor className="w-4 h-4" />
                        <span>MARINA VALÉRIELLE</span>
                      </div>
                      <span className="text-[10px] font-mono tracking-widest uppercase border border-current px-2 py-0.5 rounded-full">
                        {activeTierObj.tierName}
                      </span>
                    </div>

                    <div className="my-auto">
                      <div className="text-[10px] opacity-75 uppercase tracking-widest font-mono">
                        Member Account
                      </div>
                      <div className="font-mono text-sm tracking-widest font-bold mt-0.5">
                        MV-2026-9812-VIP
                      </div>
                    </div>

                    <div className="flex justify-between items-end text-[10px]">
                      <div>
                        <div className="opacity-75 uppercase">Cardholder</div>
                        <div className="font-bold text-xs">VALUED GUEST VIP</div>
                      </div>
                      <div className="text-right">
                        <div className="opacity-75 uppercase">Valid Thru</div>
                        <div className="font-mono font-bold">12/28</div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </section>

        {/* SECTION 9: ฐานข้อมูลเชิงสัมพันธ์ 9 ตาราง (Database Inspector) */}
        <section id="database">
          <div className="mb-6">
            <span className="text-xs font-bold text-[#487F86] uppercase tracking-widest">
              07. RDBMS Architectural Blueprint (Section 9)
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#102D4F] mt-1">
              โครงสร้างระบบฐานข้อมูลและการจัดการข้อมูล (Database Inspector)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              ตรวจสอบโครงสร้างตารางข้อมูลทั้ง 9 ตาราง (customers, yachts, packages, bookings, services, booking_services, promotions, memberships, payments) พร้อมส่งออกเป็นไฟล์ SQL
            </p>
          </div>

          <DatabaseViewer priceFont={activePriceFont} />
        </section>

        {/* SECTION 10 & 12: จุดเด่นทางธุรกิจและการติดต่อ (Business Advantages & Contact) */}
        <section className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-slate-200/80 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: 6 Business Advantages */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold text-[#487F86] uppercase tracking-widest">
                  08. Business Superiority
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#102D4F] mt-1">
                  สรุปประโยชน์และจุดเด่นทางธุรกิจ
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
                <div className="p-3 bg-[#E9F1F6]/50 rounded-xl border border-slate-200/60">
                  <div className="font-bold text-[#134C65] mb-1">1. บริการหลากหลายครบวงจร</div>
                  <p className="text-slate-600">เช่าเรือยอร์ชส่วนตัว กิจกรรมทางทะเล อาหารพรีเมียม และการจัดงานฉลองพิเศษ</p>
                </div>
                <div className="p-3 bg-[#E9F1F6]/50 rounded-xl border border-slate-200/60">
                  <div className="font-bold text-[#134C65] mb-1">2. ตอบโจทย์ลูกค้า 6 กลุ่ม</div>
                  <p className="text-slate-600">คู่รัก ครอบครัว กลุ่มเพื่อน ลูกค้า VIP องค์กร และนักท่องเที่ยวต่างชาติ</p>
                </div>
                <div className="p-3 bg-[#E9F1F6]/50 rounded-xl border border-slate-200/60">
                  <div className="font-bold text-[#134C65] mb-1">3. หลากหลายช่องทางรายได้</div>
                  <p className="text-slate-600">รายได้จากการเช่าเรือ แพ็กเกจ บริการเสริม และแพ็กเกจจัดงานพิเศษ</p>
                </div>
                <div className="p-3 bg-[#E9F1F6]/50 rounded-xl border border-slate-200/60">
                  <div className="font-bold text-[#134C65] mb-1">4. ส่งเสริมการใช้บริการซ้ำ</div>
                  <p className="text-slate-600">โปรแกรมสมาชิก Privilege Tiers และโปรโมชั่นตามกลุ่มเพื่อรักษาความสัมพันธ์</p>
                </div>
                <div className="p-3 bg-[#E9F1F6]/50 rounded-xl border border-slate-200/60">
                  <div className="font-bold text-[#134C65] mb-1">5. มีระบบสารสนเทศรองรับ</div>
                  <p className="text-slate-600">โครงสร้างฐานข้อมูลเชิงสัมพันธ์ 9 ตารางรองรับระบบจองและจัดการลูกค้า</p>
                </div>
                <div className="p-3 bg-[#E9F1F6]/50 rounded-xl border border-slate-200/60">
                  <div className="font-bold text-[#134C65] mb-1">6. แบรนด์ดิ้งลักชัวรีชัดเจน</div>
                  <p className="text-slate-600">เอกลักษณ์โทนสี Coastal Whispers ฟ้าใส ขาวมุก กรมท่า และทองแชมเปญ</p>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-5 bg-[#E9F1F6]/70 rounded-2xl p-6 border border-slate-200">
              <h4 className="text-base font-bold text-[#102D4F] mb-1">ติดต่อเรา (Contact Us)</h4>
              <p className="text-xs text-slate-500 mb-4">
                Marina Valérielle Phuket & Andaman Sea Base
              </p>

              <div className="space-y-3 text-xs mb-5">
                <div className="flex items-center gap-2 text-slate-700">
                  <MapPin className="w-4 h-4 text-[#134C65]" />
                  <span>Royal Phuket Marina, Pier 4, Koh Kaew, Phuket</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Phone className="w-4 h-4 text-[#134C65]" />
                  <span>+66 (0) 76 892 450 (24/7 Concierge)</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Mail className="w-4 h-4 text-[#134C65]" />
                  <span>charter@marinavalerielle.com</span>
                </div>
              </div>

              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="ชื่อของคุณ"
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-xs"
                />
                <input
                  type="email"
                  placeholder="อีเมลติดต่อ"
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-xs"
                />
                <textarea
                  placeholder="ข้อความสอบถามเส้นทางหรือจองพิเศษ..."
                  rows={3}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-xs"
                ></textarea>
                <button
                  type="button"
                  onClick={() => alert('ขอบคุณสำหรับข้อความ ทีมงานจะติดต่อกลับอย่างรวดเร็วที่สุด')}
                  className="w-full py-2.5 bg-[#134C65] hover:bg-[#102D4F] text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  ส่งข้อความสอบถาม
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-[#134C65]/15 bg-[#E9F1F6]/95 py-10 px-4 sm:px-6 relative z-20 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Anchor className="w-5 h-5 text-[#B69A5A]" />
            <div>
              <span className="font-bold text-[#102D4F] font-serif text-sm">
                Marina Valérielle
              </span>
              <span className="text-slate-400 ml-2">
                © 2026 Luxury Yacht Charters & Marine Escapes. All rights reserved.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ZipExporter buttonVariant="primary" />
          </div>
        </div>
      </footer>

      {/* Floating ZIP Export Shortcut */}
      <ZipExporter buttonVariant="floating" />

      {/* Interactive Booking Modal with Live Price Calculator */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialPackageId={selectedBookingPkgId}
        priceFont={activePriceFont}
      />
    </div>
  );
}
