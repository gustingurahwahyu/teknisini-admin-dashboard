export interface Technician {
  id: string;
  name: string;
  category: string;
  location: string;
  description: string;
  rating: number;
  price: number;
  skills: string[];
  phone: string;
  email: string;
  available: boolean;
  photoURL?: string;
  createdAt?: any;
  updatedAt?: any;
}

export interface TechnicianForm {
  name: string;
  category: string;
  location: string;
  description: string;
  rating: number;
  price: number;
  skills: string;
  phone: string;
  email: string;
  available: boolean;
}

export const CATEGORIES = [
  "Kelistrikan",
  "Elektronik",
  "Jaringan",
  "Komputer",
  "Otomotif",
];
