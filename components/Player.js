import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import { useIsFocused } from '@react-navigation/native';

const { width: screenWidth } = Dimensions.get('window');
const videoHeight = screenWidth * (9 / 16);

const Player = ({ videoSource }) => {
  const videoRef = useRef(null);
  const isFocused = useIsFocused(); // Tracks if the screen is focused

  useEffect(() => {
    if (isFocused && videoSource) {
      // Play the video when the screen is focused and there's a valid videoSource
      videoRef.current?.playAsync();
    } else {
      // Pause the video when the screen is not focused or no videoSource
      videoRef.current?.pauseAsync();
    }
    
    return () => {
      // Ensure to stop the video when the component unmounts or loses focus
      videoRef.current?.stopAsync();
    };
  }, [isFocused, videoSource]);

  return (
    <View style={styles.videoContainer}>
      <Video
        ref={videoRef}
        source={{ uri: videoSource }}
        style={styles.video}
        useNativeControls
        resizeMode="contain" // Scale the video properly
        isLooping
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
