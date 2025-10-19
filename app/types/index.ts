export interface Facility {
  id: string;
  name: string;
  address: string;
  location: {
    latitude: number;
    longitude: number;
  };
  facilities: string[];
}

export type RootStackParamList = {
  Home: undefined;
  Detail: { facility: Facility };
};

export interface FacilityFilter {
  searchQuery: string;
  selectedAmenities: string[];
}

export interface FacilityState {
  facilities: Facility[];
  loading: boolean;
  refreshing: boolean;
  error: string | null;
}