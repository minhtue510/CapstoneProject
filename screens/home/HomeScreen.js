import React, { useEffect, useState, useMemo, useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, ScrollView, RefreshControl  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HomeScreenStyles from './HomeScreenStyles';
import back from '../../assets/icons/back.png';
import parcelIcon from '../../assets/icons/parcel.png';
import checkIcon from '../../assets/icons/check.png';
import { getOrderTripOfIdleDriverId, startOrderTrip } from '../../api/order';
import AsyncStorage from '@react-native-async-storage/async-storage';


const HomeScreen = ({ route }) => {
  const navigation = useNavigation();
  const [trip, setTrip] = useState(undefined);
  const [logTrip, setLogTrip] = useState('Bắt đầu đơn hàng');
  const [refreshing, setRefreshing] = useState(false);

  const handleOrderPress = async (tripId) => {
    try {
      navigation.navigate('OrderDetailScreen', { orderTripId: tripId });
    } catch (error) {
      // console.error('Lỗi khi chuyển trang chi tiết đơn hàng:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loginInfoString = await AsyncStorage.getItem('loginInfo');
        if (loginInfoString !== null) {
          const loginInfo = JSON.parse(loginInfoString);
          const trip = await getOrderTripOfIdleDriverId(loginInfo.idByRole, 2);
          setTrip(trip);
        } else {
          console.log('Không có thông tin');
        }
      } catch (error) {
        // console.error('Lỗi khi lấy thông tin đăng nhập:', error);
      }
    };

    fetchData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const loginInfoString = await AsyncStorage.getItem('loginInfo');
      if (loginInfoString !== null) {
        const loginInfo = JSON.parse(loginInfoString);
        const trip = await getOrderTripOfIdleDriverId(loginInfo.idByRole, 2);
        setTrip(trip);
      } else {
        console.log('Không có thông tin');
      }
    } catch (error) {
      // console.error('Lỗi khi làm mới dữ liệu:', error);
    }
    setRefreshing(false);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity 
        // onPress={() => navigation.goBack()} 
        onPress={() => navigation.navigate("Menu")}
        style={HomeScreenStyles.backButton}>
          <Image source={back} style={HomeScreenStyles.backIcon} />
        </TouchableOpacity>
      ),
      headerStyle: HomeScreenStyles.headerStyle,
      headerTitleAlign: 'center',
      title: 'Đơn đang vận chuyển',
    });
  }, [navigation]);

  const handleStartTrip = async (id) => {
    try {
      const response = await startOrderTrip(id);
      if (response) {
        setLogTrip('Đơn hàng đang được vận chuyển');
        setTrip(prevTrip => ({
          ...prevTrip,
          statusTrip: 3 // Giả sử 3 là trạng thái "Đang giao hàng"
        }));
      }
      console.log('Chuyến hàng bắt đầu');
    } catch (error) {
      console.error('Lỗi khi thực hiện hành động trên chuyến hàng:', error);
    }
  };

  const showAlert = (id) => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc chắn muốn bắt đầu đơn hàng?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Đồng ý',
          onPress: () => handleStartTrip(id),
        },
      ],
      { cancelable: true }
    );
  };

  // Lọc dữ liệu để chỉ hiển thị các đơn hàng có statusTrip là 3
  const renderData = useMemo(() => {
    if (!trip) return [];

    const validOrders = trip.orderTripId.map((orderTripId, index) => ({
      orderTripId,
      status: trip.orderTripStatus[index],
    })).filter(order => trip.statusTrip === 3);

    return validOrders;
  }, [trip]);

  return (
    <ScrollView contentContainerStyle={HomeScreenStyles.scrollContainer}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
      <View style={HomeScreenStyles.container}>
        {renderData.length === 0 ? (
          <View style={HomeScreenStyles.noOrdersContainer}>
            <Image source={parcelIcon} style={HomeScreenStyles.parcelIcon} />
            <Text style={HomeScreenStyles.noOrdersText}>Không có đơn hàng cần vận chuyển</Text>
          </View>
        ) : (
          <View style={HomeScreenStyles.tripContainer}>
            <View style={HomeScreenStyles.tripInfoContainer}>
              <Text style={HomeScreenStyles.tripId}>Mã chuyến đi: {trip.tripId}</Text>
              <Text style={HomeScreenStyles.licensePlate}>Xe: {trip.licensePlate}</Text>
            </View>
            {renderData.map((orderTrip, index) => (
              <TouchableOpacity key={orderTrip.orderTripId} onPress={() => handleOrderPress(orderTrip.orderTripId)}>
                <View style={HomeScreenStyles.orderContainer}>
                  <View style={HomeScreenStyles.orderContent}>
                    <Text style={HomeScreenStyles.orderIDContainer}>Mã gói hàng: {orderTrip.orderTripId}</Text>
                    <Text style={HomeScreenStyles.detail}>Xem chi tiết</Text>
                  </View>
                  {orderTrip.status === 4 && (
                    <Image source={checkIcon} style={HomeScreenStyles.checkIcon} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
            <View style={HomeScreenStyles.buttonContainer}>
              <Text
                style={[
                  HomeScreenStyles.tripType,
                  {
                    color: '#d4380d',
                    backgroundColor: '#fff2e8',
                    borderColor: '#ffbb96',
                    borderWidth: 1,
                  }
                ]}
              >
                {trip.tripType === 1 ? 'Lấy hàng' : 'Giao hàng'}
              </Text>
              {trip && (
                <TouchableOpacity
                  onPress={() => {
                    if (trip.statusTrip !== 3) {
                      showAlert(trip.tripId);
                    }
                  }}
                  disabled={trip.statusTrip === 3}
                >
                  <Text style={HomeScreenStyles.buttonText}>
                    {trip.statusTrip === 3 ? 'Đang vận chuyển' : 'Bắt đầu đơn hàng'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
