import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View, Button, SafeAreaView, Image } from 'react-native';
import Navbar from './components/CurvyBottomNav';
import Home from './screen/Home';
import LiveTv from './screen/LiveTv';
import Play from './screen/Play';


const Stack = createStackNavigator();


export default function App() {
  return (
    <SafeAreaView style={styles.container}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        {/* // <Stack.Screen name="Home" component={HomeScreen} /> */}
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
        }} 
      />

      <Stack.Screen 
        name="Play" 
        component={Play} 
        options={{
          headerStyle: {
            backgroundColor: '#0c0a00', // Background color of the header (optional)
          },
          headerTintColor: '#fff', // Text color of the header
          headerTitleStyle: {
            fontWeight: 'bold', // Optional styling for the header title
          },
        }}
      />
      </Stack.Navigator>
      <Navbar/>
    </NavigationContainer>
    
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'black',
  },
});
