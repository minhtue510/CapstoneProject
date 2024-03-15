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
  orderContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Căn chỉnh các phần tử theo chiều dọc
    position: 'relative',
  },

  orderDetails: {
    flex: 1,
    marginLeft: 10,
    alignItems: 'flex-start',
  },
  circleGet: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    position: 'absolute',
    left: 1, // Điểm tròn ở đầu đường kẻ
    top: 30, // Vị trí bắt đầu của đường kẻ
  },
  circleDelivery: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'green',
    position: 'absolute',
    left: 1, // Điểm tròn ở cuối đường kẻ
    bottom: 30, // Vị trí kết thúc của đường kẻ
  },
  deliveryPath: {
    position: 'absolute',
    backgroundColor: 'blue',
    width: 1.5,
    height: 120, // Chiều cao của đường kẻ
    left: 5,
    top: 35,
    bottom: 30,
    zIndex: -1, // Vị trí của đường kẻ
  },
  orderDateContainer: {
    flexDirection: 'column', // Dòng mới cho mỗi text
    alignItems: 'flex-start', // Căn trái theo chiều ngang
    marginLeft: 30, // Khoảng cách với vòng tròn

  },
  orderDate: {
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 20, // Khoảng cách giữa chữ và vòng tròn

  },
  orderCompany: {
    fontStyle: 'italic',
  },

  // Style cho text địa chỉ
  addressText: {
    alignSelf: 'center', // Căn giữa theo chiều ngang
    marginLeft: 15, // Khoảng cách giữa text và vòng tròn
  },
  // Thêm style cho cột mã đơn
  orderIDContainer: {
    alignItems: 'flex-end',
    marginBottom: 20,
    fontWeight: 'bold',
    // Căn chỉnh phần tử con về phía cuối bên phải
  },

  orderID: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  // Thêm style cho container chứa cả orderID và ngày giao hàng
  orderIDAndDateContainer: {
    flexDirection: 'row', // Xếp theo chiều ngang
    justifyContent: 'space-between', // Canh đều các phần tử con theo chiều ngang
    alignItems: 'center',
    marginLeft: 10, // Căn chỉnh các phần tử con theo trục ngang
  },
  orderStatus: {
    fontSize: 15,
    color: 'white',
    fontStyle: 'italic',
    marginTop: 5,
    padding: 5, // Thêm padding để làm cho phần tử trở nên rộng hơn
    borderRadius: 5, // Bo tròn viền của phần tử
    alignSelf: 'flex-end', // Khoảng cách với các phần khác
  },
});
export default HomeScreenStyles;