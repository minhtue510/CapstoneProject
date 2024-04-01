import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import OrderDetailScreenStyles from "./OrderDetailScreenStyles"; // Import styles
import { completeOderTrip, getItemOderTrip } from "../../api/order";
import { Camera } from "expo-camera";
// import AsyncStorage from '@react-native-async-storage/async-storage';
const OrderDetailScreen = ({ route }) => {
  const { orderTripId } = route.params;
  const [orderInfo, setOrderInfo] = useState([]);
  const [completeOder, setCompleteOder] = useState();
  const [isOrderDelivered, setIsOrderDelivered] = useState(false);
  useEffect(() => {
    const fetchOrderInfo = async () => {
      try {
        const itemOrderInfo = await getItemOderTrip(orderTripId);
        setOrderInfo(itemOrderInfo);
        console.log('itemOrderInfo:', itemOrderInfo);
      } catch (error) {
        console.error('Error fetching order info:', error);
      }
    };

    fetchOrderInfo();
  }, [orderTripId]);

  const changeOrderStatus = async () => {
    try {
      const response = await completeOderTrip(orderTripId);
      console.log(response);
      setOrderInfo(await getItemOderTrip(orderTripId));

      if (orderInfo && orderInfo[0]?.orderTrip.status === 4) {
        setIsOrderDelivered(true);
      } else {
        Alert.alert('Thông báo' , 'Đơn hàng đã được xác nhận');
      }
    } catch (error) {
      console.error('Error completing order:', error);
    }
  };
  

  return (
    <View style={OrderDetailScreenStyles.container}>
      <View style={OrderDetailScreenStyles.section}>
        <Text style={OrderDetailScreenStyles.sectionTitle}>
          Thông tin đơn hàng
        </Text>
        {orderInfo &&
          orderInfo.itemOrderTripResponse &&
          orderInfo.itemOrderTripResponse.map((e, index) => (
        <View style={OrderDetailScreenStyles.section} key={index}>
          <Text style={OrderDetailScreenStyles.sectionText}>
            Mã chuyến đi: {e?.orderTrip?.tripId}
          </Text>
          <Text style={OrderDetailScreenStyles.sectionText}>
            Mã đơn: {e?.orderTrip?.orderTripId}
          </Text>
          {e.orderTrip?.type === 1 ? (
            <>
              <Text style={OrderDetailScreenStyles.sectionText}>Tên người nhận: {orderInfo.orderLocation?.getBy}</Text>
              <Text style={OrderDetailScreenStyles.sectionText}>Số điện thoại người nhận: {orderInfo.orderLocation?.getPhone}</Text>
              <Text style={OrderDetailScreenStyles.sectionText}>Địa chỉ người nhận: {orderInfo.orderLocation?.addressGet}</Text>
            </>
          ) : (
            <>
              <Text style={OrderDetailScreenStyles.sectionText}>Tên người nhận: {orderInfo.orderLocation?.deliveryTo}</Text>
              <Text style={OrderDetailScreenStyles.sectionText}>Số điện thoại người nhận: {orderInfo.orderLocation?.deliveryPhone}</Text>
              <Text style={OrderDetailScreenStyles.sectionText}>Địa chỉ người nhận: {orderInfo.orderLocation?.addressDelivery}</Text>
            </>
          )}

        </View>
         ))}
      </View>
      <View style={OrderDetailScreenStyles.section}>
        <Text style={OrderDetailScreenStyles.sectionTitle}>
          Chi tiết đơn hàng
        </Text>
        {orderInfo &&
          orderInfo.itemOrderTripResponse &&
          orderInfo.itemOrderTripResponse.map((e, index) => (
            <View
              style={OrderDetailScreenStyles.listItemContainer}
              key={index}
            >
              <Text style={OrderDetailScreenStyles.itemName}>
                Mã hàng hóa: {e.itemId}
              </Text>
              <Text style={OrderDetailScreenStyles.itemName}>
                Tên hàng hóa: {e?.item.itemName}
              </Text>
              <View style={OrderDetailScreenStyles.itemContainer}>
                <Text style={OrderDetailScreenStyles.itemDescription}>
                  Mô tả: {e?.item.description}
                </Text>
              </View>
              <Text style={OrderDetailScreenStyles.itemQuantity}>
                Số lượng:{e?.item.quantityItem}
              </Text>
              {/* <Text style={OrderDetailScreenStyles}>Đơn giá: </Text> */}
              {/* Thêm các thuộc tính khác nếu cần */}
            </View>
          ))}
      </View>
      <TouchableOpacity
        onPress={changeOrderStatus}
        disabled={isOrderDelivered || (orderInfo.itemOrderTripResponse?.orderTrip?.status === 4)}
      >
        <Text
          style={[
            OrderDetailScreenStyles.button,
            {
              color: "#389e0d",
              backgroundColor: "#f6ffed",
              borderColor: "#b7eb8f",
              borderWidth: 1,
              fontSize: 18,
              padding: 10,
              borderRadius: 5,
              textAlign: "center",
              marginTop: 10,
              width: "100%",
            },
          ]}
        >
          {(orderInfo && orderInfo.itemOrderTripResponse?.orderTrip?.status === 4) ? "Đã hoàn thành" : "Xác nhận giao hàng"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={OrderDetailScreenStyles.button}>
        <Text>Chụp màn hình</Text>
      </TouchableOpacity>
      {/* Uncomment to use Camera */}
      {/* <Camera
        style={{ flex: 1 }}
        type={Camera.Constants.Type.back}
      /> */}
    </View>
  );
};

export default OrderDetailScreen;