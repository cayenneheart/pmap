import React, { useState, useMemo, useRef } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, Text, FlatList } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { Colors, ProteinColors, SHINJUKU_CENTER } from '../constants/theme';
import { Restaurant, getProteinLevel } from '../types';
import { restaurants } from '../data/restaurants';
import SearchBar from '../components/SearchBar';
import FilterChips from '../components/FilterChips';
import RestaurantCard from '../components/RestaurantCard';

// Apple Maps dark style JSON
const darkMapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#0a0a0f' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#f0f0f5' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#111118' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#1a1f2e' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0f1423' }] },
];

const PIN_COLORS = {
  high: '#22c55e',
  mid: '#eab308',
  low: '#ef4444',
};

interface Props {
  onSelectRestaurant: (restaurant: Restaurant) => void;
}

export default function MapScreen({ onSelectRestaurant }: Props) {
  const [searchText, setSearchText] = useState('');
  const [activeFilter, setActiveFilter] = useState('全て');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [isListView, setIsListView] = useState(false);
  const mapRef = useRef<MapView>(null);

  // Filter restaurants
  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((r) => {
      // Search filter
      if (searchText && !r.name.includes(searchText) && !r.address.includes(searchText)) {
        return false;
      }
      // Genre / protein filter
      if (activeFilter === '全て') return true;
      if (activeFilter === '30g+') return r.maxProtein >= 30;
      if (activeFilter === r.genre) return true;
      return false;
    });
  }, [searchText, activeFilter]);

  const handlePinPress = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    mapRef.current?.animateToRegion({
      latitude: restaurant.latitude - 0.002,
      longitude: restaurant.longitude,
      latitudeDelta: 0.008,
      longitudeDelta: 0.008,
    }, 300);
  };

  const renderListItem = ({ item }: { item: Restaurant }) => {
    const level = getProteinLevel(item.maxProtein);
    return (
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => onSelectRestaurant(item)}
        activeOpacity={0.7}
      >
        <View style={styles.listItemLeft}>
          <Text style={styles.listItemName}>{item.name}</Text>
          <Text style={styles.listItemInfo}>
            <Ionicons name="star" size={12} color="#facc15" /> {item.rating} • 徒歩{item.walkMinutes}分 • {item.genre}
          </Text>
          <Text style={styles.listItemMenu}>
            <Ionicons name="trophy" size={12} color={Colors.green400} /> {item.menus.sort((a, b) => b.protein - a.protein)[0]?.name}
          </Text>
        </View>
        <View style={[styles.listProteinBadge, { backgroundColor: ProteinColors[level].bg }]}>
          <Text style={[styles.listProteinText, { color: ProteinColors[level].text }]}>
            {item.maxProtein}g
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Ionicons name="location" size={20} color={Colors.green500} />
              <Text style={styles.headerTitle}>pmap</Text>
            </View>
            <Text style={styles.headerSub}>新宿エリア</Text>
          </View>
          <TouchableOpacity
            style={styles.viewToggle}
            onPress={() => setIsListView(!isListView)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={isListView ? 'map' : 'list'}
              size={20}
              color={Colors.green400}
            />
          </TouchableOpacity>
        </View>
        <SearchBar value={searchText} onChangeText={setSearchText} />
        <FilterChips activeFilter={activeFilter} onSelect={setActiveFilter} />
      </View>

      {/* Map or List */}
      {isListView ? (
        <FlatList
          data={filteredRestaurants}
          keyExtractor={(item) => item.id}
          renderItem={renderListItem}
          contentContainerStyle={styles.listContainer}
          ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>条件に合う店舗が見つかりません</Text>
            </View>
          }
        />
      ) : (
        <View style={styles.mapWrapper}>
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={SHINJUKU_CENTER}
            userInterfaceStyle="dark"
            customMapStyle={darkMapStyle}
            showsUserLocation
            showsMyLocationButton={false}
          >
            {filteredRestaurants.map((restaurant) => {
              const level = getProteinLevel(restaurant.maxProtein);
              const isSelected = selectedRestaurant?.id === restaurant.id;

              const levelDotColor = {
                high: '#22c55e',
                mid: '#facc15',
                low: '#f87171'
              }[level];

              return (
                <Marker
                  key={restaurant.id}
                  coordinate={{
                    latitude: restaurant.latitude,
                    longitude: restaurant.longitude,
                  }}
                  onPress={() => handlePinPress(restaurant)}
                  style={{ zIndex: isSelected ? 100 : 1 }}
                >
                  <View style={[
                    styles.pinContainer,
                    {
                      backgroundColor: isSelected ? '#1E1E20' : '#FFFFFF',
                      borderColor: isSelected ? '#1E1E20' : '#DDDDDD',
                      transform: [{ scale: isSelected ? 1.1 : 1.0 }]
                    }
                  ]}>
                    {!isSelected && <View style={[styles.pinDot, { backgroundColor: levelDotColor }]} />}
                    <Text style={[
                      styles.pinText,
                      { color: isSelected ? '#FFFFFF' : '#000000' }
                    ]}>
                      {restaurant.maxProtein}g
                    </Text>
                  </View>
                </Marker>
              );
            })}
          </MapView>

          {/* Result count */}
          <View style={styles.resultBadge}>
            <Text style={styles.resultText}>
              {filteredRestaurants.length}件の店舗
            </Text>
          </View>

          {/* Restaurant Card */}
          {selectedRestaurant && (
            <RestaurantCard
              restaurant={selectedRestaurant}
              onClose={() => setSelectedRestaurant(null)}
              onDetail={onSelectRestaurant}
            />
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgPrimary,
  },
  header: {
    backgroundColor: Colors.bgPrimary,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  headerSub: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  viewToggle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapWrapper: {
    flex: 1,
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  pinContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  pinDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  pinText: {
    fontSize: 14,
    fontWeight: '700',
  },
  resultBadge: {
    position: 'absolute',
    top: 16,
    alignSelf: 'center',
    backgroundColor: 'rgba(10, 10, 15, 0.85)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  resultText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  // List view
  listContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  listSeparator: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 4,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 4,
  },
  listItemLeft: { flex: 1, marginRight: 12 },
  listItemName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  listItemInfo: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  listItemMenu: {
    fontSize: 12,
    color: Colors.green400,
  },
  listProteinBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  listProteinText: {
    fontSize: 16,
    fontWeight: '800',
  },
  emptyState: {
    paddingVertical: 60,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 15,
    color: Colors.textMuted,
  },
});
