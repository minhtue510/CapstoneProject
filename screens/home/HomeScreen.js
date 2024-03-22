import React, { useEffect, useState }from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HomeScreenStyles from './HomeScreenStyles';
import successIcon from '../../assets/icons/success.png';
import deliveringIcon from '../../assets/icons/delivering.png';
import parcelIcon from '../../assets/icons/parcel.png';
import { getOrderTripOfDriverId } from '../../api/order';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getOrderId } from '../../api/order';
import {getUserByAccountId} from '../../api/user';
const HomeScreen = ({ route }) => {
  const navigation = useNavigation();
  const [orderTripId, setOrderTripId] = useState();
  
  const deliveringOrders = route.params ? route.params.deliveringOrders : [];

  const handleOrderPress = async (tripId) => {
    try {
      const orderId = await getOrderId(tripId.orderId); // Sử dụng hàm getOrderId để lấy thông tin đơn hàng
      navigation.navigate('OrderDetailScreen', { order: tripId, orderId });
      console.log('orderId'); // Chuyển hướng đến OrderDetailScreen và truyền thông tin đơn hàng
    } catch (error) {
      console.error('Lỗi khi lấy thông tin đơn hàng:', error);
    }
  };

//     useEffect(() => {
//     const fetchUserInfo = async () => {
//         try {
//             // Extract user ID from the login response
//             const userId = route.params?.id;
//             console.log('User ID:', userId);

//             // Call the API to fetch user information based on the user ID
//             const userData = await getUserByAccountId(userId);
//             console.log('User Data:', userData);

//             // Update the userInfo state with the fetched user data
//             setUserInfos(userData);

//             // After fetching user data, automatically navigate to OrderScreen
            
//         } catch (error) {
//             console.error('Error fetching user info:', error);
//         }
//     };

//     fetchUserInfo();
// }, [route.params]);
 
  
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
          const tripId = await getOrderTripOfDriverId(loginInfo.idByRole);
          setOrderTripId(tripId);
          console.log('Order Trip ID:', tripId);
  
          // Kiểm tra nếu có thông tin orderTripId và orderTripId là một mảng
          if (tripId && tripId.orderTripId && Array.isArray(tripId.orderTripId)) {
            const { itemId, orderId, orderTripId } = tripId.orderTripId;
  
            // Kiểm tra xem có bao nhiêu item và hiển thị riêng lẻ
            if (itemId && Array.isArray(itemId)) {
              for (let i = 0; i < itemId.length; i++) {
                console.log('Item ID:', itemId[i]);
              }
            }
  
            if (orderId && Array.isArray(orderId)) {
              for (let i = 0; i < orderId.length; i++) {
                console.log('Order ID:', orderId[i]);
              }
            }
  
            if (orderTripId && Array.isArray(orderTripId)) {
              for (let i = 0; i < orderTripId.length; i++) {
                console.log('Order Trip ID:', orderTripId[i]);
              }
            }
          } else {
            console.log('Không có thông tin orderTripId hoặc không phải là một mảng');
          }
        } else {
          console.log('Không có thông tin');
        }
      } catch (error) {
        console.error('Lỗi khi lấy thông tin đăng nhập:', error);
        throw error;
      }
    };
  
    fetchData();
  }, []);
  
  




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
      <TouchableOpacity onPress={() => handleOrderPress(orderTripId)}>
        <View style={HomeScreenStyles.orderContainer}>
          <View style={HomeScreenStyles.orderIDAndDateContainer}>
            <Text style={HomeScreenStyles.orderIDContainer}>#{orderTripId.tripId}</Text>
          </View>
          <View style={HomeScreenStyles.orderItem}>
            <View style={HomeScreenStyles.orderDetails}>
              {/* Hiển thị itemId và orderId */}
              <View style={HomeScreenStyles.circleGet} />
              {orderTripId.itemId.map((item, index) => (
                <View key={index}>
                  <Text style={HomeScreenStyles.orderDate}>Order Trip ID: {item}</Text>
                </View>
              ))}
               {orderTripId.orderId.map((item, index) => (
                <View key={index}>
                  <Text style={HomeScreenStyles.orderDate}>Order ID: {item}</Text>
                </View>
              ))}
              {orderTripId.orderTripId.map((item, index) => (
                <View key={index}>
                  <Text style={HomeScreenStyles.orderDate}>Item ID: {item}</Text>
                </View>
              ))}            
              {/* Hiển thị orderTripId */}
              {/* Hiển thị các thông tin khác nếu cần */}
            </View>
            {/* Hiển thị trạng thái */}
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
      {
        <>
          <Text style={HomeScreenStyles.title}>Đơn hàng</Text>
          <FlatList
            data={deliveringOrders}
            renderItem={renderOrderItem}
            keyExtractor={(item) => item.id}
          />
        </>
      }
    </View>
  );
};

export default HomeScreen;
