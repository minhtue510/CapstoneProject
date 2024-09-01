import React, { useState, useEffect, useLayoutEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal, Alert } from "react-native";
import WaitingDetailScreenStyles from "./WaitingDetailScreenStyles"; // Import styles
import { getItemOderTrip } from "../../api/order";
import back from "../../assets/icons/back.png";
import { useNavigation } from "@react-navigation/native";

const WaitingDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const { orderTripId } = route.params;
  const [orderInfo, setOrderInfo] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={WaitingDetailScreenStyles.backButton}
        >
          <Image source={back} style={WaitingDetailScreenStyles.backIcon} />
        </TouchableOpacity>
      ),
      headerStyle: WaitingDetailScreenStyles.headerStyle,
      headerTitleAlign: "center",
      title: "Chi tiết đơn hàng",
    });
  }, [navigation]);

  useEffect(() => {
    const fetchOrderInfo = async () => {
      try {
        const itemOrderInfo = await getItemOderTrip(orderTripId);
        console.log("Order Info:", itemOrderInfo);
        setOrderInfo(itemOrderInfo);
      } catch (error) {
        console.error("Error fetching order info:", error);
        Alert.alert(
          "Lỗi",
          "Không thể lấy thông tin đơn hàng. Vui lòng thử lại sau."
        );
      }
    };

    fetchOrderInfo();
  }, [orderTripId]);

  const handleImagePress = (imageUri) => {
    setSelectedImage(imageUri);
    setModalVisible(true);
  };

  const closeModal = () => setModalVisible(false);

  return (
    <View style={WaitingDetailScreenStyles.container}>
      <View style={WaitingDetailScreenStyles.section}>
        <Text style={WaitingDetailScreenStyles.sectionTitle}>
          Thông tin đơn hàng
        </Text>
        {orderInfo.itemOrderTripResponse &&
          orderInfo.itemOrderTripResponse.map((e, index) => (
            <View style={WaitingDetailScreenStyles.section} key={index}>
                <Text style={WaitingDetailScreenStyles.sectionText}>
                Mã đơn: {e?.item.orderId}
              </Text>
              <Text style={WaitingDetailScreenStyles.sectionText}>
                Mã gói hàng: {e?.orderTrip?.orderTripId}
              </Text>
              {e.orderTrip?.type === 1 ? (
                <>
                  <Text style={WaitingDetailScreenStyles.sectionText}>
                    Tên người gửi: {orderInfo.orderLocation?.getBy}
                  </Text>
                  <Text style={WaitingDetailScreenStyles.sectionText}>
                    Số điện thoại: {orderInfo.orderLocation?.getPhone}
                  </Text>
                  <Text style={WaitingDetailScreenStyles.sectionText}>
                    Địa chỉ nhận: {orderInfo.orderLocation?.addressGet},
                    {orderInfo.orderLocation?.cityGet === orderInfo.orderLocation?.provinceGet
                      ? orderInfo.orderLocation?.cityGet
                      : `${orderInfo.orderLocation?.cityGet}, ${orderInfo.orderLocation?.provinceGet}`}
                  </Text>
                </>
              ) : (
                <>
                  <Text style={WaitingDetailScreenStyles.sectionText}>
                    Tên người nhận: {orderInfo.orderLocation?.deliveryTo}
                  </Text>
                  <Text style={WaitingDetailScreenStyles.sectionText}>
                    Số điện thoại: {orderInfo.orderLocation?.deliveryPhone}
                  </Text>
                  <Text style={WaitingDetailScreenStyles.sectionText}>
                    Địa chỉ giao: {orderInfo.orderLocation?.addressDelivery},
                    {orderInfo.orderLocation?.cityDelivery === orderInfo.orderLocation?.provinceDelivery
                      ? orderInfo.orderLocation?.cityDelivery
                      : `${orderInfo.orderLocation?.cityDelivery}, ${orderInfo.orderLocation?.provinceDelivery}`}
                  </Text>
                </>
              )}
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("MapScreen", {
                    getLongitude: orderInfo.orderLocation.longtitudeGet,
                    getLatitude: orderInfo.orderLocation.lattitudeGet,
                    deliveryLongitude:
                      orderInfo.orderLocation.longtitudeDelivery,
                    deliveryLatitude: orderInfo.orderLocation.lattitudeDelivery,
                    addressGet: orderInfo.orderLocation?.addressGet,
                    provinceGet: orderInfo.orderLocation?.provinceGet,
                    cityGet: orderInfo.orderLocation?.cityGet,
                    provinceDelivery: orderInfo.orderLocation?.provinceDelivery,
                    cityDelivery: orderInfo.orderLocation?.cityDelivery,
                    addressDelivery: orderInfo.orderLocation?.addressDelivery,
                    orderType: e.orderTrip?.type, // Truyền loại đơn hàng vào MapScreen
                  })
                }
              >
                <View style={WaitingDetailScreenStyles.mapContainer}>
                  <Image
                    source={require("../../assets/icons/map.png")}
                    style={WaitingDetailScreenStyles.mapIcon}
                  />
                  <Text style={WaitingDetailScreenStyles.map}>Xem bản đồ</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
      </View>
      <View style={WaitingDetailScreenStyles.section}>
        <Text style={WaitingDetailScreenStyles.sectionTitle}>
          Chi tiết sản phẩm
        </Text>
        {orderInfo.itemOrderTripResponse &&
          orderInfo.itemOrderTripResponse.map((e, index) => (
            <View style={WaitingDetailScreenStyles.listItemContainer} key={index}>
              <Text style={WaitingDetailScreenStyles.itemName}>
                Mã hàng hóa: {e.itemId}
              </Text>
              <Text style={WaitingDetailScreenStyles.itemName}>
                Tên hàng hóa: {e?.item.itemName}
              </Text>
              <Text style={WaitingDetailScreenStyles.itemName}>
                Kích thước(D x R X C): 
                {/* {e?.item.length * 100} cm x {e?.item.width * 100} cm x {e?.item.height * 100} cm */}
              </Text>
              <Text style={WaitingDetailScreenStyles.itemName}>
                {e?.item.length * 100} cm x {e?.item.width * 100} cm x {e?.item.height * 100} cm
              </Text>
              {/* <Text style={WaitingDetailScreenStyles.itemName}>
                Khối lượng: {e?.item.itemWeight} kg
                {/* {e?.item.length * 100} cm x {e?.item.width * 100} cm x {e?.item.height * 100} cm */}
              {/* </Text> */} 
              {/* <Text style={WaitingDetailScreenStyles.itemName}>
                Trọng lượng: {e?.item.unitWeight} kg
              </Text> */}
              <Text style={WaitingDetailScreenStyles.itemQuantity}>
                Số lượng: {e?.item.quantityOfPackage} kiện
              </Text>
              <View style={WaitingDetailScreenStyles.itemContainer}>
                <Text style={WaitingDetailScreenStyles.itemDescription}>
                  Mô tả: {e?.item.description}
                </Text>
              </View>
              {e?.orderTrip?.evidence && (
                <TouchableOpacity
                  style={WaitingDetailScreenStyles.itemEvidenceContainer}
                  onPress={() => handleImagePress(e?.orderTrip.evidence)}
                >
                  <Image
                    source={{ uri: e?.orderTrip.evidence }}
                    style={WaitingDetailScreenStyles.itemImage}
                  />
                </TouchableOpacity>
              )}
            </View>
          ))}
        <Modal
          visible={modalVisible}
          transparent={true}
          onRequestClose={closeModal}
        >
          <View style={WaitingDetailScreenStyles.modalBackground}>
            <View style={WaitingDetailScreenStyles.modalContainer}>
              <Image
                source={{ uri: selectedImage }}
                style={WaitingDetailScreenStyles.fullImage}
              />
              <TouchableOpacity
                onPress={closeModal}
                style={WaitingDetailScreenStyles.closeButton}
              >
                <Text style={WaitingDetailScreenStyles.closeButtonText}>Đóng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default WaitingDetailScreen;
