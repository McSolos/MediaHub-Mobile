import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

const LoginSignupScreen = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = () => {
    console.log("Logging in with:", email, password);
    // Add login logic here
  };

  const handleSignup = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Signing up with:", {
      firstName,
      lastName,
      username,
      email,
      password,
    });
    // Add signup logic here
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
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
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
    width: "90%", // Slightly narrower width
  },
  input: {
    width: "90%", // Reduce width for better aesthetics
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 10, // Rounded corners
    backgroundColor: "#1e1e1e", // Darker input background
    color: "#ffffff", // White text for input
    fontSize: 16,
  },
  halfInput: {
    width: "45%", // Adjust to fit side by side
  },
  button: {
    width: "90%", // Match input width
    backgroundColor: "#4caf50", // Green button
    padding: 15,
    alignItems: "center",
    borderRadius: 10, // Rounded corners
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
    color: "#4caf50", // Green text for toggle
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default LoginSignupScreen;
