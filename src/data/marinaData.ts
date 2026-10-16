export interface Yacht {
  id: string;
  name: string;
  model: string;
  lengthFeet: number;
  capacityMax: number;
  crewCount: number;
  cruisingSpeedKnots: number;
  description: string;
  amenities: string[];
  startingPrice: number;
  image: string;
}

export interface TourPackage {
  id: string;
  code: string;
  name: string;
  subtitle: string;
  targetAudience: string;
  durationHours: string;
  maxPassengers: number;
  basePrice: number;
  priceNote: string;
  highlights: string[];
  includedServices: string[];
  image: string;
}

export interface AddOnService {
  id: string;
  name: string;
  subtitle: string;
  category: 'ocean' | 'dining' | 'media' | 'styling' | 'concierge';
  priceRange: string;
  basePrice: number;
  unit: string;
  description: string;
  items: string[];
  image: string;
}

export interface Promotion {
  id: string;
  code: string;
  title: string;
  target: string;
  discountBadge: string;
  discountPercent: number;
  description: string;
  terms: string[];
  goal: string;
  bgGradient: string;
}

export interface MembershipTier {
  id: string;
  tierName: string;
  thaiName: string;
  colorHex: string;
  condition: string;
  privileges: string[];
  cardAccent: string;
}

export interface TargetAudience {
  id: string;
  title: string;
  englishTitle: string;
  description: string;
  recommendedPackageId: string;
  keyDesire: string;
  iconName: string;
}

