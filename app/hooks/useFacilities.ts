import { useState, useEffect, useCallback } from 'react';
import { Facility, FacilityState } from '../types';
import { facilityService } from '../services/facilityService';

/**
 * Custom hook for managing facility data
 */
export const useFacilities = () => {
  const [state, setState] = useState<FacilityState>({
    facilities: [],
    loading: true,
    refreshing: false,
    error: null
  });

  const loadFacilities = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const facilities = await facilityService.loadFacilities();
      setState(prev => ({
        ...prev,
        facilities,
        loading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }));
    }
  }, []);

  const refreshFacilities = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, refreshing: true, error: null }));
      const facilities = await facilityService.refreshFacilities();
      setState(prev => ({
        ...prev,
        facilities,
        refreshing: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        refreshing: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }));
    }
  }, []);

  useEffect(() => {
    loadFacilities();
  }, [loadFacilities]);

  return {
    ...state,
    loadFacilities,
    refreshFacilities
  };
};