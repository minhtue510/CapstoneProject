import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
const MapScreen = ({ route }) => {
  const {
    getLongitude,
    getLatitude,
    deliveryLongitude,
    deliveryLatitude,
    addressGet,
    cityGet,
    provinceGet,
    provinceDelivery,
    cityDelivery,
    addressDelivery,
    orderType // Nhận loại đơn hàng từ route.params
  } = route.params;

  // Kho mặc định
  const warehouse = {
    latitude: 10.841306724256917,
    longitude: 106.81011902985585,
    address: 'Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Hồ Chí Minh',
  };

  // Vùng ban đầu của bản đồ
  const INITIAL_REGION = {
    latitude: 10.841306724256917,
    longitude: 106.71011902985585,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
        showsUserLocation
        showsMyLocationButton
      >
        {/* Marker cho điểm nhận */}
        {orderType === 1 && (getLatitude && getLongitude) && (
          <Marker
            coordinate={{ latitude: getLatitude, longitude: getLongitude }}
            title="Điểm nhận"
            description={`${addressGet}, ${provinceGet}, ${cityGet}`}
            pinColor="red"
          />
        )}

        {/* Marker cho điểm giao */}
        {orderType === 2 && (deliveryLatitude && deliveryLongitude) && (
          <Marker
            coordinate={{ latitude: deliveryLatitude, longitude: deliveryLongitude }}
            title="Điểm giao"
            description={`${addressDelivery}, ${provinceDelivery}, ${cityDelivery}`}
            pinColor="red"
          />
        )}

        {/* Marker cho kho */}
        <Marker
          coordinate={{ latitude: warehouse.latitude, longitude: warehouse.longitude }}
          title="Kho"
          description={warehouse.address}
          pinColor="blue"
        />
      
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;
