import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import { useIsFocused } from '@react-navigation/native';

const { width: screenWidth } = Dimensions.get('window');
const videoHeight = screenWidth * (9 / 16);

const Player = () => {
  const videoRef = useRef(null);
  const [status, setStatus] = useState({});
  const isFocused = useIsFocused(); // Tracks if the screen is focused

  useEffect(() => {
    if (isFocused) {
      // Play the video when the screen is focused
      videoRef.current?.playAsync();
    } else {
      // Pause the video when the screen is not focused
      videoRef.current?.pauseAsync();
    }
    
    return () => {
      // Ensure to stop the video when the component unmounts or when it loses focus
      videoRef.current?.stopAsync();
    };
  }, [isFocused]);

  return (
    <View style={styles.videoContainer}>
      <Video
        ref={videoRef}
        // source={{ uri: 'https://www.w3schools.com/html/mov_bbb.mp4' }}
        style={styles.video}
        useNativeControls
        resizeMode="contain" // Scale the video properly
        isLooping
        onPlaybackStatusUpdate={setStatus}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    width: screenWidth,
    height: videoHeight,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
});

export default Player;