export const YACHTS_FLEET: Yacht[] = [
  {
    id: 'yacht-01',
    name: 'Valérielle Sovereign',
    model: 'Benetti Delfino 95 Custom Superyacht',
    lengthFeet: 95,
    capacityMax: 12,
    crewCount: 5,
    cruisingSpeedKnots: 14,
    description: 'เรือธงสุดอลังการแห่งท้องทะเลอันดามัน พร้อมดาดฟ้าจากุซซี่ ห้องสวีทระดับมาสเตอร์ และพื้นที่สังสรรค์กว้างขวางระดับอัลตร้าลักชัวรี',
    amenities: ['Jacuzzi บนดาดฟ้า Sundeck', 'ห้องมาสเตอร์สวีทพร้อมห้องน้ำหินอ่อน', 'ระบบเสียง Bang & Olufsen ทั่วลำเรือ', 'ครัวระดับ Fine Dining พร้อมเชฟส่วนตัว', 'เทนเดอร์โบ๊ต Williams Jet'],
    startingPrice: 59900,
    image: '/src/assets/images/hero_luxury_yacht_1792177508211.jpg'
  },
  {
    id: 'yacht-02',
    name: 'Azure Serenity',
    model: 'Lagoon 60 Luxury Sailing Catamaran',
    lengthFeet: 60,
    capacityMax: 8,
    crewCount: 4,
    cruisingSpeedKnots: 11,
    description: 'เรือคาตามารันสองท้องทรงตัวนิ่งสงบ ดาดฟ้าเปิดโล่งรับลมทะเลอันดามัน เหมาะสำหรับการพักผ่อนแบบครอบครัวและกลุ่มเพื่อนสนิท',
    amenities: ['ตาข่ายแทรมโพลีนชมวิวหัวเรือ', 'Seabob & คายัคท้องใส', 'แอร์ปรับอุณหภูมิแยกโซน', 'บาร์เครื่องดื่มริมท้ายเรือ', 'ระบบดาวเทียม Starlink ความเร็วสูง'],
    startingPrice: 29900,
    image: '/src/assets/images/family_voyage_activities_1792177509479.jpg'
  },
  {
    id: 'yacht-03',
    name: 'Ocean Pearl Princess',
    model: 'Sunseeker Manhattan 55 Flybridge',
    lengthFeet: 55,
    capacityMax: 6,
    crewCount: 3,
    cruisingSpeedKnots: 22,
    description: 'ฟลายบริดจ์สปีดที่คล่องแคล่วและโฉบเฉี่ยว ออกแบบมาเพื่อทริปโรแมนติกชมพระอาทิตย์ตกและทริปครึ่งวันสู่เกาะสวรรค์ส่วนตัว',
    amenities: ['เลานจ์เปิดโล่งบน Flybridge', 'เตียงอาบแดดเบาะหนังแท้ทนน้ำ', 'ระบบสเตอริโอเชื่อมต่อบลูทูธ', 'แพลตฟอร์มว่ายน้ำระบบไฮดรอลิก', 'อุปกรณ์สน็อกเกิ้ลครบเซต'],
    startingPrice: 18900,
    image: '/src/assets/images/azure_romance_sunset_1792177509767.jpg'
  }
];

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: 'pkg-01',
    code: 'PKG-AZ-ESC',
    name: 'Azure Escape',
    subtitle: 'HALF-DAY ISLAND EXPERIENCE',
    targetAudience: 'เหมาะสำหรับ: นักท่องเที่ยวทั่วไป กลุ่มเพื่อน และผู้ที่มีเวลาจำกัด',
    durationHours: '4 ชั่วโมง',
    maxPassengers: 6,
    basePrice: 18900,
    priceNote: 'ราคาเริ่มต้นต่อกลุ่ม (สูงสุด 6 คน*)',
    highlights: [
      'เช่าเรือยอร์ชส่วนตัว 4 ชั่วโมงเต็ม',
      'ล่องเรือชมวิวทะเล เกาะหินปูน และเวิ้งอ่าวลับ',
      'ว่ายน้ำและดำน้ำตื้นพร้อมสน็อกเกิ้ลระดับพรีเมียม',
      'เสิร์ฟน้ำดื่ม น้ำผลไม้ ผลไม้ตามฤดูกาล และอุปกรณ์ความปลอดภัย'
    ],
    includedServices: ['กัปตันและลูกเรือผู้เชี่ยวชาญ', 'น้ำมันเรือตลอดเส้นทาง 4 ชม.', 'ผลไม้และเครื่องดื่ม Welcome Drink', 'ประกันอุบัติเหตุทางทะเล'],
    image: '/src/assets/images/hero_luxury_yacht_1792177508211.jpg'
  },
  {
    id: 'pkg-02',
    code: 'PKG-AZ-ROM',
    name: 'Azure Romance',
    subtitle: 'PRIVATE COUPLE & SUNSET CRUISE',
    targetAudience: 'เหมาะสำหรับ: คู่รัก คู่ฮันนีมูน และผู้ฉลองวันครบรอบหรือขอแต่งงาน',
    durationHours: 'ประมาณ 5 ชั่วโมง',
    maxPassengers: 2,
    basePrice: 29900,
    priceNote: 'ราคาเริ่มต้นต่อ 2 ท่าน (ประมาณ 5 ชั่วโมง)',
    highlights: [
      'ล่องเรือส่วนตัวสุดโรแมนติกชมพระอาทิตย์ลับขอบฟ้า',
      'ตกแต่งเรือด้วยดอกไม้สดและเทียนหอม LED สร้างบรรยากาศ',
      'ดินเนอร์ไวน์และเซตอาหารค่ำสำหรับสองท่านพร้อม Welcome Drink',
      'จุดถ่ายภาพแสงทอง Twilight บนหัวเรือยอร์ช',
      'สามารถเพิ่มบริการขอแต่งงาน เซอร์ไพรส์เค้ก หรือช่างภาพมืออาชีพ'
    ],
    includedServices: ['ดินเนอร์โรแมนติก 2 ท่าน', 'ไวน์ขาวหรือสปาร์กลิ้ง 1 ขวด', 'การตกแต่งธีมดอกไม้สด', 'กัปตันและผู้ดูแลส่วนตัว'],
    image: '/src/assets/images/azure_romance_sunset_1792177509767.jpg'
  },
  {
    id: 'pkg-03',
    code: 'PKG-VL-FAM',
    name: 'Valérielle Family Voyage',
    subtitle: 'FAMILY ISLAND ADVENTURE',
    targetAudience: 'เหมาะสำหรับ: ครอบครัวที่มีเด็ก ผู้ปกครอง และครอบครัวหลายช่วงวัย',
    durationHours: '6–8 ชั่วโมง',
    maxPassengers: 8,
    basePrice: 39900,
    priceNote: 'ราคาเริ่มต้นต่อกลุ่ม (สูงสุด 8 คน*)',
    highlights: [
      'ทริปล่องเรือยอร์ชครอบครัว 6–8 ชั่วโมงสู่หาดทรายขาว',
      'กิจกรรมทางน้ำปลอดภัยสำหรับเด็กและผู้ใหญ่',
      'เซตอาหารกลางวันและผลไม้สดสำหรับทุกคนในครอบครัว',
      'เสื้อชูชีพขนาดพิเศษสำหรับเด็กและอุปกรณ์ช่วยพยุงน้ำมาตรฐานสากล',
      'กิจกรรมและเวลาพักผ่อนที่ปรับยืดหยุ่นตามความต้องการของครอบครัว'
    ],
    includedServices: ['อาหารกลางวันเซตครอบครัว', 'พายเรือคายัคและบอร์ดลอยน้ำ', 'อุปกรณ์ดำน้ำตื้นทุกไซส์รวมเด็ก', 'บริการดูแลความปลอดภัยพิเศษ'],
    image: '/src/assets/images/family_voyage_activities_1792177509479.jpg'
  },
  {
    id: 'pkg-04',
    code: 'PKG-PR-RET',
    name: 'Prestige Island Retreat',
    subtitle: 'FULL-DAY LUXURY EXPERIENCE',
    targetAudience: 'เหมาะสำหรับ: นักท่องเที่ยวระดับพรีเมียม ผู้บริหาร และลูกค้าที่ต้องการความเป็นส่วนตัวสูงสุด',
    durationHours: '8 ชั่วโมงเต็ม',
    maxPassengers: 8,
    basePrice: 69900,
    priceNote: 'ราคาเริ่มต้นต่อกลุ่ม (สูงสุด 8 คน*)',
    highlights: [
      'เช่าเรือยอร์ชส่วนตัวเต็มวัน 8 ชั่วโมง สัมผัสความเอ็กซ์คลูซีฟ',
      'บริการบัตเลอร์และผู้ประสานงานการเดินทางส่วนบุคคล (Dedicated Concierge)',
      'อาหารพรีเมียมคอร์สพิเศษและเมนูไวน์ที่เลือกไว้ล่วงหน้า',
      'เลือกจุดแวะพักเกาะส่วนตัวและกิจกรรมตามเส้นทางที่กำหนดได้เอง',
      'สามารถเพิ่มบริการรถลีมูซีนรับส่งจากโรงแรมและช่างภาพส่วนตัว'
    ],
    includedServices: ['Private Concierge ตลอดทริป', 'กูร์เมต์ลันช์โดยเชฟรับเชิญ', 'เครื่องดื่มพรีเมียมตลอดวัน', 'อุปกรณ์กีฬาทางน้ำระดับสูง'],
    image: '/src/assets/images/private_chef_dining_1792177509041.jpg'
  },
  {
    id: 'pkg-05',
    code: 'PKG-BH-CORP',
    name: 'Blue Horizon Corporate',
    subtitle: 'CORPORATE & TEAM EXPERIENCE',
    targetAudience: 'เหมาะสำหรับ: บริษัท องค์กร ทีมงาน และธุรกิจที่ต้องการรับรองแขก VIP',
    durationHours: '6–8 ชั่วโมง',
    maxPassengers: 12,
    basePrice: 59900,
    priceNote: 'ราคาเริ่มต้นต่อกลุ่ม (สูงสุด 12 คน*)',
    highlights: [
      'เช่าเรือสำหรับกิจกรรมบริษัท งานเลี้ยงรับรอง หรือทริปพนักงาน',
      'กิจกรรม Team Building ทางทะเลพร้อมผู้ดูแลกิจกรรม',
      'บุฟเฟต์อาหารกลางวันหรือค็อกเทลรับรองต้อนรับ',
      'ตกแต่งเรือด้วยสีและโลโก้องค์กรตามข้อตกลงล่วงหน้า',
      'บริการถ่ายภาพบันทึกภาพความประทับใจและจัดตารางกิจกรรมเป็นระบบ'
    ],
    includedServices: ['เซตค็อกเทล & ฟิงเกอร์ฟู้ด', 'ป้ายต้อนรับแบรนด์องค์กร', 'ระบบเสียงไมโครโฟนสำหรับพรีเซนต์', 'ทีมงานประสานงานกิจกรรม'],
    image: '/src/assets/images/hero_luxury_yacht_1792177508211.jpg'
  }
];

