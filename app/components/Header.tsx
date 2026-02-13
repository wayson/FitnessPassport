import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface HeaderProps {
  filteredCount: number;
  totalCount: number;
  hasActiveFilters: boolean;
}

const Header: React.FC<HeaderProps> = ({ filteredCount, totalCount, hasActiveFilters }) => (
  <View style={styles.header}>
    <Text style={styles.subtitle}>Find and explore facilities near you</Text>
    <Text style={styles.count}>
      {hasActiveFilters
        ? `${filteredCount} of ${totalCount} facilities`
        : `${totalCount} facilities available`}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  count: {
    fontSize: 14,
    color: '#007AFF',
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default Header;
