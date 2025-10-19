import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { Facility, RootStackParamList } from '../types';

type DetailScreenProps = {
  navigation: NavigationProp<RootStackParamList, 'Detail'>;
  route: RouteProp<RootStackParamList, 'Detail'>;
};

const DetailScreen: React.FC<DetailScreenProps> = ({ navigation, route }) => {
  const { facility } = route.params;

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{facility.name}</Text>
        <Text style={styles.itemId}>ID: {facility.id}</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Address</Text>
          <Text style={styles.description}>
            {facility.address}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Facilities</Text>
          <View style={styles.featuresList}>
            {facility.facilities.map((facilityItem, index) => (
              <Text key={index} style={styles.featureItem}>• {facilityItem}</Text>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          <Text style={styles.contactText}>Latitude: {facility.location.latitude}</Text>
          <Text style={styles.contactText}>Longitude: {facility.location.longitude}</Text>
        </View>

        <TouchableOpacity 
          style={styles.backButton} 
          onPress={handleGoBack}
        >
          <Text style={styles.backButtonText}>← Back to Home</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  itemId: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  section: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  featuresList: {
    marginLeft: 10,
  },
  featureItem: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  contactText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  backButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DetailScreen;