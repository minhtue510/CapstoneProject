// import React, { useEffect, useState, useMemo,useLayoutEffect } from 'react';
// import { View, Text, FlatList, TouchableOpacity, Image ,} from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import OrderScreenStyles from '../order/OrderScreenStyles';
// import { getOrderTripOfDriverId, getHistory } from '../../api/order';
// import back from '../../assets/icons/back.png';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { SafeAreaView } from 'react-native';
// import { getOrderId } from '../../api/order';
// import parcelIcon from '../../assets/icons/parcel.png'



// const OrderScreen = () => {
//   const navigation = useNavigation();
//   const [orderTripId, setOrderTripId] = useState();
//   const [trip, setTrip] = useState(undefined);
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const day = date.getDate();
//     const month = date.getMonth() + 1;
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   };
//   const handleOrderPress = async (tripId) => {
//     try {
//       navigation.navigate('HistoryScreen', { orderTripId: tripId });
//     } catch (error) {
//       console.error('Lỗi khi chuyển trang chi tiết đơn hàng:', error);
//     }
//   };
//   useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const loginInfoString = await AsyncStorage.getItem('loginInfo');
//       if (loginInfoString !== null) {
//         const loginInfo = JSON.parse(loginInfoString);
//         const tripData = await getHistory(loginInfo.idByRole);
//         console.log('Fetched trip data:', tripData); // Kiểm tra dữ liệu trả về
//         setTrip(tripData);
//       } else {
//         console.log('No login info available');
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   fetchData();
// }, []);
  
//   useLayoutEffect(() => {
//     navigation.setOptions({
//       headerLeft: () => (
//         <TouchableOpacity onPress={() => navigation.navigate('Menu')} style={OrderScreenStyles.backButton}>
//           <Image source={back} style={OrderScreenStyles.backIcon} />
//         </TouchableOpacity>
//       ),
//       headerStyle: OrderScreenStyles.headerStyle,
//       headerTitleAlign: 'center',  // Center align the title
//       title: 'Lịch sử', 
//     });
//   }, [navigation]);


//   const renderData = useMemo(() => {
//     const returnData = []
//     if (trip) {
//       trip.orderTripId.forEach((e) => {
//         returnData.push({ orderTripId: e, tripId: trip.tripId })
//       })
//     }
//     return returnData;
//   }, [trip])

//  return (
//     <View style={OrderScreenStyles.container}>
//       {/* <Text style={OrderScreenStyles.title}>Đơn hàng</Text> */}
//       {!trip ? (
//         <View style={OrderScreenStyles.noOrdersContainer}>
//           <Image source={parcelIcon} style={OrderScreenStyles.parcelIcon} />
//           <Text style={OrderScreenStyles.noOrdersText}>Không có lịch sử đơn hàng</Text>
//         </View>
//       ) : (
//         <View style={OrderScreenStyles.tripContainer}>
//           <View style={OrderScreenStyles.tripInfoContainer}>
//             <Text style={OrderScreenStyles.tripId}>Mã chuyến đi: {trip.tripId}</Text>
//             <Text style={OrderScreenStyles.licensePlate}>Xe: {trip.licensePlate}</Text>
//           </View>
//           {trip.orderTripId.map((e, index) => (
//             <TouchableOpacity key={e} onPress={() => handleOrderPress(e)}>
//               <View>
//                 <Text style={OrderScreenStyles.orderIDContainer}>Mã gói hàng: {e}</Text>
//                 <Text style={OrderScreenStyles.orderID}>
//                   Địa chỉ: {trip.tripType === 1
//                     ? `${trip.locationDetailGet}, ${trip.cityGet}, ${trip.provinceGet}`
//                     : `${trip.locationDetailDelivery[index]}, ${trip.cityDelivery}, ${trip.provinceDelivery}`}
//                 </Text>
//               </View>
//             </TouchableOpacity>
//           ))}
//           <View style={OrderScreenStyles.buttonContainer}>
//             <Text
//               style={[OrderScreenStyles.tripType, {
//                 color: '#d4380d',
//                 backgroundColor: '#fff2e8',
//                 borderColor: '#ffbb96',
//                 borderWidth: 1,
//               }]}
//             >
//               {trip.tripType === 1 ? 'Lấy hàng' : 'Giao hàng'}
//             </Text>
//             {trip && (
//   <TouchableOpacity
//     onPress={() => {
//       if (trip.statusTrip !== 4) {
//         handleStartTrip(trip.tripId);
//       }
//     }}
//     disabled={trip.statusTrip === 4}
//     style={[
//       OrderScreenStyles.tripType,
//       {
//         backgroundColor: trip.statusTrip === 4 ? '#f6ffed' : '#f6ffed',
//         color: '#389e0d',
//         backgroundColor: '#f6ffed',
//         borderColor: '#b7eb8f',
//         borderWidth: 1,
//       }
//     ]}
//   >
//     <Text style={OrderScreenStyles.buttonText}>
//       {trip.statusTrip === 4 ? 'Đã hoàn thành' : 'Bắt đầu đơn hàng'}
//     </Text>
//   </TouchableOpacity>
// )}
//           </View>
//         </View>
//       )}
//     </View>
//   );
// };
// export default OrderScreen;


