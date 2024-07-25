import {React, useLayoutEffect} from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, StatusBar, Alert } from 'react-native';
import ProfileScreenStyles from './ProfileScreenStyles'; // Import styles
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import Avatar from '../../assets/images/avatar.png'; // Import your avatar image
import InfoIcon from '../../assets/icons/info.png';
import AboutUsIcon from '../../assets/icons/aboutus.png';
import back from '../../assets/icons/back.png';
import ContactUsIcon from '../../assets/icons/contactus.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Vector from '../../assets/icons/Vector.png'
const ProfileScreen = () => {
  const navigation = useNavigation(); // Initialize navigation hook

  const handleLogout = () => {
    Alert.alert(
      'Đăng xuất',
      'Bạn có muốn đăng xuất không?',
      [
        {
          text: 'Không',
          style: 'cancel',
        },
        {
          text: 'Có',
          onPress: () => {
            navigation.navigate('Login');
          },
        },
      ],
      { cancelable: false }
    );
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Menu')} style={ProfileScreenStyles.backButton}>
          <Image source={back} style={ProfileScreenStyles.backIcon} />
        </TouchableOpacity>
      ),
      headerStyle: ProfileScreenStyles.headerStyle,
      headerTitleAlign: 'center',  // Center align the title
      title: 'Hồ sơ ', 
    });
  }, [navigation]);

  const handleAboutUs = () => {
    navigation.navigate('AboutUs');
  };

  const handleContactUs = () => {
    navigation.navigate('ContactUs');
  };

  const handleInformation = async () => {
    try {
      const loginInfoString = await AsyncStorage.getItem('loginInfo');
      if (loginInfoString !== null) {
        const loginInfo = JSON.parse(loginInfoString);
        navigation.navigate('Information', { id: loginInfo.accounId });
      } else {
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
        {/* <Text style={ProfileScreenStyles.title}>Hồ sơ của bạn</Text> */}
      </View>
      <View style={ProfileScreenStyles.avatarContainer}>
        <Image source={Avatar} style={ProfileScreenStyles.avatar} />
      </View>
      <View style={ProfileScreenStyles.formContainer}>
      <View style={ProfileScreenStyles.boxContainer}>
        <View style={ProfileScreenStyles.rowContainer}>
          <TouchableOpacity style={ProfileScreenStyles.textButton} onPress={handleInformation}>
            <View style={ProfileScreenStyles.buttonContent}>
              <Image source={InfoIcon} style={ProfileScreenStyles.icon} />
              <Text style={ProfileScreenStyles.buttonText}>Thông tin</Text>
              <Image source={Vector} style={ProfileScreenStyles.iconVector} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={ProfileScreenStyles.rowContainer}>
          <TouchableOpacity style={ProfileScreenStyles.textButton} onPress={handleAboutUs}>
            <View style={ProfileScreenStyles.buttonContent}>
              <Image source={AboutUsIcon} style={ProfileScreenStyles.icon} />
              <Text style={ProfileScreenStyles.buttonText}>Về chúng tôi</Text>
              <Image source={Vector} style={ProfileScreenStyles.iconVector} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={ProfileScreenStyles.rowContainer}>
          <TouchableOpacity style={ProfileScreenStyles.textButton} onPress={handleContactUs}>
            <View style={ProfileScreenStyles.buttonContent}>
              <Image source={ContactUsIcon} style={ProfileScreenStyles.icon} />
              <Text style={ProfileScreenStyles.buttonText}>Liên hệ hỗ trợ</Text>
              <Image source={Vector} style={ProfileScreenStyles.iconVector} />
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={ProfileScreenStyles.button} onPress={handleLogout}>
        <Text style={ProfileScreenStyles.buttonTextLogout}>Đăng xuất</Text>
      </TouchableOpacity>
      </View>
      </View>
      
    </SafeAreaView>
  );
};

export default ProfileScreen;
