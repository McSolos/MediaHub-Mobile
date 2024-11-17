import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View, Button, SafeAreaView, Image } from 'react-native';
import Navbar from './components/CurvyBottomNav';
import Home from './pages/Home';

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
    headerStyle: { backgroundColor: 'black' }, 
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
