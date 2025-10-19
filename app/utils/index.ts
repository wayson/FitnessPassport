import { Facility } from '../types';

/**
 * Extracts all unique amenities from a list of facilities
 */
export const extractUniqueAmenities = (facilities: Facility[]): string[] => {
  const amenitiesSet = new Set<string>();
  
  facilities.forEach(facility => {
    facility.facilities.forEach(amenity => {
      amenitiesSet.add(amenity);
    });
  });
  
  return Array.from(amenitiesSet).sort();
};

/**
 * Toggles an item in an array - adds if not present, removes if present
 */
export const toggleArrayItem = <T>(array: T[], item: T): T[] => {
  if (array.includes(item)) {
    return array.filter(i => i !== item);
  } else {
    return [...array, item];
  }
};

/**
 * Debounce utility for search input
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};