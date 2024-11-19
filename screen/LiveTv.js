import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import Material Icons
import Player from '../components/Player';
import ContentRow from '../components/ContentRow';

const LiveTv = () => {
  const categories = [
    'cat1', 'cat2', 'cat3', 'cat4', 'cat5', 'cat6',
    'cat7', 'cat8', 'cat9', 'cat10', 'cat11', 'cat12',
  ];

  const trendingVideos = [
    { id: 1, title: 'Trending Video 1', thumbnail: 'https://via.placeholder.com/150' },
    { id: 2, title: 'Trending Video 2', thumbnail: 'https://via.placeholder.com/150' },
    { id: 3, title: 'Trending Video 3', thumbnail: 'https://via.placeholder.com/150' },
    // Add more video objects here
  ];

  const topPicksVideos = [
    { id: 1, title: 'Top Pick 1', thumbnail: 'https://via.placeholder.com/150' },
    { id: 2, title: 'Top Pick 2', thumbnail: 'https://via.placeholder.com/150' },
    { id: 3, title: 'Top Pick 3', thumbnail: 'https://via.placeholder.com/150' },
    // Add more video objects here
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Scrollable Categories with Arrows */}
      <View style={styles.scrollWrapper}>
        {/* Left Arrow */}
        <Icon name="arrow-back-ios" size={20} color="#4a90e2" style={styles.arrow} />
        
        <ScrollView horizontal contentContainerStyle={styles.scrollContainer} showsHorizontalScrollIndicator={false}>
          {categories.map((category, index) => (
            <TouchableOpacity key={index} style={styles.button}>
              <Text style={styles.buttonText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        {/* Right Arrow */}
        <Icon name="arrow-forward-ios" size={20} color="#4a90e2" style={styles.arrow} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C2C2C',
  },
  scrollWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    paddingHorizontal: 20,
  },
  scrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrow: {
    paddingHorizontal: 4,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#2c2c2c',
    borderRadius: 5,
    marginHorizontal: 1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  
});

export default LiveTv;
