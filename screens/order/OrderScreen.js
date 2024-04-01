import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image ,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import OrderScreenStyles from '../order/OrderScreenStyles';
import { getOrderTripOfDriverId } from '../../api/order';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native';
import { getOrderId } from '../../api/order';



const OrderScreen = () => {
  const navigation = useNavigation();
  const [orderTripId, setOrderTripId] = useState();
  const [trip, setTrip] = useState(undefined);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const handleOrderPress = async (tripId) => {
    try {
      navigation.navigate('OrderDetailScreen', { tripId });
    } catch (error) {
      console.error('Lỗi khi chuyển trang chi tiết đơn hàng:', error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const loginInfoString = await AsyncStorage.getItem('loginInfo'); // Await the AsyncStorage.getItem() call
        if (loginInfoString !== null) {
          const loginInfo = JSON.parse(loginInfoString);
          console.log(loginInfo.idByRole);
          const trip = await getOrderTripOfDriverId(loginInfo.idByRole, 4); // Await the getOrderTripIdByDriverId() call
          setTrip(trip);
          console.log('Order Trip ID:', trip); // Log the retrieved tripId
        } else {
          console.log('Không có thông tin');
        }
      } catch (error) {
        console.error('Lỗi khi lấy thông tin đăng nhập:', error);
        throw error;
      }
    };
  
    fetchData(); // Call fetchData function
  }, []);
  


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
    <View style={OrderScreenStyles.container}>
      <Text style={OrderScreenStyles.title}>Lịch sử đơn hàng</Text>
      <TouchableOpacity onPress={() => handleOrderPress(trip)}>  
      {trip ? (<View style={OrderScreenStyles.orderContainer}>
        <Text style={OrderScreenStyles.orderIDContainer}>Mã chuyến đi: {trip.tripId}</Text>

        {/* <Text  style={HomeScreenStyles.orderDetails}>Mã Đơn: {trip.tripId}</Text> */}
        {trip.orderTripId.map((e) => (
          <View>
            <Text key={e} style={OrderScreenStyles.orderIDContainer}>Mã Đơn: {e}</Text>
          </View>
        ))}
        {}

      </View>

      ) : (<></>)}
        </TouchableOpacity>
    </View>
  );
};


export default OrderScreen;