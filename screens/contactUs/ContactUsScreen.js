import React, { useLayoutEffect } from 'react';
import { TouchableOpacity, Image, Text, View, SafeAreaView, Linking } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ContactUsScreenStyles from './ContactUsScreenStyles'; // Import styles
import back from '../../assets/icons/back.png';
import phoneIcon from '../../assets/icons/phone.png'; // Import phone icon
import emailIcon from '../../assets/icons/email.png'; // Import email icon

const ContactUsScreen = ({ navigation }) => {
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

  const handlePressPhone = () => {
    Linking.openURL('tel:0987654321');
  };

  const handlePressEmail = () => {
    Linking.openURL('mailto:example@gmail.com');
  };

  return (
    <SafeAreaView style={ContactUsScreenStyles.container}>
      <StatusBar style="auto" />
      <View style={ContactUsScreenStyles.content}>
        <TouchableOpacity onPress={handlePressPhone} style={ContactUsScreenStyles.contactButton}>
          <View style={ContactUsScreenStyles.contactButtonContent}>
            <Image source={phoneIcon} style={ContactUsScreenStyles.icon} />
            <Text style={ContactUsScreenStyles.contactText}>Hotline: 0987654321</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePressEmail} style={ContactUsScreenStyles.contactButton}>
          <View style={ContactUsScreenStyles.contactButtonContent}>
            <Image source={emailIcon} style={ContactUsScreenStyles.icon} />
            <Text style={ContactUsScreenStyles.contactText}>Email: example@gmail.com</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ContactUsScreen;
