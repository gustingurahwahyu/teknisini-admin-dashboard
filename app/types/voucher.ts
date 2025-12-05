export interface Voucher {
  id: string;
  code: string;
  description: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minPurchase: number;
  maxDiscount?: number;
  usageLimit: number;
  usageCount: number;
  validFrom: any;
  validUntil: any;
  isActive: boolean;
  createdAt?: any;
  updatedAt?: any;
}

export interface VoucherForm {
  code: string;
  description: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minPurchase: number;
  maxDiscount: number;
  usageLimit: number;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
}

export const DISCOUNT_TYPES = [
  { value: "percentage", label: "Persentase (%)" },
  { value: "fixed", label: "Nominal Tetap (Rp)" },
] as const;
