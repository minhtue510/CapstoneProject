// import React, { useEffect, useState, useMemo, useLayoutEffect, useCallback } from 'react';
// import { View, Text, FlatList, TouchableOpacity, Image, Alert, RefreshControl, ScrollView, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import WaitingScreenStyles from './WaitingScreenStyles';
// import back from '../../assets/icons/back.png';
// import parcelIcon from '../../assets/icons/parcel.png';
// import checkIcon from '../../assets/icons/check.png'; // Nhập ảnh icon check
// import view from '../../assets/icons/view.png'; // Nhập ảnh icon check
// import { getOrderTripOfIdleDriverId, startOrderTrip } from '../../api/order';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const WaitingScreen = () => {
//   const navigation = useNavigation();
//   const [trip, setTrip] = useState(null);
//   const [logTrip, setLogTrip] = useState('Bắt đầu đơn hàng');
//   const [refreshing, setRefreshing] = useState(false);

//   const fetchData = useCallback(async () => {
//     try {
//       const loginInfoString = await AsyncStorage.getItem('loginInfo');
//       if (loginInfoString) {
//         const loginInfo = JSON.parse(loginInfoString);
//         const fetchedTrip = await getOrderTripOfIdleDriverId(loginInfo.idByRole, 2);
//         setTrip(fetchedTrip);
//       } else {
//         console.log('Không có thông tin');
//       }
//     } catch (error) {
//       // console.error('Lỗi khi lấy thông tin đăng nhập:', error);
//     }
//   }, []);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       headerLeft: () => (
//         <TouchableOpacity
//           onPress={() => navigation.navigate("Menu")}
//           style={WaitingScreenStyles.backButton}
//         >
//           <Image source={back} style={WaitingScreenStyles.backIcon} />
//         </TouchableOpacity>
//       ),
//       headerStyle: WaitingScreenStyles.headerStyle,
//       headerTitleAlign: "center", // Center align the title
//       title: "Đơn hàng ",
//     });
//   }, [navigation]);

//   const handleOrderPress = (orderTripId) => {
//     navigation.navigate('WaitingDetail', { orderTripId });
//   };
  

//   const handleStartTrip = async (id) => {
//     try {
//       const response = await startOrderTrip(id);
//       if (response) {
//         setLogTrip('Đơn hàng đang được giao');
//         setTrip(prevTrip => ({
//           ...prevTrip,
//           statusTrip: 3
//         }));
//         // Điều hướng về trang Home
//         navigation.navigate('Home');
//       }
//     } catch (error) {
//       console.error('Lỗi khi thực hiện hành động trên chuyến hàng:', error);
//     }
//   };

//   const showAlert = (id) => {
//     Alert.alert(
//       'Xác nhận',
//       'Bạn có chắc chắn muốn bắt đầu đơn hàng?',
//       [
//         { text: 'Hủy', style: 'cancel' },
//         { text: 'Đồng ý', onPress: () => handleStartTrip(id) },
//       ],
//       { cancelable: true }
//     );
//   };

//   const renderData = useMemo(() => {
//     if (!trip || trip.statusTrip !== 2) return []; // Chỉ hiển thị khi statusTrip là 2
//     return trip.orderTripId.map((orderTripId, index) => ({
//       orderTripId,
//       status: trip.orderTripStatus[index], // Lấy trạng thái tương ứng với orderTripId
//     }));
//   }, [trip]);

//   const onRefresh = useCallback(async () => {
//     setRefreshing(true);
//     await fetchData();
//     setRefreshing(false);
//   }, [fetchData]);

