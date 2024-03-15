import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HomeScreenStyles from './HomeScreenStyles';
import successIcon from '../../assets/icons/success.png';
import deliveringIcon from '../../assets/icons/delivering.png';
import parcelIcon from '../../assets/icons/parcel.png';

const HomeScreen = ({ route }) => {
  const navigation = useNavigation();

  const deliveringOrders = route.params ? route.params.deliveringOrders : [];

  const handleOrderPress = (item) => {
    navigation.navigate('OrderDetailScreen', { order: item });
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const renderNoOrdersComponent = () => (
    <View style={HomeScreenStyles.noOrdersContainer}>
      <Image source={parcelIcon} style={HomeScreenStyles.parcelIcon} />
      <Text style={HomeScreenStyles.noOrdersText}>Bạn không có đơn hàng nào cần giao</Text>
    </View>
  );

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
    <TouchableOpacity onPress={() => handleOrderPress(item)}>
      <View style={HomeScreenStyles.orderContainer}>
          <View style={HomeScreenStyles.orderIDAndDateContainer}>
            <Text style={HomeScreenStyles.orderIDContainer}>#{item.orderID}</Text>
            {/* <Text style={HomeScreenStyles.orderID}>Ngày giao: {formatDate(item.dayDelivery)}</Text> */}
          </View>
          <View style={HomeScreenStyles.orderItem}>
            {/* Cột 1: Thông tin đơn nhận và giao */}
            <View style={HomeScreenStyles.orderDetails}>
              {/* Đường kẻ */}
              <View style={[HomeScreenStyles.deliveryPath]} />
              {/* Vòng tròn cho việc nhận */}
              <View style={HomeScreenStyles.circleGet} />
              {/* Thông tin địa chỉ nhận */}
              <View>
                <Text style={HomeScreenStyles.orderDate}>
                  {addressDetails}
                </Text>
                <Text style={HomeScreenStyles.orderDate}>
                  {wardAndDistrict}
                </Text>
                <Text style={HomeScreenStyles.orderDate}>
                  {cityAndProvince}
                </Text>
              </View>
              <View style={{ height: 40 }} />
              {/* Đường kẻ */}
              <View style={[HomeScreenStyles.deliveryPath]} />
              {/* Vòng tròn cho việc giao */}
              <View style={HomeScreenStyles.circleDelivery} />
              {/* Thông tin địa chỉ giao hàng */}
              <View>
                <Text style={HomeScreenStyles.orderDate}>
                  {deliveryAddressDetails}
                </Text>
                <Text style={HomeScreenStyles.orderDate}>
                  {deliveryWardAndDistrict}
                </Text>
                <Text style={HomeScreenStyles.orderDate}>
                  {deliveryCityAndProvince}
                </Text>
              </View>
             
            </View>
            <Text style={[HomeScreenStyles.orderStatus, { backgroundColor: item.status === 'delivering' ? 'orange' : (item.status === 'waiting' ? 'gray' : 'transparent') }]}>
  {item.status === 'delivering' ? 'Đang giao' : (item.status === 'waiting' ? 'Chờ nhận hàng' : '')}
</Text>
          </View>
        </View>
    </TouchableOpacity>
  );
};

  return (
    <View style={HomeScreenStyles.container}>
      {deliveringOrders.length > 0 ? (
        <>
          <Text style={HomeScreenStyles.title}>Đơn hàng</Text>
          <FlatList
            data={deliveringOrders}
            renderItem={renderOrderItem}
            keyExtractor={(item) => item.id}
          />
        </>
      ) : (
        renderNoOrdersComponent()
      )}
    </View>
  );
};

export default HomeScreen;
