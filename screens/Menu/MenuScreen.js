import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, RefreshControl } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Avatar from '../../assets/images/avatar.png';
import MenuScreenStyles from './MenuScreenStyles';
import bell from '../../assets/icons/bell.png';
import complete from '../../assets/icons/complete.png';
import delivering from '../../assets/icons/delivering.png';
import waiting from '../../assets/icons/waiting.png';
import statis from '../../assets/icons/statis.png';
import find from '../../assets/icons/find.png';
import chat from '../../assets/icons/chat.png';
import { getOrderTripOfIdleDriverId } from '../../api/order';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MenuScreen = () => {
    const navigation = useNavigation();
    const [fullName, setFullName] = useState('');
    const [accountId, setAccountId] = useState('');
    const [avatar, setAvatar] = useState(Avatar);
    const [notificationCount, setNotificationCount] = useState(0);
    const [trip, setTrip] = useState(null);
    const [tripCount, setTripCount] = useState(0);
    const [orderTripCount, setOrderTripCount] = useState(0);
    const [refreshing, setRefreshing] = useState(false);

    // const fetchData = useCallback(async () => {
    //     try {
    //         const loginInfoString = await AsyncStorage.getItem('loginInfo');
    //         if (loginInfoString) {
    //             const loginInfo = JSON.parse(loginInfoString);
    //             const fetchedTrip = await getOrderTripOfIdleDriverId(loginInfo.idByRole, 2);
    //             setTrip(fetchedTrip);

    //             // Tính toán số lượng đơn và số lượng gói hàng
    //             if (fetchedTrip) {
    //                 setTripCount(fetchedTrip.tripId ? 1 : 0);
    //                 setOrderTripCount(fetchedTrip.orderTripId.length);
    //             } else {
    //                 setTripCount(0);
    //                 setOrderTripCount(0);
    //             }
    //         } else {
    //             console.log('Không có thông tin');
    //         }
    //     } catch (error) {
    //         // Xử lý lỗi
    //     } finally {
    //         setRefreshing(false); // Dừng làm mới khi hoàn tất
    //     }
    // }, []);

    const fetchData = useCallback(async () => {
        try {
            const loginInfoString = await AsyncStorage.getItem('loginInfo');
            if (loginInfoString) {
                const loginInfo = JSON.parse(loginInfoString);
                const fetchedTrip = await getOrderTripOfIdleDriverId(loginInfo.idByRole, 2);

                if (fetchedTrip && fetchedTrip.statusTrip === 2) {
                    const isViewed = await AsyncStorage.getItem('notificationViewed');
                    if (isViewed !== 'true') {
                        setNotificationCount(1); // Hiển thị số "1" khi có đơn mới và chưa được xem
                    } else {
                        setNotificationCount(0); // Đã xem thông báo, đặt về 0
                    }
                } else {
                    setNotificationCount(0); // Không có đơn mới hoặc không phải statusTrip 2, đặt về 0
                }
            } else {
                console.log('Không có thông tin');
            }
        } catch (error) {
            // console.error('Lỗi khi lấy dữ liệu:', error);
        } finally {
            setRefreshing(false); // Dừng làm mới khi hoàn tất
        }
    }, []);

    const loadAvatar = useCallback(async () => {
        try {
            const loginInfoString = await AsyncStorage.getItem('loginInfo');
            if (loginInfoString) {
                const loginInfo = JSON.parse(loginInfoString);
                if (loginInfo.image) {
                    setAvatar({ uri: loginInfo.image });
                } else {
                    setAvatar(Avatar);
                }
            } else {
                setAvatar(Avatar);
            }
        } catch (error) {
            console.error('Error loading avatar from AsyncStorage:', error);
            setAvatar(Avatar);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchData();
            loadAvatar();
        }, [fetchData, loadAvatar])
    );


    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const loginInfo = await AsyncStorage.getItem('loginInfo');
                if (loginInfo) {
                    const userInfo = JSON.parse(loginInfo);
                    setFullName(userInfo.fullName);
                    setAccountId(userInfo.accounId);
                    console.log(fullName);
                    console.log(accounId);
                } else {
                    console.error('Thông tin đăng nhập không tồn tại trong AsyncStorage.');
                }
            } catch (error) {
                // Xử lý lỗi
            }
        };

        fetchUserInfo();
    }, []);

    useEffect(() => {
        const fetchNotificationCount = async () => {
            try {
                const notifications = await AsyncStorage.getItem('notifications');
                if (notifications) {
                    const parsedNotifications = JSON.parse(notifications);
                    const unreadNotifications = parsedNotifications.filter(notification => notification.status === 'unread');
                    setNotificationCount(unreadNotifications.length);
                } else {
                    setNotificationCount(0); // Đặt về 0 nếu không có thông báo
                }
            } catch (error) {
                // Xử lý lỗi
            }
        };

        fetchNotificationCount();
    }, []);

    // useEffect(() => {
    //     const fetchUserInfoAndNotification = async () => {
    //         try {
    //             const loginInfoString = await AsyncStorage.getItem('loginInfo');
    //             if (loginInfoString) {
    //                 const loginInfo = JSON.parse(loginInfoString);
    
    //                 // Cập nhật thông tin người dùng
    //                 setFullName(loginInfo.fullName);
    //                 setAccountId(loginInfo.accounId);
    
    //                 // Lấy và kiểm tra thông báo mới
    //                 const fetchedTrip = await getOrderTripOfIdleDriverId(loginInfo.idByRole, 2);
    //                 console.log('Fetched trip:', fetchedTrip);
    
    //                 if (fetchedTrip && fetchedTrip.statusTrip === 2) {
    //                     const isViewed = await AsyncStorage.getItem('notificationViewed');
    //                     console.log('Notification viewed:', isViewed);
    
    //                     if (isViewed !== 'true') {
    //                         setNotificationCount(1); // Hiển thị số "1" khi có đơn mới và chưa được xem
    //                     } else {
    //                         setNotificationCount(0); // Đã xem thông báo, đặt về 0
    //                     }
    //                 } 
    //                 else {
    //                     setNotificationCount(0); // Không có đơn mới hoặc không phải statusTrip 2, đặt về 0
    //                 }
    
    //                 // Nếu bạn cần cập nhật avatar, có thể thực hiện trong đây luôn
    //                 if (loginInfo.image) {
    //                     setAvatar({ uri: loginInfo.image });
    //                 } else {
    //                     setAvatar(Avatar);
    //                 }
    //             } else {
    //                 console.error('Thông tin đăng nhập không tồn tại trong AsyncStorage.');
    //                 setAvatar(Avatar); // Đặt avatar mặc định nếu không có thông tin đăng nhập
    //             }
    //         } catch (error) {
    //             // console.error('Lỗi khi lấy dữ liệus:', error);
    //         }
    //     };
    
    //     fetchUserInfoAndNotification();
    // }, []);
    

    const markNotificationsAsRead = async () => {
        try {
            await AsyncStorage.setItem('notificationViewed', 'true');
            setNotificationCount(0); // Đặt lại số lượng thông báo sau khi đánh dấu đã xem
        } catch (error) {
            console.error('Lỗi khi đánh dấu thông báo:', error);
        }
    };

    const handleNavigateToNotifications = async () => {
        await markNotificationsAsRead();  // Đảm bảo thao tác async hoàn tất
        navigation.navigate('Notification', { screen: 'Notification' });
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchData(); // Lấy dữ liệu mới khi kéo để làm mới
    };

    return (
        <ScrollView
            style={MenuScreenStyles.container}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
        >
            <View style={MenuScreenStyles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Profile', { screen: 'Profile' })}>
                    <Image source={avatar} style={MenuScreenStyles.avatar} />
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
            {/* <Text style={MenuScreenStyles.notiText}>
                {tripCount > 0
                    ? `Có ${tripCount} đơn cần vận chuyển (${orderTripCount} gói hàng)`
                    : 'Không có đơn hàng cần vận chuyển'}
            </Text> */}
            <Text style={MenuScreenStyles.title}>Danh mục</Text>
            <View style={MenuScreenStyles.row}>
                <View style={MenuScreenStyles.boxWrapper}>
                    <TouchableOpacity style={MenuScreenStyles.box} onPress={() => navigation.navigate('Waiting', { screen: 'Waiting' })}>
                        <Image source={waiting} style={MenuScreenStyles.iconWaiting} />
                    </TouchableOpacity>
                    <Text style={MenuScreenStyles.boxText}>Cần vận chuyển</Text>
                </View>
                <View style={MenuScreenStyles.boxWrapper}>
                    <TouchableOpacity style={MenuScreenStyles.box} onPress={() => navigation.navigate('Home', { screen: 'Home' })}>
                        <Image source={delivering} style={MenuScreenStyles.iconDelivering} />
                    </TouchableOpacity>
                    <Text style={MenuScreenStyles.boxText}>Đang vận chuyển</Text>
                </View>
                <View style={MenuScreenStyles.boxWrapper}>
                    <TouchableOpacity style={MenuScreenStyles.box} onPress={() => navigation.navigate('Order', { screen: 'Order' })}>
                        <Image source={complete} style={MenuScreenStyles.iconComplete} />
                    </TouchableOpacity>
                    <Text style={MenuScreenStyles.boxText}>Đã hoàn thành</Text>
                </View>
                <View style={MenuScreenStyles.boxWrapper}>
                    <TouchableOpacity style={MenuScreenStyles.box} onPress={() => navigation.navigate('Statistic', { screen: 'Statistic' })}>
                        <Image source={statis} style={MenuScreenStyles.iconStatis} />
                    </TouchableOpacity>
                    <Text style={MenuScreenStyles.boxText}>Thống kê</Text>
                </View>
                {/* <View style={MenuScreenStyles.boxWrapper}>
                    <TouchableOpacity style={MenuScreenStyles.box} onPress={() => navigation.navigate('Chat', { screen: 'Chat' })}>
                        <Image source={chat} style={MenuScreenStyles.iconChat} />
                    </TouchableOpacity>
                    <Text style={MenuScreenStyles.boxText}>Nhắn tin</Text>
                </View> */}
                <View style={MenuScreenStyles.boxWrapper}>
                    <TouchableOpacity style={MenuScreenStyles.boxFind} onPress={() => navigation.navigate('Find', { screen: 'Find' })}>
                        {/* <Image source={find} style={MenuScreenStyles.iconFind} /> */}
                    </TouchableOpacity>
                    <Text style={MenuScreenStyles.boxText} />
                </View>
            </View>
        </ScrollView>
    );
};

export default MenuScreen;
