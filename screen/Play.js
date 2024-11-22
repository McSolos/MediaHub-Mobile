import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, SafeAreaView } from 'react-native';
import { Video } from 'expo-av';
// import { StatusBar } from 'expo-status-bar';
import { useIsFocused } from '@react-navigation/native';

const Play = ({ route }) => {
  const videoRef = useRef(null);  // Only using one ref for the video
  const isFocused = useIsFocused(); // Tracks if the screen is focused

  const { videoDetails } = route.params;
  const { width, height } = Dimensions.get('screen');
  const [status, setStatus] = useState({});

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
    <SafeAreaView style={styles.mainPlayerView}>
      <StatusBar barStyle="light-content" backgroundColor="blue" />
      <View style={[styles.videoContainer, { height: height / 3 }]}>
        <Video
          ref={videoRef}  // Use the videoRef here
          source={{ uri: videoDetails.url }}
          style={styles.video}
          useNativeControls
          resizeMode="contain"
          isLooping
          shouldPlay
          onPlaybackStatusUpdate={setStatus}
        />
      </View>
      <Text style={styles.title}>{videoDetails.title}</Text>
    </SafeAreaView>
  );
};

export default Play;

const styles = StyleSheet.create({
  mainPlayerView: {
    flex: 1,
    backgroundColor: '#fafafa',
    alignItems: 'center',
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
    color: 'black',
    marginTop: 10,
  },
});
