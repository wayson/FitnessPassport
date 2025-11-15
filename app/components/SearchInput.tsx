import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

type SearchInputProps = {
  value: string;
  onChangeText: (text: string) => void;
};

const SearchInput = ({ value, onChangeText }: SearchInputProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search facilities by name..."
        value={value}
        onChangeText={onChangeText}
        autoComplete="off"
        autoCorrect={false}
        placeholderTextColor="#999"
        clearButtonMode="while-editing"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 16,
  },
  input: {
    fontSize: 16,
    height: 40,
  }
});

export default SearchInput;