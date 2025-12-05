export interface Booking {
  id: string;
  userId: string;
  technicianId: string;
  technicianName: string;
  category: string;
  address: string;
  scheduledDate: any;
  status: "pending" | "confirmed" | "in-progress" | "completed" | "cancelled";
  notes?: string;
  totalPrice: number;
  createdAt?: any;
  updatedAt?: any;
}

export interface BookingForm {
  userId: string;
  technicianId: string;
  technicianName: string;
  category: string;
  address: string;
  scheduledDate: string;
  status: "pending" | "confirmed" | "in-progress" | "completed" | "cancelled";
  notes: string;
  totalPrice: number;
}

export const BOOKING_STATUS = [
  { value: "pending", label: "Menunggu" },
  { value: "confirmed", label: "Dikonfirmasi" },
  { value: "in-progress", label: "Sedang Dikerjakan" },
  { value: "completed", label: "Selesai" },
  { value: "cancelled", label: "Dibatalkan" },
] as const;
