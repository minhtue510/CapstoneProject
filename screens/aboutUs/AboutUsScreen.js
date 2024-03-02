import React from 'react';
import { View, Text, SafeAreaView, StatusBar } from 'react-native';

const AboutUsScreen = () => {
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
