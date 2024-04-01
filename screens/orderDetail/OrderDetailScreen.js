import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import OrderDetailScreenStyles from './OrderDetailScreenStyles'; // Import styles
import { completeOderTrip, getItemOderTrip } from '../../api/order';
import { Camera } from 'expo-camera';
// import AsyncStorage from '@react-native-async-storage/async-storage';
const OrderDetailScreen = ({ route }) => {
  const { orderTripId } = route.params;
  const [orderInfo, setOrderInfo] = useState([]);
  const [completeOder, setCompleteOder] = useState();


  useEffect(() => {
    const fetchOrderInfo = async () => {
      try {
        const itemOrderInfo = await getItemOderTrip(orderTripId);
        console.log('itemOrderInfo', itemOrderInfo)
        setOrderInfo(itemOrderInfo);
      } catch (error) {
        console.error('Error fetching order info:', error);
      }
    };

    fetchOrderInfo();
  }, [orderTripId]);

  useEffect(() => {
    const fetchOrderInfo = async () => {
      try {
        const itemOrderInfo = await getItemOderTrip(orderTripId);
        setOrderInfo(itemOrderInfo);
      } catch (error) {
        console.error('Error fetching order info:', error);
      }
    };

    fetchOrderInfo();
  }, []);

  const changeOrderStatus = async () => {
    try {
      // Show confirmation popup
      Alert.alert(
        'Xác nhận',
        'Bạn có chắc muốn xác nhận đơn hàng này?',
        [
          {
            text: 'Hủy',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'Xác nhận',
            onPress: async () => {
              // Call API to complete order
              const response = await completeOderTrip(orderTripId);
              console.log(response);
              // Update orderInfo after completing order
              const updatedOrderInfo = await getItemOderTrip(orderTripId);
              setOrderInfo(updatedOrderInfo);
              // Show success message
              Alert.alert('Thông báo', 'Đơn hàng đã được xác nhận thành công.');
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error completing order:', error);
    }
  };
  return (
    <View style={OrderDetailScreenStyles.container}>
      <View style={OrderDetailScreenStyles.section}>
        <Text style={OrderDetailScreenStyles.sectionTitle}>Thông tin đơn hàng</Text>
        {/* {orderInfo?.map((e) => ( */}
        <View style={OrderDetailScreenStyles.section}>
          <Text style={OrderDetailScreenStyles.sectionText}>Mã chuyến đi: {orderTripId?.orderTrip?.tripId} </Text>
          <Text style={OrderDetailScreenStyles.sectionText}>Mã đơn: {orderTripId?.orderTrip?.orderTripId}</Text>
          <Text style={OrderDetailScreenStyles.sectionText}>Ngày giao: </Text>
          <Text style={OrderDetailScreenStyles.sectionText}>Tên công ty: </Text>
        </View>
        {/* ))} */}
      </View>
      <View style={OrderDetailScreenStyles.section}>
        <Text style={OrderDetailScreenStyles.sectionTitle}>Chi tiết đơn hàng</Text>
        {/* {orderInfo?.map((e) => ( */}
        <View style={OrderDetailScreenStyles.listItemContainer}>
          <Text style={OrderDetailScreenStyles.itemName}>Mã hàng hóa: {orderTripId?.item?.itemId}</Text>
          <Text style={OrderDetailScreenStyles.itemName}>Tên hàng hóa: {orderTripId?.item?.itemName}</Text>
          <View style={OrderDetailScreenStyles.itemContainer}>
            <Text style={OrderDetailScreenStyles.itemDescription}>Mô tả:  {orderTripId?.item?.description}</Text>
          </View>
          <Text style={OrderDetailScreenStyles.itemQuantity}>Số lượng: {orderTripId?.item?.quantityItem}</Text>
          {/* <Text style={OrderDetailScreenStyles}>Đơn giá: </Text> */}
          {/* Thêm các thuộc tính khác nếu cần */}
        </View>
        {/* ))}  */}
      </View>
      <TouchableOpacity onPress={() => changeOrderStatus(orderTripId)}>
        {orderInfo && orderInfo[0]?.orderTrip?.status === 4 ? (
          <Text
            style={[
              OrderDetailScreenStyles.button,
              {
                color: '#389e0d',
                backgroundColor: '#f6ffed',
                borderColor: '#b7eb8f',
                borderWidth: 1,
                fontSize: 18,
                padding: 10,
                borderRadius: 5,
                textAlign: 'center',
                marginTop: 10,
                width: '100%',
              },
            ]}
          >
            Đã giao thành công
          </Text>
        ) : (
          <Text
            style={[
              OrderDetailScreenStyles.button,
              {
                color: '#389e0d',
                backgroundColor: '#f6ffed',
                borderColor: '#b7eb8f',
                borderWidth: 1,
                fontSize: 18,
                padding: 10,
                borderRadius: 5,
                textAlign: 'center',
                marginTop: 10,
                width: '100%',
              },
            ]}
          >
            Xác nhận đơn hàng
          </Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity  style={OrderDetailScreenStyles.button}>
        <Text>Chụp màn hình</Text>
      </TouchableOpacity>
      {/* <Camera
        style={{ flex: 1 }} // Set appropriate styles for the camera
        type={Camera.Constants.Type.back} // Set the camera type (front/back)
        // Add other camera props as needed
      /> */}

    </View>
  );
};

export default OrderDetailScreen;