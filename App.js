import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, SafeAreaView, Image } from 'react-native';

import Navbar from './components/CurvyBottomNav';
import Home from './screen/Home';
import LiveTv from './screen/LiveTv';
import Search from './screen/Search';
import TvGuide from './screen/TvGuide';
import Others from './screen/Others';
import Play from './screen/Play';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen 
            name="Home" 
            component={Home} 
            options={{ 
              headerTitle: () => (
                <Image 
                  source={require('./assets/ipnx-media-hub-logo.png')} 
                  style={{ width: 100, height: 40, resizeMode: 'contain' }} 
                />
              ),
              headerStyle: { backgroundColor: '#0c0a00' }, 
              headerLeft: null, 
            }} 
          />
          <Stack.Screen 
            name="LiveTv" 
            component={LiveTv} 
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen 
            name="Search" 
            component={Search} 
            options={{
              headerShown: false, 
            }}
          />
          <Stack.Screen 
            name="TvGuide" 
            component={TvGuide}  
            options={{
              headerShown: false, 
            }}
          />
          <Stack.Screen 
            name="Others" 
            component={Others} 
            options={{
              headerShown: false, 
            }}
          />
          <Stack.Screen 
            name="Play" 
            component={Play} 
            options={{
              headerShown: false, 
            }}
          />
        </Stack.Navigator>
        <Navbar />
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
