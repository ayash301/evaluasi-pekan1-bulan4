export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}

export interface ProductFormData {
  name: string;
  price: string;
  imageUrl: string;
  description: string;
}

export interface ValidationErrors {
  name?: string;
  price?: string;
  imageUrl?: string;
  description?: string;
}