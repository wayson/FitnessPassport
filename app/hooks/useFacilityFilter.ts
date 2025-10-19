import { useState, useMemo, useCallback } from 'react';
import { Facility, FacilityFilter } from '../types';
import { facilityService } from '../services/facilityService';
import { extractUniqueAmenities, toggleArrayItem } from '../utils';

/**
 * Custom hook for managing facility filtering and search
 */
export const useFacilityFilter = (facilities: Facility[]) => {
  const [filter, setFilter] = useState<FacilityFilter>({
    searchQuery: '',
    selectedAmenities: []
  });

  // Get all unique amenities from facilities
  const allAmenities = useMemo(() => {
    return extractUniqueAmenities(facilities);
  }, [facilities]);

  // Apply filters to facilities
  const filteredFacilities = useMemo(() => {
    return facilityService.applyFilters(
      facilities,
      filter.searchQuery,
      filter.selectedAmenities
    );
  }, [facilities, filter.searchQuery, filter.selectedAmenities]);

  // Update search query
  const setSearchQuery = useCallback((searchQuery: string) => {
    setFilter(prev => ({ ...prev, searchQuery }));
  }, []);

  // Toggle amenity selection
  const toggleAmenity = useCallback((amenity: string) => {
    setFilter(prev => ({
      ...prev,
      selectedAmenities: toggleArrayItem(prev.selectedAmenities, amenity)
    }));
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setFilter({
      searchQuery: '',
      selectedAmenities: []
    });
  }, []);

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return filter.searchQuery.trim().length > 0 || filter.selectedAmenities.length > 0;
  }, [filter.searchQuery, filter.selectedAmenities]);

  return {
    filter,
    allAmenities,
    filteredFacilities,
    setSearchQuery,
    toggleAmenity,
    clearFilters,
    hasActiveFilters
  };
};