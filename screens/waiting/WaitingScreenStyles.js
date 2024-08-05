import { StyleSheet } from 'react-native';

const WaitingScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f9f9f9',
    // justifyContent: 'center', // Center vertically
    // justifyContent: 'center', // Center vertically
    // alignItems: 'center', // Center horizontally
  },
  tripContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 15,
    justifyContent: 'space-between',
  },
  innerContainer: {
    padding: 10,
  },
  tripInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
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
  orderContainer: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    marginHorizontal: 10,
  },
  orderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  orderIDContainer: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  checkIcon: {
    width: 20,
    height: 20,
  },
  viewIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  detailContainer: {
    marginTop: 10,
  },
  detail: {
    fontSize: 14,
    color: '#007bff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fefefe',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#b7eb8f',
    backgroundColor: '#f6ffed',
    color: '#389e0d',
  },
  tripType: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#d4380d',
    backgroundColor: '#fff2e8',
    color: '#d4380d',
  },
  noOrdersContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  },
  parcelIcon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  noOrdersText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#666',
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
  flatList: {
    flexGrow: 1,
  },
  scrollContainer: {
    flexGrow: 1, // Đảm bảo ScrollView chiếm toàn bộ không gian
  },
});

export default WaitingScreenStyles;
