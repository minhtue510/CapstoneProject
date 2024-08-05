import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import back from '../../assets/icons/back.png';
import { getNotifications } from '../../api/user'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotificationScreen = () => {
    const navigation = useNavigation();
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const fetchedNotifications = await getNotifications();

                // Sort notifications from newest to oldest
                const sortedNotifications = fetchedNotifications.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));

                setNotifications(sortedNotifications);
                await AsyncStorage.setItem('notificationCount', fetchedNotifications.length.toString());
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };
        fetchNotifications();
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.navigate('Menu')} style={styles.backButton}>
                    <Image source={back} style={styles.backIcon} />
                </TouchableOpacity>
            ),
            headerStyle: styles.headerStyle,
            headerTitleAlign: 'center',
            title: 'Thông báo',
        });
    }, [navigation]);

    const markNotificationAsRead = async (notificationId) => {
        try {
            const updatedNotifications = notifications.map(notification =>
                notification.notifictionId === notificationId
                    ? { ...notification, status: 'read' }
                    : notification
            );

            setNotifications(updatedNotifications);

            // Optionally, you can save the updated notifications back to AsyncStorage or your API
            await AsyncStorage.setItem('notifications', JSON.stringify(updatedNotifications));
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    const renderNotificationItem = ({ item }) => (
        <TouchableOpacity 
            style={[styles.notificationItem, item.status === 'unread' ? styles.unreadNotification : styles.readNotification]}
            onPress={() => {
                markNotificationAsRead(item.notifictionId);
                navigation.navigate('Waiting', { id: item.notifictionId });
            }}
        >
            <Text style={styles.notificationId}>Mã chuyến đi: {item.tripId}</Text>
            <Text style={styles.notificationContent}>{item.content}</Text>
             <Text style={styles.notificationDate}>{new Date(item.createDate).toLocaleString()}</Text> 
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={notifications}
                renderItem={renderNotificationItem}
                keyExtractor={item => item.notifictionId.toString()}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    list: {
        paddingBottom: 16,
    },
    notificationItem: {
        padding: 16,
        borderRadius: 8,
        marginBottom: 8,
    },
    unreadNotification: {
        backgroundColor: '#fce4ec', // Light pink for unread
    },
    readNotification: {
        backgroundColor: '#f0f0f0', // Light grey for read
    },
    notificationId: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    notificationContent: {
        fontSize: 16,
        marginVertical: 4,
    },
    notificationDate: {
        fontSize: 12,
        color: '#555',
    },
    backButton: {
        marginLeft: 10,
    },
    backIcon: {
        width: 24,
        height: 24,
    },
    headerStyle: {
        backgroundColor: '#89CFF0',
    },
});

export default NotificationScreen;
