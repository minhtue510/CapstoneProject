import React from 'react';
import 'react-native-gesture-handler';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/home/HomeScreen';
import OrderScreen from './screens/order/OrderScreen';
import ProfileScreen from './screens/profile/ProfileScreen';
import LoginScreen from './screens/login/LoginScreen';
import OrderDetailScreen from './screens/orderDetail/OrderDetailScreen';
import AboutUsScreen from './screens/aboutUs/AboutUsScreen';
import ContactUsScreen from './screens/contactUs/ContactUsScreen';
import InformationScreen from './screens/information/InformationScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const OrderStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="OrderScreen" component={OrderScreen} options={{ headerShown: false }} />
      <Stack.Screen name="OrderDetailScreen" component={OrderDetailScreen} options={{ title: 'Chi tiết đơn hàng' }} />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Information" component={InformationScreen} options={{ title: 'Thông tin', headerTitleAlign: 'center', fontSize: 30 }} />
      <Stack.Screen name="AboutUs" component={AboutUsScreen} options={{ title: 'Về chúng tôi' }} />
      <Stack.Screen name="ContactUs" component={ContactUsScreen} options={{ title: 'Contact Us' }} />
    </Stack.Navigator>
  );
};

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? require('./assets/icons/home_active.png') : require('./assets/icons/home.png');
          } else if (route.name === 'Order') {
            iconName = focused ? require('./assets/icons/order_active.png') : require('./assets/icons/order.png');
          } else if (route.name === 'Profile') {
            iconName = focused ? require('./assets/icons/profile_active.png') : require('./assets/icons/profile.png');
          }

          return <Image source={iconName} style={{ width: size, height: size }} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Order" component={OrderStack} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileStack} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
         <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
       

        <Stack.Screen
          name="OrderDetailScreen"
          component={OrderDetailScreen}
          options={{ title: 'Order Detail' }}
        />
        <Stack.Screen name="AboutUs" component={AboutUsScreen} options={{ title: 'About Us' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
