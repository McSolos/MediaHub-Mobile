import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Player from '../components/Player';
import ContentRow from '../components/ContentRow';
import BottomSlideModal from '../components/BottomSlideModal';
import axios from 'axios';

const Home = ({ navigation }) => {
  axios.defaults.withCredentials = true;

  const categoryData = [
    { name: 'Recently Watched', apiParam: 'recently-watched' },
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

  const [modalVisible, setModalVisible] = useState(false);
  const [videos, setVideos] = useState([]); // State for fetched videos
  const [selectedCategoryVideos, setSelectedCategoryVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState({
    url: 'https://www.w3schools.com/html/mov_bbb.mp4', // Default video
    title: 'Default Video Title', // Default title
  });

  const trendingVideos = [
    { id: 1, title: 'Trending Video 1', thumbnail: 'https://via.placeholder.com/150', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { id: 2, title: 'Trending Video 2', thumbnail: 'https://via.placeholder.com/150', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
    { id: 3, title: 'Trending Video 3', thumbnail: 'https://via.placeholder.com/150', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4' },
  ];

  const topPicksVideos = [
    { id: 1, title: 'Top Pick 1', thumbnail: 'https://via.placeholder.com/150', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { id: 2, title: 'Top Pick 2', thumbnail: 'https://via.placeholder.com/150', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
    { id: 3, title: 'Top Pick 3', thumbnail: 'https://via.placeholder.com/150', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' },
  ];

  const handleCategoryPress = async (apiParam) => {
    // console.log('Selected Category:', apiParam);
  
    try {
      let response;
      if (apiParam === 'all') {
        response = await axios.get('http://localhost:8085/videos/');
      } else {
        response = await axios.get(`http://localhost:8085/videos/${apiParam}`);
      }  
      // Update state with fetched data
      setVideos(response.data);
      setSelectedCategoryVideos(response.data); // Use response data directly
      setModalVisible(true); // Show modal with the fetched videos
  
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log('No videos found for this category.');
        setVideos([]);  // Set empty array to indicate no videos
        setSelectedCategoryVideos([]);  // Ensure selected videos are also empty
        setModalVisible(true);  // Show modal with the "No videos" message
      } else {
        console.error('Error fetching videos:', error);
      }
    }
  };
  
  
  const handleVideoPress = (video) => {
    setCurrentVideo({ url: video.video_url, title: video.title });
    setModalVisible(false); // Close the modal
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="red" />
      
      {/* Scrollable Categories */}
      <View style={styles.scrollWrapper}>
        <ScrollView horizontal contentContainerStyle={styles.scrollContainer} showsHorizontalScrollIndicator={false}>
          {categoryData.map((category, index) => (
            <TouchableOpacity key={index} style={styles.button} onPress={() => handleCategoryPress(category.apiParam)}>
              <Text style={styles.buttonText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Icon name="arrow-forward-ios" size={20} color="#4a90e2" style={styles.arrow} />
      </View>

      {/* Video Player */}
      <View>
        <Player videoSource={currentVideo.url} />
        <ScrollView style={styles.titleContent}>
          <Text style={styles.title}>{currentVideo.title}</Text>
        </ScrollView>
      </View>

      {/* Content Rows */}
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Trending Now</Text>
        <ContentRow videos={trendingVideos} navigation={navigation} />

        <Text style={styles.sectionTitle}>Top Picks For You</Text>
        <ContentRow videos={topPicksVideos} navigation={navigation} />
      </ScrollView>

      {/* BottomSlideModal */}
      <BottomSlideModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        data={selectedCategoryVideos}
        onVideoPress={handleVideoPress}
      />
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white',
  },
  titleContent: {
    paddingHorizontal: 16,
    paddingVertical: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'red',
  },
});

export default Home;
