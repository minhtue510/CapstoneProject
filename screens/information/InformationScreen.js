import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, SafeAreaView, StatusBar, Image, TouchableOpacity } from 'react-native';
import InformationScreenStyles from './InformationScreenStyles'; // Import styles
import Avatar from '../../assets/images/avatar.png';
import { getUserByAccountId } from '../../api/user';
import { useNavigation } from '@react-navigation/native';
import back from '../../assets/icons/back.png';
import { launchImageLibrary } from 'react-native-image-picker';

const InformationScreen = ({ route }) => {
  const [userInfos, setUserInfos] = useState([]);
  const navigation = useNavigation();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Tháng bắt đầu từ 0, nên cần cộng thêm 1
    const year = date.getFullYear();
    return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={InformationScreenStyles.backButton}>
          <Image source={back} style={InformationScreenStyles.backIcon} />
        </TouchableOpacity>
      ),
      headerStyle: InformationScreenStyles.headerStyle,
      headerTitleAlign: 'center',  // Center align the title
      title: 'Thông tin', 
    });
  }, [navigation]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // Extract user ID from the login response
        const userId = route.params?.id;
        console.log('User ID:', userId);

        // Call the API to fetch user information based on the user ID
        const userData = await getUserByAccountId(userId);
        console.log('User Data:', userData);

        // Update the userInfo state with the fetched user data
        setUserInfos(userData);

      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, [route.params]);

  const selectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (!response.didCancel && !response.error) {
        // Handle selected image here
        const selectedImage = response.uri;
        // Call a function to upload the selected image
        // uploadImage(selectedImage);
      }
    });
  };

  return (
    <SafeAreaView style={InformationScreenStyles.container}>
      <StatusBar style="auto" />
      {userInfos?.map((userInfo) => (
        <View key={userInfo.account.accountId} style={InformationScreenStyles.formContainer}>
          <View>
            <View style={InformationScreenStyles.avatarContainer}>
              <Image
                style={{ width: 100, height: 100, borderRadius: 100 }}
                source={userInfo.account.img ? { uri: userInfo.account.img } : Avatar}
              />
              {/* <Text style={InformationScreenStyles.changeImageText}>Đổi ảnh đại diện</Text> */}
            </View>
          </View>
          <View style={InformationScreenStyles.rowContainer}>
            <Text style={InformationScreenStyles.label}>Họ và tên</Text>
            <Text style={InformationScreenStyles.value}>{userInfo?.account.fullName}</Text>
          </View>
          <View style={InformationScreenStyles.rowContainer}>
            <Text style={InformationScreenStyles.label}>Ngày sinh</Text>
            <Text style={InformationScreenStyles.value}>
              {userInfo?.account.dateOfBirth && formatDate(userInfo.account.dateOfBirth)}
            </Text>
          </View>
          <View style={InformationScreenStyles.rowContainer}>
            <Text style={InformationScreenStyles.label}>Điện thoại</Text>
            <Text style={InformationScreenStyles.value}>{userInfo?.account.phone}</Text>
          </View>
          <View style={InformationScreenStyles.rowContainer}>
            <Text style={InformationScreenStyles.label}>Email</Text>
            <Text style={InformationScreenStyles.value}>{userInfo?.account.email}</Text>
          </View>
          <View style={InformationScreenStyles.rowContainer}>
            <Text style={InformationScreenStyles.label}>Giấy phép lái xe</Text>
            <Text style={InformationScreenStyles.value}>{userInfo?.licenseNumber}</Text>
          </View>
          <View style={InformationScreenStyles.rowContainer}>
            <Text style={InformationScreenStyles.label}>Số CMND</Text>
            <Text style={InformationScreenStyles.value}>{userInfo?.account.citizenId}</Text>
          </View>
        </View>
      ))}
    </SafeAreaView>
  )
};

export default InformationScreen;
