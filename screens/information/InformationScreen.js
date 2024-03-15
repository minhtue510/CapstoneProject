import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StatusBar, Image } from 'react-native';
import InformationScreenStyles from './InformationScreenStyles'; // Import styles
import Avatar from '../../assets/images/avatar.png';
import { getUserByAccountId, getUserById } from '../../api/user';

const InformationScreen = ({ route }) => {
  const [userInfos, setUserInfos] = useState([]);

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

  return (
    <SafeAreaView style={InformationScreenStyles.container}>
      <StatusBar style="auto" />
      {/* <View style={InformationScreenStyles.avatarContainer}>
            <Image source={Avatar} style={InformationScreenStyles.avatar} />
          </View> */}
      {userInfos?.map((userInfo) => (
        <View key={userInfo.account.accountId} style={InformationScreenStyles.formContainer}>
          <View style={InformationScreenStyles.avatarContainer}>
            <Image source={Avatar} style={InformationScreenStyles.avatar} />
          </View>
          <View style={InformationScreenStyles.rowContainer}>
            <Text style={InformationScreenStyles.label}>Họ và tên:</Text>
            <Text style={InformationScreenStyles.value}>{userInfo?.account.fullName}</Text>
          </View>
          <View style={InformationScreenStyles.rowContainer}>
            <Text style={InformationScreenStyles.label}>Ngày sinh:</Text>
            <Text style={InformationScreenStyles.value}>{userInfo?.account.dateOfBirth}</Text>
          </View>
          <View style={InformationScreenStyles.rowContainer}>
            <Text style={InformationScreenStyles.label}>Phone:</Text>
            <Text style={InformationScreenStyles.value}>{userInfo?.account.phone}</Text>
          </View>
          <View style={InformationScreenStyles.rowContainer}>
            <Text style={InformationScreenStyles.label}>Email:</Text>
            <Text style={InformationScreenStyles.value}>{userInfo?.account.email}</Text>
          </View>
          <View style={InformationScreenStyles.rowContainer}>
            <Text style={InformationScreenStyles.label}>Số giấy phép:</Text>
            <Text style={InformationScreenStyles.value}>{userInfo?.licenseNumber}</Text>
          </View>
        </View>
      ))}
    </SafeAreaView>
  )
};

export default InformationScreen;
