import React, { useState } from 'react';
import { Restaurant } from './src/types';
import MapScreen from './src/screens/MapScreen';
import RestaurantDetail from './src/screens/RestaurantDetail';

export default function App() {
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  if (selectedRestaurant) {
    return (
      <RestaurantDetail
        restaurant={selectedRestaurant}
        onBack={() => setSelectedRestaurant(null)}
      />
    );
  }

  return (
    <MapScreen onSelectRestaurant={setSelectedRestaurant} />
  );
}
