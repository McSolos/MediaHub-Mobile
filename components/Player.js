import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Text, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import Slider from '@react-native-community/slider';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useIsFocused } from '@react-navigation/native';

const { width: screenWidth } = Dimensions.get('window');
const videoHeight = screenWidth * (9 / 16);

const Player = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(1.0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const isFocused = useIsFocused(); // Tracks if the screen is focused
  const background = { uri: 'https://www.w3schools.com/html/mov_bbb.mp4' };

  useEffect(() => {
    if (isFocused) {
      videoRef.current?.playAsync();
    } else {
      videoRef.current?.pauseAsync();
    }
    return () => {
      videoRef.current?.stopAsync();
    };
  }, [isFocused]);

  const togglePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pauseAsync();
    } else {
      videoRef.current.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

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
        resizeMode="contain"
        style={styles.video}
      />
      <View style={styles.controls}>
        <TouchableOpacity onPress={togglePlayPause} style={styles.controlButton}>
          <Text style={styles.controlText}>{isPlaying ? 'Pause' : 'Play'}</Text>
        </TouchableOpacity>
        <Slider
          style={styles.volumeSlider}
          minimumValue={0}
          maximumValue={1}
          value={volume}
          onValueChange={setVolume}
        />
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
