import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const LiveTv = () => {

  const categories = [  'RecentlyWatched','All Channels', 'News & Commerce','Sports','General Entertainment', 'Music', 'Cartoons'];

  const categoryData = {
    RecentlyWatched: [
      { id: 1, title: 'Trending Video 1', thumbnail: 'https://via.placeholder.com/150' },
      { id: 2, title: 'Trending Video 2', thumbnail: 'https://via.placeholder.com/150' },
      { id: 3, title: 'Trending Video 3', thumbnail: 'https://via.placeholder.com/150' },
    ],
    Cartoons: [
      { id: 1, title: 'Top Pick 1', thumbnail: 'https://via.placeholder.com/150' },
      { id: 2, title: 'Top Pick 2', thumbnail: 'https://via.placeholder.com/150' },
      { id: 3, title: 'Top Pick 3', thumbnail: 'https://via.placeholder.com/150' },
    ],
  };

  const [activeCategory, setActiveCategory] = useState(categories[0]); // Default to first category which is the first one in the array (0)

  return (
    <SafeAreaView style={styles.container}>
      {/* Scrollable Categories */}
      <View style={styles.scrollWrapper}>
        {/* <Icon name="arrow-back-ios" size={20} color="#4a90e2" style={styles.arrow} /> */}

        <ScrollView
          horizontal
          contentContainerStyle={styles.scrollContainer}
          showsHorizontalScrollIndicator={false}
        >
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.button,
                activeCategory === category && styles.activeButton, // active button
              ]}
              onPress={() => setActiveCategory(category)} // Set active category
            >
              <Text
                style={[
                  styles.buttonText,
                  activeCategory === category && styles.activeButtonText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Icon name="arrow-forward-ios" size={20} color="#4a90e2" style={styles.arrow} />
      </View>

      {/* Content ScrollView */}
      <ScrollView style={styles.contentScrollView}>
        {categoryData[activeCategory].map((item) => (
          <View key={item.id} style={styles.contentItem}>
            <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
            <Text style={styles.title}>{item.title}</Text>
          </View>
        ))}
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
    height: 40,
    paddingHorizontal: 10,
  },
  scrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrow: {
    paddingHorizontal: 4,
  },
  button: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  activeButton: {
    borderBottomWidth: 2,
    borderBottomColor: 'red', // Red underline for active button
  },
  activeButtonText: {
    color: 'red', // Red text for active button
  },
  contentScrollView: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  contentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#333',
    borderRadius: 5,
    padding: 10,
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  title: {
    color: '#fff',
    fontSize: 16,
  },
});

export default LiveTv;
