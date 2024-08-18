// import React, { useState, useEffect, useLayoutEffect } from 'react';
// import { View, Text, SafeAreaView, StatusBar, Image, TouchableOpacity, TextInput, Button } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import ChangeInfomationScreenStyles from './ChangeInfomationScreenStyles'; // Import styles
// import Avatar from '../../assets/images/avatar.png';
// import { getUserByAccountId } from '../../api/user';
// import { useNavigation } from '@react-navigation/native';
// import edit from '../../assets/icons/edit.png';
// import back from '../../assets/icons/back.png';
// import { updateImage, updatePhoneNumber, updateEmail } from '../../api/update'; // Import updateImage function

// const ChangeInfomationScreen = ({ route }) => {
//   const [userInfos, setUserInfos] = useState([]);
//   const [image, setImage] = useState(null); // State to hold the selected image URI
//   const [imageSelected, setImageSelected] = useState(false); // State to track if an image has been selected
//   const navigation = useNavigation();
//   const [newPhoneNumber, setNewPhoneNumber] = useState('');
//   const [newEmail, setNewEmail] = useState('');
//   const { accountId } = route.params;

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const day = date.getDate();
//     const month = date.getMonth() + 1; // Tháng bắt đầu từ 0, nên cần cộng thêm 1
//     const year = date.getFullYear();
//     return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
//   };

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       headerLeft: () => (
//         <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={ChangeInfomationScreenStyles.backButton}>
//           <Image source={back} style={ChangeInfomationScreenStyles.backIcon} />
//         </TouchableOpacity>
//       ),
//       headerStyle: ChangeInfomationScreenStyles.headerStyle,
//       headerTitleAlign: 'center',  // Center align the title
//       title: 'Thông tin',
//     });
//   }, [navigation]);

//   useEffect(() => {
//     const fetchUserInfo = async () => {
//       try {
//         // Extract user ID from the login response
//         const userId = route.params.id;
//         console.log('User ID:', userId);

//         // Call the API to fetch user information based on the user ID
//         const userData = await getUserByAccountId(userId);
//         console.log('User Data:', userData);

//         // Update the userInfo state with the fetched user data
//         setUserInfos(userData);
//       } catch (error) {
//         console.error('Error fetching user info:', error);
//       }
//     };

//     fetchUserInfo();
//   }, [route.params]);

//   const pickImage = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: false,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//       setImageSelected(true); // Set flag indicating that an image has been selected
//       console.log("Selected Image URI:", result.assets[0].uri);
//     }
//   };

//   const saveImage = async () => {
//     try {
//       const accountId = route.params.id;
//       console.log("Account ID:", accountId);
//       console.log("Image URI:", image);

//       if (image) {
//         const response = await updateImage(accountId, image);
//         console.log("Upload thành công:", response);
//         setImageSelected(false);
//       }
//     } catch (error) {
//       console.error("Lỗi khi gửi ảnh lên server:", error);
//     }
//   };

//   const savePhoneNumber = async () => {
//     try {
//       const accountId = route.params.id;
//       const response = await updatePhoneNumber(accountId,newPhoneNumber);
//       console.log('Cập nhật số điện thoại thành công:', response);
//     } catch (error) {
//       if (error.response) {
//         console.error('Lỗi khi cập nhật số điện thoại:', error.response.data);
//       } else if (error.request) {
//         console.error('Không nhận được phản hồi từ server:', error.request);
//       } else {
//         console.error('Lỗi khi thiết lập yêu cầu:', error.message);
//       }
//     }
//   };
  
//   const saveEmail = async () => {
//     try {
//       const accountId = route.params.id;
//       const response = await updateEmail(accountId, newEmail);
//       console.log('Cập nhật email thành công:', response);
//     } catch (error) {
//       if (error.response) {
//         console.error('Lỗi khi cập nhật email:', error.response.data);
//       } else if (error.request) {
//         console.error('Không nhận được phản hồi từ server:', error.request);
//       } else {
//         console.error('Lỗi khi thiết lập yêu cầu:', error.message);
//       }
//     }
//   };

//   return (
//     <SafeAreaView style={ChangeInfomationScreenStyles.container}>
//       <StatusBar style="auto" />
//       {userInfos?.map((userInfo) => {
//         const imageSource = image || userInfo.account.img || Avatar;
//         const imageUri = typeof imageSource === 'string' ? { uri: imageSource } : imageSource;

//         return (
//           <View key={userInfo.account.accountId} style={ChangeInfomationScreenStyles.formContainer}>
//             <View>
//               <View style={ChangeInfomationScreenStyles.avatarContainer}>
//                 <TouchableOpacity onPress={pickImage}>
//                   <Image
//                     style={{ width: 100, height: 100, borderRadius: 100 }}
//                     source={imageUri}
//                   />
//                   <Text style={ChangeInfomationScreenStyles.changeImageText}>Đổi ảnh đại diện</Text>
//                 </TouchableOpacity>
//                 {imageSelected && (
//                   <TouchableOpacity onPress={saveImage} style={ChangeInfomationScreenStyles.saveButton}>
//                     <Text style={ChangeInfomationScreenStyles.saveButtonText}>Lưu ảnh</Text>
//                   </TouchableOpacity>
//                 )}
//               </View>
//             </View>
//             <View style={ChangeInfomationScreenStyles.rowContainer}>
//               <Text style={ChangeInfomationScreenStyles.label}>Điện thoại</Text>
//               <Text style={ChangeInfomationScreenStyles.text}>{userInfo?.account.phone}</Text>

//               <TextInput
//                 style={ChangeInfomationScreenStyles.input}
//                 onChangeText={(text) => setNewPhoneNumber(text)}
//                 value={newPhoneNumber}
//               />
//               <Button title="Cập nhật số điện thoại" onPress={savePhoneNumber} />
//             </View>
//             <View style={ChangeInfomationScreenStyles.rowContainer}>
//               <Text style={ChangeInfomationScreenStyles.label}>Email</Text>
//               <Text style={ChangeInfomationScreenStyles.text}>{userInfo?.account.email}</Text>
//               <TextInput
//                 style={ChangeInfomationScreenStyles.input}
//                 onChangeText={(text) => setNewEmail(text)}
//                 value={newEmail}
//               />
//               <Button title="Cập nhật email" onPress={saveEmail} />
//             </View>
//           </View>
//         );
//       })}
//     </SafeAreaView>
//   );
// };

// export default ChangeInfomationScreen;


import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, SafeAreaView, StatusBar, Image, TouchableOpacity, TextInput, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import ChangeInfomationScreenStyles from './ChangeInfomationScreenStyles'; // Import styles
import Avatar from '../../assets/images/avatar.png';
import { getUserByAccountId } from '../../api/user';
import { useNavigation } from '@react-navigation/native';
import edit from '../../assets/icons/edit.png';
import back from '../../assets/icons/back.png';
import { updateImage, updatePhoneNumber, updateEmail } from '../../api/update'; // Import updateImage function

const ChangeInfomationScreen = ({ route }) => {
  const [userInfos, setUserInfos] = useState([]);
  const [image, setImage] = useState(null); // State to hold the selected image URI
  const [imageSelected, setImageSelected] = useState(false); // State to track if an image has been selected
  const navigation = useNavigation();
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [phoneError, setPhoneError] = useState(''); // State for phone number error
  const [emailError, setEmailError] = useState(''); // State for email error
  const [phoneSuccessMessage, setPhoneSuccessMessage] = useState(''); // State for phone number success message
  const [emailSuccessMessage, setEmailSuccessMessage] = useState(''); // State for email success message
  const [imageSuccessMessage, setImageSuccessMessage] = useState(''); // State for email success message
  const { accountId } = route.params;

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
        const userId = route.params.id;
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
      const accountId = route.params.id;
      console.log("Account ID:", accountId);
      console.log("Image URI:", image);

      if (image) {
        const response = await updateImage(accountId, image);
        console.log("Upload thành công:", response);
        setImageSelected(false);
        setImageSuccessMessage('Cập nhật ảnh đại diện thành công!');
      }
    } catch (error) {
      console.error("Lỗi khi gửi ảnh lên server:", error);
    }
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^[0-9]{10}$/; // Định dạng 10 chữ số
    return phoneNumberPattern.test(phoneNumber);
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const savePhoneNumber = async () => {
    setPhoneError(''); // Reset error message
    setPhoneSuccessMessage(''); // Reset success message
    if (!newPhoneNumber.trim()) {
      setPhoneError('Số điện thoại không được để trống!');
      return;
    }
    if (!validatePhoneNumber(newPhoneNumber)) {
      setPhoneError('Số điện thoại không hợp lệ! Phải gồm 10 chữ số.');
      return;
    }
    try {
      const accountId = route.params.id;
      const response = await updatePhoneNumber(accountId, newPhoneNumber);
      console.log('Cập nhật số điện thoại thành công:', response);
      setPhoneSuccessMessage('Cập nhật số điện thoại thành công!');
    } catch (error) {
      if (error.response && error.response.data.includes('Số điện thoại đã tồn tại')) {
        setPhoneError('Số điện thoại đã tồn tại!');
      } else {
        console.error('Lỗi khi cập nhật số điện thoại:', error.response?.data || error.message);
      }
    }
  };

  const saveEmail = async () => {
    setEmailError(''); // Reset error message
    setEmailSuccessMessage(''); // Reset success message
  
    if (!newEmail.trim()) {
      setEmailError('Email không được để trống!');
      return;
    }
    if (!validateEmail(newEmail)) {
      setEmailError('Email không đúng định dạng!');
      return;
    }
  
    try {
      const accountId = route.params.id;
      const response = await updateEmail(accountId, newEmail);
      console.log('Cập nhật email thành công:', response);
      setEmailSuccessMessage('Cập nhật email thành công!');
    } catch (error) {
      if (error.response && error.response.data.includes('Email đã tồn tại')) {
        setEmailError('Email đã tồn tại!');
      } else {
        setEmailError('Email đã tồn tại!');
      }
    }
  };

  return (
    <SafeAreaView style={ChangeInfomationScreenStyles.container}>
      <StatusBar style="auto" />
      {userInfos?.map((userInfo) => {
        const imageSource = image || userInfo.account.img || Avatar;
        const imageUri = typeof imageSource === 'string' ? { uri: imageSource } : imageSource;

        return (
          <View key={userInfo.account.accountId} style={ChangeInfomationScreenStyles.formContainer}>
            <View>
              <View style={ChangeInfomationScreenStyles.avatarContainer}>
                <TouchableOpacity onPress={pickImage}>
                  <Image
                    style={{ width: 100, height: 100, borderRadius: 100 }}
                    source={imageUri}
                  />
                  <Text style={ChangeInfomationScreenStyles.changeImageText}>Đổi ảnh đại diện</Text>
                </TouchableOpacity>
                {imageSelected && (
                  <TouchableOpacity onPress={saveImage} style={ChangeInfomationScreenStyles.saveButton}>
                    <Text style={ChangeInfomationScreenStyles.saveButtonText}>Lưu ảnh</Text>
                  </TouchableOpacity>
                )}
              </View>
              {imageSuccessMessage && <Text style={ChangeInfomationScreenStyles.successText}>{imageSuccessMessage}</Text>}
            </View>
            <View style={ChangeInfomationScreenStyles.rowContainer}>
              <Text style={ChangeInfomationScreenStyles.label}>Điện thoại</Text>
              <Text style={ChangeInfomationScreenStyles.text}>{userInfo?.account.phone}</Text>
              <TextInput
                style={ChangeInfomationScreenStyles.input}
                onChangeText={(text) => setNewPhoneNumber(text)}
                value={newPhoneNumber}
              />
              <Button title="Cập nhật số điện thoại" onPress={savePhoneNumber} />
              {phoneError && <Text style={ChangeInfomationScreenStyles.errorText}>{phoneError}</Text>}
              {phoneSuccessMessage && <Text style={ChangeInfomationScreenStyles.successText}>{phoneSuccessMessage}</Text>}
            </View>
            
            <View style={ChangeInfomationScreenStyles.rowContainer}>
              <Text style={ChangeInfomationScreenStyles.label}>Email</Text>
              <Text style={ChangeInfomationScreenStyles.text}>{userInfo?.account.email}</Text>
              <TextInput
                style={ChangeInfomationScreenStyles.input}
                onChangeText={(text) => setNewEmail(text)}
                value={newEmail}
              />
              <Button title="Cập nhật email" onPress={saveEmail} />
              {emailError && <Text style={ChangeInfomationScreenStyles.errorText}>{emailError}</Text>}
              {emailSuccessMessage && <Text style={ChangeInfomationScreenStyles.successText}>{emailSuccessMessage}</Text>}
            </View>
          </View>
        );
      })}
    </SafeAreaView>
  );
};

export default ChangeInfomationScreen;
