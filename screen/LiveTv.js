import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import Navbar from '../components/CurvyBottomNav';

const LiveTv = ({ navigation }) => {
  const categories = [
    { name: 'RecentlyWatched', apiParam: 'recently-watched' },
    { name: 'All Channels', apiParam: 'all' },
    { name: 'News & Commerce', apiParam: 'news' },
    { name: 'Sports', apiParam: 'sports' },
    { name: 'Lifestyle and Travel', apiParam: 'lifestyle_travel' },
    { name: 'Music', apiParam: 'music' },
    { name: 'Kids', apiParam: 'children' },
    { name: 'Documentaries', apiParam: 'documentary' },
    { name: 'Religion', apiParam: 'religion' },
    { name: 'Food', apiParam: 'food' },
  ];

  const [activeCategory, setActiveCategory] = useState(categories[0].name);
  const [videos, setVideos] = useState([]); // State for fetched videos
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  axios.defaults.withCredentials = true;
  const fetchVideos = async (apiParam) => {
    setLoading(true);
    setError(false);
    try {
      if (apiParam === 'all'){
      const response = await axios.get('http://192.168.43.247:8085/videos/');
      setVideos(response.data); // Update state with fetched videos
      }else{
      const response = await axios.get(`http://192.168.43.247:8085/videos/${apiParam}`);
      setVideos(response.data); // Update state with fetched videos
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    // Fetch videos when activeCategory changes
     
    const currentCategory = categories.find((cat) => cat.name === activeCategory);
    if (currentCategory) {
      fetchVideos(currentCategory.apiParam);
    }
  }, [activeCategory]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollWrapper}>
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
                activeCategory === category.name && styles.activeButton,
              ]}
              onPress={() => setActiveCategory(category.name)}
            >
              <Text
                style={[
                  styles.buttonText,
                  activeCategory === category.name && styles.activeButtonText,
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Icon name="arrow-forward-ios" size={20} color="#4a90e2" style={styles.arrow} />
      </View>

      <ScrollView style={styles.contentScrollView}>
        {loading ? (
          <ActivityIndicator size="large" color="red" style={styles.loadingIndicator} />
        ) : error ? (
          <Text style={styles.errorText}>Videos not found</Text>
        ) :(
          videos.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.contentItem}
              onPress={() =>
                navigation.navigate('Play', {
                  videoDetails: item,
                })
              }
            >
              <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
              <Text style={styles.title}>{item.title}</Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
      <Navbar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C2C2C',
    paddingBottom: 80,
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
    borderBottomColor: 'red',
  },
  activeButtonText: {
    color: 'red',
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
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
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
  loadingIndicator: {
    marginVertical: 20,
    alignSelf: 'center',
  },
});

export default LiveTv;