export const ADD_ON_SERVICES: AddOnService[] = [
  {
    id: 'srv-01',
    name: 'Ocean Adventure',
    subtitle: 'กิจกรรมทางน้ำและอุปกรณ์ดำน้ำ',
    category: 'ocean',
    priceRange: '฿1,500 – ฿5,000 / รายการ',
    basePrice: 2500,
    unit: 'ต่อแพ็กเกจอุปกรณ์',
    description: 'กิจกรรมพายเรือคายัคท้องใส (Clear Kayak), แพดเดิลบอร์ด (Paddleboard), สน็อกเกิ้ล และ Seabob ดำน้ำลึก เหมาะสำหรับกลุ่มเพื่อนและครอบครัว',
    items: ['คายัคใสถ่ายรูปสวยงาม', 'Stand Up Paddleboard 2 ลำ', 'หน้ากาก Full-face Snorkel', 'อุปกรณ์ลอยน้ำห่วงยางยูนิคอร์น/ฟลามิงโก้'],
    image: '/src/assets/images/family_voyage_activities_1792177509479.jpg'
  },
  {
    id: 'srv-02',
    name: 'Private Chef & Fine Dining',
    subtitle: 'บริการเชฟส่วนตัวและดินเนอร์หรู',
    category: 'dining',
    priceRange: '฿4,500 – ฿12,000 / กลุ่ม',
    basePrice: 6500,
    unit: 'ต่อกลุ่ม (ขึ้นกับคอร์สเมนู)',
    description: 'เชฟส่วนตัวปรุงสดบนเรือ อาหารทะเลภูเก็ตพรีเมียม ล็อบสเตอร์ย่างเนยกระเทียม ซาชิมิสด และเมนูเฉพาะบุคคลตามความต้องการ',
    items: ['เชฟส่วนตัวปรุงสดตลอดการล่องเรือ', 'ซีฟู้ดพลาตเตอร์ระดับพรีเมียม', 'สเต็กเนื้อวากิวออสเตรเลีย', 'ของหวานซิกเนเจอร์ผลไม้ทรอปิคอล'],
    image: '/src/assets/images/private_chef_dining_1792177509041.jpg'
  },
  {
    id: 'srv-03',
    name: 'Luxury Photo & Video',
    subtitle: 'ช่างภาพมืออาชีพและโดรนทางทะเล',
    category: 'media',
    priceRange: '฿3,500 – ฿9,000 / ครั้ง',
    basePrice: 4500,
    unit: 'ต่อทริป',
    description: 'ช่างภาพมืออาชีพเก็บภาพความประทับใจ ภาพถ่ายบนเรือยอร์ชมุมมองสูงด้วยโดรน วิดีโอสั้นพร้อมตัดต่อสำหรับ Instagram/Reels/TikTok',
    items: ['ช่างภาพพร้อมอุปกรณ์โปรตลอดทริป', 'ถ่ายภาพมุมสูงด้วยโดรนความละเอียด 4K', 'ปรับแต่งสีโทน Ocean Aesthetic 50+ ภาพ', 'คลิป Reel สั้นพร้อมแชร์ ภายใน 48 ชั่วโมง'],
    image: '/src/assets/images/azure_romance_sunset_1792177509767.jpg'
  },
  {
    id: 'srv-04',
    name: 'Celebration Styling',
    subtitle: 'จัดตกแต่งเรือสำหรับโอกาสพิเศษ',
    category: 'styling',
    priceRange: '฿2,500 – ฿10,000 / งาน',
    basePrice: 3500,
    unit: 'ต่องานฉลอง',
    description: 'จัดดอกไม้สด ซุ้มไฟประดับ ป้ายข้อความสั่งทำพิเศษ เค้กวันเกิด หรือเซตเซอร์ไพรส์ขอแต่งงานที่ออกแบบเฉพาะตัว',
    items: ['ซุ้มดอกไม้สดดีไซน์หรูหรา', 'ไฟประดับ Fairy Lights โรแมนติก', 'เค้กวันเกิดหรือแชมเปญพรีเมียม', 'ป้ายข้อความอะคริลิกสั่งทำพิเศษ'],
    image: '/src/assets/images/azure_romance_sunset_1792177509767.jpg'
  },
  {
    id: 'srv-05',
    name: 'VIP Transfer & Concierge',
    subtitle: 'รถรับส่งสนามบินและโรงแรมหรู',
    category: 'concierge',
    priceRange: '฿2,000 – ฿8,000 / กลุ่ม',
    basePrice: 2800,
    unit: 'ต่อเที่ยวไป-กลับ',
    description: 'รถตู้ Alphard หรือ Mercedes Benz รับส่งจากโรงแรมหรือสนามบิน พร้อมพนักงานต้อนรับนำท่านขึ้นเรืออย่างสะดวกสบายและเป็นส่วนตัว',
    items: ['รถยนต์ Luxury Van รับส่งส่วนตัว', 'น้ำดื่มเย็นและผ้าเย็นกลิ่นอโรมา', 'Fast-track เช็คอิน ณ ท่าเรือ Marina', 'ผู้ประสานงานกระเป๋าเดินทางส่วนตัว'],
    image: '/src/assets/images/hero_luxury_yacht_1792177508211.jpg'
  }
];

