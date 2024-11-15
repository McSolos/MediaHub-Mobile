import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View, Button } from 'react-native';
import PlayPage from './pages//PlayPage';

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={styles.homeContainer}>
      <Button
        title="Go to Video"
        onPress={() => navigation.navigate('PlayPage')}
      />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PlayPage" component={PlayPage} options={{ title: 'Watch Video' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
