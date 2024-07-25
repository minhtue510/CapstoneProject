import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Avatar from '../../assets/images/avatar.png';
import MenuScreenStyles from './MenuScreenStyles';
import bell from '../../assets/icons/bell.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MenuScreen = ({ route }) => {
    const navigation = useNavigation();
    const [fullName, setFullName] = useState('');
    const [notificationCount, setNotificationCount] = useState(0);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const loginInfo = await AsyncStorage.getItem('loginInfo');
                if (loginInfo) {
                    const userInfo = JSON.parse(loginInfo);
                    setFullName(userInfo.fullName);
                } else {
                    console.error('Thông tin đăng nhập không tồn tại trong AsyncStorage.');
                }
            } catch (error) {
                console.error('Đã xảy ra lỗi khi lấy thông tin người dùng từ AsyncStorage:', error);
            }
        };

        fetchUserInfo();
    }, []);

    useEffect(() => {
        const fetchNotificationCount = async () => {
            try {
                const count = await AsyncStorage.getItem('notificationCount');
                if (count) {
                    setNotificationCount(parseInt(count, 10));
                } else {
                    setNotificationCount(0); // Set to 0 if no count exists
                }
            } catch (error) {
                console.error('Đã xảy ra lỗi khi lấy số lượng thông báo:', error);
            }
        };

        fetchNotificationCount();
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: null,
            headerStyle: MenuScreenStyles.headerStyle,
            headerTitleAlign: 'center',
            title: 'Trang chủ ',
        });
    }, [navigation]);

    const markNotificationsAsRead = async () => {
        try {
            const newCount = Math.max(notificationCount - 1, 0);
            await AsyncStorage.setItem('notificationCount', newCount.toString());
            setNotificationCount(newCount);
        } catch (error) {
            console.error('Đã xảy ra lỗi khi cập nhật số lượng thông báo:', error);
        }
    };

    const handleNavigateToNotifications = async () => {
        await markNotificationsAsRead();  // Ensure async operation completes
        navigation.navigate('Notification', { screen: 'Notification' });
    };

    return (
        <View style={MenuScreenStyles.container}>
            <View style={MenuScreenStyles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Profile', { screen: 'Profile' })}>
                    <Image source={Avatar} style={MenuScreenStyles.avatar} />
                </TouchableOpacity>
                <Text style={MenuScreenStyles.fullName}>{fullName}</Text>
                <TouchableOpacity onPress={handleNavigateToNotifications}>
                    <Image source={bell} style={MenuScreenStyles.noti} />
                    {notificationCount > 0 && (
                        <View style={MenuScreenStyles.notificationBadge}>
                            <Text style={MenuScreenStyles.notificationBadgeText}>{notificationCount}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>
            <View style={MenuScreenStyles.row}>
                <TouchableOpacity style={MenuScreenStyles.box} onPress={() => navigation.navigate('Home', { screen: 'Home' })}>
                    <Text style={MenuScreenStyles.boxText}>Đơn hàng hôm nay</Text>
                </TouchableOpacity>
                <TouchableOpacity style={MenuScreenStyles.box} onPress={() => navigation.navigate('Order', { screen: 'Order' })}>
                    <Text style={MenuScreenStyles.boxText}>Lịch sử</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default MenuScreen;
