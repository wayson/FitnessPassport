import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Facility } from '../types';

interface FacilityListItemProps {
  facility: Facility;
  onPress: () => void;
}

const FacilityListItem: React.FC<FacilityListItemProps> = ({ facility, onPress }) => (
  <TouchableOpacity style={styles.facilityItem} onPress={onPress}>
    <Text style={styles.facilityName}>{facility.name}</Text>
    <Text style={styles.facilityAddress}>{facility.address}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  facilityItem: {
    backgroundColor: 'white',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  facilityName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  facilityAddress: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default FacilityListItem;
