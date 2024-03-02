import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity } from 'react-native';
import logo from '../../assets/images/logo.png';
import user from '../../assets/icons/user.png';
import pass from '../../assets/icons/pass.png';
import showPasswordIcon from '../../assets/icons/show_password.png'; // Import the show password icon
import hidePasswordIcon from '../../assets/icons/hide_password.png'; // Import the hide password icon
import LoginScreenStyles from './LoginScreenStyles';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true); // State to toggle password visibility

  const handleLogin = () => {
    // Your login logic here
    console.log('Logging in with:', username, password);
    // Example: Navigate to HomeScreen on successful login
    navigation.navigate('Home');
  };

  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword); // Toggle the hidePassword state
  };

  return (
    <View style={LoginScreenStyles.container}>
      <Image source={logo} style={LoginScreenStyles.logo} />
      {/* Username input with icon */}
      <View style={LoginScreenStyles.inputContainer}>
        <Image source={user} style={LoginScreenStyles.icon} />
        <TextInput
          style={LoginScreenStyles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View style={LoginScreenStyles.inputContainer}>
        <Image source={pass} style={LoginScreenStyles.icon} />
        <TextInput
          style={LoginScreenStyles.input}
          placeholder="Password"
          secureTextEntry={hidePassword} // Set secureTextEntry based on the hidePassword state
          value={password}
          onChangeText={setPassword}
        />
        {/* Toggle button to show/hide password */}
        <TouchableOpacity onPress={togglePasswordVisibility} style={LoginScreenStyles.passwordToggle}>
          <Image source={hidePassword ? showPasswordIcon : hidePasswordIcon} style={LoginScreenStyles.toggleIcon} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={LoginScreenStyles.button} onPress={handleLogin}>
        <Text style={LoginScreenStyles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
