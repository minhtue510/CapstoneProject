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
  orderIDContainer: {
    flexDirection: 'row', // Display orderIDContainer and orderID horizontally
    alignItems: 'center', // Align items vertically in the row
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 15,

    
  },
  tripId: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  licensePlate: {
    fontSize: 18,
    fontWeight: 'bold',

    
  },
  orderID: {
    // marginLeft: 10, // Add some spacing between orderIDContainer and orderID
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
    // fontWeight: 'bold',
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
});

export default HomeScreenStyles;




