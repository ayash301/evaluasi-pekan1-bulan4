import { ProductFormData, ValidationErrors } from '../types/Product';

export const validateProductForm = (formData: ProductFormData): ValidationErrors => {
  const errors: ValidationErrors = {};
  
  if (!formData.name.trim()) {
    errors.name = 'Nama produk wajib diisi';
  }
  
  if (!formData.price) {
    errors.price = 'Harga wajib diisi';
  } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
    errors.price = 'Harga harus berupa angka positif';
  }
  
  if (!formData.imageUrl.trim()) {
    errors.imageUrl = 'URL gambar wajib diisi';
  } else if (!isValidImageUrl(formData.imageUrl)) {
    errors.imageUrl = 'URL gambar tidak valid (harus http/https dan berakhir .jpg/.png/.gif/.webp)';
  }
  
  return errors;
};

export const isValidImageUrl = (url: string): boolean => {
  const pattern = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i;
  return pattern.test(url);
};

