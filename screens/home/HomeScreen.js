import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HomeScreenStyles from './HomeScreenStyles';
import successIcon from '../../assets/icons/success.png';
import deliveringIcon from '../../assets/icons/delivering.png';
import parcelIcon from '../../assets/icons/parcel.png';
import { getOrderTripOfDriverId } from '../../api/order';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getOrderId } from '../../api/order';
import { getUserByAccountId } from '../../api/user';
import { startOrderTrip } from '../../api/order';
import { getOrderTripOfIdleDriverId } from '../../api/order';
const HomeScreen = ({ route }) => {
  const navigation = useNavigation();
  const [trip, setTrip] = useState(undefined);
  const [logTrip, setLogTrip] = useState('Bắt đầu đơn hàng');

  const handleOrderPress = async (tripId) => {
    try {
      navigation.navigate('OrderDetailScreen', { orderTripId: tripId });
    } catch (error) {
      console.error('Lỗi khi chuyển trang chi tiết đơn hàng:', error);
    }
  };




  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   const day = date.getDate();
  //   const month = date.getMonth() + 1;
  //   const year = date.getFullYear();
  //   return `${day}/${month}/${year}`;
  // };

  // const renderNoOrdersComponent = () => (
  //   <View style={HomeScreenStyles.noOrdersContainer}>
  //     <Image source={parcelIcon} style={HomeScreenStyles.parcelIcon} />
  //     <Text style={HomeScreenStyles.noOrdersText}>Bạn không có đơn hàng nào cần giao</Text>
  //   </View>
  // );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const loginInfoString = await AsyncStorage.getItem('loginInfo');
        if (loginInfoString !== null) {
          const loginInfo = JSON.parse(loginInfoString);
          console.log('Driver Id: ', loginInfo.idByRole);
          const trip = await getOrderTripOfIdleDriverId(loginInfo.idByRole,2);
          setTrip(trip);
          console.log('Order Trip :', trip);
        } else {
          console.log('Không có thông tin');
        }
      } catch (error) {
        // console.error('Lỗi khi lấy thông tin đăng nhập:', error);
        // throw error;
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const loginInfoString = await AsyncStorage.getItem('loginInfo');
  //       if (loginInfoString !== null) {
  //         const loginInfo = JSON.parse(loginInfoString);
  //         console.log('Driver Id: ', loginInfo.idByRole);
  //         const trip = await getOrderTripOfDriverId(loginInfo.idByRole, 3);
  //         setTrip(trip);
  //         console.log('Order Trip :', trip);
  //       } else {
  //         console.log('Không có thông tin');
  //       }
  //     } catch (error) {
  //       // console.error('Lỗi khi lấy thông tin đăng nhập:', error);
  //       throw error;
  //     }
  //   };
  //   fetchData();
  // }, []);




  // const handleStartOrderTrip = async () => {
  //   try {
  //     // Assuming you have the tripId ready
  //     await startOrderTrip(orderTripId.tripId);
  //     console.log('Chuyến hàng bắt đầu');
  //     // Refresh the data or perform any other actions after starting the trip
  //   } catch (error) {
  //     console.error('Lỗi khi bắt đầu chuyến hàng:', error);
  //   }
  // };



  // const renderOrderItem = ({ item }) => {
  //   console.log("Item:", item)

  //   return (
  //     <TouchableOpacity key={item} onPress={() => handleOrderPress(item)}>
  //       <View style={HomeScreenStyles.orderContainer}>
  //         <Text style={HomeScreenStyles.orderIDContainer}>Mã chuyến đi: {item.tripId}</Text>
  //       </View>
  //     </TouchableOpacity>
  //   );
  // };


  const handleStartTrip = async (id) => {
    try {
      const respone = await startOrderTrip(id);
      if (respone) {
        setLogTrip('Đơn hàng đang được giao');
        // Cập nhật lại trạng thái của chuyến hàng
        setTrip(prevTrip => ({
          ...prevTrip,
          statusTrip: 3 // Giả sử 3 là trạng thái "Đang giao hàng"
        }));
      }
      console.log('Chuyến hàng bắt đầu');
      // Refresh the data or perform any other actions after starting/completing the trip
    } catch (error) {
      console.error('Lỗi khi thực hiện hành động trên chuyến hàng:', error);
    }
  };

  const renderData = useMemo(() => {
    const returnData = []
    if (trip) {
      trip.orderTripId.forEach((e) => {
        returnData.push({ orderTripId: e, tripId: trip.tripId })
      })
    }
    return returnData;
  }, [trip])
  return (
    <View style={HomeScreenStyles.container}>
      <Text style={HomeScreenStyles.title}>Đơn hàng</Text>
      {!trip ? (
        <View style={HomeScreenStyles.noOrdersContainer}>
          <Image source={parcelIcon} style={HomeScreenStyles.parcelIcon} />
          <Text style={HomeScreenStyles.noOrdersText}>Bạn không có đơn hàng nào cần giao</Text>
        </View>
      ) : (
        <View style={HomeScreenStyles.tripContainer}>
          <View style={HomeScreenStyles.tripInfoContainer}>
            <Text style={HomeScreenStyles.tripId}>Mã chuyến đi: {trip.tripId}</Text>
            <Text style={HomeScreenStyles.licensePlate}>Xe: {trip.licensePlate}</Text>
          </View>
          {trip.orderTripId.map((e, index) => (
            <TouchableOpacity key={e} onPress={() => handleOrderPress(e)}>
              <View>
                <Text style={HomeScreenStyles.orderIDContainer}>Mã Đơn: {e}</Text>
                <Text style={HomeScreenStyles.orderID}>
                  Địa chỉ: {trip.tripType === 1 ? trip.locationDetailGet : trip.locationDetailDelivery[index]}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
          <View style={HomeScreenStyles.buttonContainer}>
            <Text
              style={[HomeScreenStyles.tripType, {
                color: '#d4380d',
                backgroundColor: '#fff2e8',
                borderColor: '#ffbb96',
                borderWidth: 1,
              }]}
            >
              {trip.tripType === 1 ? 'Loại: Lấy hàng' : 'Loại: Giao hàng'}
            </Text>
            {trip && (
  <TouchableOpacity
    onPress={() => {
      if (trip.statusTrip !== 3) {
        handleStartTrip(trip.tripId);
      }
    }}
    disabled={trip.statusTrip === 3}
    style={[
      HomeScreenStyles.tripType,
      {
        backgroundColor: trip.statusTrip === 3 ? '#f6ffed' : '#f6ffed',
        color: '#389e0d',
        backgroundColor: '#f6ffed',
        borderColor: '#b7eb8f',
        borderWidth: 1,
      }
    ]}
  >
    <Text style={HomeScreenStyles.buttonText}>
      {trip.statusTrip === 3 ? 'Đang giao hàng' : 'Bắt đầu đơn hàng'}
    </Text>
  </TouchableOpacity>
)}
          </View>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

// {"orderTripId": [393,411], "tripId": 65}
