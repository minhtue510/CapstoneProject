import { StyleSheet } from 'react-native';

const HistoryScreenStyles = StyleSheet.create({
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
    // marginBottom: 20,
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
    marginBottom: -10,
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
  buttonText: {
    fontSize: 16,
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
  itemImage: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    borderRadius: 8,
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    height: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 10,
    borderRadius: 50,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  fullImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  // itemImage: {
  //   width: 100,
  //   height: 100,
  //   resizeMode: 'cover',
  //   borderRadius: 8,
  //   marginTop: 10,
  // },
});


export default HistoryScreenStyles;
