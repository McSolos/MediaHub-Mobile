import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from '@react-navigation/native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

const LoginSignupScreen = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation(); // Get navigation prop

  const API_BASE = "http://192.168.43.247:8085"; // Replace with your backend URL

  const handleSignup = async () => {
    if (password.length < 8) {
      Alert.alert("Validation Error", "Password must be at least 8 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Validation Error", "Passwords do not match.");
      return;
    }

    const payload = {
      firstname: firstName,
      lastname: lastName,
      username,
      email,
      password,
    };

    try {
      const response = await fetch(`${API_BASE}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.Status === "Success") {
        Alert.alert("Success", "Account created successfully.");
        setIsLogin(true); // Switch to Login screen after successful signup
      } else {
        Alert.alert("Signup Error", result.Error || "An unknown error occurred.");
      }
    } catch (error) {
      Alert.alert("Error", "Unable to connect to the server.");
    }
  };

  const handleLogin = async () => {
    const payload = {
      usernameOrEmail: email,
      password,
    };
  
    try {
      const response = await fetch(`${API_BASE}/loginMobile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const result = await response.json();
  
      if (response.ok && result.status === "Success") {
        // Save token to AsyncStorage
        await AsyncStorage.setItem('authToken', result.token);
  
        // Log the token to the console
        console.log("Generated Token:", result.token);
  
        // Optionally save user info (if needed later)
        await AsyncStorage.setItem('userData', JSON.stringify(result.user));
  
        Alert.alert("Success", "Login successful.");
        navigation.navigate("Home"); // Navigate to home
      } else {
        Alert.alert("Login Error", result.message || "An unknown error occurred.");
      }
    } catch (error) {
      Alert.alert("Error", "Unable to connect to the server.");
    }
  };
  
  
  
  
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{isLogin ? "Login" : "Sign Up"}</Text>

      {!isLogin && (
        <>
          {/* First Name and Last Name Row */}
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="First Name"
              placeholderTextColor="#aaa"
              value={firstName}
              onChangeText={setFirstName}
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Last Name"
              placeholderTextColor="#aaa"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>

          {/* Username */}
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#aaa"
            value={username}
            onChangeText={setUsername}
          />
        </>
      )}

      {/* Email */}
      <TextInput
        style={styles.input}
        placeholder="Email or Username"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      {/* Password */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {!isLogin && (
        // Confirm Password
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#aaa"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={isLogin ? handleLogin : handleSignup}
      >
        <Text style={styles.buttonText}>{isLogin ? "Login" : "Sign Up"}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setIsLogin(!isLogin)}
        style={styles.switchButton}
      >
        <Text style={styles.switchText}>
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212", // Dark background
    padding: 16,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff", // White text
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  input: {
    width: "90%",
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 10,
    backgroundColor: "#1e1e1e",
    color: "#ffffff",
    fontSize: 16,
  },
  halfInput: {
    width: "45%",
  },
  button: {
    width: "90%",
    backgroundColor: "#4caf50",
    padding: 15,
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  switchButton: {
    marginTop: 15,
  },
  switchText: {
    color: "#4caf50",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default LoginSignupScreen;
