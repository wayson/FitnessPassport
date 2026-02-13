import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

interface AmenityFilterProps {
  allAmenities: string[];
  selectedAmenities: string[];
  toggleAmenity: (amenity: string) => void;
}

const AmenityFilter: React.FC<AmenityFilterProps> = ({ allAmenities, selectedAmenities, toggleAmenity }) => (
  <View style={styles.filterContainer}>
    <Text style={styles.filterTitle}>Filter by amenities:</Text>
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.amenityScrollView}
      contentContainerStyle={styles.amenityScrollContent}
    >
      {allAmenities.map((amenity) => (
        <TouchableOpacity
          key={amenity}
          style={[
            styles.amenityChip,
            selectedAmenities.includes(amenity) && styles.amenityChipSelected
          ]}
          onPress={() => toggleAmenity(amenity)}
        >
          <Text
            style={[
              styles.amenityChipText,
              selectedAmenities.includes(amenity) && styles.amenityChipTextSelected
            ]}
          >
            {amenity}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  filterContainer: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  amenityScrollView: {
    flexGrow: 0,
  },
  amenityScrollContent: {
    paddingHorizontal: 0,
  },
  amenityChip: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  amenityChipSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  amenityChipText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  amenityChipTextSelected: {
    color: 'white',
  },
});

export default AmenityFilter;