//   return (
//     <ScrollView style={WaitingScreenStyles.container}>
//       {!trip || trip.statusTrip !== 2 ? (
//         <View style={WaitingScreenStyles.noOrdersContainer}>
//           <Image source={parcelIcon} style={WaitingScreenStyles.parcelIcon} />
//           <Text style={WaitingScreenStyles.noOrdersText}>Không có đơn hàng cần vận chuyển</Text>
//         </View>
//       ) : (
//         <View style={WaitingScreenStyles.tripContainer}>
//           <View style={WaitingScreenStyles.innerContainer}>
//             <FlatList
//               data={renderData}
//               keyExtractor={(item) => item.orderTripId.toString()}
//               renderItem={({ item }) => (
//                 <TouchableOpacity onPress={() => handleOrderPress(item.orderTripId)}>
//                   <View style={WaitingScreenStyles.orderContainer}>
//                     <View style={WaitingScreenStyles.orderContent}>
//                       <Text style={WaitingScreenStyles.orderIDContainer}>Mã gói hàng: {item.orderTripId}</Text>
//                       {/* {item.status === 4 && (
//                         <Image source={checkIcon} style={WaitingScreenStyles.checkIcon} /> // Hiển thị icon check khi status là 4
//                       )} */}
//                     </View>
//                     <View style={WaitingScreenStyles.detailContainer}>
//                       <Text style={WaitingScreenStyles.detail}>Xem chi tiết</Text>
//                     </View>
//                   </View>
//                 </TouchableOpacity>
//               )}
//               ListHeaderComponent={() => (
//                 <View style={WaitingScreenStyles.tripInfoContainer}>
//                   <Text style={WaitingScreenStyles.tripId}>Mã chuyến đi: {trip.tripId}</Text>
//                   <Text style={WaitingScreenStyles.licensePlate}>Xe: {trip.licensePlate}</Text>
//                 </View>
//               )}
//               ListEmptyComponent={() => (
//                 <View style={WaitingScreenStyles.noOrdersContainer}>
//                   <Image source={parcelIcon} style={WaitingScreenStyles.parcelIcon} />
//                   <Text style={WaitingScreenStyles.noOrdersText}>Không có đơn hàng cần vận chuyển</Text>
//                 </View>
//               )}
//               refreshControl={
//                 <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//               }
//               contentContainerStyle={WaitingScreenStyles.flatListContent}
//               style={WaitingScreenStyles.flatList}
//             />
//             <View style={WaitingScreenStyles.buttonContainer}>
//               <View style={WaitingScreenStyles.tripTypeContainer}>
//                 <Text style={WaitingScreenStyles.tripType}>
//                   {trip.tripType === 1 ? 'Lấy hàng' : 'Giao hàng'}
//                 </Text>
//               </View>
//               <TouchableOpacity
//                 onPress={() => {
//                   if (trip.statusTrip !== 3) {
//                     showAlert(trip.tripId);
//                   }
//                 }}
//                 disabled={trip.statusTrip === 3}
//                 style={[
//                   WaitingScreenStyles.button,
//                   trip.statusTrip === 3 ? WaitingScreenStyles.ongoingTripButton : WaitingScreenStyles.startTripButton,
//                 ]}
//               >
//                 <Text style={WaitingScreenStyles.buttonText}>
//                   {trip.statusTrip === 3 ? 'Đang giao hàng' : 'Nhận đơn'}
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       )}
//     </ScrollView>
//   );
// };

// export default WaitingScreen;


