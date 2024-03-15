import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import OrderScreenStyles from '../order/OrderScreenStyles';

const orders = [
  {
    id: '0',
    orderID: 'SND32D123D',
    dayGet: '2024-02-20',
    dayDelivery: '2024-02-21',
    companyName: 'FPT',
    locationStreetGet: '73 Trần Thị Điệu',
    locationWardGet: 'Phước Long B',
    locationDistrictGet: '9',
    locationCityGet: 'Thủ Đức',
    locationProvinceGet: '',
    locationStreetDelivery: '22 Đường số 2',
    locationWardDelivery: 'Phú Hữu',
    locationDistrictDelivery: '9',
    locationCityDelivery: 'Thủ Đức',
    locationProvinceDelivery: '',
    status: 'delivering',
    items: [
      { itemName: 'TV', description: 'Thiết bị điện tử', unitPrice: 10, quantityItem: 2, unitWeight: 1, length: 5, width: 3, height: 2 },
      { itemName: 'Laptop', description: 'Laptop description', unitPrice: 15, quantityItem: 1, unitWeight: 2, length: 6, width: 4, height: 3 }
    ]
  },
  {
    id: '1',
    orderID: 'SND32D123D',
    dayGet: '2024-02-20',
    dayDelivery: '2024-02-21',
    companyName: 'FPT',
    locationStreetGet: '82 Dương Đình Hội',
    locationWardGet: 'Tăng Nhơn Phú',
    locationDistrictGet: '9',
    locationCityGet: 'Thủ Đức',
    locationProvinceGet: '',
    locationStreetDelivery: '11 Hai Bà Trưng',
    locationWardDelivery: 'Hiệp Bình',
    locationDistrictDelivery: '',
    locationCityDelivery: 'Biên Hòa',
    locationProvinceDelivery: 'Đồng Nai',
    status: 'waiting',
    items: [
      { itemName: 'TV', description: 'Thiết bị điện tử', unitPrice: 10, quantityItem: 2, unitWeight: 1, length: 5, width: 3, height: 2 },
      { itemName: 'Laptop', description: 'Laptop description', unitPrice: 15, quantityItem: 1, unitWeight: 2, length: 6, width: 4, height: 3 }
    ]
  },
  {
    id: '2',
    orderID: 'DS112DQWD',
    dayGet: '2024-02-20',
    dayDelivery: '2024-02-21',
    companyName: 'NK',
    locationStreetGet: '73 Trần Thị Điệu',
    locationWardGet: 'Phước Long B',
    locationDistrictGet: '9',
    locationCityGet: 'Thủ Đức',
    locationProvinceGet: '',
    locationStreetDelivery: '22 Đường số 2',
    locationWardDelivery: 'Phú Hữu',
    locationDistrictDelivery: '9',
    locationCityDelivery: 'Thủ Đức',
    locationProvinceDelivery: '',
    status: 'success',
    items: [
      { itemName: 'Product A', description: 'Description of Product A', unitPrice: 10, quantityItem: 2, unitWeight: 1, length: 5, width: 3, height: 2 },
      { itemName: 'Product B', description: 'Description of Product B', unitPrice: 20, quantityItem: 3, unitWeight: 1.5, length: 7, width: 4, height: 2 }
    ]
  },
  {
    id: '3',
    orderID: '4D21D22DW',
    dayGet: '2024-02-20',
    dayDelivery: '2024-02-21',
    companyName: 'TGDD',
    locationStreetGet: '22 Mai Xuân Thưởng',
    locationWardGet: 'Lê Hồng Phong',
    locationDistrictGet: '',
    locationCityGet: 'Quy Nhơn',
    locationProvinceGet: 'Bình Định',
    locationStreetDelivery: '12 Nguyễn Thị Minh Khai',
    locationWardDelivery: 'Đa Kao',
    locationDistrictDelivery: '1',
    locationCityDelivery: 'Hồ Chí Minh',
    locationProvinceDelivery: '',
    status: 'success',
    items: [
      { itemName: 'Product A', description: 'Description of Product A', unitPrice: 10, quantityItem: 2, unitWeight: 1, length: 5, width: 3, height: 2 },
      { itemName: 'Product B', description: 'Description of Product B', unitPrice: 20, quantityItem: 3, unitWeight: 1.5, length: 7, width: 4, height: 2 },
      { itemName: 'Product C', description: 'Description of Product B', unitPrice: 20, quantityItem: 3, unitWeight: 1.5, length: 7, width: 4, height: 2 }
    ]
  },
  {
    id: '4',
    orderID: 'AV21EQWE',
    dayGet: '2024-02-20',
    dayDelivery: '2024-02-21',
    companyName: 'GearVN',
    locationStreetGet: '188 Man Thiện',
    locationWardGet: 'Tăng Nhơn Phú A',
    locationDistrictGet: '9',
    locationCityGet: 'Thủ Đức',
    locationProvinceGet: '',
    locationStreetDelivery: '412 Lê Văn Việt',
    locationWardDelivery: 'Tăng Nhơn Phú A',
    locationDistrictDelivery: '9',
    locationCityDelivery: 'Thủ Đức',
    locationProvinceDelivery: '',
    status: 'success',
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

  const renderOrderItem = ({ item }) => {
    let addressDetails = '';

    if (item.locationStreetGet) {
      addressDetails += item.locationStreetGet;
    }

    let wardAndDistrict = '';
    if (item.locationWardGet) {
      wardAndDistrict += `P. ${item.locationWardGet}`;
    }

    if (item.locationDistrictGet) {
      if (wardAndDistrict) {
        wardAndDistrict += `, Q.${item.locationDistrictGet}`;
      } else {
        wardAndDistrict += `Q.${item.locationDistrictGet}`;
      }
    }

    let cityAndProvince = '';
    if (item.locationCityGet) {
      cityAndProvince += `TP. ${item.locationCityGet}`;
    }

    if (item.locationProvinceGet) {
      if (cityAndProvince) {
        cityAndProvince += `, ${item.locationProvinceGet}`;
      } else {
        cityAndProvince += `${item.locationProvinceGet}`;
      }
    }

    let deliveryAddressDetails = '';

    if (item.locationStreetDelivery) {
      deliveryAddressDetails += item.locationStreetDelivery;
    }

    let deliveryWardAndDistrict = '';
    if (item.locationWardDelivery) {
      deliveryWardAndDistrict += `P. ${item.locationWardDelivery}`;
    }

    if (item.locationDistrictDelivery) {
      if (deliveryWardAndDistrict) {
        deliveryWardAndDistrict += `, Q.${item.locationDistrictDelivery}`;
      } else {
        deliveryWardAndDistrict += `Q.${item.locationDistrictDelivery}`;
      }
    }

    let deliveryCityAndProvince = '';
    if (item.locationCityDelivery) {
      deliveryCityAndProvince += `TP. ${item.locationCityDelivery}`;
    }

    if (item.locationProvinceDelivery) {
      if (deliveryCityAndProvince) {
        deliveryCityAndProvince += `, ${item.locationProvinceDelivery}`;
      } else {
        deliveryCityAndProvince += ` ${item.locationProvinceDelivery}`;
      }
    }




    return (
      <TouchableOpacity onPress={() => navigation.navigate('OrderDetailScreen', { order: item })}>
        <View style={OrderScreenStyles.orderContainer}>
          <View style={OrderScreenStyles.orderIDAndDateContainer}>
            <Text style={OrderScreenStyles.orderIDContainer}>#{item.orderID}</Text>
            <Text style={OrderScreenStyles.orderID}>Ngày giao: {formatDate(item.dayDelivery)}</Text>
          </View>
          <View style={OrderScreenStyles.orderItem}>
            {/* Cột 1: Thông tin đơn nhận và giao */}
            <View style={OrderScreenStyles.orderDetails}>
              {/* Đường kẻ */}
              <View style={[OrderScreenStyles.deliveryPath]} />
              {/* Vòng tròn cho việc nhận */}
              <View style={OrderScreenStyles.circleGet} />
              {/* Thông tin địa chỉ nhận */}
              <View>
                <Text style={OrderScreenStyles.orderDate}>
                  {addressDetails}
                </Text>
                <Text style={OrderScreenStyles.orderDate}>
                  {wardAndDistrict}
                </Text>
                <Text style={OrderScreenStyles.orderDate}>
                  {cityAndProvince}
                </Text>
              </View>
              <View style={{ height: 40 }} />
              {/* Đường kẻ */}
              <View style={[OrderScreenStyles.deliveryPath]} />
              {/* Vòng tròn cho việc giao */}
              <View style={OrderScreenStyles.circleDelivery} />
              {/* Thông tin địa chỉ giao hàng */}
              <View>
                <Text style={OrderScreenStyles.orderDate}>
                  {deliveryAddressDetails}
                </Text>
                <Text style={OrderScreenStyles.orderDate}>
                  {deliveryWardAndDistrict}
                </Text>
                <Text style={OrderScreenStyles.orderDate}>
                  {deliveryCityAndProvince}
                </Text>
              </View>
             
            </View>
             <Text style={OrderScreenStyles.orderStatus}>
                {item.status === 'success' ? 'Giao thành công' : ''}
              </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };



  useEffect(() => {
    // Tìm đơn hàng đang delivering và chuyển hướng đến HomeScreen
    const deliveringOrders = orders.filter(order => order.status === 'delivering' || order.status === 'waiting');
    if (deliveringOrders.length > 0) {
      navigation.navigate('Home', { deliveringOrders });
    }
  }, [orders]);


  return (
    <View style={OrderScreenStyles.container}>
      <Text style={OrderScreenStyles.title}>Lịch sử giao hàng</Text>
      {orders.filter(order => order.status === 'success').length > 0 ? (
        <FlatList
          data={orders.filter(order => order.status === 'success')}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text style={OrderScreenStyles.noOrderText}>Không có đơn hàng nào được tìm thấy.</Text>
      )}
    </View>
  );
};

export default OrderScreen;