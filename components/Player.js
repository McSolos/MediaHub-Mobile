import React, { useRef, useState } from 'react';
import { StyleSheet, View, Dimensions, Text, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import Slider from '@react-native-community/slider';
import * as ScreenOrientation from 'expo-screen-orientation';

const { width: screenWidth } = Dimensions.get('window'); // Get phone width
const videoHeight = screenWidth * (9 / 16); // calcs dim per screen width

const Player = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true); // State to manage play/pause
  const [volume, setVolume] = useState(1.0); // State to manage volume
  const [isFullscreen, setIsFullscreen] = useState(false); // State for fullscreen mode
  const background = { uri: 'https://www.w3schools.com/html/mov_bbb.mp4' }; 

  // Handle play/pause function
  const togglePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pauseAsync();
    } else {
      videoRef.current.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  // fullscreen function
  const toggleFullscreen = async () => {
    if (isFullscreen) {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    } else {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }
    setIsFullscreen(!isFullscreen);
  };

  return (
    <View style={[styles.videoContainer, isFullscreen && styles.fullscreenContainer]}>
      <Video
      
        ref={videoRef}
        source={background}
        rate={1.0}
        volume={volume}
        isMuted={false}
        shouldPlay={isPlaying}
        isLooping
        resizeMode="contain" // Set to "contain" or "cover"
        style={styles.video}
      />
      
      <View style={styles.controls}>
        {/* Play/Pause Button .......need to maek it better */}
        <TouchableOpacity onPress={togglePlayPause} style={styles.controlButton}>
          <Text style={styles.controlText}>{isPlaying ? 'Pause' : 'Play'}</Text>
        </TouchableOpacity>

        {/*for Volume Control */}
        <Slider
          style={styles.volumeSlider}
          minimumValue={0}
          maximumValue={1}
          value={volume}
          onValueChange={setVolume}
        />

        {/* Fullscreen Button (wrong approach but basic idea for flip)*/}
        <TouchableOpacity onPress={toggleFullscreen} style={styles.controlButton}>
          <Text style={styles.controlText}>{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</Text>
        </TouchableOpacity>
      </View>
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
  fullscreenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  controls: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  controlButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
  },
  controlText: {
    color: '#fff',
  },
  volumeSlider: {
    width: 100,
    alignSelf: 'center',
  },
});

export default Player;