export const PROMOTIONS: Promotion[] = [
  {
    id: 'promo-01',
    code: 'ROMANTIC10',
    title: 'Romantic Escape — คู่รัก',
    target: 'คู่รัก ฮันนีมูน และครบรอบ',
    discountBadge: 'ลด 10%',
    discountPercent: 10,
    description: 'จองแพ็กเกจ Azure Romance รับส่วนลดค่าตกแต่งเรือ 10% หรือรับภาพถ่ายดิจิทัลระดับมืออาชีพ 5 ภาพฟรี เมื่อจองล่วงหน้าตามเงื่อนไข',
    terms: ['จองล่วงหน้าอย่างน้อย 7 วัน', 'ใช้ได้กับแพ็กเกจ Azure Romance เท่านั้น', 'ไม่สามารถเปลี่ยนเป็นเงินสดได้'],
    goal: 'เพิ่มยอดจองวันครบรอบ ฮันนีมูน และขอแต่งงาน',
    bgGradient: 'from-[#134C65] to-[#152740]'
  },
  {
    id: 'promo-02',
    code: 'FAMILYREWARD',
    title: 'Family Ocean Rewards — ครอบครัว',
    target: 'ครอบครัวและเด็กเล็ก',
    discountBadge: 'รับสิทธิพิเศษ',
    discountPercent: 5,
    description: 'รับเซตผลไม้พรีเมียมสำหรับครอบครัวฟรี และส่วนลดกิจกรรมทางน้ำสำหรับเด็ก 15% พร้อมอุปกรณ์ชูชีพความปลอดภัยครบชุด',
    terms: ['สำหรับการจองทริปครอบครัวที่มีผู้เดินทางตั้งแต่ 4 ท่านขึ้นไป', 'แจ้งสิทธิ์ขณะทำรายการจอง'],
    goal: 'ดึงดูดครอบครัวและเพิ่มยอดการใช้จ่ายต่อการจอง',
    bgGradient: 'from-[#134C65] to-[#487F86]'
  },
  {
    id: 'promo-03',
    code: 'SAIL8',
    title: 'Sail Together — กลุ่มเพื่อน',
    target: 'กลุ่มเพื่อน 6 คนขึ้นไป',
    discountBadge: 'ลด 8%',
    discountPercent: 8,
    description: 'สำหรับการจองตั้งแต่ 6 คนขึ้นไป รับส่วนลดทันที 8% จากยอดรวม หรือรับแพ็กเกจถ่ายภาพกลุ่มในราคาพิเศษ',
    terms: ['จำนวนผู้โดยสาร 6 คนขึ้นไป', 'ใช้ได้กับทุกแพ็กเกจเรือยอร์ช'],
    goal: 'เพิ่มการจองเป็นกลุ่มและการบอกต่อบนโซเชียลมีเดีย',
    bgGradient: 'from-[#487F86] to-[#134C65]'
  },
  {
    id: 'promo-04',
    code: 'CORP10',
    title: 'Corporate Privilege — องค์กร',
    target: 'บริษัท องค์กร และทริปพนักงาน',
    discountBadge: 'ข้อเสนอเฉพาะบริษัท',
    discountPercent: 10,
    description: 'รับส่วนลด 10% เมื่อจองตั้งแต่ 2 ทริปขึ้นไป หรือรับบริการจัดตารางกิจกรรม Team Building และตกแต่งเรือตามธีมองค์กรฟรี',
    terms: ['ออกใบกำกับภาษีในนามนิติบุคคลได้', 'สามารถวางบิลและปรับแต่งเส้นทางพิเศษได้'],
    goal: 'สร้างรายได้จากลูกค้าองค์กรและการจองซ้ำอย่างต่อเนื่อง',
    bgGradient: 'from-[#152740] to-[#134C65]'
  },
  {
    id: 'promo-05',
    code: 'GLOBAL5',
    title: 'Global Explorer — นักท่องเที่ยวต่างชาติ',
    target: 'International Guests (Early Bird)',
    discountBadge: 'Early Bird ลด 5%',
    discountPercent: 5,
    description: 'รับส่วนลด 5% เมื่อจองล่วงหน้าอย่างน้อย 30 วัน พร้อมคู่มือท่องเที่ยวภาษาอังกฤษและบริการผู้ประสานงานส่วนบุคคล',
    terms: ['จองล่วงหน้ามากกว่า 30 วัน', 'ชำระมัดจำเพื่อยืนยันสิทธิ์'],
    goal: 'ขยายตลาดนักท่องเที่ยวคุณภาพสูงจากต่างประเทศ',
    bgGradient: 'from-[#134C65] to-[#152740]'
  }
];

