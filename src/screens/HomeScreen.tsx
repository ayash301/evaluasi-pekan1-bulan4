import React, { useState, useMemo } from 'react';
import { View, FlatList, Text, StyleSheet, useWindowDimensions, ListRenderItem } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { initialProducts } from '../data/initialProducts';
import { colors } from '../styles/colors';
import { Product } from '../types/Product';
import { getColumnCount, getResponsiveFontSize, isLandscape, isTablet } from '../utils/responsive';

const HomeScreen: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const isTabletDevice = isTablet(width);
  const isLandscapeMode = isLandscape(width, height);
  const columnCount = getColumnCount(width);

  // Calculate responsive card width
  const cardWidth = useMemo(() => {
    const gap = 16;
    const horizontalPadding = 16;
    const totalHorizontalSpace = (gap * (columnCount - 1)) + (horizontalPadding * 2);
    return (width - totalHorizontalSpace - insets.left - insets.right) / columnCount;
  }, [width, columnCount, insets]);

  const handleAddProduct = (newProduct: Product): void => {
    setProducts([newProduct, ...products]);
    setIsModalVisible(false);
  };

  const renderHeader = (): React.JSX.Element => (
    <View style={styles.listHeader}>
      <Text style={[styles.productCount, { fontSize: getResponsiveFontSize(16) }]}>
        📦 {products.length} Produk Tersedia
      </Text>
      <Text style={[styles.layoutInfo, { fontSize: getResponsiveFontSize(13) }]}>
        {isLandscapeMode ? '↔️ Landscape' : '↕️ Portrait'} · {columnCount} Kolom 
        {isTabletDevice ? ' · Tablet' : ' · Mobile'} · {Math.round(width)}px
      </Text>
    </View>
  );

  const renderItem: ListRenderItem<Product> = ({ item }) => (
    <ProductCard product={item} cardWidth={cardWidth} />
  );

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <Header 
        onAddPress={() => setIsModalVisible(true)}
        productCount={products.length}
      />
      
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        numColumns={columnCount}
        key={`column-${columnCount}`} // Force re-render when column count changes
        contentContainerStyle={[
          styles.listContent,
          { 
            paddingBottom: insets.bottom + 20,
            paddingHorizontal: 8,
          }
        ]}
        columnWrapperStyle={columnCount > 1 ? styles.columnWrapper : undefined}
        showsVerticalScrollIndicator={false}
      />

      <ProductModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSubmit={handleAddProduct}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingTop: 16,
  },
  listHeader: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  productCount: {
    fontWeight: '600',
    color: colors.gray700,
    marginBottom: 4,
  },
  layoutInfo: {
    color: colors.gray500,
    fontStyle: 'italic',
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
});

export default HomeScreen;