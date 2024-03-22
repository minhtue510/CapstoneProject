import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import OrderDetailScreenStyles from './OrderDetailScreenStyles'; // Import styles
import { getOrderId } from '../../api/order';
// import AsyncStorage from '@react-native-async-storage/async-storage';
const OrderDetailScreen = ({ route }) => {
  const { orderId } = route.params;

  
  const [orderInfo, setOrderInfo] = useState();

  
  useEffect(() => {
    const fetchOrderInfo = async () => {
      try {
        const orderInfo = await getOrderId(orderId.orderId);
        setOrderInfo(orderInfo);
      } catch (error) {
        console.error('Error fetching order info:', error);
      }
    };

    fetchOrderInfo();
  }, [orderId]);

 
  // const handleDeliverySuccess = () => {
  //   // Thực hiện cập nhật trạng thái đơn hàng ở đây
  //   // Ví dụ: gọi một hàm hoặc API để cập nhật trạng thái
  //   // Sau khi cập nhật thành công, bạn có thể thông báo cho người dùng
  //   Alert.alert('Thành công', 'Đơn hàng đã được giao thành công');
  //   // Cập nhật lại trạng thái của order trong state
  //   setOrder(prevOrder => ({ ...prevOrder, status: 'delivered' }));
  // };

  // const handleChangeToDelivery = () => {
  //   // Thực hiện cập nhật trạng thái đơn hàng ở đây
  //   // Ví dụ: gọi một hàm hoặc API để cập nhật trạng thái
  //   // Sau khi cập nhật thành công, bạn có thể thông báo cho người dùng
  //   Alert.alert('Đã nhận đơn hàng thành công');
  //   // Cập nhật lại trạng thái của order trong state
  //   setOrder(prevOrder => ({ ...prevOrder, status: 'delivering' }));
  // };

  const renderOrderItem = ({ item }) => (
    <View style={OrderDetailScreenStyles.listItemContainer}>
      <Text style={OrderDetailScreenStyles.orderTripId}>Mã đơn:{orderInfo.orderId}</Text>
      <View style={OrderDetailScreenStyles.itemContainer}>
        <Text style={OrderDetailScreenStyles.itemName}>{item.itemName}</Text> 
        <Text style={OrderDetailScreenStyles.itemText}>Đơn giá: {item.unitPrice}</Text>
      </View>
       <Text style={OrderDetailScreenStyles.itemQuantity}>Số lượng: {item.quantityItem}</Text>
      {/* Thêm các thuộc tính khác nếu cần */}
    </View>
  );

  return (
    <View style={OrderDetailScreenStyles.container}>
      <View style={OrderDetailScreenStyles.section}>
        <Text style={OrderDetailScreenStyles.sectionTitle}>Thông tin đơn hàng</Text>
        <Text style={OrderDetailScreenStyles.sectionText}>Mã chuyến đi: {orderInfo.orderId}</Text>
        <Text style={OrderDetailScreenStyles.sectionText}>Ngày lấy: {orderInfo.dayGet}</Text>
        <Text style={OrderDetailScreenStyles.sectionText}>Ngày giao: {orderInfo.dayDelivery}</Text>
        <Text style={OrderDetailScreenStyles.sectionText}>Tên công ty: {orderInfo.companyName}</Text>
      </View>
      <View style={OrderDetailScreenStyles.section}>
        <Text style={OrderDetailScreenStyles.sectionTitle}>Chi tiết đơn hàng</Text>
    </View>
      {orderInfo.status === 'delivering' && ( // Kiểm tra nếu đơn hàng đang trong trạng thái delivering
        <TouchableOpacity onPress={handleDeliverySuccess}>
          <View style={OrderDetailScreenStyles.button}>
            <Text style={OrderDetailScreenStyles.buttonText}>Giao thành công</Text>
          </View>
        </TouchableOpacity>
      )}
       {orderInfo.status === 'waiting' && ( // Kiểm tra nếu đơn hàng đang trong trạng thái delivering
        <TouchableOpacity onPress={handleChangeToDelivery}>
          <View style={OrderDetailScreenStyles.button}>
            <Text style={OrderDetailScreenStyles.buttonText}>Bắt đầu giao hàng</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default OrderDetailScreen;