export const MEMBERSHIP_TIERS: MembershipTier[] = [
  {
    id: 'mem-pearl',
    tierName: 'Pearl',
    thaiName: 'ไข่มุกอันดามัน',
    colorHex: '#CBD5E1',
    condition: 'สมัครสมาชิกฟรีผ่านหน้าเว็บไซต์',
    privileges: [
      'รับข่าวสารเส้นทางใหม่และโปรโมชั่นพิเศษก่อนใคร',
      'ส่วนลด 5% สำหรับบริการเสริมในวันเกิด',
      'สิทธิ์สะสมคะแนน Valérielle Miles'
    ],
    cardAccent: 'from-slate-100 to-slate-200 text-slate-800'
  },
  {
    id: 'mem-sapphire',
    tierName: 'Sapphire',
    thaiName: 'ไพลินน้ำเงินคราม',
    colorHex: '#38BDF8',
    condition: 'จองใช้บริการครบ 3 ครั้ง',
    privileges: [
      'ส่วนลดบริการเสริม (Add-ons) 5% ทุกรายการ',
      'ฟรี Welcome Drink เซตพรีเมียมทุกการเดินทาง',
      'บริการเลื่อนวันเดินทางฟรี 1 ครั้งล่วงหน้า 7 วัน'
    ],
    cardAccent: 'from-[#134C65] to-[#487F86] text-white'
  },
  {
    id: 'mem-royalblue',
    tierName: 'Royal Blue',
    thaiName: 'รอยัลบลูทรงคุณค่า',
    colorHex: '#2563EB',
    condition: 'จองใช้บริการครบ 5 ครั้ง',
    privileges: [
      'ส่วนลดบริการเสริม 10% ทุกรายการตลอดปี',
      'สิทธิ์สำรองเรือล่วงหน้าในเทศกาลพิเศษก่อนใคร',
      'อัปเกรดแชมเปญฟรีสำหรับทริปครอบครัวและวันครบรอบ',
      'ฟรีบริการเรือคายัคใสและอุปกรณ์กิจกรรมทางน้ำ'
    ],
    cardAccent: 'from-[#152740] to-[#134C65] text-white'
  },
  {
    id: 'mem-gold',
    tierName: 'Gold Privilege',
    thaiName: 'โกลด์ พริวิเลจ ระดับเกียรติยศ',
    colorHex: '#B69A5A',
    condition: 'ลูกค้า VIP หรือองค์กรตามเกณฑ์ยอดสะสม 200,000฿+',
    privileges: [
      'ผู้ประสานงานส่วนบุคคล (Personal Yacht Concierge 24/7)',
      'ข้อเสนอและแพ็กเกจปรับแต่งเฉพาะบุคคล (Custom Route Planning)',
      'ฟรีบริการรถรับส่ง VIP Limousine ทุกการเดินทาง',
      'เชิญร่วมงาน Exclusive Marina Sunset Gala ประจำปี'
    ],
    cardAccent: 'from-[#B69A5A] via-[#856D38] to-[#152740] text-amber-100'
  }
];

