import React from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, StatusBar, Alert } from 'react-native';
import ProfileScreenStyles from './ProfileScreenStyles'; // Import styles
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import Avatar from '../../assets/images/avatar.png'; // Import your avatar image
import InfoIcon from '../../assets/icons/info.png';
import AboutUsIcon from '../../assets/icons/aboutus.png';
import ContactUsIcon from '../../assets/icons/contactus.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ProfileScreen = () => {
  const navigation = useNavigation(); // Initialize navigation hook

  const handleLogout = () => {
    // Hiển thị popup hỏi người dùng
    Alert.alert(
      'Đăng xuất',
      'Bạn có muốn đăng xuất không?',
      [
        {
          text: 'Không',
          style: 'cancel', // Màu sắc của nút sẽ là màu hủy bỏ (thường là màu đỏ)
        },
        {
          text: 'Có',
          onPress: () => {
            navigation.navigate('Login'); // Đăng xuất và quay về màn hình login
          },
        },
      ],
      { cancelable: false } // Ngăn người dùng đóng popup bằng cách bấm ra ngoài
    );
  };

  const handleAboutUs = () => {
    navigation.navigate('AboutUs'); // Navigate to AboutUsScreen
  };

  const handleContactUs = () => {
    navigation.navigate('ContactUs'); // Navigate to ContactUsScreen
  };

  // const handleInformation = async() => {
  //   navigation.navigate('Information') ;
  //    // Truyền id vào thông qua route.params
  // };

  const handleInformation = async () => {
    try {
      const loginInfoString = await AsyncStorage.getItem('loginInfo');
      if (loginInfoString !== null) {
        const loginInfo = JSON.parse(loginInfoString);
        navigation.navigate('Information', { id: loginInfo.id });
      } else {
        // Xử lý trường hợp không tìm thấy thông tin đăng nhập
        console.log('Không tìm thấy thông tin đăng nhập');
      }
    } catch (error) {
      console.error('Lỗi khi lấy thông tin đăng nhập:', error);
      throw error;
    }
  };

  return (
    <SafeAreaView style={ProfileScreenStyles.container}>
      <StatusBar style="auto" />
      <View style={ProfileScreenStyles.titleContainer}>
        <Text style={ProfileScreenStyles.title}>Hồ sơ</Text>
      </View>
      <View style={ProfileScreenStyles.avatarContainer}>
        <Image source={Avatar} style={ProfileScreenStyles.avatar} />
      </View>
      <View style={ProfileScreenStyles.formContainer}>
        <View style={ProfileScreenStyles.rowContainer}>
          <TouchableOpacity style={ProfileScreenStyles.textButton} onPress={handleInformation}>
            <View style={ProfileScreenStyles.buttonContent}>
              <Image source={InfoIcon} style={ProfileScreenStyles.icon} />
              <Text style={ProfileScreenStyles.buttonText}>Thông tin</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={ProfileScreenStyles.rowContainer}>
          <TouchableOpacity style={ProfileScreenStyles.textButton} onPress={handleAboutUs}>
            <View style={ProfileScreenStyles.buttonContent}>
              <Image source={AboutUsIcon} style={ProfileScreenStyles.icon} />
              <Text style={ProfileScreenStyles.buttonText}>Về chúng tôi</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={ProfileScreenStyles.rowContainer}>
          <TouchableOpacity style={ProfileScreenStyles.textButton} onPress={handleContactUs}>
            <View style={ProfileScreenStyles.buttonContent}>
              <Image source={ContactUsIcon} style={ProfileScreenStyles.icon} />
              <Text style={ProfileScreenStyles.buttonText}>Liên hệ hỗ trợ</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={ProfileScreenStyles.rowContainer}>
          <TouchableOpacity style={ProfileScreenStyles.button} onPress={handleLogout}>
            <Text style={ProfileScreenStyles.buttonTextLogout}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
  
};

export default ProfileScreen;
