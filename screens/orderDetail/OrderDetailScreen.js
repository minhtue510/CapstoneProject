// import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Alert,
//   StyleSheet,
//   Image,
//   Modal,
// } from "react-native";
// import OrderDetailScreenStyles from "./OrderDetailScreenStyles"; // Import styles
// import { completeOderTrip, getItemOderTrip } from "../../api/order";
// import back from "../../assets/icons/back.png";
// import { useNavigation } from "@react-navigation/native";
// import * as ImagePicker from "expo-image-picker";
// import { uploadEvidence } from "../../api/evidence";

// const OrderDetailScreen = ({ route }) => {
//   const cameraRef = useRef();
//   const navigation = useNavigation();
//   const { orderTripId } = route.params;
//   const [orderInfo, setOrderInfo] = useState([]);
//   const [isOrderDelivered, setIsOrderDelivered] = useState(false);
//   const [image, setImage] = useState(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   const openModal = () => setIsModalVisible(true);
//   const closeModal = () => setIsModalVisible(false);

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       headerLeft: () => (
//         <TouchableOpacity
//           onPress={() => navigation.navigate("Home")}
//           style={OrderDetailScreenStyles.backButton}
//         >
//           <Image source={back} style={OrderDetailScreenStyles.backIcon} />
//         </TouchableOpacity>
//       ),
//       headerStyle: OrderDetailScreenStyles.headerStyle,
//       headerTitleAlign: "center", // Center align the title
//       title: "Chi tiết đơn hàng ",
//     });
//   }, [navigation]);

//   const handleCamera = () => {
//     navigation.navigate("Camera");
//   };

//   const pickImage = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: false,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//       console.log("Selected Image URI:", result.assets[0].uri);
//     }
//   };

//   useEffect(() => {
//     const fetchOrderInfo = async () => {
//       try {
//         const itemOrderInfo = await getItemOderTrip(orderTripId);
//         console.log("Order Info:", itemOrderInfo);
//         setOrderInfo(itemOrderInfo);
//         setIsOrderDelivered(
//           itemOrderInfo?.itemOrderTripResponse[0]?.orderTrip?.status === 4
//         );
//       } catch (error) {
//         console.error("Error fetching order info:", error);
//         Alert.alert(
//           "Lỗi",
//           "Không thể lấy thông tin đơn hàng. Vui lòng thử lại sau."
//         );
//       }
//     };

//     fetchOrderInfo();
//   }, [orderTripId]);

//   const changeOrderStatus = async () => {
//     if (!image) {
//       Alert.alert(
//         "Thông báo",
//         "Vui lòng chọn hoặc chụp ảnh trước khi hoàn thành đơn hàng."
//       );
//       return;
//     }

//     try {
//       Alert.alert(
//         "Xác nhận",
//         "Bạn có chắc chắn muốn xác nhận đơn hàng?",
//         [
//           {
//             text: "Hủy",
//             style: "cancel",
//           },
//           {
//             text: "Đồng ý",
//             onPress: async () => {
//               try {
//                 // Xác nhận đơn hàng
//                 await completeOderTrip(orderTripId);

//                 // Lấy thông tin đơn hàng cập nhật
//                 const updatedOrderInfo = await getItemOderTrip(orderTripId);
//                 console.log("Updated Order Info:", updatedOrderInfo); // Check updated data

//                 // Cập nhật trạng thái và thông tin đơn hàng
//                 setOrderInfo(updatedOrderInfo);
//                 setIsOrderDelivered(
//                   updatedOrderInfo?.itemOrderTripResponse[0]?.orderTrip
//                     ?.status === 4
//                 );

//                 // Thông báo hoàn thành
//                 if (
//                   updatedOrderInfo?.itemOrderTripResponse[0]?.orderTrip
//                     ?.status !== 4
//                 ) {
//                   Alert.alert("Thông báo", "Đơn hàng đã được xác nhận");

//                   // Tải lên bằng chứng nếu có
//                   if (image) {
//                     await uploadEvidence(orderTripId, image);
//                     console.log("Uploaded Image URI:", image);
//                   }
//                 }
//               } catch (error) {
//                 console.error("Error fetching updated order info:", error);
//                 Alert.alert(
//                   "Lỗi",
//                   "Không thể cập nhật thông tin đơn hàng. Vui lòng thử lại sau."
//                 );
//               }
//             },
//           },
//         ],
//         { cancelable: true }
//       );
//     } catch (error) {
//       console.error("Error completing order:", error);
//       Alert.alert("Lỗi", "Đã xảy ra lỗi khi xác nhận đơn hàng.");
//     }
//   };

//   return (
//     <View style={OrderDetailScreenStyles.container}>
//       <View style={OrderDetailScreenStyles.section}>
//         <Text style={OrderDetailScreenStyles.sectionTitle}>
//           Thông tin đơn hàng
//         </Text>
//         {orderInfo.itemOrderTripResponse &&
//           orderInfo.itemOrderTripResponse.map((e, index) => (
//             <View style={OrderDetailScreenStyles.section} key={index}>
//               <Text style={OrderDetailScreenStyles.sectionText}>
//                 Mã chuyến đi: {e?.orderTrip?.tripId}
//               </Text>
//               <Text style={OrderDetailScreenStyles.sectionText}>
//                 Mã gói hàng: {e?.orderTrip?.orderTripId}
//               </Text>
//               {e.orderTrip?.type === 1 ? (
//                 <>
//                   <Text style={OrderDetailScreenStyles.sectionText}>
//                     Tên người nhận: {orderInfo.orderLocation?.getBy}
//                   </Text>
//                   <Text style={OrderDetailScreenStyles.sectionText}>
//                     Số điện thoại người gửi: {orderInfo.orderLocation?.getPhone}
//                   </Text>
//                   <Text style={OrderDetailScreenStyles.sectionText}>
//                     Địa chỉ nhận: {orderInfo.orderLocation?.addressGet},{" "}
//                     {orderInfo.orderLocation?.cityGet},{" "}
//                     {orderInfo.orderLocation?.provinceGet}
//                   </Text>
//                 </>
//               ) : (
//                 <>
//                   <Text style={OrderDetailScreenStyles.sectionText}>
//                     Tên người nhận: {orderInfo.orderLocation?.deliveryTo}
//                   </Text>
//                   <Text style={OrderDetailScreenStyles.sectionText}>
//                     Số điện thoại người nhận:{" "}
//                     {orderInfo.orderLocation?.deliveryPhone}
//                   </Text>
//                   <Text style={OrderDetailScreenStyles.sectionText}>
//                     Địa chỉ giao: {orderInfo.orderLocation?.addressDelivery},{" "}
//                     {orderInfo.orderLocation?.cityDelivery},{" "}
//                     {orderInfo.orderLocation?.provinceDelivery}
//                   </Text>
//                 </>
//               )}
//               <TouchableOpacity
//                 onPress={() =>
//                   navigation.navigate("MapScreen", {
//                     getLongitude: orderInfo.orderLocation.longtitudeGet,
//                     getLatitude: orderInfo.orderLocation.lattitudeGet,
//                     deliveryLongitude:
//                       orderInfo.orderLocation.longtitudeDelivery,
//                     deliveryLatitude: orderInfo.orderLocation.lattitudeDelivery,
//                     addressGet: orderInfo.orderLocation?.addressGet,
//                     provinceGet: orderInfo.orderLocation?.provinceGet,
//                     cityGet: orderInfo.orderLocation?.cityGet,
//                     provinceDelivery: orderInfo.orderLocation?.provinceDelivery,
//                     cityDelivery: orderInfo.orderLocation?.cityDelivery,
//                     addressDelivery: orderInfo.orderLocation?.addressDelivery,
//                     orderType: e.orderTrip?.type, // Truyền loại đơn hàng vào MapScreen
//                   })
//                 }
//               >
//                 <Text>Xem bản đồ</Text>
//               </TouchableOpacity>
//             </View>
//           ))}
//       </View>
//       <View style={OrderDetailScreenStyles.section}>
//         <Text style={OrderDetailScreenStyles.sectionTitle}>
//           Chi tiết đơn hàng
//         </Text>
//         {orderInfo.itemOrderTripResponse &&
//           orderInfo.itemOrderTripResponse.map((e, index) => (
//             <View style={OrderDetailScreenStyles.listItemContainer} key={index}>
//               <Text style={OrderDetailScreenStyles.itemName}>
//                 Mã hàng hóa: {e.itemId}
//               </Text>
//               <Text style={OrderDetailScreenStyles.itemName}>
//                 Tên hàng hóa: {e?.item.itemName}
//               </Text>
//               <View style={OrderDetailScreenStyles.itemContainer}>
//                 <Text style={OrderDetailScreenStyles.itemDescription}>
//                   Mô tả: {e?.item.description}
//                 </Text>
//               </View>
//               <Text style={OrderDetailScreenStyles.itemQuantity}>
//                 Số lượng: {e?.item.quantityItem}
//               </Text>
//             </View>
//           ))}
//       </View>

//       <View style={OrderDetailScreenStyles.containerIcon}>
//         {!isOrderDelivered &&
//           orderInfo.itemOrderTripResponse?.orderTrip?.status !== 4 && (
//             <TouchableOpacity
//               onPress={handleCamera}
//               style={OrderDetailScreenStyles.buttonTakePicture}
//             >
//               <Image
//                 source={require("../../assets/icons/camera.png")}
//                 style={OrderDetailScreenStyles.iconCamera}
//               />
//             </TouchableOpacity>
//           )}
//         <TouchableOpacity
//           onPress={pickImage}
//           style={OrderDetailScreenStyles.buttonChooseImage}
//         >
//           <Image
//             source={require("../../assets/icons/image.png")}
//             style={OrderDetailScreenStyles.iconImage}
//           />
//         </TouchableOpacity>
//         {image && (
//           <TouchableOpacity onPress={openModal}>
//             <Image
//               source={{ uri: image }}
//               style={OrderDetailScreenStyles.image}
//             />
//           </TouchableOpacity>
//         )}
//       </View>

//       <TouchableOpacity
//         onPress={changeOrderStatus}
//         disabled={
//           isOrderDelivered ||
//           orderInfo.itemOrderTripResponse?.orderTrip?.status === 4
//         }
//       >
//         <Text
//           style={[
//             OrderDetailScreenStyles.button,
//             {
//               color: isOrderDelivered ? "#b7b7b7" : "#389e0d",
//               backgroundColor: isOrderDelivered ? "#e6e6e6" : "#f6ffed",
//               borderColor: isOrderDelivered ? "#d9d9d9" : "#b7eb8f",
//               borderWidth: 1,
//               fontSize: 18,
//               padding: 10,
//               borderRadius: 5,
//               textAlign: "center",
//               marginTop: 10,
//               width: "100%",
//             },
//           ]}
//         >
//           {isOrderDelivered ? "Đã hoàn thành" : "Hoàn thành đơn hàng"}
//         </Text>
//       </TouchableOpacity>

//       <Modal
//         visible={isModalVisible}
//         onRequestClose={closeModal}
//         transparent={true}
//         animationType="slide"
//       >
//         <View style={styles.modalContainer}>
//           <Image source={{ uri: image }} style={styles.modalImage} />
//           <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
//             <Text style={styles.closeButtonText}>Đóng</Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0,0,0,0.5)",
//   },
//   modalImage: {
//     width: "90%",
//     height: "80%",
//     resizeMode: "contain",
//   },
//   closeButton: {
//     marginTop: 20,
//     backgroundColor: "#007bff",
//     padding: 10,
//     borderRadius: 5,
//   },
//   closeButtonText: {
//     color: "#fff",
//     fontSize: 16,
//   },
// });

// export default OrderDetailScreen;

import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
  Modal,
} from "react-native";
import OrderDetailScreenStyles from "./OrderDetailScreenStyles"; // Import styles
import { completeOderTrip, getItemOderTrip } from "../../api/order";
import back from "../../assets/icons/back.png";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { uploadEvidence } from "../../api/evidence";