export const TARGET_AUDIENCES: TargetAudience[] = [
  {
    id: 'aud-01',
    title: 'คู่รักและคู่ฮันนีมูน',
    englishTitle: 'Couples & Honeymooners',
    description: 'ลูกค้าที่ต้องการความเป็นส่วนตัว บรรยากาศแสนโรแมนติก ล่องเรือชมพระอาทิตย์ตก ฉลองวันครบรอบ และขอแต่งงานกลางทะเล',
    recommendedPackageId: 'pkg-02',
    keyDesire: 'ดินเนอร์แสงเทียน ดอกไม้ วิวพระอาทิตย์ตก และความเงียบสงบส่วนตัว',
    iconName: 'Heart'
  },
  {
    id: 'aud-02',
    title: 'ครอบครัว',
    englishTitle: 'Families',
    description: 'ครอบครัวที่ต้องการทำกิจกรรมร่วมกัน พักผ่อนบนเรือ ปลอดภัยสำหรับเด็กและผู้สูงอายุ พร้อมอุปกรณ์และอาหารที่ดูแลทุกคน',
    recommendedPackageId: 'pkg-03',
    keyDesire: 'ความปลอดภัยสูงสุด ชูชีพเด็ก อาหารทานง่าย และกิจกรรมสนุกพร้อมหน้า',
    iconName: 'Users'
  },
  {
    id: 'aud-03',
    title: 'กลุ่มเพื่อน',
    englishTitle: 'Friends & Groups',
    description: 'กลุ่มเพื่อนที่ต้องการจัดทริปส่วนตัว ถ่ายรูปสวย เล่นน้ำ ทะเล ปาร์ตี้วันเกิด และสร้างโมเมนต์สนุกสนานร่วมกันบนเรือยอร์ชหรู',
    recommendedPackageId: 'pkg-01',
    keyDesire: 'คายัคใส ถ่ายรูปมุมสูง ฟังเพลงชิลล์ๆ และว่ายน้ำทะเลอันดามัน',
    iconName: 'Sparkles'
  },
  {
    id: 'aud-04',
    title: 'ลูกค้าระดับพรีเมียม',
    englishTitle: 'VIP & Luxury Travelers',
    description: 'นักท่องเที่ยวที่ต้องการบริการระดับสูงสุด อาหารเชฟพรีเมียม ผู้ประสานงานส่วนตัว และความเป็นส่วนตัวขั้นสุดยอด',
    recommendedPackageId: 'pkg-04',
    keyDesire: 'เชฟบนเรือ ลีมูซีนรับส่ง เส้นทางเกาะส่วนตัว และการบริการแบบบัตเลอร์',
    iconName: 'Crown'
  },
  {
    id: 'aud-05',
    title: 'ลูกค้าองค์กร',
    englishTitle: 'Corporate Clients',
    description: 'บริษัทและองค์กรที่ต้องการจัด Team Building เลี้ยงรับรองลูกค้าสำคัญ หรือสัมมนาผู้บริหารในบรรยากาศพรีเมียม',
    recommendedPackageId: 'pkg-05',
    keyDesire: 'การสร้างภาพลักษณ์แบรนด์ ตกแต่งธีมองค์กร และเอกสารทางธุรกิจถูกต้อง',
    iconName: 'Briefcase'
  },
  {
    id: 'aud-06',
    title: 'นักท่องเที่ยวต่างชาติ',
    englishTitle: 'International Travelers',
    description: 'นักท่องเที่ยวจากทั่วโลกที่ต้องการสัมผัสความงดงามของทะเลไทย พร้อมบริการภาษาอังกฤษและการดูแลระดับสากล',
    recommendedPackageId: 'pkg-04',
    keyDesire: 'การสื่อสารภาษาอังกฤษที่คล่องแคล่ว ความสะดวกในการจอง และความปลอดภัย',
    iconName: 'Globe'
  }
];

export interface DatabaseTableDefinition {
  tableName: string;
  thaiDescription: string;
  columns: { name: string; type: string; isPrimary?: boolean; isForeign?: boolean; desc: string }[];
  sampleData: Record<string, string | number>[];
}

