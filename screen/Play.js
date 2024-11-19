import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Video } from 'expo-av';

const Play = ({ navigation, route }) => {
  const { width, height } = Dimensions.get('screen');
  const data = 'cow dick';	
  const title =  'something something';

  useEffect(() => {
    console.log(data, 'and', title);
  }, []);

  return ( 
    <View style={styles.mainPlayerView}>
      <View style={[styles.videoContainer, { height: height / 3 }]}>
        <Video
        controls={true}
          style={styles.video}
          source={{ uri: 'https://www.w3schools.com/html/mov_bbb.mp4' }}
        //   rate={1.0}
        //   volume={1.0}
        //   isMuted={false}
          resizeMode="contain" // Ensures proper scaling
        //   shouldPlay // Automatically plays the video
        />
      </View>
      <Text style={styles.postTitle}>{title}</Text>
      <Text style={styles.postSubtitle}>{data}</Text>
    </View>
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
    width: '100%', // Ensure full width
    backgroundColor: 'grey',
  },
  video: {
    flex: 1, // Ensures the video fills the parent container
    width: '100%', // Full width
    height: '100%', // Full height
  },
  postTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    paddingTop: 20,
  },
  postSubtitle: {
    fontSize: 20,
    color: '#555',
    paddingTop: 10,
  },
});
