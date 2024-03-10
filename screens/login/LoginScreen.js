import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity } from 'react-native';
import logo from '../../assets/images/logo.png';
import user from '../../assets/icons/user.png';
import pass from '../../assets/icons/pass.png';
import showPasswordIcon from '../../assets/icons/show_password.png';
import hidePasswordIcon from '../../assets/icons/hide_password.png';
import LoginScreenStyles from './LoginScreenStyles';
import { loginUser } from '../../api/user';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const LoginScreen = () => {
  const navigation = useNavigation(); // Sử dụng hook useNavigation để lấy đối tượng navigation

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  const validatePassword = (password) => {
    // Kiểm tra độ dài của mật khẩu
    if (password.length < 8 || password.length > 16) {
      return false;
    }
    // Kiểm tra xem mật khẩu có chứa chữ và số không
    const containsLetter = /[a-zA-Z]/.test(password);
    const containsNumber = /[0-9]/.test(password);
    return containsLetter && containsNumber;
  };
  
  const handleLogin = async () => {
    try {
      // Kiểm tra xem tên đăng nhập và mật khẩu có được nhập không
      if (username.trim() === '' || password.trim() === '') {
        console.error('Tên đăng nhập và mật khẩu không được để trống.');
        return;
      }
      
      // Tiếp tục với quá trình đăng nhập
      const response = await loginUser(username, password);
      console.log('Đăng nhập thành công:', response);
      await AsyncStorage.setItem("loginInfo", JSON.stringify(response));
      console.log("Token and Service saved to AsyncStorage");
      // Xử lý phản hồi từ server
      if (response.role === 'Driver') {
        navigation.navigate('MainTabs');
      } else {
        console.error('Tài khoản của bạn không phải tài xế.');
      }
    } catch (error) {
      console.error('Sai tên đăng nhập hoặc mật khẩu:');
    }
  };


  

  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <View style={LoginScreenStyles.container}>
      <Image source={logo} style={LoginScreenStyles.logo} />
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
          secureTextEntry={hidePassword}
          value={password}
          onChangeText={setPassword}
        />
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
