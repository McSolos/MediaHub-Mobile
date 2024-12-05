import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, SafeAreaView, Image, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';

import Home from './screen/Home';
import LiveTv from './screen/LiveTv';
import Search from './screen/Search';
import TvGuide from './screen/TvGuide';
import Others from './screen/Others';
import Play from './screen/Play';
import Auth from './screen/Auth';
import Navbar from './components/CurvyBottomNav';

const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('Auth'); // Default to Auth
  const [userData, setUserData] = useState(null); // Store user data
  useEffect(() => {

    const checkAuth = async () => {
      try {
        // const token = await AsyncStorage.getItem('authToken');
        const token = await AsyncStorage.getItem('authToken');
        console.log('Retrieved Token:', token); // Debugging

        if (token) {
          const decodedToken = jwt_decode(token);
    
          // Check if the token is expired
          if (decodedToken.exp * 1000 > Date.now()) {
            setUserData({ id: decodedToken.id, username: decodedToken.username }); // Set user data
            setInitialRoute('Home'); // Redirect to Home if token is valid
          } else {
            await AsyncStorage.removeItem('authToken'); // Remove expired token
          }
        }
      } catch (error) {
        console.error('Error checking auth token:', error);
      } finally {
        setIsLoading(false); // Finished checking auth
      }
    };

    checkAuth();
  }, []); 

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={initialRoute}
          screenOptions={{ gestureEnabled: false }} // Disable swipe back gesture
        >
          <Stack.Screen 
            name="Home" 
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
          >
            {props => <Home {...props} userData={userData} />}
          </Stack.Screen>
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
          <Stack.Screen 
            name="Auth" 
            component={Auth} 
            options={{
              headerShown: false,
              gestureEnabled: false, // Prevent swipe back
            }}
          />
        </Stack.Navigator>
        {/* <Navbar/> */}
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});
