import React, { useEffect, useState, useMemo, useCallback, useLayoutEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, RefreshControl, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FindScreenStyles from '../find/FindScreenStyles';
import { getHistory } from '../../api/order';
import back from '../../assets/icons/back.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import parcelIcon from '../../assets/icons/parcel.png';

const FindScreen = () => {
  const navigation = useNavigation();
  const [trip, setTrip] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const loginInfoString = await AsyncStorage.getItem('loginInfo');
      if (loginInfoString !== null) {
        const loginInfo = JSON.parse(loginInfoString);
        const historyData = await getHistory(loginInfo.idByRole);
        setTrip(historyData);
      } else {
        console.log('Không có thông tin');
      }
    } catch (error) {
      console.error('Lỗi khi lấy thông tin:', error);
    } finally {
      setIsRefreshing(false);
    }
  }, []);
  const handleOrderPress = async (tripId) => {
    try {
      navigation.navigate('HistoryScreen', { orderTripId: tripId });
    } catch (error) {
      console.error('Lỗi khi chuyển trang chi tiết đơn hàng:', error);
    }
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Menu')} style={FindScreenStyles.backButton}>
          <Image source={back} style={FindScreenStyles.backIcon} />
        </TouchableOpacity>
      ),
      headerStyle: FindScreenStyles.headerStyle,
      headerTitleAlign: 'center',
      title: 'Lịch sử',
    });
  }, [navigation]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredAndSortedData = useMemo(() => {
    if (!Array.isArray(trip) || trip.length === 0) {
      return [];
    }

    // Lọc các chuyến đi có statusTrip là 4
    const filtered = trip.filter((item) => item.statusTrip === 4);

    // Lọc dựa trên từ khóa tìm kiếm
    const searchFiltered = filtered.filter((item) =>
      item.tripId.toString().includes(searchQuery) || 
      item.orderTripId.some((id) => id.toString().includes(searchQuery))
    );

    // Sắp xếp từ mới nhất đến cũ nhất (theo tripId)
    const sorted = searchFiltered.sort((a, b) => b.tripId - a.tripId);

    return sorted.map((item) => ({
      orderTripId: Array.isArray(item.orderTripId) ? item.orderTripId : [],
      tripId: item.tripId,
      locationDetailDelivery: item.locationDetailDelivery[0],
      cityDelivery: item.cityDelivery[0],
      provinceDelivery: item.provinceDelivery[0],
      locationDetailGet: item.locationDetailGet[0],
      cityGet: item.cityGet[0],
      provinceGet: item.provinceGet[0],
      tripType: item.tripType,
      statusTrip: item.statusTrip,
      licensePlate: item.licensePlate
    }));
  }, [trip, searchQuery]);

  const renderItem = ({ item }) => (
    <View key={item.tripId} style={FindScreenStyles.tripContainer}>
      <View style={FindScreenStyles.tripInfoContainer}>
        <Text style={FindScreenStyles.tripId}>Mã chuyến đi: {item.tripId}</Text>
        <Text style={FindScreenStyles.licensePlate}>Xe: {item.licensePlate}</Text>
      </View>
      {Array.isArray(item.orderTripId) && item.orderTripId.map((e) => (
        <TouchableOpacity key={e} onPress={() => handleOrderPress(e)}>
          <View style={FindScreenStyles.orderContainer}>
            <Text style={FindScreenStyles.orderIDContainer}>Mã gói hàng: {e}</Text>
            <Text style={FindScreenStyles.detail}>Xem chi tiết</Text>
          </View>
        </TouchableOpacity>
      ))}
      <View style={FindScreenStyles.buttonContainer}>
        <Text
          style={[FindScreenStyles.tripType, {
            color: '#d4380d',
            backgroundColor: '#fff2e8',
            borderColor: '#ffbb96',
            borderWidth: 1,
          }]}
        >
          {item.tripType === 1 ? 'Lấy hàng' : 'Giao hàng'}
        </Text>
        <TouchableOpacity
          onPress={() => {
            if (item.statusTrip !== 4) {
              handleStartTrip(item.tripId);
            }
          }}
          disabled={item.statusTrip === 4}
          style={[
            FindScreenStyles.tripType,
            {
              backgroundColor: item.statusTrip === 4 ? '#f6ffed' : '#f6ffed',
              color: '#389e0d',
              borderColor: '#b7eb8f',
              borderWidth: 1,
            }
          ]}
        >
          <Text style={FindScreenStyles.buttonText}>
            {item.statusTrip === 4 ? 'Đã hoàn thành' : 'Bắt đầu đơn hàng'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={FindScreenStyles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      {!filteredAndSortedData.length ? (
        <View style={FindScreenStyles.noOrdersContainer}>
          <Image source={parcelIcon} style={FindScreenStyles.parcelIcon} />
          <Text style={FindScreenStyles.noOrdersText}>Không có lịch sử đơn hàng</Text>
        </View>
      ) : (
        <FlatList
          data={filteredAndSortedData}
          renderItem={renderItem}
          keyExtractor={(item) => item.tripId.toString()}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={fetchData}
            />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#d9d9d9',
  },
  searchInput: {
    height: 40,
    borderColor: '#d9d9d9',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
});

export default FindScreen;
