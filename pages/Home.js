import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import Material Icons
import Player from '../components/Player';
// import NavBar from '../components/CurvyBottomNav';

const Home = () => {
  const categories = [
    'cat1', 'cat2', 'cat3', 'cat4', 'cat5', 'cat6',
    'cat7', 'cat8', 'cat9', 'cat10', 'cat11', 'cat12',
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

      {/* Video Player */}
      <Player />

      {/* Scrollable Content */}
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Video Title</Text>
        {/* <Text style={styles.description}>
          This is a description of the video. It includes details like the number of views, upload date, and other information.
        </Text>
        <Text style={styles.commentsTitle}>Comments</Text> */}
      </ScrollView>
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
    height: 40, // Adjust height to fit the buttons and arrows snugly
    paddingHorizontal: 8, // Add padding to accommodate arrows
  },
  scrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrow: {
    paddingHorizontal: 4, // Add some padding around the arrows
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#2c2c2c',
    borderRadius: 5,
    marginHorizontal: 1, // Reduce spacing between buttons
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'red',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    color: 'white',
  },
});

export default Home;