import React, { useEffect, useState, useMemo, useLayoutEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Alert, RefreshControl, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import WaitingScreenStyles from './WaitingScreenStyles';
import back from '../../assets/icons/back.png';
import parcelIcon from '../../assets/icons/parcel.png';
import checkIcon from '../../assets/icons/check.png'; // Nhập ảnh icon check
import view from '../../assets/icons/view.png'; // Nhập ảnh icon check
import { getOrderTripOfIdleDriverId, startOrderTrip } from '../../api/order';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WaitingScreen = () => {
  const navigation = useNavigation();
  const [trip, setTrip] = useState(null);
  const [logTrip, setLogTrip] = useState('Bắt đầu đơn hàng');
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const loginInfoString = await AsyncStorage.getItem('loginInfo');
      if (loginInfoString) {
        const loginInfo = JSON.parse(loginInfoString);
        const fetchedTrip = await getOrderTripOfIdleDriverId(loginInfo.idByRole, 2);
        setTrip(fetchedTrip);
      } else {
        console.log('Không có thông tin');
      }
    } catch (error) {
      // console.error('Lỗi khi lấy thông tin đăng nhập:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("Menu")}
          style={WaitingScreenStyles.backButton}
        >
          <Image source={back} style={WaitingScreenStyles.backIcon} />
        </TouchableOpacity>
      ),
      headerStyle: WaitingScreenStyles.headerStyle,
      headerTitleAlign: "center", // Center align the title
      title: "Đơn hàng cần nhận",
    });
  }, [navigation]);

  const handleOrderPress = (orderTripId) => {
    navigation.navigate('WaitingDetail', { orderTripId });
  };

  const handleStartTrip = async (id) => {
    try {
      const response = await startOrderTrip(id);
      if (response) {
        setLogTrip('Đơn hàng đang được giao');
        setTrip(prevTrip => ({
          ...prevTrip,
          statusTrip: 3
        }));
        // Điều hướng về trang Home
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error('Lỗi khi thực hiện hành động trên chuyến hàng:', error);
    }
  };

  const showAlert = (id) => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc chắn muốn bắt đầu đơn hàng?',
      [
        { text: 'Hủy', style: 'cancel' },
        { text: 'Đồng ý', onPress: () => handleStartTrip(id) },
      ],
      { cancelable: true }
    );
  };

  const renderData = useMemo(() => {
    if (!trip || trip.statusTrip !== 2) return []; // Chỉ hiển thị khi statusTrip là 2
    return trip.orderTripId.map((orderTripId, index) => ({
      orderTripId,
      status: trip.orderTripStatus[index], // Lấy trạng thái tương ứng với orderTripId
    }));
  }, [trip]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, [fetchData]);

  return (
    <View style={WaitingScreenStyles.container}>
      {!trip || trip.statusTrip !== 2 ? (
        <View style={WaitingScreenStyles.noOrdersContainer}>
          <Image source={parcelIcon} style={WaitingScreenStyles.parcelIcon} />
          <Text style={WaitingScreenStyles.noOrdersText}>Không có đơn hàng cần vận chuyển</Text>
        </View>
      ) : (
        <View style={WaitingScreenStyles.tripContainer}>
          <FlatList
            data={renderData}
            keyExtractor={(item) => item.orderTripId.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleOrderPress(item.orderTripId)}>
                <View style={WaitingScreenStyles.orderContainer}>
                  <View style={WaitingScreenStyles.orderContent}>
                    <Text style={WaitingScreenStyles.orderIDContainer}>Mã gói hàng: {item.orderTripId}</Text>
                    {/* {item.status === 4 && (
                      <Image source={checkIcon} style={WaitingScreenStyles.checkIcon} /> // Hiển thị icon check khi status là 4
                    )} */}
                  </View>
                  <View style={WaitingScreenStyles.detailContainer}>
                    <Text style={WaitingScreenStyles.detail}>Xem chi tiết</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            ListHeaderComponent={() => (
              <View style={WaitingScreenStyles.tripInfoContainer}>
                <Text style={WaitingScreenStyles.tripId}>Mã chuyến đi: {trip.tripId}</Text>
                <Text style={WaitingScreenStyles.licensePlate}>Xe: {trip.licensePlate}</Text>
              </View>
            )}
            ListEmptyComponent={() => (
              <View style={WaitingScreenStyles.noOrdersContainer}>
                <Image source={parcelIcon} style={WaitingScreenStyles.parcelIcon} />
                <Text style={WaitingScreenStyles.noOrdersText}>Không có đơn hàng cần vận chuyển</Text>
              </View>
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            contentContainerStyle={WaitingScreenStyles.flatListContent}
            style={WaitingScreenStyles.flatList}
          />
          <View style={WaitingScreenStyles.buttonContainer}>
            <View style={WaitingScreenStyles.tripTypeContainer}>
              <Text style={WaitingScreenStyles.tripType}>
                {trip.tripType === 1 ? 'Lấy hàng' : 'Giao hàng'}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                if (trip.statusTrip !== 3) {
                  showAlert(trip.tripId);
                }
              }}
              disabled={trip.statusTrip === 3}
              style={[
                WaitingScreenStyles.button,
                trip.statusTrip === 3 ? WaitingScreenStyles.ongoingTripButton : WaitingScreenStyles.startTripButton,
              ]}
            >
              <Text style={WaitingScreenStyles.buttonText}>
                {trip.statusTrip === 3 ? 'Đang giao hàng' : 'Nhận đơn'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default WaitingScreen;
