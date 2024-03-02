import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import OrderScreenStyles from '../order/OrderScreenStyles';
import successIcon from '../../assets/icons/success.png';
import deliveringIcon from '../../assets/icons/delivering.png';
const orders = [
  { 
    id: '1', 
    orderID: 'ABC123', 
    dayGet: '2024-02-20', 
    dayDelivery: '2024-02-21', 
    companyName: 'FPT', 
    locationDetailGet: 'Hai Bà Trưng', 
    locationDetailDelivery: 'Trần Hưng Đạo', 
    status: 'success',
    items: [
      { itemName: 'TV', description: 'Thiết bị điện tử', unitPrice: 10, quantityItem: 2, unitWeight: 1, length: 5, width: 3, height: 2 },
      { itemName: 'Laptop', description: 'Laptop description', unitPrice: 15, quantityItem: 1, unitWeight: 2, length: 6, width: 4, height: 3 }
    ]
  },
  { 
    id: '2', 
    orderID: 'XYZ456', 
    dayGet: '2024-02-20', 
    dayDelivery: '2024-02-21', 
    companyName: 'NK', 
    locationDetailGet: 'Location A', 
    locationDetailDelivery: 'Location B', 
    status: 'success',
    items: [
      { itemName: 'Product A', description: 'Description of Product A', unitPrice: 10, quantityItem: 2, unitWeight: 1, length: 5, width: 3, height: 2 },
      { itemName: 'Product B', description: 'Description of Product B', unitPrice: 20, quantityItem: 3, unitWeight: 1.5, length: 7, width: 4, height: 2 }
    ]
  },
  { 
    id: '3', 
    orderID: 'A24512af', 
    dayGet: '2024-02-20', 
    dayDelivery: '2024-02-21', 
    companyName: 'TGDD', 
    locationDetailGet: 'Location A', 
    locationDetailDelivery: 'Location B', 
    status: 'delivering',
    items: [
      { itemName: 'Product A', description: 'Description of Product A', unitPrice: 10, quantityItem: 2, unitWeight: 1, length: 5, width: 3, height: 2 },
      { itemName: 'Product B', description: 'Description of Product B', unitPrice: 20, quantityItem: 3, unitWeight: 1.5, length: 7, width: 4, height: 2 },
      { itemName: 'Product C', description: 'Description of Product B', unitPrice: 20, quantityItem: 3, unitWeight: 1.5, length: 7, width: 4, height: 2 }
    ]
  },
  { 
    id: '4', 
    orderID: 'ádasdas', 
    dayGet: '2024-02-20', 
    dayDelivery: '2024-02-21', 
    companyName: 'GearVN', 
    locationDetailGet: 'Location A', 
    locationDetailDelivery: 'Location B', 
    status: 'delivering',
    items: [
      { itemName: 'Product A', description: 'Description of Product A', unitPrice: 10, quantityItem: 2, unitWeight: 1, length: 5, width: 3, height: 2 },
      { itemName: 'Product B', description: 'Description of Product B', unitPrice: 20, quantityItem: 3, unitWeight: 1.5, length: 7, width: 4, height: 2 },
      { itemName: 'Product C', description: 'Description of Product B', unitPrice: 20, quantityItem: 3, unitWeight: 1.5, length: 7, width: 4, height: 2 }
    ]
  },
  // Add more orders as needed
];

const OrderScreen = () => {
  const navigation = useNavigation();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  
  const renderOrderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('OrderDetailScreen', { order: item })}>
      <View style={OrderScreenStyles.orderItem}>
        <View>
          <Text style={OrderScreenStyles.orderDate}>{`Mã đơn: ${item.orderID}`}</Text>
          <Text style={OrderScreenStyles.orderDate}>{`Ngày gửi: ${formatDate(item.dayGet)}`}</Text>
          <Text style={OrderScreenStyles.orderDate}>{`Ngày nhận: ${formatDate(item.dayDelivery)}`}</Text>
          <Text style={OrderScreenStyles.orderDate}>{`Tên công ty: ${item.companyName}`}</Text>
          <Text style={OrderScreenStyles.orderDate}>{`Địa chỉ lấy: ${item.locationDetailGet}`}</Text>
          <Text style={OrderScreenStyles.orderDate}>{`Địa chỉ giao: ${item.locationDetailDelivery}`}</Text>
        </View>
        <Image source={item.status === 'success' ? successIcon : deliveringIcon} style={OrderScreenStyles.statusIcon} />
      </View>
    </TouchableOpacity>
  );

  useEffect(() => {
    // Tìm đơn hàng đang delivering và chuyển hướng đến HomeScreen
    const deliveringOrders = orders.filter(order => order.status === 'delivering');
    if (deliveringOrders.length > 0) {
      navigation.navigate('Home', { deliveringOrders });
    }
  }, [orders]);
  

  return (
    <View style={OrderScreenStyles.container}>
      <Text style={OrderScreenStyles.title}>Lịch sử giao hàng</Text>
      <FlatList
        data={orders.filter(order => order.status === 'success')}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}     
      />
    </View>
    
  );
  
};

export default OrderScreen;
