import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/theme';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
}

export default function SearchBar({ value, onChangeText }: Props) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={18} color={Colors.textMuted} />
      <TextInput
        style={styles.input}
        placeholder="エリア・店名で検索"
        placeholderTextColor={Colors.textMuted}
        value={value}
        onChangeText={onChangeText}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText('')}>
          <Ionicons name="close-circle" size={18} color={Colors.textMuted} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: Colors.textPrimary,
    padding: 0,
  },
});
