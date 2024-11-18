// VideoPlayer.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Video from 'react-native-video';

const VideoPlayer = ({ uri }) => {
  return (
    <View style={styles.container}>
      <Video
        source={{ uri }}  // Stream URL
        style={styles.video}
        controls
        resizeMode="contain"
        repeat
        onError={(e) => console.log("Error loading video: ", e)}
        onBuffer={(e) => console.log("Buffering: ", e)}
        onLoadStart={() => console.log("Loading video...")}
        onLoad={() => console.log("Video loaded")}
        // autoplay 
        paused={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: 300,
  },
});

export default VideoPlayer;
