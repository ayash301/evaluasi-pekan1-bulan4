import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { colors } from '../styles/colors';
import { validateProductForm } from '../utils/validation';
import { Product, ProductFormData, ValidationErrors } from '../types/Product';

interface ProductModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (product: Product) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ visible, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: '',
    imageUrl: '',
    description: '',
  });
  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleInputChange = (field: keyof ProductFormData, value: string): void => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const handleSubmit = (): void => {
    const validationErrors = validateProductForm(formData);
    
    if (Object.keys(validationErrors).length === 0) {
      const newProduct: Product = {
        id: Date.now(),
        name: formData.name.trim(),
        price: Number(formData.price),
        imageUrl: formData.imageUrl.trim(),
        description: formData.description.trim() || 'Tidak ada deskripsi',
      };
      
      onSubmit(newProduct);
      
      // Reset form
      setFormData({ name: '', price: '', imageUrl: '', description: '' });
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  const handleClose = (): void => {
    setFormData({ name: '', price: '', imageUrl: '', description: '' });
    setErrors({});
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalOverlay}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Tambah Produk Baru</Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
            {/* Nama Produk */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Nama Produk <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={[styles.input, errors.name && styles.inputError]}
                placeholder="Contoh: iPhone 15 Pro Max"
                value={formData.name}
                onChangeText={(value) => handleInputChange('name', value)}
              />
              {errors.name && (
                <Text style={styles.errorText}>⚠️ {errors.name}</Text>
              )}
            </View>

            {/* Harga */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Harga (Rp) <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={[styles.input, errors.price && styles.inputError]}
                placeholder="Contoh: 15000000"
                value={formData.price}
                onChangeText={(value) => handleInputChange('price', value)}
                keyboardType="numeric"
              />
              {errors.price && (
                <Text style={styles.errorText}>⚠️ {errors.price}</Text>
              )}
            </View>

            {/* URL Gambar */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                URL Gambar <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={[styles.input, errors.imageUrl && styles.inputError]}
                placeholder="https://example.com/image.jpg"
                value={formData.imageUrl}
                onChangeText={(value) => handleInputChange('imageUrl', value)}
                autoCapitalize="none"
              />
              {errors.imageUrl && (
                <Text style={styles.errorText}>⚠️ {errors.imageUrl}</Text>
              )}
              <Text style={styles.hint}>
                💡 Tips: Gunakan URL gambar dari Unsplash atau sumber online lainnya
              </Text>
            </View>

            {/* Deskripsi */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Deskripsi (Opsional)</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Deskripsikan produk Anda..."
                value={formData.description}
                onChangeText={(value) => handleInputChange('description', value)}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            {/* Buttons */}
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={handleClose}
              >
                <Text style={styles.cancelButtonText}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.submitButton]}
                onPress={handleSubmit}
              >
                <Text style={styles.submitButtonText}>Tambah Produk</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.primary,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
  },
  closeButtonText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalContent: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.gray700,
    marginBottom: 8,
  },
  required: {
    color: colors.error,
  },
  input: {
    borderWidth: 2,
    borderColor: colors.gray300,
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: colors.gray900,
  },
  inputError: {
    borderColor: colors.error,
  },
  textArea: {
    height: 100,
    paddingTop: 14,
  },
  errorText: {
    color: colors.error,
    fontSize: 13,
    marginTop: 6,
  },
  hint: {
    color: colors.gray500,
    fontSize: 12,
    marginTop: 6,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 10,
    marginBottom: 20,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: colors.gray200,
  },
  cancelButtonText: {
    color: colors.gray700,
    fontSize: 15,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: colors.primary,
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default ProductModal;
