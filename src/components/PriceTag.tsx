import React from 'react';

export type PriceFontOption = 'cinzel' | 'playfair' | 'cormorant' | 'plus-jakarta';

export interface PriceFontConfig {
  id: PriceFontOption;
  name: string;
  fontFamily: string;
  description: string;
}

export const PRICE_FONT_OPTIONS: PriceFontConfig[] = [
  {
    id: 'cinzel',
    name: 'Cinzel Royal',
    fontFamily: "'Cinzel', serif",
    description: 'ความสง่างามระดับราชวงศ์ ตัวเลขโรมันคมชัด สไตล์ Superyacht Club',
  },
  {
    id: 'playfair',
    name: 'Playfair Display',
    fontFamily: "'Playfair Display', serif",
    description: 'สไตล์นิตยสารลักชัวรีริเวียร่า คลาสสิก หรูหรา อ่อนช้อย',
  },
  {
    id: 'cormorant',
    name: 'Cormorant Garamond',
    fontFamily: "'Cormorant Garamond', serif",
    description: 'ความประณีตระดับ Fine Jewelry เบาบางและทรงคุณค่า',
  },
  {
    id: 'plus-jakarta',
    name: 'Modern Clean Sans',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    description: 'สไตล์โมเดิร์นคลีน ตัวเลขอ่านง่ายสบายตาระดับสากล',
  },
];

interface PriceTagProps {
  amount: number | string;
  currency?: string;
  suffix?: string;
  size?: 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  variant?: 'gold' | 'navy' | 'light' | 'white';
  className?: string;
  activeFont?: PriceFontOption;
}

export const PriceTag: React.FC<PriceTagProps> = ({
  amount,
  currency = '฿',
  suffix = '',
  size = 'lg',
  variant = 'navy',
  className = '',
  activeFont = 'cinzel',
}) => {
  const fontConfig = PRICE_FONT_OPTIONS.find(f => f.id === activeFont) || PRICE_FONT_OPTIONS[0];

  // Format amount with comma separation if numeric
  let formattedNumber: string = '';
  if (typeof amount === 'number') {
    formattedNumber = amount.toLocaleString('th-TH');
  } else {
    // If it's a string like "1,500 – 5,000" or already formatted
    formattedNumber = amount.replace(/^[฿\s]+/, '');
  }

  // Size classes
  const sizeClasses = {
    sm: 'text-sm font-semibold',
    base: 'text-base font-bold',
    lg: 'text-xl font-bold tracking-tight',
    xl: 'text-2xl font-bold tracking-tight',
    '2xl': 'text-3xl font-extrabold tracking-tight',
    '3xl': 'text-4xl font-extrabold tracking-tight',
    '4xl': 'text-5xl lg:text-6xl font-black tracking-tight',
  }[size];

  // Variant color classes
  const variantClasses = {
    navy: 'text-[#102D4F]',
    gold: 'text-[#B69A5A] drop-shadow-xs',
    light: 'text-[#134C65]',
    white: 'text-white',
  }[variant];

  return (
    <span
      className={`inline-flex items-baseline font-price tabular-nums transition-all ${sizeClasses} ${variantClasses} ${className}`}
      style={{ fontFamily: fontConfig.fontFamily }}
      title={`Price font: ${fontConfig.name}`}
    >
      {currency && (
        <span className="text-[0.75em] font-medium opacity-85 mr-0.5 select-none">
          {currency}
        </span>
      )}
      <span className="tracking-tight">{formattedNumber}</span>
      {suffix && (
        <span className="text-[0.65em] font-normal text-slate-500 ml-1 select-none">
          {suffix}
        </span>
      )}
    </span>
  );
};
