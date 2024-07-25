import React, { useState, useLayoutEffect } from 'react';
import { TouchableOpacity, Image, Text, View, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import back from '../../assets/icons/back.png';
import ContactUsScreenStyles from './ContactUsScreenStyles'; // Import styles

const ContactUsScreen = ({ navigation }) => {
  // useState should be inside the functional component
  const [userInfos, setUserInfos] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={ContactUsScreenStyles.backButton}>
          <Image source={back} style={ContactUsScreenStyles.backIcon} />
        </TouchableOpacity>
      ),
      headerStyle: ContactUsScreenStyles.headerStyle,
      headerTitleAlign: 'center',
      title: 'Thông tin hỗ trợ',
    });
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Contact Us Screen</Text>
        {/* Add your about us content here */}
      </View>
    </SafeAreaView>
  );
};

export default ContactUsScreen;
