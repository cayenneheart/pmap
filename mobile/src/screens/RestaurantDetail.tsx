import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Restaurant, getProteinLevel } from '../types';
import { Colors, ProteinColors } from '../constants/theme';

interface Props {
  restaurant: Restaurant;
  onBack: () => void;
}

export default function RestaurantDetail({ restaurant, onBack }: Props) {
  const sortedMenus = [...restaurant.menus].sort((a, b) => b.protein - a.protein);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={24} color={Colors.green400} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{restaurant.name}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Info */}
        <View style={styles.infoSection}>
          <View style={styles.infoBadges}>
            <Text style={styles.infoItem}>
              <Ionicons name="star" size={12} color="#facc15" /> {restaurant.rating}
            </Text>
            <Text style={styles.infoItem}>
              <Ionicons name="location" size={12} color={Colors.textSecondary} /> 徒歩{restaurant.walkMinutes}分
            </Text>
            <Text style={[styles.infoItem, restaurant.isOpen ? styles.openBadge : styles.closedBadge]}>
              {restaurant.isOpen ? '営業中' : '準備中'}
            </Text>
          </View>
          <Text style={styles.address}>{restaurant.address}</Text>
          <Text style={styles.genre}>{restaurant.genre}</Text>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Menu Header */}
        <View style={styles.menuHeader}>
          <Text style={styles.menuHeaderTitle}>メニュー</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Ionicons name="caret-down" size={12} color={Colors.green400} />
            <Text style={styles.sortLabel}>P量順</Text>
          </View>
        </View>

        {/* Menu List */}
        {sortedMenus.map((menu) => {
          const level = getProteinLevel(menu.protein);
          return (
            <View key={menu.id} style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <Text style={styles.menuName}>{menu.name}</Text>
                <Text style={styles.menuSub}>
                  ¥{menu.price.toLocaleString()} • {menu.calories}kcal • 脂質{menu.fat}g • 炭水化物{menu.carbs}g
                </Text>
              </View>
              <View style={[styles.proteinTag, { backgroundColor: ProteinColors[level].bg }]}>
                <Text style={[styles.proteinTagText, { color: ProteinColors[level].text }]}>
                  {menu.protein}g
                </Text>
              </View>
            </View>
          );
        })}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgPrimary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  infoSection: {
    padding: 20,
  },
  infoBadges: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 10,
  },
  infoItem: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  openBadge: {
    color: Colors.green400,
    fontWeight: '600',
  },
  closedBadge: {
    color: Colors.proteinLow,
    fontWeight: '600',
  },
  address: {
    fontSize: 13,
    color: Colors.textMuted,
    marginBottom: 4,
  },
  genre: {
    fontSize: 13,
    color: Colors.green400,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginHorizontal: 20,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  menuHeaderTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  sortLabel: {
    fontSize: 13,
    color: Colors.green400,
    fontWeight: '600',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.03)',
  },
  menuItemLeft: {
    flex: 1,
    marginRight: 12,
  },
  menuName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e0e4f0',
    marginBottom: 4,
  },
  menuSub: {
    fontSize: 12,
    color: '#6a7298',
  },
  proteinTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  proteinTagText: {
    fontSize: 16,
    fontWeight: '800',
  },
});
