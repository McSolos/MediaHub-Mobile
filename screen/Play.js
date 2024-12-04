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
} from 'react-native';
import { Video } from 'expo-av';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';

const Play = ({ route }) => {
  const buttons = ['Add to Favorites', 'Share', 'Report', 'cat4', 'cat5', 'cat6'];

  const videoRef = useRef(null); // Ref for the video player
  const isFocused = useIsFocused(); // Tracks if the screen is focused
  
  const { videoDetails } = route.params; // Video details passed from another page
  const { width, height } = Dimensions.get('screen');

  // State for the current video
  const [currentVideo, setCurrentVideo] = useState(videoDetails);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state for fetching videos
  const [status, setStatus] = useState({});
  axios.defaults.withCredentials = true;

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

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true); // Start loading
      try {
        if (videoDetails) {
          const apiParam = videoDetails.genre;
          const response = await axios.get(`http://localhost:8085/videos/${apiParam}`);
          setVideos(response.data); 
          console.log(response.data);
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchVideos();
  }, [videoDetails]);

  return (
    <SafeAreaView style={styles.mainPlayerView}>
      <StatusBar barStyle="light-content" backgroundColor="red" />
      <View style={[styles.videoContainer, { height: Dimensions.get('screen').height / 3 }]}>
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
      <Text style={styles.title}>{currentVideo.title}</Text>

      <View style={styles.scrollWrapper}>
        <ScrollView
          horizontal
          contentContainerStyle={styles.scrollContainer}
          showsHorizontalScrollIndicator={false}>
          {buttons.map((button, index) => (
            <TouchableOpacity key={index} style={styles.button}>
              <Text style={styles.buttonText}>{button}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.contentScrollView}>
        {loading ? (
          <ActivityIndicator size="large" color="red" style={styles.loadingIndicator} />
        ) : (
          videos
            .filter((cat) => cat.id !== currentVideo.id) // Exclude the current video
            .map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={styles.listItem}
                onPress={() => setCurrentVideo(cat)}>
                <Image source={{ uri: cat.thumbnail }} style={styles.thumbnail} />
                <View style={styles.textContainer}>
                  <Text style={styles.videoTitle}>{cat.title}</Text>
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
});
