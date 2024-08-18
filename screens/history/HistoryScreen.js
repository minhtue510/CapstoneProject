import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, Image, Modal, RefreshControl } from 'react-native';
import HistoryScreenStyles from './HistoryScreenStyles';
import { completeOderTrip, getItemOderTrip, getDriverTrips, getHistory } from '../../api/order';
import back from '../../assets/icons/back.png';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HistoryScreen = ({ route }) => {
  const { orderTripId } = route.params;
  const navigation = useNavigation();
  const [orderInfo, setOrderInfo] = useState([]);
  const [isOrderDelivered, setIsOrderDelivered] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [driverTrips, setDriverTrips] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchOrderInfo = async () => {
    try {
      const itemOrderInfo = await getItemOderTrip(orderTripId);
      setOrderInfo(itemOrderInfo);
      setIsOrderDelivered(itemOrderInfo?.itemOrderTripResponse?.orderTrip?.status === 4);

      const loginInfoString = await AsyncStorage.getItem('loginInfo');
      if (loginInfoString !== null) {
        const loginInfo = JSON.parse(loginInfoString);
        const trips = await getHistory(loginInfo.idByRole);
        setDriverTrips(trips);
        console.log('Danh sách chuyến đi của tài xế:', trips);
      }
    } catch (error) {
      console.error('Lỗi khi lấy thông tin:', error);
    }
  };

  useEffect(() => {
    fetchOrderInfo();
  }, [orderTripId]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchOrderInfo().then(() => setRefreshing(false));
  }, [orderTripId]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Order')} style={HistoryScreenStyles.backButton}>
          <Image source={back} style={HistoryScreenStyles.backIcon} />
        </TouchableOpacity>
      ),
      headerStyle: HistoryScreenStyles.headerStyle,
      headerTitleAlign: 'center',
      title: 'Chi tiết đơn hàng',
    });
  }, [navigation]);

  const openModal = (imageUri) => {
    setSelectedImage(imageUri);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedImage(null);
  };

  const renderItem = ({ item }) => (
    <View style={HistoryScreenStyles.listItemContainer}>
      <Text style={HistoryScreenStyles.itemName}>Mã hàng hóa: {item.itemId}</Text>
      <Text style={HistoryScreenStyles.itemName}>Tên hàng hóa: {item?.item.itemName}</Text>
      {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={HistoryScreenStyles.itemName}>Dài: {item?.item.length * 100} cm</Text>
        <Text style={HistoryScreenStyles.itemName}>Rộng: {item?.item.width * 100} cm</Text>
        <Text style={HistoryScreenStyles.itemName}>Cao: {item?.item.height * 100} cm</Text>
      </View> */}
       <Text style={HistoryScreenStyles.itemName}>Kích thước(D x R x C): {item?.item.length * 100} cm x {item?.item.width * 100} cm x {item?.item.height * 100} cm</Text>
      <Text style={HistoryScreenStyles.itemName}>Số lượng: {item?.item.quantityItem}</Text>
      <View style={HistoryScreenStyles.itemContainer}>
        <Text style={HistoryScreenStyles.itemDescription}>Mô tả: {item?.item.description}</Text>
      </View>
      {item?.orderTrip?.evidence && (
        <TouchableOpacity onPress={() => openModal(item.orderTrip.evidence)}>
          <Image source={{ uri: item.orderTrip.evidence }} style={HistoryScreenStyles.itemImage} />
        </TouchableOpacity>
      )}

    </View>
  );

  return (
    <View style={HistoryScreenStyles.container}>
      {/* Order Information Section */}
      <View style={HistoryScreenStyles.section}>
        <Text style={HistoryScreenStyles.sectionTitle}>Thông tin đơn hàng</Text>
        {orderInfo &&
          orderInfo.itemOrderTripResponse &&
          orderInfo.itemOrderTripResponse.map((e, index) => (
            <View style={HistoryScreenStyles.section} key={index}>
              {/* <Text style={HistoryScreenStyles.sectionText}>Mã chuyến đi: {e?.orderTrip?.tripId}</Text> */}
              <Text style={HistoryScreenStyles.sectionText}>Mã đơn hàng: {e?.item.orderId}</Text>
              <Text style={HistoryScreenStyles.sectionText}>Mã gói hàng: {e?.orderTrip?.orderTripId}</Text>
              {e.orderTrip?.type === 1 ? (
                <>
                  <Text style={HistoryScreenStyles.sectionText}>Tên người gửi: {orderInfo.orderLocation?.getBy}</Text>
                  <Text style={HistoryScreenStyles.sectionText}>Số điện thoại: {orderInfo.orderLocation?.getPhone}</Text>
                  <Text style={HistoryScreenStyles.sectionText}>Địa chỉ: {orderInfo.orderLocation?.addressGet},{orderInfo.orderLocation?.provinceGet} </Text>
                </>
              ) : (
                <>
                  <Text style={HistoryScreenStyles.sectionText}>Tên người nhận: {orderInfo.orderLocation?.deliveryTo}</Text>
                  <Text style={HistoryScreenStyles.sectionText}>Số điện thoại: {orderInfo.orderLocation?.deliveryPhone}</Text>
                  <Text style={HistoryScreenStyles.sectionText}>Địa chỉ: {orderInfo.orderLocation?.addressDelivery}, {orderInfo.orderLocation?.cityDelivery}, {orderInfo.orderLocation?.provinceDelivery}</Text>
                </>
              )}
            </View>
          ))}
      </View>

      {/* Order Details Section */}
      <View style={HistoryScreenStyles.section}>
        <Text style={HistoryScreenStyles.sectionTitle}>Chi tiết đơn hàng</Text>
        <FlatList
          data={orderInfo.itemOrderTripResponse || []}
          renderItem={renderItem}
          keyExtractor={(item) => item.itemId.toString()}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
        <Modal visible={isModalVisible} transparent={true} onRequestClose={closeModal} animationType="slide">
          <View style={HistoryScreenStyles.modalContainer}>
            <View style={HistoryScreenStyles.modalContent}>
              <TouchableOpacity onPress={closeModal} style={HistoryScreenStyles.closeButton}>
                <Text style={HistoryScreenStyles.closeButtonText}>Đóng</Text>
              </TouchableOpacity>
              {selectedImage && (
                <Image source={{ uri: selectedImage }} style={HistoryScreenStyles.fullImage} />
              )}
            </View>
          </View>
        </Modal>
      </View>

      {/* Order Completion Section */}
      <View disabled={isOrderDelivered}>
        <Text
          style={[
            HistoryScreenStyles.button,
            {
              color: isOrderDelivered ? '#389e0d' : '#389e0d',
              backgroundColor: isOrderDelivered ? '#f0f0f0' : '#f6ffed',
              borderColor: isOrderDelivered ? '#b7eb8f' : '#b7eb8f',
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
          {isOrderDelivered ? 'Xác nhận đơn hàng' : 'Đã hoàn thành'}
        </Text>
      </View>
    </View>
  );
};

export default HistoryScreen;
