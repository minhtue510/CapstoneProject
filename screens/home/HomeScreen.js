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

  const renderNoOrdersComponent = () => (
    <View style={HomeScreenStyles.noOrdersContainer}>
      <Image source={parcelIcon} style={HomeScreenStyles.parcelIcon} />
      <Text style={HomeScreenStyles.noOrdersText}>Bạn không có đơn hàng nào cần giao</Text>
    </View>
  );

  return (
    <View style={HomeScreenStyles.container}>
      {deliveringOrders.length > 0 ? (
        <>
          <Text style={HomeScreenStyles.title}>Đơn hàng đang được giao</Text>
          <FlatList
            data={deliveringOrders}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleOrderPress(item)}>
                <View style={HomeScreenStyles.orderItem}>
                  <View>
                    <Text style={HomeScreenStyles.orderDate}>{`Mã đơn: ${item.orderID}`}</Text>
                    <Text style={HomeScreenStyles.orderDate}>{`Công ty: ${item.companyName}`}</Text>
                    <Text style={HomeScreenStyles.orderDate}>{`Địa chỉ lấy: ${item.locationDetailGet}`}</Text>
                    <Text style={HomeScreenStyles.orderDate}>{`Địa chỉ giao: ${item.locationDetailDelivery}`}</Text>
                  </View>
                  <Image source={item.status === 'delivering' ? deliveringIcon : successIcon} style={HomeScreenStyles.statusIcon} />
                </View>
              </TouchableOpacity>
            )}
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
