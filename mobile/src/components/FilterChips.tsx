import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/theme';

const FILTERS = ['全て', '30g+', '和食', '洋食', '中華', 'ファストフード', 'カフェ'] as const;

interface Props {
  activeFilter: string;
  onSelect: (filter: string) => void;
}

export default function FilterChips({ activeFilter, onSelect }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {FILTERS.map((filter) => {
        const isActive = activeFilter === filter;
        return (
          <TouchableOpacity
            key={filter}
            style={[styles.chip, isActive && styles.chipActive]}
            onPress={() => onSelect(filter)}
            activeOpacity={0.7}
          >
            <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
              {filter}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    gap: 8,
    paddingBottom: 10,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  chipActive: {
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    borderColor: 'rgba(34, 197, 94, 0.3)',
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8890a8',
  },
  chipTextActive: {
    color: Colors.green400,
  },
});
