import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image ,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import OrderScreenStyles from '../order/OrderScreenStyles';
import { getOrderTripOfDriverId } from '../../api/order';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native';
import { getOrderId } from '../../api/order';
import parcelIcon from '../../assets/icons/parcel.png'



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
      navigation.navigate('OrderDetailScreen', { orderTripId: tripId });
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
      <Text style={OrderScreenStyles.title}>Đơn hàng</Text>
      {!trip ? (
        <View style={OrderScreenStyles.noOrdersContainer}>
          <Image source={parcelIcon} style={OrderScreenStyles.parcelIcon} />
          <Text style={OrderScreenStyles.noOrdersText}>Bạn không có đơn hàng nào cần giao</Text>
        </View>
      ) : (
        <View style={OrderScreenStyles.tripContainer}>
          <View style={OrderScreenStyles.tripInfoContainer}>
            <Text style={OrderScreenStyles.tripId}>Mã chuyến đi: {trip.tripId}</Text>
            <Text style={OrderScreenStyles.licensePlate}>Xe: {trip.licensePlate}</Text>
          </View>
          {trip.orderTripId.map((e, index) => (
            <TouchableOpacity key={e} onPress={() => handleOrderPress(e)}>
              <View>
                <Text style={OrderScreenStyles.orderIDContainer}>Mã Đơn: {e}</Text>
                <Text style={OrderScreenStyles.orderID}>
                  Địa chỉ: {trip.tripType === 1 ? trip.locationDetailGet : trip.locationDetailDelivery[index]}
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
              {trip.tripType === 1 ? 'Loại: Lấy hàng' : 'Loại: Giao hàng'}
            </Text>
            {trip && (
  <TouchableOpacity
    onPress={() => {
      if (trip.statusTrip !== 4) {
        handleStartTrip(trip.tripId);
      }
    }}
    disabled={trip.statusTrip === 4}
    style={[
      OrderScreenStyles.tripType,
      {
        backgroundColor: trip.statusTrip === 4 ? '#f6ffed' : '#f6ffed',
        color: '#389e0d',
        backgroundColor: '#f6ffed',
        borderColor: '#b7eb8f',
        borderWidth: 1,
      }
    ]}
  >
    <Text style={OrderScreenStyles.buttonText}>
      {trip.statusTrip === 4 ? 'Đã hoàn thành' : 'Bắt đầu đơn hàng'}
    </Text>
  </TouchableOpacity>
)}
          </View>
        </View>
      )}
    </View>
  );
};


export default OrderScreen;