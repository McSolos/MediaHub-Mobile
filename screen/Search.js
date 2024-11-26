import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

function Search() {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    console.log('Search query:', query);
    // Add search logic here
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchWrapper}>
        <Text style={styles.title}>Search</Text>
        <TextInput
          style={styles.input}
          placeholder="Type here..."
          placeholderTextColor="#777"
          value={query}
          onChangeText={setQuery}
        />
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c2c2c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchWrapper: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: 'white',
  },
  input: {
    height: 60,
    backgroundColor: '#3c3c3c',
    borderRadius: 50,
    paddingHorizontal: 10,
    color: '#fff',
    marginBottom: 16,
    width: '100%',
  },
  button: {
    backgroundColor: 'red',
    borderRadius: 40,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
