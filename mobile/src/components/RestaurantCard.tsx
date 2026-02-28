import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Restaurant, MenuItem, getProteinLevel } from '../types';
import { Colors } from '../constants/theme';

interface Props {
  restaurant: Restaurant;
  onClose: () => void;
  onDetail: (restaurant: Restaurant) => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function RestaurantCard({ restaurant, onClose, onDetail }: Props) {
  const level = getProteinLevel(restaurant.maxProtein);
  const isHighP = level === 'high';
  const [isLiked, setIsLiked] = useState(false);

  // Fallback images for menus based on index if no specific menu image exists
  const fallbackImages = [
    'https://images.unsplash.com/photo-1544025162-8311394aeb53?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&q=80&w=600',
  ];

  return (
    <View style={styles.container}>
      {/* Image Block (Carousel) */}
      <View style={styles.imageContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.imageScroll}
        >
          {restaurant.menus.map((menu, index) => (
            <View key={menu.id} style={styles.imageSlide}>
              <Image
                // In a real app we'd use menu.imageUrl, but falling back for the mock
                source={{ uri: (menu as any).imageUrl || fallbackImages[index % fallbackImages.length] }}
                style={styles.image}
              />
              <View style={styles.menuOverlayBadge}>
                <Text style={styles.menuOverlayProtein}>{menu.protein}g</Text>
                <Text style={styles.menuOverlayName} numberOfLines={1}>{menu.name}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Absolute Overlays on Image Block */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose} activeOpacity={0.8}>
          <Ionicons name="close" size={18} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.heartButton}
          onPress={() => setIsLiked(!isLiked)}
          activeOpacity={0.8}
        >
          <Ionicons name={isLiked ? "heart" : "heart-outline"} size={20} color={isLiked ? "#ff385c" : "#000"} />
        </TouchableOpacity>

        {isHighP && (
          <View style={styles.guestFavoriteBadge}>
            <Text style={styles.guestFavoriteText}>高タンパク</Text>
          </View>
        )}
      </View>

      {/* Details Block */}
      <TouchableOpacity
        style={styles.details}
        onPress={() => onDetail(restaurant)}
        activeOpacity={0.9}
      >
        <View style={styles.titleRow}>
          <Text style={styles.name} numberOfLines={1}>{restaurant.name}</Text>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={12} color={Colors.textPrimary} />
            <Text style={styles.rating}>{restaurant.rating}</Text>
          </View>
        </View>

        <Text style={styles.info}>
          {restaurant.genre} • 徒歩{restaurant.walkMinutes}分 • {' '}
          <Text style={restaurant.isOpen ? styles.openText : styles.closedText}>
            {restaurant.isOpen ? '営業中' : '準備中'}
          </Text>
        </Text>

        <View style={styles.priceRow}>
          <Text style={styles.priceProtein}>{restaurant.maxProtein}g </Text>
          <Text style={styles.priceLabel}>タンパク質</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30, // Floating slightly above the bottom
    alignSelf: 'center',
    width: SCREEN_WIDTH - 40,
    backgroundColor: '#1E1E20', // Dark clean background
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
    overflow: 'hidden', // to clip the image to the border radius
  },
  imageContainer: {
    width: '100%',
    height: 180,
    position: 'relative',
    backgroundColor: '#2A2A2D',
  },
  imageScroll: {
    width: '100%',
    height: '100%',
  },
  imageSlide: {
    width: SCREEN_WIDTH - 40,
    height: 180,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  menuOverlayBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'column',
  },
  menuOverlayProtein: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 2,
  },
  menuOverlayName: {
    color: '#ddd',
    fontSize: 12,
    fontWeight: '500',
    maxWidth: 200,
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  heartButton: {
    position: 'absolute',
    top: 12,
    right: 50, // Next to close button
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  guestFavoriteBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  guestFavoriteText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000',
  },
  details: {
    padding: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    flex: 1,
    marginRight: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: '400',
  },
  info: {
    fontSize: 14,
    color: '#A1A1A6',
    marginBottom: 8,
  },
  openText: {
    color: '#A1A1A6',
  },
  closedText: {
    color: Colors.proteinLow,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  priceProtein: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  priceLabel: {
    fontSize: 14,
    color: '#A1A1A6',
    fontWeight: '400',
  },
});
