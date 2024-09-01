import { StyleSheet } from 'react-native';

const OrderScreenStyles = StyleSheet.create({
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
  tripContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  tripInfoContainer: {
    flexDirection: 'row', // Display tripId and licensePlate horizontally
    alignItems: 'center', // Align items vertically in the row
    marginBottom: 10,
    marginTop: 10,

    justifyContent: 'space-between',
    
  },
  orderContainer: {
    marginBottom: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
 

  },
  orderIDContainer: {
    flexDirection: 'row',
    alignItems: 'center', 
    marginBottom: 1,
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 5,
    marginRight: 10,
    marginLeft: 10,

  },
  tripId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#d4380d',
    flex: 1,
  },
  licensePlate: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'gray',
    flex: 1,
    textAlign: 'right',
  },
  orderID: {
    marginBottom: 10,
    marginRight: 10,
    fontSize: 14,
    // marginTop: 10,

  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    fontSize: 16,
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    alignSelf: 'flex-end', // Align button to the right
    marginTop: 10,
  },
  buttonText: {
    color: '#4cff00', // Đặt màu chữ thành trắng
    textAlign: 'center', // Căn giữa văn bản
    fontWeight: 'bold', // Đặt kiểu chữ in đậm
  },
  detail: {
    fontSize: 14,
    color: '#007bff',
    marginLeft: 10,

  },
  viewIcon: {
    width: 20, 
    height: 20, 
    marginRight: 10, 
  },
  tripType: {
    fontSize: 16,
    padding: 5,
    borderRadius: 5,
    textAlign: 'center',
    marginTop: 10,
    borderWidth: 1, 
    
  },
  noOrdersContainer: {
    flex: 1,
    justifyContent: 'center', // Căn giữa theo chiều dọc
    alignItems: 'center', // Căn giữa theo chiều ngang
  },
  parcelIcon: {
    width: 100,
    height: 100,
    marginBottom: 20, // Khoảng cách giữa hình ảnh và văn bản
  },
  noOrdersText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center', // Căn giữa văn bản
},
buttonText: {
  fontSize: 16,
},
backButton: {
  marginLeft: 10,
},
dayComplete: {
  marginBottom: 10,
},
backIcon: {
  width: 24,
  height: 24,
},
headerStyle: {
  backgroundColor: '#89CFF0',
},
filterContainer: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  marginVertical: 10,
  marginBottom: 15,
},
filterButton: {
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 20,
  borderWidth: 1,
  borderColor: '#d9d9d9',
},
activeFilterButton: {
  backgroundColor: '#1890ff',
  borderColor: '#1890ff',
},
filterText: {
  color: '#fff',
},
inactiveFilterText: {
  color: '#000',
},
});



export default OrderScreenStyles;
