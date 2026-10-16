import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Calendar,
  Clock,
  Users,
  Anchor,
  Check,
  CreditCard,
  CheckCircle,
  Sparkles,
  Tag,
  Ship,
  ShieldCheck,
  X
} from 'lucide-react';
import {
  TOUR_PACKAGES,
  ADD_ON_SERVICES,
  YACHTS_FLEET,
  PROMOTIONS,
  TourPackage,
  AddOnService
} from '../data/marinaData';
import { PriceTag, PriceFontOption } from './PriceTag';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPackageId?: string;
  priceFont?: PriceFontOption;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialPackageId,
  priceFont = 'cinzel'
}) => {
  const [selectedPackageId, setSelectedPackageId] = useState<string>(
    initialPackageId || TOUR_PACKAGES[0].id
  );
  const [selectedYachtId, setSelectedYachtId] = useState<string>(YACHTS_FLEET[0].id);
  const [charterDate, setCharterDate] = useState<string>('2026-10-25');
  const [charterTimeSlot, setCharterTimeSlot] = useState<string>('sunset');
  const [guestCount, setGuestCount] = useState<number>(4);
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>(['srv-01']);
  const [promoCode, setPromoCode] = useState<string>('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  // Customer contact info
  const [fullName, setFullName] = useState<string>('คุณพัชราภรณ์ วิริยะกุล');
  const [email, setEmail] = useState<string>('patchara.v@example.com');
  const [phone, setPhone] = useState<string>('081-987-6543');
  const [specialRequests, setSpecialRequests] = useState<string>('ต้องการเตรียมแชมเปญฉลองวันครบรอบ');

  // Booking confirmed state
  const [confirmedBookingId, setConfirmedBookingId] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentPackage =
    TOUR_PACKAGES.find(p => p.id === selectedPackageId) || TOUR_PACKAGES[0];
  const currentYacht =
    YACHTS_FLEET.find(y => y.id === selectedYachtId) || YACHTS_FLEET[0];

  // Calculate pricing
  const basePrice = currentPackage.basePrice;
  const addonsTotal = selectedAddonIds.reduce((sum, id) => {
    const addon = ADD_ON_SERVICES.find(a => a.id === id);
    return sum + (addon ? addon.basePrice : 0);
  }, 0);

  const subtotal = basePrice + addonsTotal;

  // Check discount
  let discountAmount = 0;
  if (appliedPromo) {
    const promo = PROMOTIONS.find(p => p.code.toLowerCase() === appliedPromo.toLowerCase());
    if (promo) {
      discountAmount = Math.round((subtotal * promo.discountPercent) / 100);
    }
  }

  const vatAmount = Math.round((subtotal - discountAmount) * 0.07);
  const grandTotal = subtotal - discountAmount + vatAmount;

  const handleApplyPromo = () => {
    setPromoError(null);
    const cleaned = promoCode.trim().toUpperCase();
    const found = PROMOTIONS.find(p => p.code === cleaned);
    if (found) {
      setAppliedPromo(found.code);
    } else {
      setPromoError('รหัสโปรโมชั่นไม่ถูกต้อง (ลองใช้: ROMANTIC10, SAIL8, GLOBAL5)');
    }
  };

  const toggleAddon = (id: string) => {
    setSelectedAddonIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    const bookingNumber = `MV-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedBookingId(bookingNumber);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#134C65', '#B69A5A', '#487F86', '#D8F0F5']
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden relative animate-in fade-in zoom-in-95 duration-200 text-[#152740]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#102D4F] via-[#134C65] to-[#152740] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B69A5A] font-semibold mb-1">
            <Anchor className="w-3.5 h-3.5" />
            <span>Marina Valérielle · Private Charter Reservation</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
            สำรองเรือยอร์ชและคำนวณราคาแบบเรียลไทม์
          </h2>
          <p className="text-xs text-sky-100/80 mt-1">
            เลือกแพ็กเกจท่องเที่ยว ปรับแต่งบริการเสริม และตรวจสอบราคาพร้อมฟอนต์ตัวเลขลักชัวรี
          </p>
        </div>

        {confirmedBookingId ? (
          /* Confirmation Receipt View */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Booking Reference No.
              </span>
              <div className="text-2xl font-mono font-bold text-[#134C65] mt-1">
                {confirmedBookingId}
              </div>
              <h3 className="text-xl font-bold text-[#152740] mt-2">
                ยืนยันการสำรองเรือยอร์ชสำเร็จ!
              </h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto mt-1">
                เจ้าหน้าที่ Personal Yacht Concierge ของ Marina Valérielle จะติดต่อกลับทางเบอร์ {phone} และอีเมล {email} ภายใน 2 ชั่วโมง
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-[#E9F1F6]/70 border border-slate-200 rounded-2xl p-5 text-left max-w-md mx-auto space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">แพ็กเกจที่เลือก:</span>
                <span className="font-semibold text-[#134C65]">{currentPackage.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">เรือยอร์ช:</span>
                <span className="font-semibold text-[#134C65]">{currentYacht.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">วันเดินทาง:</span>
                <span className="font-semibold">{charterDate}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">จำนวนผู้โดยสาร:</span>
                <span className="font-semibold">{guestCount} ท่าน</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">บริการเสริมที่เลือก:</span>
                <span className="font-semibold">{selectedAddonIds.length} รายการ</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="font-bold text-[#102D4F]">ยอดรวมชำระสุทธิ (รวม VAT 7%):</span>
                <PriceTag amount={grandTotal} size="xl" variant="gold" activeFont={priceFont} />
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => {
                  setConfirmedBookingId(null);
                  onClose();
                }}
                className="px-6 py-2.5 bg-[#134C65] hover:bg-[#102D4F] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                เสร็จสิ้น / กลับสู่หน้าหลัก
              </button>
            </div>
          </div>
        ) : (
          /* Form & Calculator View */
          <form onSubmit={handleConfirmReservation} className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 max-h-[75vh] overflow-y-auto">
            {/* Left Column: Selections */}
            <div className="lg:col-span-7 space-y-5">
              {/* 1. Package Select */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                  <Ship className="w-3.5 h-3.5 text-[#487F86]" />
                  <span>1. เลือกแพ็กเกจท่องเที่ยว (Tour Package)</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {TOUR_PACKAGES.map(pkg => {
                    const isSelected = pkg.id === selectedPackageId;
                    return (
                      <div
                        key={pkg.id}
                        onClick={() => setSelectedPackageId(pkg.id)}
                        className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                          isSelected
                            ? 'border-[#134C65] bg-[#E9F1F6] shadow-xs'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="font-bold text-[#102D4F] flex justify-between items-center">
                          <span>{pkg.name}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#134C65]" />}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{pkg.durationHours} · สูงสุด {pkg.maxPassengers} คน</div>
                        <div className="mt-2 text-right">
                          <PriceTag amount={pkg.basePrice} size="base" variant="navy" activeFont={priceFont} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 2. Yacht & Date Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#487F86]" />
                    <span>2. วันที่เดินทาง</span>
                  </label>
                  <input
                    type="date"
                    value={charterDate}
                    onChange={e => setCharterDate(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#134C65]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#487F86]" />
                    <span>ช่วงเวลาล่องเรือ</span>
                  </label>
                  <select
                    value={charterTimeSlot}
                    onChange={e => setCharterTimeSlot(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#134C65]"
                  >
                    <option value="morning">Morning Breeze (09:00 - 13:00)</option>
                    <option value="sunset">Sunset Twilight Cruise (14:30 - 19:30)</option>
                    <option value="fullday">Full-Day Private Odyssey (09:00 - 17:00)</option>
                  </select>
                </div>
              </div>

              {/* 3. Passengers & Yacht */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#487F86]" />
                    <span>จำนวนผู้โดยสาร (Guests)</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={1}
                      max={currentPackage.maxPassengers}
                      value={guestCount}
                      onChange={e => setGuestCount(parseInt(e.target.value) || 1)}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#134C65]"
                    />
                    <span className="text-xs text-slate-400 whitespace-nowrap">
                      (สูงสุด {currentPackage.maxPassengers} ท่าน)
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                    <Ship className="w-3.5 h-3.5 text-[#487F86]" />
                    <span>ลำเรือที่ต้องการ</span>
                  </label>
                  <select
                    value={selectedYachtId}
                    onChange={e => setSelectedYachtId(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#134C65]"
                  >
                    {YACHTS_FLEET.map(y => (
                      <option key={y.id} value={y.id}>
                        {y.name} ({y.lengthFeet}ft - สูงสุด {y.capacityMax} คน)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 4. Add-on Services Checkboxes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#B69A5A]" />
                  <span>3. บริการเสริมพิเศษ (Premium Add-ons)</span>
                </label>
                <div className="space-y-2">
                  {ADD_ON_SERVICES.map(srv => {
                    const isChecked = selectedAddonIds.includes(srv.id);
                    return (
                      <label
                        key={srv.id}
                        className={`flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                          isChecked
                            ? 'bg-[#E9F1F6]/60 border-[#134C65]'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleAddon(srv.id)}
                            className="rounded-sm accent-[#134C65] w-4 h-4 cursor-pointer"
                          />
                          <div>
                            <span className="font-semibold text-[#102D4F]">{srv.name}</span>
                            <span className="text-[11px] text-slate-500 ml-1.5">({srv.subtitle})</span>
                          </div>
                        </div>
                        <PriceTag amount={srv.basePrice} size="sm" variant="navy" activeFont={priceFont} />
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Customer Contact Details */}
              <div className="pt-2 border-t border-slate-200">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
                  4. ข้อมูลผู้ติดต่อ
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <input
                    type="text"
                    placeholder="ชื่อ-นามสกุล"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    required
                    className="p-2.5 rounded-xl border border-slate-200 bg-white"
                  />
                  <input
                    type="tel"
                    placeholder="เบอร์โทรศัพท์"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    required
                    className="p-2.5 rounded-xl border border-slate-200 bg-white"
                  />
                  <input
                    type="email"
                    placeholder="อีเมล"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="p-2.5 rounded-xl border border-slate-200 bg-white sm:col-span-2"
                  />
                  <input
                    type="text"
                    placeholder="ความต้องการพิเศษ (เช่น การแพ้อาหาร, ฉลองวันเกิด)"
                    value={specialRequests}
                    onChange={e => setSpecialRequests(e.target.value)}
                    className="p-2.5 rounded-xl border border-slate-200 bg-white sm:col-span-2"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Pricing Summary Calculator */}
            <div className="lg:col-span-5 bg-[#E9F1F6]/50 rounded-2xl p-5 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-200">
                  <CreditCard className="w-4 h-4 text-[#134C65]" />
                  <h3 className="font-bold text-sm text-[#102D4F]">สรุปรายการและราคา (Live Price)</h3>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-slate-800">{currentPackage.name}</div>
                      <div className="text-[11px] text-slate-500">{currentPackage.durationHours}</div>
                    </div>
                    <PriceTag amount={basePrice} size="base" variant="navy" activeFont={priceFont} />
                  </div>

                  {selectedAddonIds.length > 0 && (
                    <div className="pt-2 border-t border-slate-200/60 space-y-1.5">
                      <div className="text-[11px] font-semibold text-slate-500">บริการเสริมที่เลือก:</div>
                      {selectedAddonIds.map(id => {
                        const addon = ADD_ON_SERVICES.find(a => a.id === id);
                        if (!addon) return null;
                        return (
                          <div key={id} className="flex justify-between items-center text-[11px]">
                            <span className="text-slate-600">· {addon.name}</span>
                            <PriceTag amount={addon.basePrice} size="sm" variant="light" activeFont={priceFont} />
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Promo Code Input */}
                  <div className="pt-3 border-t border-slate-200">
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1 flex items-center gap-1">
                      <Tag className="w-3 h-3 text-[#B69A5A]" />
                      <span>รหัสโปรโมชั่น (Promotion Code)</span>
                    </label>
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        placeholder="เช่น ROMANTIC10, SAIL8"
                        value={promoCode}
                        onChange={e => setPromoCode(e.target.value)}
                        className="flex-1 p-2 rounded-lg border border-slate-200 text-xs bg-white uppercase font-mono"
                      />
                      <button
                        type="button"
                        onClick={handleApplyPromo}
                        className="px-3 py-2 bg-[#134C65] hover:bg-[#102D4F] text-white rounded-lg text-xs font-semibold cursor-pointer"
                      >
                        ใช้โค้ด
                      </button>
                    </div>
                    {appliedPromo && (
                      <div className="text-[11px] text-emerald-700 mt-1 flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        <span>ใช้โปรโมชั่น {appliedPromo} สำเร็จ!</span>
                      </div>
                    )}
                    {promoError && (
                      <div className="text-[11px] text-rose-600 mt-1">{promoError}</div>
                    )}
                  </div>

                  {/* Calculations */}
                  <div className="pt-3 border-t border-slate-200 space-y-1.5">
                    <div className="flex justify-between text-slate-600">
                      <span>ยอดรวมย่อย (Subtotal):</span>
                      <PriceTag amount={subtotal} size="sm" variant="navy" activeFont={priceFont} />
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-700 font-medium">
                        <span>ส่วนลดพิเศษ:</span>
                        <span>- <PriceTag amount={discountAmount} size="sm" variant="light" activeFont={priceFont} /></span>
                      </div>
                    )}

                    <div className="flex justify-between text-slate-500 text-[11px]">
                      <span>ภาษีมูลค่าเพิ่ม (VAT 7%):</span>
                      <PriceTag amount={vatAmount} size="sm" variant="light" activeFont={priceFont} />
                    </div>
                  </div>

                  {/* Total Highlight */}
                  <div className="p-3 bg-white rounded-xl border border-[#B69A5A]/30 mt-3">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-0.5">
                      ยอดชำระสุทธิ (Net Total)
                    </div>
                    <div className="flex items-baseline justify-between">
                      <PriceTag amount={grandTotal} size="2xl" variant="gold" activeFont={priceFont} />
                      <span className="text-[11px] text-slate-400">บาท (THB)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-200">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-3">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>รับประกันความปลอดภัย มัดจำ 50% ยกเลิกฟรีล่วงหน้า 7 วัน</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-[#134C65] to-[#102D4F] hover:from-[#102D4F] hover:to-[#0A192F] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer text-xs"
                >
                  <Ship className="w-4 h-4 text-[#B69A5A]" />
                  <span>ยืนยันการสำรองเรือยอร์ชทันที</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
