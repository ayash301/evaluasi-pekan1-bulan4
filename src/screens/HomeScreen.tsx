import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet, ListRenderItem } from 'react-native';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { initialProducts } from '../data/initialProducts';
import { colors } from '../styles/colors';
import { Product } from '../types/Product';

const HomeScreen: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleAddProduct = (newProduct: Product): void => {
    setProducts([newProduct, ...products]);
    setIsModalVisible(false);
  };

  const renderHeader = (): React.JSX.Element => (
    <View style={styles.listHeader}>
    </View>
  );

  const renderItem: ListRenderItem<Product> = ({ item }) => (
    <ProductCard product={item} />
  );

  return (
    <View style={styles.container}>
      <Header 
        onAddPress={() => setIsModalVisible(true)}
        productCount={products.length}
      />
      
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <ProductModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSubmit={handleAddProduct}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingVertical: 16,
  },
  listHeader: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  productCount: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.gray700,
  },
});

export default HomeScreen;