const OrderDetailScreen = ({ route }) => {
  const cameraRef = useRef();
  const navigation = useNavigation();
  const { orderTripId } = route.params;
  const [orderInfo, setOrderInfo] = useState([]);
  const [isOrderDelivered, setIsOrderDelivered] = useState(false);
  const [image, setImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={OrderDetailScreenStyles.backButton}
        >
          <Image source={back} style={OrderDetailScreenStyles.backIcon} />
        </TouchableOpacity>
      ),
      headerStyle: OrderDetailScreenStyles.headerStyle,
      headerTitleAlign: "center", // Center align the title
      title: "Chi tiết đơn hàng ",
    });
  }, [navigation]);

  const handleCamera = () => {
    navigation.navigate("Camera");
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      console.log("Selected Image URI:", result.assets[0].uri);
    }
  };

  useEffect(() => {
    const fetchOrderInfo = async () => {
      try {
        const itemOrderInfo = await getItemOderTrip(orderTripId);
        console.log("Order Info:", itemOrderInfo);
        setOrderInfo(itemOrderInfo);
        setIsOrderDelivered(
          itemOrderInfo?.itemOrderTripResponse[0]?.orderTrip?.status === 4
        );
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

  const changeOrderStatus = async () => {
    if (!image) {
      Alert.alert(
        "Thông báo",
        "Vui lòng chọn hoặc chụp ảnh trước khi hoàn thành đơn hàng."
      );
      return;
    }

    try {
      Alert.alert(
        "Xác nhận",
        "Bạn có chắc chắn muốn xác nhận đơn hàng?",
        [
          {
            text: "Hủy",
            style: "cancel",
          },
          {
            text: "Đồng ý",
            onPress: async () => {
              try {
                // Tải lên bằng chứng nếu có
                const response = await uploadEvidence(orderTripId, image);
                console.log(response);
                console.log("Uploaded Image URI:", image);
                // Xác nhận đơn hàng
                await completeOderTrip(orderTripId);
                // Thông báo hoàn thành
                Alert.alert("Thông báo", "Đã giao thành công");
                // Lấy thông tin đơn hàng cập nhật
                const updatedOrderInfo = await getItemOderTrip(orderTripId);
                console.log("Updated Order Info:", updatedOrderInfo); // Check updated data

                // Cập nhật trạng thái và thông tin đơn hàng
                setOrderInfo(updatedOrderInfo);
                setIsOrderDelivered(
                  updatedOrderInfo?.itemOrderTripResponse[0]?.orderTrip
                    ?.status === 4
                );
              } catch (error) {
                console.error("Error fetching updated order info:", error);
                Alert.alert(
                  "Lỗi",
                  "Không thể cập nhật thông tin đơn hàng. Vui lòng thử lại sau."
                );
              }
            },
          },
        ],
        { cancelable: true }
      );
    } catch (error) {
      console.error("Error completing order:", error);
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi xác nhận đơn hàng.");
    }
  };

  return (
    <View style={OrderDetailScreenStyles.container}>
      <View style={OrderDetailScreenStyles.section}>
        <Text style={OrderDetailScreenStyles.sectionTitle}>
          Thông tin đơn hàng
        </Text>
        {orderInfo.itemOrderTripResponse &&
          orderInfo.itemOrderTripResponse.map((e, index) => (
            <View style={OrderDetailScreenStyles.section} key={index}>
              {/* <Text style={OrderDetailScreenStyles.sectionText}>
                Mã chuyến đi: {e?.orderTrip?.tripId}
              </Text> */}
              <Text style={OrderDetailScreenStyles.sectionText}>
                Mã gói hàng: {e?.orderTrip?.orderTripId}
              </Text>
              {e.orderTrip?.type === 1 ? (
                <>
                  <Text style={OrderDetailScreenStyles.sectionText}>
                    Tên người nhận: {orderInfo.orderLocation?.getBy}
                  </Text>
                  <Text style={OrderDetailScreenStyles.sectionText}>
                    Số điện thoại: {orderInfo.orderLocation?.getPhone}
                  </Text>
                  <Text style={OrderDetailScreenStyles.sectionText}>
                    Địa chỉ nhận: {orderInfo.orderLocation?.addressGet},
                    {orderInfo.orderLocation?.cityGet === orderInfo.orderLocation?.provinceGet
                      ? orderInfo.orderLocation?.cityGet
                      : `${orderInfo.orderLocation?.cityGet}, ${orderInfo.orderLocation?.provinceGet}`}
                  </Text>
                </>
              ) : (
                <>
                  <Text style={OrderDetailScreenStyles.sectionText}>
                    Tên người nhận: {orderInfo.orderLocation?.deliveryTo}
                  </Text>
                  <Text style={OrderDetailScreenStyles.sectionText}>
                    Số điện thoại người nhận:{" "}
                    {orderInfo.orderLocation?.deliveryPhone}
                  </Text>
                  <Text style={OrderDetailScreenStyles.sectionText}>
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
                    provinceGet: orderInfo.orderLocation?.provinceDelivery,
                    cityGet: orderInfo.orderLocation?.cityDelivery,
                    provinceDelivery: orderInfo.orderLocation?.provinceDelivery,
                    cityDelivery: orderInfo.orderLocation?.cityDelivery,
                    addressDelivery: orderInfo.orderLocation?.addressDelivery,
                    orderType: e.orderTrip?.type, // Truyền loại đơn hàng vào MapScreen
                  })
                }
              >
                <View style={OrderDetailScreenStyles.mapContainer}>
                  <Image
                    source={require("../../assets/icons/map.png")} // Replace with your map icon path
                    style={OrderDetailScreenStyles.mapIcon}
                  />
                  <Text style={OrderDetailScreenStyles.map}>Xem bản đồ</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
      </View>
      <View style={OrderDetailScreenStyles.section}>
        <Text style={OrderDetailScreenStyles.sectionTitle}>
          Chi tiết đơn hàng
        </Text>
        {orderInfo.itemOrderTripResponse &&
          orderInfo.itemOrderTripResponse.map((e, index) => (
            <View style={OrderDetailScreenStyles.listItemContainer} key={index}>
              <Text style={OrderDetailScreenStyles.itemName}>
                Mã hàng hóa: {e.itemId}
              </Text>
              <Text style={OrderDetailScreenStyles.itemName}>
                Tên hàng hóa: {e?.item.itemName}
              </Text>
              <Text style={OrderDetailScreenStyles.itemQuantity}>
                Số lượng: {e?.item.quantityItem}
              </Text>
              <View style={OrderDetailScreenStyles.itemContainer}>
                <Text style={OrderDetailScreenStyles.itemDescription}>
                  Mô tả: {e?.item.description}
                </Text>
              </View>

            </View>
          ))}
      </View>

      {orderInfo.itemOrderTripResponse?.[0]?.orderTrip?.type !== 1 && (
        <View style={OrderDetailScreenStyles.containerIcon}>
          {!isOrderDelivered &&
            orderInfo.itemOrderTripResponse?.orderTrip?.status !== 4 && (
              <TouchableOpacity
                onPress={handleCamera}
                style={OrderDetailScreenStyles.buttonTakePicture}
              >
                <Image
                  source={require("../../assets/icons/camera.png")}
                  style={OrderDetailScreenStyles.iconCamera}
                />
              </TouchableOpacity>
            )}
          <TouchableOpacity
            onPress={pickImage}
            style={OrderDetailScreenStyles.buttonChooseImage}
          >
            <Image
              source={require("../../assets/icons/image.png")}
              style={OrderDetailScreenStyles.iconImage}
            />
          </TouchableOpacity>
          {image && (
            <TouchableOpacity onPress={openModal}>
              <Image
                source={{ uri: image }}
                style={OrderDetailScreenStyles.image}
              />
            </TouchableOpacity>
          )}
        </View>
      )}

      {orderInfo.itemOrderTripResponse?.[0]?.orderTrip?.type !== 1 && (
        <TouchableOpacity
          onPress={changeOrderStatus}
          disabled={
            isOrderDelivered ||
            orderInfo.itemOrderTripResponse?.orderTrip?.status === 4
          }
        >
          <Text
            style={[
              OrderDetailScreenStyles.button,
              {
                color: isOrderDelivered ? "#b7b7b7" : "#389e0d",
                backgroundColor: isOrderDelivered ? "#e6e6e6" : "#f6ffed",
                borderColor: isOrderDelivered ? "#d9d9d9" : "#b7eb8f",
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
            {isOrderDelivered ? "Đã hoàn thành" : "Hoàn thành đơn hàng"}
          </Text>
        </TouchableOpacity>
      )}

      <Modal
        visible={isModalVisible}
        onRequestClose={closeModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <Image source={{ uri: image }} style={styles.modalImage} />
          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
    width: "90%",
    height: "80%",
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

export default OrderDetailScreen;

