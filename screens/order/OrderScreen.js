import React, { useEffect, useState, useMemo, useCallback, useLayoutEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, RefreshControl, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import OrderScreenStyles from '../order/OrderScreenStyles';
import { getHistory } from '../../api/order';
import back from '../../assets/icons/back.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import parcelIcon from '../../assets/icons/parcel.png';

// Định nghĩa component OrderScreen
const OrderScreen = () => {
  const navigation = useNavigation();
  const [trip, setTrip] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState(''); // Thêm trạng thái tìm kiếm

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${hours}:${minutes}, ${day}/${month}/${year}`;
  };

  const handleOrderPress = async (tripId) => {
    try {
      navigation.navigate('HistoryScreen', { orderTripId: tripId });
    } catch (error) {
      console.error('Lỗi khi chuyển trang chi tiết đơn hàng:', error);
    }
  };

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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Menu')} style={OrderScreenStyles.backButton}>
          <Image source={back} style={OrderScreenStyles.backIcon} />
        </TouchableOpacity>
      ),
      headerStyle: OrderScreenStyles.headerStyle,
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
  
    // Áp dụng bộ lọc cho "Lấy hàng" và "Giao hàng"
    const filteredByType = filtered.filter((item) => {
      if (filter === 'all') return true;
      if (filter === 'pickup') return item.tripType === 1;
      if (filter === 'delivery') return item.tripType === 2;
      return true;
    });

    // Áp dụng tìm kiếm
    const searched = filteredByType.filter((item) => {
      const query = searchQuery.toLowerCase();
      return (
        item.tripId.toString().includes(query) ||
        (item.orderTripId && item.orderTripId.some(orderId => orderId.toString().includes(query))) ||
        (item.licensePlate && item.licensePlate.toLowerCase().includes(query))
      );
    });

    // Sắp xếp từ mới nhất đến cũ nhất (theo tripId)
    const sorted = searched.sort((a, b) => b.tripId - a.tripId);
  
    return sorted.map((item) => {
      const orderTripDayCompleteMap = item.orderTripId.reduce((acc, orderTripId, index) => {
        acc[orderTripId] = item.dayComplete[index] || 'Chưa có thông tin';
        return acc;
      }, {});

      const dayComplete = Array.isArray(item.dayComplete) 
        ? item.dayComplete.length > 0 
          ? item.dayComplete.sort((a, b) => new Date(b) - new Date(a))[0]
          : 'Chưa có thông tin'
        : item.dayComplete || 'Chưa có thông tin';

      return {
        orderTripId: Array.isArray(item.orderTripId) ? item.orderTripId : [],
        tripId: item.tripId,
        locationDetailDelivery: item.locationDetailDelivery ? item.locationDetailDelivery[0] : 'Không có thông tin',
        cityDelivery: item.cityDelivery ? item.cityDelivery[0] : 'Không có thông tin',
        provinceDelivery: item.provinceDelivery ? item.provinceDelivery[0] : 'Không có thông tin',
        locationDetailGet: item.locationDetailGet ? item.locationDetailGet[0] : 'Không có thông tin',
        cityGet: item.cityGet ? item.cityGet[0] : 'Không có thông tin',
        provinceGet: item.provinceGet ? item.provinceGet[0] : 'Không có thông tin',
        tripType: item.tripType,
        statusTrip: item.statusTrip,
        licensePlate: item.licensePlate,
        dayComplete: dayComplete,
        orderTripDayCompleteMap,
      };
    });
  }, [trip, filter, searchQuery]);
  
  const renderItem = ({ item }) => (
    <View key={item.tripId} style={OrderScreenStyles.tripContainer}>
      <View style={OrderScreenStyles.tripInfoContainer}>
        <Text style={OrderScreenStyles.tripId}>Mã chuyến đi: {item.tripId}</Text>
        <Text style={OrderScreenStyles.licensePlate}>Xe: {item.licensePlate}</Text>
      </View>
      {item.dayComplete ? (
      <Text style={OrderScreenStyles.dayComplete}>
        Thời gian hoàn thành: {formatDate(item.dayComplete)}
      </Text>
      ) : null}
      {Array.isArray(item.orderTripId) && item.orderTripId.map((orderTripId) => {
        const orderTripDayComplete = item.orderTripDayCompleteMap[orderTripId] || 'Chưa có thông tin';

        return (
          <TouchableOpacity key={orderTripId} onPress={() => handleOrderPress(orderTripId)}>
            <View style={OrderScreenStyles.orderContainer}>
              <Text style={OrderScreenStyles.orderIDContainer}>Mã gói hàng: {orderTripId}</Text>
              <Text style={OrderScreenStyles.detail}>Xem chi tiết</Text>
            </View>
          </TouchableOpacity>
        );
      })}
      <View style={OrderScreenStyles.buttonContainer}>
        <Text
          style={[OrderScreenStyles.tripType, {
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
            OrderScreenStyles.tripType,
            {
              backgroundColor: item.statusTrip === 4 ? '#f6ffed' : '#f6ffed',
              color: '#389e0d',
              borderColor: '#b7eb8f',
              borderWidth: 1,
            }
          ]}
        >
          <Text style={OrderScreenStyles.buttonText}>
            {item.statusTrip === 4 ? 'Đã hoàn thành' : 'Bắt đầu đơn hàng'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={OrderScreenStyles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          onPress={() => setFilter('all')}
          style={[
            styles.filterButton,
            filter === 'all' && styles.activeFilterButton,
          ]}
        >
          <Text style={[styles.filterButtonText, filter === 'all' && styles.activeFilterButtonText]}>Tất cả</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFilter('pickup')}
          style={[
            styles.filterButton,
            filter === 'pickup' && styles.activeFilterButton,
          ]}
        >
          <Text style={[styles.filterButtonText, filter === 'pickup' && styles.activeFilterButtonText]}>Lấy hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFilter('delivery')}
          style={[
            styles.filterButton,
            filter === 'delivery' && styles.activeFilterButton,
          ]}
        >
          <Text style={[styles.filterButtonText, filter === 'delivery' && styles.activeFilterButtonText]}>Giao hàng</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredAndSortedData}
        renderItem={renderItem}
        keyExtractor={(item) => item.tripId.toString()}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={fetchData} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    marginBottom: 15,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#d9d9d9',
  },
  activeFilterButton: {
    backgroundColor: '#1890ff',
    borderColor: '#1890ff',
  },
  filterText: {
    color: '#fff',
  },
  inactiveFilterText: {
    color: '#000',
  },
});

export default OrderScreen;


// keytool -genkeypair -v -storetype PKCS12 -keystore capstone.keystore -alias capstone -keyalg RSA -keysize 2048 -validity 10000