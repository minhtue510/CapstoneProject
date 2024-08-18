// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, Image, TouchableOpacity } from 'react-native';
// import logo from '../../assets/images/logo.jpg';
// import user from '../../assets/icons/user.png';
// import pass from '../../assets/icons/pass.png';
// import showPasswordIcon from '../../assets/icons/show_password.png';
// import hidePasswordIcon from '../../assets/icons/hide_password.png';
// import LoginScreenStyles from './LoginScreenStyles';
// import { loginUser } from '../../api/user';
// import { useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// const LoginScreen = () => {
//   const navigation = useNavigation(); // Sử dụng hook useNavigation để lấy đối tượng navigation

//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [hidePassword, setHidePassword] = useState(true);

//   const validatePassword = (password) => {
//     // Kiểm tra độ dài của mật khẩu
//     if (password.length < 8 || password.length > 16) {
//       return false;
//     }
//     // Kiểm tra xem mật khẩu có chứa chữ và số không
//     const containsLetter = /[a-zA-Z]/.test(password);
//     const containsNumber = /[0-9]/.test(password);
//     return containsLetter && containsNumber;
//   };
  
//   const handleLogin = async () => {
 
//     try {
//       // Check if the username and password are provided
//       if (username.trim() === '' || password.trim() === '') {
//         console.error('Tên đăng nhập và mật khẩu không được để trống.');
//         return;
//       }
      
//       // Proceed with the login process
//       const response = await loginUser(username, password);
//       console.log('Đăng nhập thành công:', response);
//       await AsyncStorage.setItem("loginInfo", JSON.stringify(response));
//       console.log("Token and Service saved to AsyncStorage");
//       // Handle response from the server
//       if (response.role === 'Driver') {
//         // navigation.navigate('MainTabs');
//         navigation.navigate('Menu');

//       } else {
//         console.error('Tài khoản của bạn không phải tài xế.');
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         console.error('Sai tên đăng nhập hoặc mật khẩu.');
//       } else {
//         console.error('Sai tên đăng nhập hoặc mật khẩu.');
//       }
//     }
//   };


  

//   const togglePasswordVisibility = () => {
//     setHidePassword(!hidePassword);
//   };

//   return (
//     <View style={LoginScreenStyles.container}>
//       <Image source={logo} style={LoginScreenStyles.logo} />
//       <View style={LoginScreenStyles.inputContainer}>
//         <Image source={user} style={LoginScreenStyles.icon} />
//         <TextInput
//           style={LoginScreenStyles.input}
//           placeholder="Tài khoản"
//           value={username}
//           onChangeText={setUsername}
//         />
//       </View>
//       <View style={LoginScreenStyles.inputContainer}>
//         <Image source={pass} style={LoginScreenStyles.icon} />
//         <TextInput
//           style={LoginScreenStyles.input}
//           placeholder="Mật khẩu"
//           secureTextEntry={hidePassword}
//           value={password}
//           onChangeText={setPassword}
//         />
//         <TouchableOpacity onPress={togglePasswordVisibility} style={LoginScreenStyles.passwordToggle}>
//           <Image source={hidePassword ? showPasswordIcon : hidePasswordIcon} style={LoginScreenStyles.toggleIcon} />
//         </TouchableOpacity>
//       </View>
//       <TouchableOpacity style={LoginScreenStyles.button} onPress={handleLogin}>
//         <Text style={LoginScreenStyles.buttonText}>Đăng nhập</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default LoginScreen;

import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import logo from '../../assets/images/logo.jpg';
import userIcon from '../../assets/icons/user.png';
import passIcon from '../../assets/icons/pass.png';
import showPasswordIcon from '../../assets/icons/show_password.png';
import hidePasswordIcon from '../../assets/icons/hide_password.png';
import LoginScreenStyles from './LoginScreenStyles';
import { loginUser } from '../../api/user';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = async () => {
    let hasError = false;

    // Reset lỗi trước khi kiểm tra
    setUsernameError('');
    setPasswordError('');
    setLoginError('');

    // Kiểm tra tên tài khoản
    if (username.trim() === '') {
      setUsernameError('Tên đăng nhập không được để trống!');
      hasError = true;
    }

    // Kiểm tra mật khẩu
    if (password.trim() === '') {
      setPasswordError('Mật khẩu không được để trống!');
      hasError = true;
    }

    if (hasError) {
      return; // Ngừng nếu có lỗi
    }

    try {
      const response = await loginUser(username, password);
      console.log('Đăng nhập thành công:', response);
      await AsyncStorage.setItem("loginInfo", JSON.stringify(response));
      console.log("Token and Service saved to AsyncStorage");

      if (response.role === 'Driver') {
        navigation.navigate('Menu');
      } else {
        setLoginError('Tài khoản của bạn không phải tài xế!');
      }
    } catch (error) {
      setLoginError('Sai tên đăng nhập hoặc mật khẩu!');
  }
  };

  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <View style={LoginScreenStyles.container}>
      <Image source={logo} style={LoginScreenStyles.logo} />

      <View style={LoginScreenStyles.inputContainer}>
        <Image source={userIcon} style={LoginScreenStyles.icon} />
        <TextInput
          style={LoginScreenStyles.input}
          placeholder="Tài khoản"
          value={username}
          onChangeText={setUsername}
        />
      </View>
      {usernameError ? <Text style={LoginScreenStyles.usernameError}>{usernameError}</Text> : null}

     
      <View style={LoginScreenStyles.inputContainer}>
        <Image source={passIcon} style={LoginScreenStyles.icon} />
        <TextInput
          style={LoginScreenStyles.input}
          placeholder="Mật khẩu"
          secureTextEntry={hidePassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={LoginScreenStyles.passwordToggle}>
          <Image source={hidePassword ? showPasswordIcon : hidePasswordIcon} style={LoginScreenStyles.toggleIcon} />
        </TouchableOpacity>
      </View>
      {passwordError ? <Text style={LoginScreenStyles.passwordError}>{passwordError}</Text> : null}

      {loginError ? <Text style={LoginScreenStyles.errorText}>{loginError}</Text> : null}

      <TouchableOpacity style={LoginScreenStyles.button} onPress={handleLogin}>
        <Text style={LoginScreenStyles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
