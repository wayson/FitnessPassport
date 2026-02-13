import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface EmptyListComponentProps {
  text?: string;
}

const EmptyListComponent: React.FC<EmptyListComponentProps> = ({ text = 'No items found.' }) => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});

export default EmptyListComponent;
