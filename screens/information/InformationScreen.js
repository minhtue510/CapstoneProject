import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StatusBar, Image, TouchableOpacity } from 'react-native';
import InformationScreenStyles from './InformationScreenStyles'; // Import styles
import Avatar from '../../assets/images/avatar.png';
import { getUserByAccountId } from '../../api/user';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import {updatePhoneNumber} from '../../api/user';
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

  const updatePhoneNumber = () => {
    // Function to handle updating phone number
    // You can implement this function according to your API logic
    console.log("Update phone number logic here");
  };

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

        // After fetching user data, automatically navigate to OrderScreen

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
      {/* <View style={InformationScreenStyles.avatarContainer}>
            <Image source={Avatar} style={InformationScreenStyles.avatar} />{userInfo?.account.avatar}
          </View> */}
      {userInfos?.map((userInfo) => (
        <View key={userInfo.account.accountId} style={InformationScreenStyles.formContainer}>
          <TouchableOpacity onPress={selectImage}>
            <View style={InformationScreenStyles.avatarContainer}>
              <Image
                style={{ width: 100, height: 100, borderRadius: 100 }}
                source={{ uri: userInfo.account.img }}
              />
              {/* <Text style={InformationScreenStyles.changeImageText}>Change Image</Text> */}
            </View>
          </TouchableOpacity>
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
            <Text style={InformationScreenStyles.label}>Phone</Text>
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
