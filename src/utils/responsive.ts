import { PixelRatio } from 'react-native';

export const getResponsiveFontSize = (baseSize: number): number => {
  const fontScale = PixelRatio.getFontScale();
  return Math.min(baseSize, baseSize * fontScale);
};

export const getColumnCount = (width: number): number => {
  if (width > 900) return 4; // Desktop/Large Tablet Landscape
  if (width > 600) return 3; // Tablet/Large Phone Landscape
  if (width > 400) return 2; // Phone Landscape/Medium Phone
  return 1; // Small Phone Portrait
};

export const getCardWidth = (width: number, columnCount: number, gap: number = 16): string => {
  const totalGap = gap * (columnCount + 1);
  const availableWidth = width - totalGap;
  const cardWidth = availableWidth / columnCount;
  return `${cardWidth}px`;
};

export const isLandscape = (width: number, height: number): boolean => {
  return width > height;
};

export const isTablet = (width: number): boolean => {
  return width >= 600;
};
