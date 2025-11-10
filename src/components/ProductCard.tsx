import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import { formatCurrency } from '../utils/formatCurrency';
import { colors } from '../styles/colors';
import { Product } from '../types/Product';
import { getResponsiveFontSize, isTablet } from '../utils/responsive';

interface ProductCardProps {
  product: Product;
  cardWidth: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, cardWidth }) => {
  const [imageError, setImageError] = useState(false);
  const { width } = useWindowDimensions();
  const isTabletDevice = isTablet(width);

  return (
    <View style={[styles.card, { width: cardWidth }]}>
      <View style={styles.imageContainer}>
        {!imageError ? (
          <Image 
            source={{ uri: product.imageUrl }}
            style={styles.image}
            resizeMode="cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderIcon}>📦</Text>
            <Text style={[styles.placeholderText, { fontSize: getResponsiveFontSize(13) }]}>
              Gambar tidak tersedia
            </Text>
          </View>
        )}
        <View style={styles.badge}>
          <Text style={[styles.badgeText, { fontSize: getResponsiveFontSize(10) }]}>BARU</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={[styles.name, { fontSize: getResponsiveFontSize(isTabletDevice ? 17 : 16) }]} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={[styles.description, { fontSize: getResponsiveFontSize(13) }]} numberOfLines={2}>
          {product.description}
        </Text>
        
        <View style={styles.footer}>
          <View>
            <Text style={[styles.priceLabel, { fontSize: getResponsiveFontSize(11) }]}>Harga</Text>
            <Text style={[styles.price, { fontSize: getResponsiveFontSize(isTabletDevice ? 20 : 18) }]}>
              {formatCurrency(product.price)}
            </Text>
          </View>
          <TouchableOpacity style={styles.buyButton}>
            <Text style={[styles.buyButtonText, { fontSize: getResponsiveFontSize(14) }]}>Beli</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    backgroundColor: colors.gray100,
  },
  image: {
    width: '100%',
    height: 180,
  },
  placeholderContainer: {
    width: '100%',
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.gray200,
  },
  placeholderIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  placeholderText: {
    color: colors.gray500,
    fontWeight: '500',
  },
  badge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontWeight: 'bold',
    color: colors.primary,
  },
  content: {
    padding: 16,
  },
  name: {
    fontWeight: 'bold',
    color: colors.gray900,
    marginBottom: 8,
    minHeight: 44,
  },
  description: {
    color: colors.gray600,
    marginBottom: 16,
    minHeight: 38,
    lineHeight: 19,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
  },
  priceLabel: {
    color: colors.gray500,
    marginBottom: 4,
  },
  price: {
    fontWeight: 'bold',
    color: colors.primary,
  },
  buyButton: {
    backgroundColor: colors.gray100,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buyButtonText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
});

export default ProductCard;
