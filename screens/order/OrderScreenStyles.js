import { StyleSheet } from 'react-native';

const OrderScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9', // Set a friendly background color
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
    backgroundColor: '#fff', // White background for order items
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1, // Add border
    borderColor: '#e0e0e0', // Border color
  },
  orderTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  orderDate: {
    fontSize: 16,
    marginBottom: 5,
  },
  orderCompany: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  orderLocation: {
    fontSize: 16,
  },
  statusIcon: {
    width: 30,
    height: 30,
  },
});

export default OrderScreenStyles;
