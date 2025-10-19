import { Facility } from '../types';

export class FacilityService {
  private static instance: FacilityService;
  
  static getInstance(): FacilityService {
    if (!FacilityService.instance) {
      FacilityService.instance = new FacilityService();
    }
    return FacilityService.instance;
  }

  /**
   * Loads facilities from the local JSON file
   * In a real app, this would be an API call
   */
  async loadFacilities(): Promise<Facility[]> {
    try {
      // In a real app, this would be a fetch() call to an API
      const facilitiesData = require('../assets/facilities.json');
      return facilitiesData as Facility[];
    } catch (error) {
      console.error('Error loading facilities:', error);
      throw new Error('Failed to load facilities');
    }
  }

  /**
   * Refreshes facilities data
   * In a real app, this would invalidate cache and fetch fresh data
   */
  async refreshFacilities(): Promise<Facility[]> {
    // For now, this is the same as loadFacilities
    // In a real app, you might clear cache or force a network request
    return this.loadFacilities();
  }

  /**
   * Search facilities by name
   */
  searchFacilities(facilities: Facility[], query: string): Facility[] {
    if (!query.trim()) {
      return facilities;
    }
    
    return facilities.filter(facility =>
      facility.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  /**
   * Filter facilities by amenities
   */
  filterByAmenities(facilities: Facility[], selectedAmenities: string[]): Facility[] {
    if (selectedAmenities.length === 0) {
      return facilities;
    }

    return facilities.filter(facility =>
      selectedAmenities.every(amenity =>
        facility.facilities.includes(amenity)
      )
    );
  }

  /**
   * Apply both search and amenity filters
   */
  applyFilters(
    facilities: Facility[], 
    searchQuery: string, 
    selectedAmenities: string[]
  ): Facility[] {
    let filtered = this.searchFacilities(facilities, searchQuery);
    filtered = this.filterByAmenities(filtered, selectedAmenities);
    return filtered;
  }
}

export const facilityService = FacilityService.getInstance();