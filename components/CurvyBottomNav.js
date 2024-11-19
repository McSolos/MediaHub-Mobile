import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useNavigationState } from '@react-navigation/native';

const CurvyBottomNav = () => {
  const navigation = useNavigation();
  
  // Get the current route name or fallback to an empty string if state is undefined
  const currentRouteName = useNavigationState((state) => state?.routes[state.index]?.name || '');

  const getIconColor = (routeName) => {
    return currentRouteName === routeName ? 'red' : '#fff'; // Red for active, white for inactive
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Home')}>
        <FontAwesome name="home" size={24} color={getIconColor('Home')} />
        <Text style={[styles.label, { color: getIconColor('Home') }]}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Play')}>
        <FontAwesome name="tv" size={24} color={getIconColor('LiveTv')} />
        <Text style={[styles.label, { color: getIconColor('LiveTv') }]}>LiveTV</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.centralButton} onPress={() => navigation.navigate('')}>
        <FontAwesome name="search" size={30} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('')}>
        <FontAwesome name="guide" size={24} color={getIconColor('')} />
        <Text style={styles.label}>TV Guide</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('')}>
        <FontAwesome name="bars" size={24} color={getIconColor('')} />
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
    marginTop: 4,
    color: '#fff',
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
});

export default CurvyBottomNav;
