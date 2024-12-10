import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Favorites = ({ navigation }) => {
 

  // const [activeCategory, setActiveCategory] = useState(categories[0].name);
  const [videos, setVideos] = useState([]); // State for fetched videos
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null); // User info state
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await AsyncStorage.getItem('userInfo');
        if (user) {
          setUserInfo(JSON.parse(user));
        } else {
          setError('User info not found.');
        }
      } catch (error) {
        Alert.alert("Error", "Failed to retrieve data.");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!userInfo) return; // Don't fetch if userInfo is not yet loaded

    const fetchFavorites = async () => {
      try {
        setLoading(true); // Set loading state to true before API call
        const response = await axios.get('http://10.50.7.119:8085/videos/favorite', {
          params: { userId: userInfo.id }
        });
        setVideos(response.data);
        setLoading(false); // Set loading state to false after data is fetched
      } catch (error) {
        setError('Failed to load Favorites.');
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [userInfo]);
  return (
    <SafeAreaView style={styles.container}>
    
      <ScrollView style={styles.contentScrollView}>
        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) :(
          videos.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.contentItem}
              onPress={() =>
                navigation.navigate('Play', {
                  videoDetails: item,
                })
              }
            >
              <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
              <Text style={styles.title}>{item.title}</Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C2C2C',
    paddingBottom: 80,
  },
  scrollWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    paddingHorizontal: 10,
  },
  scrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrow: {
    paddingHorizontal: 4,
  },
  button: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  activeButton: {
    borderBottomWidth: 2,
    borderBottomColor: 'red',
  },
  activeButtonText: {
    color: 'red',
  },
  contentScrollView: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  contentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#333',
    borderRadius: 5,
    padding: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  title: {
    color: '#fff',
    fontSize: 16,
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Favorites;
