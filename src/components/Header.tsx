import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../styles/colors';
import { getResponsiveFontSize, isTablet } from '../utils/responsive';

interface HeaderProps {
  onAddPress: () => void;
  productCount: number;
}

const Header: React.FC<HeaderProps> = ({ onAddPress, productCount }) => {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const isTabletDevice = isTablet(width);

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
      <View style={styles.leftSection}>
        <View style={styles.iconContainer}>
          <Text style={styles.iconText}>🛒</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.title, { fontSize: getResponsiveFontSize(isTabletDevice ? 22 : 18) }]}>
            Mini E-Commerce
          </Text>
          <Text style={[styles.subtitle, { fontSize: getResponsiveFontSize(11) }]}>
            Belanja mudah, harga terjangkau
          </Text>
        </View>
      </View>
      
      <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
        <Text style={[styles.addButtonText, { fontSize: getResponsiveFontSize(13) }]}>
          {isTabletDevice ? '+ Tambah Produk' : '+ Tambah'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  iconContainer: {
    width: 52,
    height: 52,
    backgroundColor: colors.primary,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconText: {
    fontSize: 26,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  subtitle: {
    color: colors.gray600,
    lineHeight: 16,
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  addButtonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
});

export default Header;
