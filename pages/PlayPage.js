import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import Player from '../components/Player';

const PlayPage = () => {
  return (
    <View style={styles.container}>
      {/* Video Player at the top */}
      <Player />

      {/* Scrollable content for video details and comments */}
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Video Title</Text>
        <Text style={styles.description}>
          This is a description of the video. It includes details like the number of views, upload date, and other information.
        </Text>
        <Text style={styles.commentsTitle}>Comments</Text>
        
        {/* Sample comments */}
        <Text style={styles.comment}>Comment 1: Amazing video!</Text>
        <Text style={styles.comment}>Comment 2: Very informative, thanks!</Text>
        <Text style={styles.comment}>Comment 3: I loved this part...</Text>
        {/* Add more comments if needed */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  comment: {
    fontSize: 14,
    marginBottom: 8,
  },
});

export default PlayPage;
