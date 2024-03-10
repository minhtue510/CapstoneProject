import { StyleSheet } from 'react-native';

const HomeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  orderTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  orderDate: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333', // Đổi màu chữ cho đọc dễ dàng hơn
  },
  orderCompany: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // Đổi màu chữ cho đọc dễ dàng hơn
  },
  orderLocation: {
    fontSize: 16,
    color: '#333', // Đổi màu chữ cho đọc dễ dàng hơn
  },
  statusIcon: {
    width: 30,
    height: 30,
  },
  noOrdersContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noOrdersText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#555', // Đổi màu chữ cho đọc dễ dàng hơn
  },
  parcelIcon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});

export default HomeScreenStyles;
