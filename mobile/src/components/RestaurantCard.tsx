import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Restaurant, getProteinLevel } from '../types';
import { Colors, ProteinColors } from '../constants/theme';

interface Props {
  restaurant: Restaurant;
  onClose: () => void;
  onDetail: (restaurant: Restaurant) => void;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function RestaurantCard({ restaurant, onClose, onDetail }: Props) {
  const level = getProteinLevel(restaurant.maxProtein);
  const topMenus = [...restaurant.menus].sort((a, b) => b.protein - a.protein).slice(0, 3);

  return (
    <View style={styles.container}>
      <View style={styles.handle} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{restaurant.name}</Text>
            <Text style={styles.info}>
              <Ionicons name="star" size={12} color="#facc15" /> {restaurant.rating} • 徒歩{restaurant.walkMinutes}分 •{' '}
              <Text style={restaurant.isOpen ? styles.open : styles.closed}>
                {restaurant.isOpen ? '営業中' : '準備中'}
              </Text>
            </Text>
          </View>
          <View style={[styles.badge, { backgroundColor: ProteinColors[level].bg }]}>
            <Text style={[styles.badgeText, { color: ProteinColors[level].text }]}>
              {level === 'high' ? 'High P' : level === 'mid' ? 'Mid P' : 'Low P'}
            </Text>
          </View>
        </View>
      </View>

      {/* Top Menus */}
      <View style={styles.menuList}>
        {topMenus.map((menu) => {
          const menuLevel = getProteinLevel(menu.protein);
          return (
            <View key={menu.id} style={styles.menuRow}>
              <Text style={styles.menuName} numberOfLines={1}>{menu.name}</Text>
              <Text style={[styles.menuProtein, { color: ProteinColors[menuLevel].text }]}>
                {menu.protein}g
              </Text>
            </View>
          );
        })}
      </View>

      {/* Action */}
      <TouchableOpacity
        style={styles.detailButton}
        onPress={() => onDetail(restaurant)}
        activeOpacity={0.7}
      >
        <Text style={styles.detailButtonText}>詳細を見る</Text>
        <Ionicons name="chevron-forward" size={16} color={Colors.green400} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#0a0a0f',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 20,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 14,
  },
  header: { marginBottom: 12 },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  info: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  open: { color: Colors.green400, fontWeight: '600' },
  closed: { color: Colors.proteinLow, fontWeight: '600' },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 10,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  menuList: {
    gap: 6,
    marginBottom: 14,
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.02)',
  },
  menuName: {
    fontSize: 14,
    color: '#c0c8e0',
    flex: 1,
    marginRight: 10,
  },
  menuProtein: {
    fontSize: 15,
    fontWeight: '800',
  },
  detailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.2)',
    borderRadius: 12,
    paddingVertical: 12,
  },
  detailButtonText: {
    color: Colors.green400,
    fontSize: 14,
    fontWeight: '600',
  },
});
