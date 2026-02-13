import React from 'react';
import { FlatList, StyleSheet, RefreshControl } from 'react-native';
import { Facility } from '../types';
import FacilityListItem from './FacilityListItem';
import EmptyListComponent from './EmptyListComponent';

interface FacilityListProps {
  facilities: Facility[];
  onRefresh: () => void;
  refreshing: boolean;
  onNavigateToDetail: (facility: Facility) => void;
}

const FacilityList: React.FC<FacilityListProps> = ({
  facilities,
  onRefresh,
  refreshing,
  onNavigateToDetail,
}) => (
  <FlatList
    data={facilities}
    renderItem={({ item }) => (
      <FacilityListItem
        facility={item}
        onPress={() => onNavigateToDetail(item)}
      />
    )}
    keyExtractor={(item) => item.id}
    contentContainerStyle={styles.listContent}
    ListEmptyComponent={<EmptyListComponent text="No facilities found." />}
    refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
        colors={['#007AFF']}
        tintColor="#007AFF"
      />
    }
    getItemLayout={(data, index) => ({
      length: 100, // Approximate height of FacilityListItem
      offset: 100 * index,
      index,
    })}
    removeClippedSubviews={true}
    maxToRenderPerBatch={10}
    windowSize={21}
    keyboardShouldPersistTaps="handled"
  />
);

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 20,
  },
});

export default FacilityList;