export const DATABASE_TABLES: DatabaseTableDefinition[] = [
  {
    tableName: 'customers',
    thaiDescription: 'รหัสลูกค้า ชื่อ อีเมล เบอร์โทรศัพท์ และข้อมูลติดต่อ',
    columns: [
      { name: 'customer_id', type: 'VARCHAR(20)', isPrimary: true, desc: 'รหัสประจำตัวลูกค้า' },
      { name: 'full_name', type: 'VARCHAR(100)', desc: 'ชื่อ-นามสกุล' },
      { name: 'email', type: 'VARCHAR(100)', desc: 'อีเมลติดต่อ' },
      { name: 'phone', type: 'VARCHAR(20)', desc: 'หมายเลขโทรศัพท์' },
      { name: 'country', type: 'VARCHAR(50)', desc: 'ประเทศ' },
      { name: 'membership_tier', type: 'VARCHAR(20)', desc: 'ระดับสมาชิก (Pearl, Sapphire...)' }
    ],
    sampleData: [
      { customer_id: 'CUST-001', full_name: 'คุณพัชราภรณ์ วิริยะกุล', email: 'patchara@example.com', phone: '081-987-6543', country: 'Thailand', membership_tier: 'Royal Blue' },
      { customer_id: 'CUST-002', full_name: 'Mr. Alexander Vance', email: 'alex.vance@yachting.co.uk', phone: '+44 7911 123456', country: 'United Kingdom', membership_tier: 'Gold Privilege' },
      { customer_id: 'CUST-003', full_name: 'คุณธีรภัทร อัครเดชากร', email: 'theerapat@corp-asia.th', phone: '089-555-8888', country: 'Thailand', membership_tier: 'Sapphire' }
    ]
  },
  {
    tableName: 'yachts',
    thaiDescription: 'รหัสเรือ ชื่อเรือ ความจุ และรายละเอียดสิ่งอำนวยความสะดวก',
    columns: [
      { name: 'yacht_id', type: 'VARCHAR(20)', isPrimary: true, desc: 'รหัสเรือยอร์ช' },
      { name: 'name', type: 'VARCHAR(80)', desc: 'ชื่อเรือ' },
      { name: 'model', type: 'VARCHAR(100)', desc: 'รุ่นและประเภทเรือ' },
      { name: 'length_ft', type: 'INT', desc: 'ความยาว (ฟุต)' },
      { name: 'max_capacity', type: 'INT', desc: 'ความจุผู้โดยสารสูงสุด' },
      { name: 'status', type: 'VARCHAR(20)', desc: 'สถานะความพร้อม' }
    ],
    sampleData: [
      { yacht_id: 'YACHT-95', name: 'Valérielle Sovereign', model: 'Benetti Delfino 95 Superyacht', length_ft: 95, max_capacity: 12, status: 'Ready' },
      { yacht_id: 'YACHT-60', name: 'Azure Serenity', model: 'Lagoon 60 Sailing Catamaran', length_ft: 60, max_capacity: 8, status: 'Ready' },
      { yacht_id: 'YACHT-55', name: 'Ocean Pearl Princess', model: 'Sunseeker Manhattan 55', length_ft: 55, max_capacity: 6, status: 'Maintenance' }
    ]
  },
  {
    tableName: 'packages',
    thaiDescription: 'รหัสแพ็กเกจ ชื่อ รายละเอียด ระยะเวลา และราคา',
    columns: [
      { name: 'package_id', type: 'VARCHAR(20)', isPrimary: true, desc: 'รหัสแพ็กเกจ' },
      { name: 'package_name', type: 'VARCHAR(100)', desc: 'ชื่อแพ็กเกจท่องเที่ยว' },
      { name: 'duration_hours', type: 'VARCHAR(30)', desc: 'ระยะเวลาล่องเรือ' },
      { name: 'max_guests', type: 'INT', desc: 'จำนวนผู้โดยสารรวม' },
      { name: 'base_price', type: 'DECIMAL(10,2)', desc: 'ราคาเริ่มต้น (บาท)' }
    ],
    sampleData: [
      { package_id: 'PKG-01', package_name: 'Azure Escape', duration_hours: '4 ชม.', max_guests: 6, base_price: 18900 },
      { package_id: 'PKG-02', package_name: 'Azure Romance', duration_hours: '5 ชม.', max_guests: 2, base_price: 29900 },
      { package_id: 'PKG-03', package_name: 'Valérielle Family Voyage', duration_hours: '6-8 ชม.', max_guests: 8, base_price: 39900 },
      { package_id: 'PKG-04', package_name: 'Prestige Island Retreat', duration_hours: '8 ชม.', max_guests: 8, base_price: 69900 },
      { package_id: 'PKG-05', package_name: 'Blue Horizon Corporate', duration_hours: '6-8 ชม.', max_guests: 12, base_price: 59900 }
    ]
  },
  {
    tableName: 'bookings',
    thaiDescription: 'รหัสการจอง ลูกค้า แพ็กเกจ วันเดินทาง จำนวนผู้โดยสาร และสถานะ',
    columns: [
      { name: 'booking_id', type: 'VARCHAR(20)', isPrimary: true, desc: 'รหัสรายการจอง' },
      { name: 'customer_id', type: 'VARCHAR(20)', isForeign: true, desc: 'รหัสลูกค้า' },
      { name: 'package_id', type: 'VARCHAR(20)', isForeign: true, desc: 'รหัสแพ็กเกจ' },
      { name: 'charter_date', type: 'DATE', desc: 'วันเดินทาง' },
      { name: 'guest_count', type: 'INT', desc: 'จำนวนผู้โดยสาร' },
      { name: 'total_amount', type: 'DECIMAL(10,2)', desc: 'ยอดรวมสุทธิ (บาท)' },
      { name: 'booking_status', type: 'VARCHAR(20)', desc: 'สถานะการจอง (Confirmed/Pending)' }
    ],
    sampleData: [
      { booking_id: 'BK-2026-081', customer_id: 'CUST-001', package_id: 'PKG-02', charter_date: '2026-10-24', guest_count: 2, total_amount: 32400, booking_status: 'Confirmed' },
      { booking_id: 'BK-2026-082', customer_id: 'CUST-002', package_id: 'PKG-04', charter_date: '2026-11-05', guest_count: 6, total_amount: 78900, booking_status: 'Confirmed' },
      { booking_id: 'BK-2026-083', customer_id: 'CUST-003', package_id: 'PKG-05', charter_date: '2026-11-18', guest_count: 12, total_amount: 67400, booking_status: 'Pending' }
    ]
  },
  {
    tableName: 'services',
    thaiDescription: 'รหัสบริการเสริม ชื่อบริการ รายละเอียด และราคา',
    columns: [
      { name: 'service_id', type: 'VARCHAR(20)', isPrimary: true, desc: 'รหัสบริการเสริม' },
      { name: 'service_name', type: 'VARCHAR(100)', desc: 'ชื่อบริการเสริม' },
      { name: 'category', type: 'VARCHAR(50)', desc: 'หมวดหมู่' },
      { name: 'base_price', type: 'DECIMAL(10,2)', desc: 'ราคาเริ่มต้น' }
    ],
    sampleData: [
      { service_id: 'SRV-01', service_name: 'Ocean Adventure Equipment', category: 'Activities', base_price: 2500 },
      { service_id: 'SRV-02', service_name: 'Private Chef & Fine Dining', category: 'Dining', base_price: 6500 },
      { service_id: 'SRV-03', service_name: 'Luxury Drone & Photo Package', category: 'Media', base_price: 4500 },
      { service_id: 'SRV-04', service_name: 'Romantic Floral Styling', category: 'Decor', base_price: 3500 },
      { service_id: 'SRV-05', service_name: 'VIP Limousine Transfer', category: 'Transport', base_price: 2800 }
    ]
  },
  {
    tableName: 'booking_services',
    thaiDescription: 'รายการบริการเสริมที่เลือกในแต่ละการจอง',
    columns: [
      { name: 'id', type: 'INT', isPrimary: true, desc: 'รหัสแถว' },
      { name: 'booking_id', type: 'VARCHAR(20)', isForeign: true, desc: 'รหัสการจอง' },
      { name: 'service_id', type: 'VARCHAR(20)', isForeign: true, desc: 'รหัสบริการเสริม' },
      { name: 'quantity', type: 'INT', desc: 'จำนวนรายการ' },
      { name: 'subtotal', type: 'DECIMAL(10,2)', desc: 'ราคารวมย่อย' }
    ],
    sampleData: [
      { id: 1, booking_id: 'BK-2026-081', service_id: 'SRV-04', quantity: 1, subtotal: 3500 },
      { id: 2, booking_id: 'BK-2026-082', service_id: 'SRV-02', quantity: 1, subtotal: 6500 },
      { id: 3, booking_id: 'BK-2026-082', service_id: 'SRV-03', quantity: 1, subtotal: 4500 }
    ]
  },
  {
    tableName: 'promotions',
    thaiDescription: 'รหัสโปรโมชั่น รายละเอียดส่วนลด เงื่อนไข และวันหมดเขต',
    columns: [
      { name: 'promo_code', type: 'VARCHAR(20)', isPrimary: true, desc: 'รหัสโค้ดโปรโมชั่น' },
      { name: 'title', type: 'VARCHAR(100)', desc: 'ชื่อแคมเปญ' },
      { name: 'discount_pct', type: 'INT', desc: 'เปอร์เซ็นต์ส่วนลด' },
      { name: 'expiry_date', type: 'DATE', desc: 'วันหมดเขต' }
    ],
    sampleData: [
      { promo_code: 'ROMANTIC10', title: 'Romantic Escape — คู่รัก', discount_pct: 10, expiry_date: '2026-12-31' },
      { promo_code: 'SAIL8', title: 'Sail Together — กลุ่มเพื่อน 6+', discount_pct: 8, expiry_date: '2026-12-31' },
      { promo_code: 'CORP10', title: 'Corporate Privilege — องค์กร', discount_pct: 10, expiry_date: '2026-12-31' },
      { promo_code: 'GLOBAL5', title: 'Global Explorer — Early Bird', discount_pct: 5, expiry_date: '2026-12-31' }
    ]
  },
  {
    tableName: 'memberships',
    thaiDescription: 'ระดับสมาชิก เงื่อนไข และสิทธิประโยชน์',
    columns: [
      { name: 'tier_id', type: 'VARCHAR(20)', isPrimary: true, desc: 'รหัสระดับสมาชิก' },
      { name: 'tier_name', type: 'VARCHAR(50)', desc: 'ชื่อระดับสมาชิก' },
      { name: 'min_trips', type: 'INT', desc: 'เกณฑ์จำนวนครั้งการจอง' },
      { name: 'discount_addons_pct', type: 'INT', desc: 'ส่วนลดบริการเสริม' }
    ],
    sampleData: [
      { tier_id: 'TIER-1', tier_name: 'Pearl', min_trips: 0, discount_addons_pct: 0 },
      { tier_id: 'TIER-2', tier_name: 'Sapphire', min_trips: 3, discount_addons_pct: 5 },
      { tier_id: 'TIER-3', tier_name: 'Royal Blue', min_trips: 5, discount_addons_pct: 10 },
      { tier_id: 'TIER-4', tier_name: 'Gold Privilege', min_trips: 10, discount_addons_pct: 15 }
    ]
  },
  {
    tableName: 'payments',
    thaiDescription: 'รหัสการชำระเงิน รายการจอง จำนวนเงิน และสถานะการชำระ',
    columns: [
      { name: 'payment_id', type: 'VARCHAR(20)', isPrimary: true, desc: 'รหัสการชำระเงิน' },
      { name: 'booking_id', type: 'VARCHAR(20)', isForeign: true, desc: 'รหัสการจอง' },
      { name: 'payment_method', type: 'VARCHAR(50)', desc: 'วิธีชำระ (Credit Card/Wire)' },
      { name: 'amount', type: 'DECIMAL(10,2)', desc: 'จำนวนเงินที่ชำระ (บาท)' },
      { name: 'payment_status', type: 'VARCHAR(20)', desc: 'สถานะ (Paid/Authorized)' }
    ],
    sampleData: [
      { payment_id: 'PAY-901', booking_id: 'BK-2026-081', payment_method: 'Visa Signature', amount: 32400, payment_status: 'Paid' },
      { payment_id: 'PAY-902', booking_id: 'BK-2026-082', payment_method: 'Bank Wire Transfer', amount: 78900, payment_status: 'Paid' },
      { payment_id: 'PAY-903', booking_id: 'BK-2026-083', payment_method: 'Corporate Invoice', amount: 67400, payment_status: 'Authorized' }
    ]
  }
];