import React, { useEffect, useState, useMemo, useCallback, useLayoutEffect} from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import OrderScreenStyles from '../order/OrderScreenStyles';
import { getHistory } from '../../api/order';
import back from '../../assets/icons/back.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import parcelIcon from '../../assets/icons/parcel.png';

const OrderScreen = () => {
  const navigation = useNavigation();
  const [trip, setTrip] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleOrderPress = async (tripId) => {
    try {
      navigation.navigate('HistoryScreen', { orderTripId: tripId });
    } catch (error) {
      console.error('Lỗi khi chuyển trang chi tiết đơn hàng:', error);
    }
  };

  const fetchData = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const loginInfoString = await AsyncStorage.getItem('loginInfo');
      if (loginInfoString !== null) {
        const loginInfo = JSON.parse(loginInfoString);
        const historyData = await getHistory(loginInfo.idByRole);
        setTrip(historyData);
      } else {
        console.log('Không có thông tin');
      }
    } catch (error) {
      console.error('Lỗi khi lấy thông tin:', error);
    } finally {
      setIsRefreshing(false);
    }
  }, []);
  useLayoutEffect(() => {
        navigation.setOptions({
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Menu')} style={OrderScreenStyles.backButton}>
              <Image source={back} style={OrderScreenStyles.backIcon} />
            </TouchableOpacity>
          ),
          headerStyle: OrderScreenStyles.headerStyle,
          headerTitleAlign: 'center',  // Center align the title
          title: 'Lịch sử', 
        });
      }, [navigation]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredAndSortedData = useMemo(() => {
    if (!Array.isArray(trip) || trip.length === 0) {
      return [];
    }

    // Lọc các chuyến đi có statusTrip là 4
    const filtered = trip.filter((item) => item.statusTrip === 4);

    // Sắp xếp từ mới nhất đến cũ nhất (theo tripId)
    const sorted = filtered.sort((a, b) => b.tripId - a.tripId);

    return sorted.map((item) => ({
      orderTripId: Array.isArray(item.orderTripId) ? item.orderTripId : [],
      tripId: item.tripId,
      locationDetailDelivery: item.locationDetailDelivery[0],
      cityDelivery: item.cityDelivery[0],
      provinceDelivery: item.provinceDelivery[0],
      locationDetailGet: item.locationDetailGet[0],
      cityGet: item.cityGet[0],
      provinceGet: item.provinceGet[0],
      tripType: item.tripType,
      statusTrip: item.statusTrip,
      licensePlate: item.licensePlate
    }));
  }, [trip]);

  const renderItem = ({ item }) => (
    <View key={item.tripId} style={OrderScreenStyles.tripContainer}>
      <View style={OrderScreenStyles.tripInfoContainer}>
        <Text style={OrderScreenStyles.tripId}>Mã chuyến đi: {item.tripId}</Text>
        <Text style={OrderScreenStyles.licensePlate}>Xe: {item.licensePlate}</Text>
      </View>
      {Array.isArray(item.orderTripId) && item.orderTripId.map((e) => (
        <TouchableOpacity key={e} onPress={() => handleOrderPress(e)}>
          <View>
            <Text style={OrderScreenStyles.orderIDContainer}>Mã gói hàng: {e}</Text>
            <Text style={OrderScreenStyles.orderID}>
              Địa chỉ: {item.tripType === 1
                ? `${item.locationDetailGet}, ${item.cityGet}, ${item.provinceGet}`
                : `${item.locationDetailDelivery}, ${item.cityDelivery}, ${item.provinceDelivery}`}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
      <View style={OrderScreenStyles.buttonContainer}>
        <Text
          style={[OrderScreenStyles.tripType, {
            color: '#d4380d',
            backgroundColor: '#fff2e8',
            borderColor: '#ffbb96',
            borderWidth: 1,
          }]}
        >
          {item.tripType === 1 ? 'Lấy hàng' : 'Giao hàng'}
        </Text>
        <TouchableOpacity
          onPress={() => {
            if (item.statusTrip !== 4) {
              handleStartTrip(item.tripId);
            }
          }}
          disabled={item.statusTrip === 4}
          style={[
            OrderScreenStyles.tripType,
            {
              backgroundColor: item.statusTrip === 4 ? '#f6ffed' : '#f6ffed',
              color: '#389e0d',
              borderColor: '#b7eb8f',
              borderWidth: 1,
            }
          ]}
        >
          <Text style={OrderScreenStyles.buttonText}>
            {item.statusTrip === 4 ? 'Đã hoàn thành' : 'Bắt đầu đơn hàng'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={OrderScreenStyles.container}>
      {!filteredAndSortedData.length ? (
        <View style={OrderScreenStyles.noOrdersContainer}>
          <Image source={parcelIcon} style={OrderScreenStyles.parcelIcon} />
          <Text style={OrderScreenStyles.noOrdersText}>Không có lịch sử đơn hàng</Text>
        </View>
      ) : (
        <FlatList
          data={filteredAndSortedData}
          renderItem={renderItem}
          keyExtractor={(item) => item.tripId.toString()}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={fetchData}
            />
          }
        />
      )}
    </View>
  );
};

export default OrderScreen;

