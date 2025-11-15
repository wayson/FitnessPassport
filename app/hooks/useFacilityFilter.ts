import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { Facility, FacilityFilter } from '../types';
import { facilityService } from '../services/facilityService';
import { extractUniqueAmenities, toggleArrayItem, debounce } from '../utils';

/**
 * Custom hook for managing facility filtering and search with debounced search
 */
export const useFacilityFilter = (facilities: Facility[]) => {
  const [filter, setFilter] = useState<FacilityFilter>({
    searchQuery: '',
    selectedAmenities: []
  });
  
  // Separate state for the actual search term used in filtering
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  
  // Create a debounced function for updating the search query
  const debouncedSetSearchQuery = useRef(
    debounce((searchQuery: string) => {
      setDebouncedSearchQuery(searchQuery);
    }, 1500) // 300ms delay
  );

  // Update the debounced search query when the immediate search query changes
  useEffect(() => {
    debouncedSetSearchQuery.current(filter.searchQuery);
  }, [filter.searchQuery]);

  // Get all unique amenities from facilities
  const allAmenities = useMemo(() => {
    return extractUniqueAmenities(facilities);
  }, [facilities]);

  // Apply filters to facilities using the debounced search query
  const filteredFacilities = useMemo(() => {
    return facilityService.applyFilters(
      facilities,
      debouncedSearchQuery,
      filter.selectedAmenities
    );
  }, [facilities, debouncedSearchQuery, filter.selectedAmenities]);

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

  // Check if any filters are active using the debounced search query
  const hasActiveFilters = useMemo(() => {
    return debouncedSearchQuery.trim().length > 0 || filter.selectedAmenities.length > 0;
  }, [debouncedSearchQuery, filter.selectedAmenities]);

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