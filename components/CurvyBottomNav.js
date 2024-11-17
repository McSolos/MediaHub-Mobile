// components/CurvyBottomNav.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';


const CurvyBottomNav = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Home')}>
      <FontAwesome name="home" size={24} color="#fff" />
        <Text style={styles.label}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('')}>
        <FontAwesome name="tv" size={24} color="#fff" />
        <Text style={styles.label}>LiveTV</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.centralButton} onPress={() => navigation.navigate('')}>
        <FontAwesome name="search" size={30} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('')}>
        <FontAwesome name="guide" size={24} color="#fff" />
        <Text style={styles.label}>TV Guide</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('')}>
        <FontAwesome name="bars" size={24} color="#fff" />
        <Text style={styles.label}>More</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#000',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  navButton: {
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    fontSize: 24,
    color: '#fff',
  },
  label: {
    fontSize: 12,
    color: '#fff',
    marginTop: 4,
  },
  centralButton: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },
  centralIcon: {
    fontSize: 30,
    color: '#000',
  },
});

export default CurvyBottomNav;
