import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Video } from 'expo-av';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Play = ({ route }) => {
  const videoRef = useRef(null); // Ref for the video player
  const isFocused = useIsFocused(); // Tracks if the screen is focused
  const { videoDetails } = route.params || {}; // Video details passed from another page
  const { width, height } = Dimensions.get('screen');

  const [currentVideo, setCurrentVideo] = useState(videoDetails || null); // Guard against null videoDetails
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state for fetching videos
  const [userInfo, setUserInfo] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  axios.defaults.withCredentials = true;


  // Handle video focus/play
  useEffect(() => {
    if (isFocused) {
      videoRef.current?.playAsync(); // Play the video when the screen is focused
    } else {
      videoRef.current?.pauseAsync(); // Pause the video when the screen is not focused
    }

    return () => {
      videoRef.current?.stopAsync(); // Ensure video stops on unmount
    };
  }, [isFocused]);

  // Fetch user information
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const user = await AsyncStorage.getItem('userInfo');
        setUserInfo(user ? JSON.parse(user) : null);
      } catch (error) {
        Alert.alert('Error', 'Failed to retrieve user data.');
      }
    };
    fetchUserInfo();
  }, []);

  // Fetch related videos based on genre
  useEffect(() => {
    const fetchVideos = async () => {
      if (!videoDetails) return; // Exit if videoDetails is not provided
      setLoading(true);

      try {
        const apiParam = videoDetails.genre;
        const response = await axios.get(`http://10.50.7.119:8085/videos/${apiParam}`);
        setVideos(response.data);
      } catch (error) {
        console.error('Error fetching videos:', error);
        Alert.alert('Error', 'Failed to fetch videos. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [videoDetails]);
  const videoId = currentVideo?.id; // Safe check
  const userId = userInfo?.id; 
  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      if (!userId || !videoId) return; // Exit if either value is missing
      try {
        const response = await axios.get('http://10.50.7.119:8085/videos/check-favorite', {
          params: { userId, videoId },
        });
        setIsFavorite(response.data.isFavorite);
      } catch (error) {
        console.error("Error fetching favorite status:", error);
      }
    };
    fetchFavoriteStatus();
  }, [userId, videoId]);
  
  // Add video to history
  const addToHistory = async (userId, videoId) => {
    try {
      await axios.post('http://10.50.7.119:8085/videos/add-history', { userId, videoId });
      console.log('History updated successfully');
    } catch (error) {
      console.error('Error adding video to history:', error.response?.data?.message || error.message);
    }
  };

  // Handle toggling favorite status
  const handleFavoriteToggle = async () => {
    if (!userInfo || !currentVideo) {
      console.error('User or video information is missing');
      return;
    }

    const videoId = currentVideo.id;
    const userId = userInfo.id;

    try {
      if (isFavorite) {
        await axios.delete('http://10.50.7.119:8085/videos/remove-favorite', {
          data: { userId, videoId },
        });
        setIsFavorite(false);
      } else {
        await axios.post('http://10.50.7.119:8085/videos/add-favorite', { userId, videoId });
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Error updating favorites:', error);
      Alert.alert('Error', 'Failed to update favorites.');
    }
  };

  // Render the component
  return (
    <SafeAreaView style={styles.mainPlayerView}>
      <StatusBar barStyle="light-content" backgroundColor="red" />

      {/* Video Player */}
      {currentVideo ? (
        <View style={[styles.videoContainer, { height: height / 3 }]}>
          <Video
            ref={videoRef}
            source={{ uri: currentVideo.video_url }}
            style={styles.video}
            useNativeControls
            resizeMode="contain"
            isLooping
            shouldPlay
          />
        </View>
      ) : (
        <Text style={styles.errorMessage}>No video selected</Text>
      )}

      {/* Video Title */}
      <Text style={styles.title}>{currentVideo?.title || 'Loading...'}</Text>

      {/* Buttons */}
      <View style={styles.scrollWrapper}>
        <ScrollView
          horizontal
          contentContainerStyle={styles.scrollContainer}
          showsHorizontalScrollIndicator={false}
        >
          <TouchableOpacity style={styles.button} onPress={handleFavoriteToggle}>
            <Text style={styles.buttonText}>
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Report</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Related Videos */}
      <ScrollView style={styles.contentScrollView}>
        {loading ? (
          <ActivityIndicator size="large" color="red" style={styles.loadingIndicator} />
        ) : (
          videos
            .filter((video) => video.id !== currentVideo?.id) // Exclude the current video
            .map((video) => (
              <TouchableOpacity
                key={video.id}
                style={styles.listItem}
                onPress={() => {
                  setCurrentVideo(video);
                  if (userInfo) addToHistory(userInfo.id, video.id);
                }}
              >
                <Image source={{ uri: video.thumbnail }} style={styles.thumbnail} />
                <View style={styles.textContainer}>
                  <Text style={styles.videoTitle}>{video.title}</Text>
                </View>
              </TouchableOpacity>
            ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Play;

const styles = StyleSheet.create({
  mainPlayerView: {
    flex: 1,
    backgroundColor: '#2c2c2c',
  },
  videoContainer: {
    width: '100%',
    backgroundColor: 'grey',
  },
  video: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    marginTop: 10,
    paddingLeft: 20,
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
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#0c0a00',
    borderRadius: 30,
    marginHorizontal: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  contentScrollView: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    backgroundColor: '#3c3c3c',
    borderRadius: 8,
    padding: 1,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  loadingIndicator: {
    marginVertical: 20,
    alignSelf: 'center',
  },
  errorMessage: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});
