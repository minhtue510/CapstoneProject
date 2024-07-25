// import React from 'react';
// import 'react-native-gesture-handler';
// import { Image } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import HomeScreen from './screens/home/HomeScreen';
// import OrderScreen from './screens/order/OrderScreen';
// import ProfileScreen from './screens/profile/ProfileScreen';
// import LoginScreen from './screens/login/LoginScreen';
// import OrderDetailScreen from './screens/orderDetail/OrderDetailScreen';
// import AboutUsScreen from './screens/aboutUs/AboutUsScreen';
// import ContactUsScreen from './screens/contactUs/ContactUsScreen';
// import InformationScreen from './screens/information/InformationScreen';
// import HistoryScreen from './screens/history/HistoryScreen';
// import CameraScreen from './screens/camera/CameraScreen';
// import MenuScreen from './screens/Menu/MenuScreen';

// const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

// const OrderStack = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="OrderScreen" component={OrderScreen} options={{ headerShown: true }} />
//       <Stack.Screen name="OrderDetailScreen" component={OrderDetailScreen} options={{ title: 'Chi tiết đơn hàng' }} />
//       <Stack.Screen name="HistoryScreen" component={HistoryScreen} options={{ title: 'Chi tiết đơn hàng' }} />
//     </Stack.Navigator>
//   );
// };

// const ProfileStack = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: true }} />
//       <Stack.Screen name="Information" component={InformationScreen} options={{ title: 'Thông tin', headerTitleAlign: 'center', fontSize: 30 }} />
//       <Stack.Screen name="AboutUs" component={AboutUsScreen} options={{ title: 'Về chúng tôi' }} />
//       <Stack.Screen name="ContactUs" component={ContactUsScreen} options={{ title: 'Contact Us' }} />
//       <Stack.Screen name="Camera" component={CameraScreen} options={{ title: 'Camera' }} />
//     </Stack.Navigator>
//   );
// };



// // const MainTabs = () => {
// //   return (
// //     <Tab.Navigator
// //       screenOptions={({ route }) => ({
// //         tabBarIcon: ({ focused, color, size }) => {
// //           let iconName;

// //           if (route.name === 'Home') {
// //             iconName = focused ? require('./assets/icons/home_active.png') : require('./assets/icons/home.png');
// //           } else if (route.name === 'Order') {
// //             iconName = focused ? require('./assets/icons/order_active.png') : require('./assets/icons/order.png');
// //           } else if (route.name === 'Profile') {
// //             iconName = focused ? require('./assets/icons/profile_active.png') : require('./assets/icons/profile.png');
// //           }

// //           return <Image source={iconName} style={{ width: size, height: size }} />;
// //         },
// //       })}
// //     >
// //       <Tab.Screen name="Home" component={HomeScreen} options={{title: 'Đơn hàng', headerShown: false }} />
// //       <Tab.Screen name="Order" component={OrderStack} options={{title: 'Lịch sử', headerShown: false }} />
// //       <Tab.Screen name="Profile" component={ProfileStack} options={{title: 'Hồ sơ', headerShown: false }} />
// //     </Tab.Navigator>
// //   );
// // };

// const MainTabs = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;

//           if (route.name === 'Home') {
//             iconName = focused ? require('./assets/icons/home_active.png') : require('./assets/icons/home.png');
//           } else if (route.name === 'Order') {
//             iconName = focused ? require('./assets/icons/order_active.png') : require('./assets/icons/order.png');
//           } else if (route.name === 'Profile') {
//             iconName = focused ? require('./assets/icons/profile_active.png') : require('./assets/icons/profile.png');
//           }

//           return <Image source={iconName} style={{ width: size, height: size }} />;
//         },
//       })}
//     >
//       <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Đơn hàng', headerShown: true }} />
//       <Tab.Screen name="Order" component={OrderStack} options={{ title: 'Lịch sử ', headerShown: false }} />
//       <Tab.Screen name="Profile" component={ProfileStack} options={{ title: 'Hồ sơ', headerShown: false }} />
//     </Tab.Navigator>
//   );
// };

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//          <Stack.Screen
//           name="Login"
//           component={LoginScreen}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen name="Menu" component={MenuScreen} options={{ headerShown: false }}></Stack.Screen>
//         <Stack.Screen
//           name="MainTabs"
//           component={MainTabs}
//           options={{ headerShown: false }}
//         />
      
