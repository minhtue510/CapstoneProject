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
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 25,
        marginRight: 10,
        marginTop: 20,
    },
    fullName: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#343a40',
        marginLeft: 10,
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
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    boxWrapper: {
        width: '50%',
        marginVertical: 10,
        alignItems: 'center',
    },
    box: {
        width: 80,
        height: 80,
        borderRadius: 10,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    boxText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#495057',
        textAlign: 'center',
        marginTop: 10,
    },
    boxCompleteText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#495057',
        textAlign: 'center',
        marginTop: 10,
        
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
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#495057',
        borderBottomWidth: 2,
        borderBottomColor: '#495057',
        paddingBottom: 20,
        marginBottom: 30,
    },
    notiContainer: {
        overflow: 'hidden',
        width: '100%',
        backgroundColor: 'transparent',
    },
    notiText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'red',
    },
    icon: {
        width: 40,
        height: 40,
    },
    iconComplete: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    iconWaiting: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    iconDelivering: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    iconStatis: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    iconFind: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    iconChat: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
});

export default MenuScreenStyles;
