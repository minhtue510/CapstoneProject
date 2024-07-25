import { StyleSheet } from 'react-native';

const MenuScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Đảm bảo các phần tử con căn giữa với khoảng cách đều giữa chúng
        marginBottom: 20,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10, // Giảm khoảng cách giữa Avatar và FullName
        marginTop: 20,
    },
    fullName: {
        flex: 1, // Đảm bảo FullName mở rộng hết không gian có thể trong header
        fontSize: 20,
        fontWeight: 'bold',
        color: '#343a40',
        marginLeft: 10, // Để khoảng cách với Avatar
        marginTop: 20,
    },
    noti: {
        width: 30,
        height: 30,
        marginTop: 20,
        marginRight: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    box: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        elevation: 5,
        margin: 10,
    },
    boxText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#495057',
    },
    badge: {
        position: 'absolute',
        top: -10,
        right: -10,
        backgroundColor: '#dc3545',
        borderRadius: 10,
        padding: 5,
        minWidth: 20,
        minHeight: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    badgeText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
    },
    headerStyle: {
        backgroundColor: 'cyan',
      },
      notificationBadge: {
        position: 'absolute',
        top: 10,
        right: 0,
        backgroundColor: 'red',
        borderRadius: 12,
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    notificationBadgeText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
    },
});

export default MenuScreenStyles;
