import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, Image, RefreshControl } from 'react-native';
import StatisticScreenStyles from './StatisticScreenStyles';
import { getHistory } from '../../api/order';
import back from '../../assets/icons/back.png';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StatisticScreen = () => {
    const navigation = useNavigation();
    const [driverTrips, setDriverTrips] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const fetchDriverTrips = async () => {
        try {
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
        fetchDriverTrips();
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchDriverTrips().then(() => setRefreshing(false));
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.navigate('Menu')} style={StatisticScreenStyles.backButton}>
                    <Image source={back} style={StatisticScreenStyles.backIcon} />
                </TouchableOpacity>
            ),
            headerStyle: StatisticScreenStyles.headerStyle,
            headerTitleAlign: 'center',
            title: 'Thống kê',
        });
    }, [navigation]);

    const totalDeliveredOrders = driverTrips.filter(trip => trip.statusTrip === 4).length;
    const totalPickupOrders = driverTrips.filter(trip => trip.statusTrip === 4 && trip.tripType === 1).length;
    const totalDeliveryOrders = driverTrips.filter(trip => trip.statusTrip === 4 && trip.tripType === 2).length;
    const totalFailedOrders = driverTrips.filter(trip => trip.statusTrip === 5).length;
    const totalDeliveredPackages = driverTrips.reduce((sum, trip) => {
        if (trip.statusTrip === 4) {
            return sum + trip.orderTripStatus.filter(status => status === 4).length;
        }
        return sum;
    }, 0);

    return (
        <View style={StatisticScreenStyles.container}>
            <View style={StatisticScreenStyles.section}>
                <Text style={StatisticScreenStyles.sectionTitle}>Tổng số chuyến thành công</Text>
                <Text style={StatisticScreenStyles.totalCount}>{totalDeliveredOrders}</Text>
            </View>

            <View style={StatisticScreenStyles.section}>
                <Text style={StatisticScreenStyles.sectionTitle}>Tổng đơn lấy</Text>
                <Text style={StatisticScreenStyles.totalCount}>{totalPickupOrders}</Text>
            </View>

            <View style={StatisticScreenStyles.section}>
                <Text style={StatisticScreenStyles.sectionTitle}>Tổng đơn giao</Text>
                <Text style={StatisticScreenStyles.totalCount}>{totalDeliveryOrders}</Text>
            </View>

            <View style={StatisticScreenStyles.section}>
                <Text style={StatisticScreenStyles.sectionTitle}>Tổng số gói hàng đã giao thành công</Text>
                <Text style={StatisticScreenStyles.totalCount}>{totalDeliveredPackages}</Text>
            </View>

            <View style={StatisticScreenStyles.section}>
                <Text style={StatisticScreenStyles.sectionTitle}>Số đơn vận chuyển thất bại</Text>
                <Text style={StatisticScreenStyles.totalFailCount}>{totalFailedOrders}</Text>
            </View>
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        </View>
    );
};

export default StatisticScreen;
