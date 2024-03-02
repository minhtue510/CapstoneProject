import React from 'react';
import { View, Text, SafeAreaView, StatusBar, Image } from 'react-native';
import InformationScreenStyles from './InformationScreenStyles'; // Import styles
import Avatar from '../../assets/images/avatar.png';
const InformationScreen = () => {
  return (
    <SafeAreaView style={InformationScreenStyles.container}>
      <StatusBar style="auto" />
      <View style={InformationScreenStyles.avatarContainer}>
        <Image source={Avatar} style={InformationScreenStyles.avatar} />
      </View>
      <View style={InformationScreenStyles.formContainer}>
        <View style={InformationScreenStyles.rowContainer}>
          <Text style={InformationScreenStyles.label}>Họ và tên:</Text>
          <Text style={InformationScreenStyles.value}>John Doe</Text>
        </View>
        <View style={InformationScreenStyles.rowContainer}>
          <Text style={InformationScreenStyles.label}>Ngày sinh:</Text>
          <Text style={InformationScreenStyles.value}>01/01/1990</Text>
        </View>
        <View style={InformationScreenStyles.rowContainer}>
          <Text style={InformationScreenStyles.label}>Phone:</Text>
          <Text style={InformationScreenStyles.value}>123-456-7890</Text>
        </View>
        <View style={InformationScreenStyles.rowContainer}>
          <Text style={InformationScreenStyles.label}>Email:</Text>
          <Text style={InformationScreenStyles.value}>john.doe@example.com</Text>
        </View>
        <View style={InformationScreenStyles.rowContainer}>
          <Text style={InformationScreenStyles.label}>License Number:</Text>
          <Text style={InformationScreenStyles.value}>ABC123456</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default InformationScreen;
