import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

interface Facility {
  id: string;
  name: string;
  address: string;
  location: {
    latitude: number;
    longitude: number;
  };
  facilities: string[];
}

type RootStackParamList = {
  Home: undefined;
  Detail: { facility: Facility };
};

type HomeScreenProps = {
  navigation: NavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadFacilities();
  }, []);

  const loadFacilities = async () => {
    try {
      const facilitiesData = require('../assets/facilities.json');
      setFacilities(facilitiesData);
    } catch (error) {
      console.error('Error loading facilities:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter facilities based on search query
  const filteredFacilities = useMemo(() => {
    if (!searchQuery.trim()) {
      return facilities;
    }
    return facilities.filter(facility =>
      facility.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [facilities, searchQuery]);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleNavigateToDetail = (facility: Facility) => {
    navigation.navigate('Detail', { facility });
  };

  const renderFacilityItem = ({ item }: { item: Facility }) => (
    <TouchableOpacity 
      style={styles.facilityItem} 
      onPress={() => handleNavigateToDetail(item)}
    >
      <Text style={styles.facilityName}>{item.name}</Text>
      <Text style={styles.facilityAddress}>{item.address}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading facilities...</Text>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Facility Finder</Text>
          <Text style={styles.subtitle}>Find and explore facilities near you</Text>
          <Text style={styles.count}>
            {searchQuery.trim() 
              ? `${filteredFacilities.length} of ${facilities.length} facilities` 
              : `${facilities.length} facilities available`
            }
          </Text>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search facilities by name..."
            value={searchQuery}
            autoComplete="off"
            autoCorrect={false}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
            clearButtonMode="while-editing"
          />
        </View>
        
        <FlatList
          data={filteredFacilities}
          renderItem={renderFacilityItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          getItemLayout={(data, index) => ({
            length: 80,
            offset: 80 * index,
            index,
          })}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          windowSize={21}
          keyboardShouldPersistTaps="handled"
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchInput: {
    height: 44,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  count: {
    fontSize: 14,
    color: '#007AFF',
    textAlign: 'center',
    fontWeight: '500',
  },
  listContent: {
    paddingBottom: 20,
  },
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

export default HomeScreen;