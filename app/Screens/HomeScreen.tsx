import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Facility, RootStackParamList } from '../types';
import { useFacilities, useFacilityFilter } from '../hooks';
import SearchInput from '../components/SearchInput';
import LoadingIndicator from '../components/LoadingIndicator';
import AmenityFilter from '../components/AmenityFilter';
import Header from '../components/Header';
import FacilityList from '../components/FacilityList';

type HomeScreenProps = {
  navigation: NavigationProp<RootStackParamList, 'Home'>;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const { facilities, loading, refreshing, refreshFacilities } = useFacilities();
  const {
    filter,
    allAmenities,
    filteredFacilities,
    setSearchQuery,
    toggleAmenity,
    hasActiveFilters,
  } = useFacilityFilter(facilities);

  const handleNavigateToDetail = (facility: Facility) => {
    navigation.navigate('Detail', { facility });
  };

  if (loading) {
    return <LoadingIndicator text="Loading facilities..." />;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Header
          filteredCount={filteredFacilities.length}
          totalCount={facilities.length}
          hasActiveFilters={hasActiveFilters}
        />
        <SearchInput
          value={filter.searchQuery}
          onChangeText={setSearchQuery}
        />
        <AmenityFilter
          allAmenities={allAmenities}
          selectedAmenities={filter.selectedAmenities}
          toggleAmenity={toggleAmenity}
        />
        <FacilityList
          facilities={filteredFacilities}
          onRefresh={refreshFacilities}
          refreshing={refreshing}
          onNavigateToDetail={handleNavigateToDetail}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});