import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Navbar from '../components/CurvyBottomNav';
function OthersScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'https://via.placeholder.com/100' }} // Replace with your profile icon URI
          style={styles.profileIcon}
        />
        <Text style={styles.profileName}>Your Name</Text>
      </View>
      <View style={styles.divider} />

      {/* Options Section */}
      <View style={styles.optionsSection}>
        <View style={styles.optionRow}>
          <FontAwesome name="star" size={20} color="#fff" style={styles.icon} />
          <Text style={styles.optionText}>Favourites</Text>
        </View>
        <View style={styles.optionRow}>
          <FontAwesome name="history" size={20} color="#fff" style={styles.icon} />
          <Text style={styles.optionText}>History</Text>
        </View>
        <View style={styles.optionRow}>
          <FontAwesome name="sliders" size={20} color="#fff" style={styles.icon} />
          <Text style={styles.optionText}>Preferences</Text>
        </View>
        <View style={styles.optionRow}>
          <FontAwesome name="cog" size={20} color="#fff" style={styles.icon} />
          <Text style={styles.optionText}>Settings</Text>
        </View>
        </View>
        <Navbar />
    </SafeAreaView>
  );
}

export default OthersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c2c2c',
    paddingHorizontal: 16,
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#3c3c3c',
  },
  profileName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#555',
    marginVertical: 16,
  },
  optionsSection: {
    marginTop: 10,
  },
  optionText: {
    fontSize: 22,
    color: '#fff',
    marginVertical: 12,
    paddingHorizontal: 8,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 12,
  },
  optionText: {
    fontSize: 20,
    color: '#fff',
  },
  
});