//        <Stack.Screen
//           name="OrderDetailScreen"
//           component={OrderDetailScreen}
//           options={{ title: 'Chi tiết đơn hàng' }}
//         /> 
//          {/* <Stack.Screen
//           name="HistoryScreen"
//           component={HistoryScreen}
//           options={{ title: 'Order Detail' }}
//         /> */}
//         <Stack.Screen name="AboutUs" component={AboutUsScreen} options={{ headerShown: false }}></Stack.Screen>
//         <Stack.Screen name="Camera" component={CameraScreen} options={{ headerShown: false }}></Stack.Screen>
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;


import React from 'react';
import 'react-native-gesture-handler';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/home/HomeScreen';
import OrderScreen from './screens/order/OrderScreen';
import ProfileScreen from './screens/profile/ProfileScreen';
import InformationScreen from './screens/information/InformationScreen';
import LoginScreen from './screens/login/LoginScreen';
import OrderDetailScreen from './screens/orderDetail/OrderDetailScreen';
import AboutUsScreen from './screens/aboutUs/AboutUsScreen';
import CameraScreen from './screens/camera/CameraScreen';
import ContactUsScreen from './screens/contactUs/ContactUsScreen';
import HistoryScreen from './screens/history/HistoryScreen';
import MapScreen from './screens/map/MapScreen';
import NotificationScreen from './screens/notification/NotificationScreen';
import MenuScreen from './screens/Menu/MenuScreen';
// import messaging from '@react-native-firebase/messaging';
// import { Alert } from 'react-native';
const Stack = createStackNavigator();

// useEffect(() => {
//   const requestUserPermission = async () => {
//     const authStatus = await messaging().requestPermission();
//     const enabled =
//       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//       authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//     if (enabled) {
//       console.log('Authorization status:', authStatus);
//     }
//   };

//   requestUserPermission();
// }, []);

// // Xử lý nhận thông báo khi ứng dụng đang mở
// useEffect(() => {
//   const unsubscribe = messaging().onMessage(async remoteMessage => {
//     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
//   });

//   return unsubscribe;
// }, []);

// // Xử lý nhận thông báo khi ứng dụng ở nền hoặc bị đóng
// useEffect(() => {
//   messaging()
//     .getInitialNotification()
//     .then(remoteMessage => {
//       if (remoteMessage) {
//         console.log('Notification caused app to open from quit state:', remoteMessage.notification);
//       }
//     });

//   messaging().onNotificationOpenedApp(remoteMessage => {
//     console.log('Notification caused app to open from background state:', remoteMessage.notification);
//   });
// }, []);

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Menu"
          component={MenuScreen}
          options={{ headerShown: true, title: 'Trang chủ' }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: true, title: 'Đơn hàng' }}
        />
        <Stack.Screen
          name="Order"
          component={OrderScreen}
          options={{ headerShown: true, title: 'Lịch sử' }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: true, title: 'Hồ sơ' }}
        />
        <Stack.Screen
          name="OrderDetailScreen"
          component={OrderDetailScreen}
          options={{ title: 'Chi tiết đơn hàng' }}
        />
        <Stack.Screen
          name="HistoryScreen"
          component={HistoryScreen}
          options={{ title: 'Lịch sử đơn hàng' }}
        />
          <Stack.Screen
          name="Information"
          component={InformationScreen}
          options={{ headerShown: true }}
        />
         <Stack.Screen
          name="AboutUs"
          component={AboutUsScreen}
          options={{ headerShown: true, title: 'Về chúng tôi' }}
        />
         <Stack.Screen
          name="ContactUs"
          component={ContactUsScreen}
          options={{ headerShown: true, title: 'Về chúng tôi' }}
        />
         <Stack.Screen
          name="MapScreen"
          component={MapScreen}
          options={{ headerShown: true, title: 'Maps' }}
        />
          <Stack.Screen
          name="Notification"
          component={NotificationScreen}
          options={{ headerShown: true, title: 'Thông báo' }}
        />
        <Stack.Screen
          name="Camera"
          component={CameraScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
