import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, SafeAreaView, StatusBar, Image, TouchableOpacity, TextInput, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import ChangeInfomationScreenStyles from './ChangeInfomationScreenStyles'; // Import styles
import Avatar from '../../assets/images/avatar.png';
import { getUserByAccountId } from '../../api/user';
import { useNavigation } from '@react-navigation/native';
import edit from '../../assets/icons/edit.png';
import back from '../../assets/icons/back.png';
import { updateImage, updatePhoneNumber, updateEmail} from '../../api/update'; // Import updateImage function

const ChangeInfomationScreen = ({ route }) => {
  const [userInfos, setUserInfos] = useState([]);
  const [image, setImage] = useState(null); // State to hold the selected image URI
  const [imageSelected, setImageSelected] = useState(false); // State to track if an image has been selected
  const navigation = useNavigation();
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const { accountId } = route.params?.id;
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
        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={ChangeInfomationScreenStyles.backButton}>
          <Image source={back} style={ChangeInfomationScreenStyles.backIcon} />
        </TouchableOpacity>
      ),
      headerStyle: ChangeInfomationScreenStyles.headerStyle,
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
        // console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, [route.params]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setImageSelected(true); // Set flag indicating that an image has been selected
      console.log("Selected Image URI:", result.assets[0].uri);
    }
  };

  const saveImage = async () => {
    try {
      const accountId = route.params?.id; 
      console.log("Account ID:", accountId); 
      console.log("Image URI:", image); 
  
      if (image) {
        const response = await updateImage(accountId, image);
        console.log("Upload thành công:", response);
        setImageSelected(false); 
      }
    } catch (error) {
      console.error("Lỗi khi gửi ảnh lên server:", error);
    }
  };
  return (
    <SafeAreaView style={ChangeInfomationScreenStyles.container}>
      <StatusBar style="auto" />
      {userInfos?.map((userInfo) => (
        <View key={userInfo.account.accountId} style={ChangeInfomationScreenStyles.formContainer}>
          <View>
            <View style={ChangeInfomationScreenStyles.avatarContainer}>
              <TouchableOpacity onPress={pickImage}>
                <Image
                  style={{ width: 100, height: 100, borderRadius: 100 }}
                  source={{ uri: image || userInfo.account.img || Avatar }}
                />
                <Text style={ChangeInfomationScreenStyles.changeImageText}>Đổi ảnh đại diện</Text>
              </TouchableOpacity>
              {imageSelected && (
                <TouchableOpacity onPress={saveImage} style={ChangeInfomationScreenStyles.saveButton}>
                  <Text style={ChangeInfomationScreenStyles.saveButtonText}>Lưu ảnh</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={ChangeInfomationScreenStyles.rowContainer}>
            <Text style={ChangeInfomationScreenStyles.label}>Điện thoại</Text>
            <Text style={ChangeInfomationScreenStyles.value}>{userInfo?.account.phone}</Text>
          </View>
          <View style={ChangeInfomationScreenStyles.rowContainer}>
            <Text style={ChangeInfomationScreenStyles.label}>Email</Text>
            <Text style={ChangeInfomationScreenStyles.value}>{userInfo?.account.email}</Text>

          </View>
        
        </View>
      ))}
    </SafeAreaView>
  );
};
export default ChangeInfomationScreen;
