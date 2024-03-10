import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import OrderDetailScreenStyles from './OrderDetailScreenStyles'; // Import styles

const OrderDetailScreen = ({ route }) => {
  const [order, setOrder] = useState(route.params.order);

  useEffect(() => {
    // Xác định sự thay đổi trong route.params.order và cập nhật lại state order
    setOrder(route.params.order);
  }, [route.params.order]);

  const handleDeliverySuccess = () => {
    // Thực hiện cập nhật trạng thái đơn hàng ở đây
    // Ví dụ: gọi một hàm hoặc API để cập nhật trạng thái
    // Sau khi cập nhật thành công, bạn có thể thông báo cho người dùng
    Alert.alert('Thành công', 'Đơn hàng đã được giao thành công');
    // Cập nhật lại trạng thái của order trong state
    setOrder(prevOrder => ({ ...prevOrder, status: 'delivered' }));
  };

  const renderOrderItem = ({ item }) => (
    <View style={OrderDetailScreenStyles.listItemContainer}>
      <Text style={OrderDetailScreenStyles.itemName}>Tên hàng: {item.itemName}</Text>
      <Text style={OrderDetailScreenStyles.itemDescription}>Mô tả: {item.description}</Text>
      <Text style={OrderDetailScreenStyles.itemText}>Đơn giá: {item.unitPrice}</Text>
      <Text style={OrderDetailScreenStyles.itemText}>Số lượng: {item.quantityItem}</Text>
      {/* Add other item details as needed */}
    </View>
  );

  return (
    <View style={OrderDetailScreenStyles.container}>
      <View style={OrderDetailScreenStyles.section}>
        <Text style={OrderDetailScreenStyles.sectionTitle}>Thông tin đơn hàng</Text>
        <Text style={OrderDetailScreenStyles.sectionText}>Mã đơn: {order.orderID}</Text>
        <Text style={OrderDetailScreenStyles.sectionText}>Ngày lấy: {order.dayGet}</Text>
        <Text style={OrderDetailScreenStyles.sectionText}>Ngày giao: {order.dayDelivery}</Text>
        <Text style={OrderDetailScreenStyles.sectionText}>Tên công ty: {order.companyName}</Text>
      </View>
      <View style={OrderDetailScreenStyles.section}>
        <Text style={OrderDetailScreenStyles.sectionTitle}>Chi tiết đơn hàng</Text>
        <FlatList
          data={order.items}
          renderItem={renderOrderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      {order.status === 'delivering' && ( // Kiểm tra nếu đơn hàng đang trong trạng thái delivering
        <TouchableOpacity onPress={handleDeliverySuccess}>
          <View style={OrderDetailScreenStyles.button}>
            <Text style={OrderDetailScreenStyles.buttonText}>Giao thành công</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default OrderDetailScreen;
