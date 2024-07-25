import React, { useState, useLayoutEffect } from 'react';
import { TouchableOpacity, Image, Text, View, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import back from '../../assets/icons/back.png';
import AboutUsScreenStyles from './AboutUsScreenStyles'; // Import styles

const AboutUsScreen = ({ navigation }) => {
  // useState should be inside the functional component
  const [userInfos, setUserInfos] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={AboutUsScreenStyles.backButton}>
          <Image source={back} style={AboutUsScreenStyles.backIcon} />
        </TouchableOpacity>
      ),
      headerStyle: AboutUsScreenStyles.headerStyle,
      headerTitleAlign: 'center',
      title: 'Về chúng tôi',
    });
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>About Us Screen</Text>
        {/* Add your about us content here */}
      </View>
    </SafeAreaView>
  );
};

export default AboutUsScreen;
