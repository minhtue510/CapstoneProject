import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ChatScreen = () => {
    const route = useRoute();
    const { accountId } = route.params;
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [senderName, setSenderName] = useState('');
    const [senderId, setSenderId] = useState('');


    const fetchData = useCallback(async () => {
        try {
            // Lấy thông tin người dùng từ AsyncStorage
            const loginInfoString = await AsyncStorage.getItem('loginInfo');
            if (loginInfoString) {
                const loginInfo = JSON.parse(loginInfoString);
                setSenderName(loginInfo.fullName || ''); // Cập nhật tên người gửi tin nhắn
                setSenderId(loginInfo.idByRole || '');
                console.log('Sender name:', loginInfo.fullName);
                console.log('Sender Id:', loginInfo.idByRole);
                
            } else {
                console.error('Không có thông tin người dùng trong AsyncStorage.');
            }
            
            // Lấy tin nhắn (cập nhật API tương ứng nếu cần)
            const messagesData = await getMessages(accountId); // Cập nhật hàm getMessages nếu cần
            setMessages(messagesData);
        } catch (error) {
            // console.error('Error fetching data:', error);
        }
    }, [accountId]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleSend = () => {
        if (currentMessage.trim()) {
            // Thêm tin nhắn vào danh sách (có thể gửi tin nhắn qua API nếu cần)
            setMessages([...messages, { id: Date.now().toString(), text: currentMessage, senderName, senderId}]);
            setCurrentMessage('');
        }
    };

    const renderMessage = ({ item }) => (
        <View style={styles.messageContainer}>
            <Text style={styles.senderName}>{item.senderName} Mã tài xế({item.senderId}) :</Text>
            <Text style={styles.messageText}>{item.text}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                renderItem={renderMessage}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.messageList}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={currentMessage}
                    onChangeText={setCurrentMessage}
                    placeholder="Nhập nội dung..."
                />
                <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    senderName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    messageList: {
        padding: 10,
    },
    messageContainer: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    messageText: {
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#ccc',
    },
    input: {
        flex: 1,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginRight: 10,
    },
    sendButton: {
        backgroundColor: '#007bff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    sendButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default ChatScreen;
