import { StyleSheet } from 'react-native';

const OrderDetailScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9', // Friendly background color
  },
  containerCamera: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
  },
  buttonContainer: {
    backgroundColor: '#fff',
    alignSelf: 'flex-end'
  },
  preview: {
    alignSelf: 'stretch',
    flex: 1
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333', // Darker text color for section titles
  },
  sectionText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666', // Slightly darker text color for section text
  },
  listItemContainer: {
    backgroundColor: '#fff', // White background for order items
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0', // Light gray border color
  },
  itemName: {
    fontSize: 16,
    // fontWeight: 'bold',
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 14,
    marginBottom: 5,
    color: '#666', // Slightly darker text color for item description
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'green',
  },
  buttonText: {
    color: '#fff', // White color
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
   
  },
  icon: {
      width: 50,
      height: 50,
  },
  button: {
    width: 100,
    height: 50,
  },
  orderTripId: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  itemText: {
    marginBottom: 5,
    marginLeft: 10,
  },
  
});


export default OrderDetailScreenStyles;
