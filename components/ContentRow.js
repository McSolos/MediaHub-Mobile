import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';

const ContentRow = ({ navigation, videos }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {videos.map((video) => (
        <TouchableOpacity
          key={video.id}
          style={styles.card}
          onPress={() =>
            navigation.navigate('Play', {
              videoDetails: video, // Pass the current video object
            })
          }>
          <Image source={{ uri: video.thumbnail }} style={styles.thumbnail} />
          <Text style={styles.title}>{video.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  card: {
    marginRight: 12,
    alignItems: 'center',
  },
  thumbnail: {
    width: 150,
    height: 100,
    borderRadius: 8,
  },
  title: {
    marginTop: 6,
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    width: 150,
  },
});

export default ContentRow;
