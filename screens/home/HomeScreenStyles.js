import { StyleSheet } from 'react-native';

const HomeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  tripContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 20,
  },
  innerContainer: {
    padding: 10,
  },
  tripInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
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
    padding: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
  },
  orderIDContainer: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  orderID: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fefefe',
    borderTopWidth: 1,
    borderTopColor: '#ddd',

  },
  detail: {
    fontWeight: 'normal', // Đặt kiểu chữ in đậm
  },

  buttonText: {
    fontSize: 16,
    padding: 5,
    borderRadius: 5,
    textAlign: 'center',
    marginTop: 10,
    borderWidth: 1, 
    borderColor: '#b7eb8f',
    backgroundColor: '#f6ffed',
    color: '#389e0d',
  },

  tripType: {
    fontSize: 16,
    padding: 5,
    borderRadius: 5,
    textAlign: 'center',
    marginTop: 10,
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
  },
  parcelIcon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  noOrdersText: {
    fontSize: 16,
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
    backgroundColor: 'cyan',
  },
  flatList: {
    flexGrow: 1,
  },
});

export default HomeScreenStyles;
// import { StyleSheet } from 'react-native';

// const HomeScreenStyles = StyleSheet.create({
//   container: {
//         flex: 1,
//         padding: 15,
//         backgroundColor: '#f9f9f9',
//       },
//       tripContainer: {
//         backgroundColor: '#ffffff',
//         borderRadius: 10,
//         borderColor: '#ddd',
//         borderWidth: 1,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.15,
//         shadowRadius: 6,
//         elevation: 4,
//         marginBottom: 20,
//       },
//   innerContainer: {
//     padding: 10,
//   },
//   tripInfoContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 10,
//     paddingHorizontal: 10,
//     marginBottom: 10,
//   },
//   tripId: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#d4380d',
//     flex: 1,
//   },
//   licensePlate: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: 'gray',
//     flex: 1,
//     textAlign: 'right',
//   },
//   orderContainer: {
//         marginBottom: 15,
//         padding: 10,
//         borderWidth: 1,
//         borderColor: '#e0e0e0',
//         borderRadius: 10,
//         backgroundColor: '#ffffff',
//         shadowColor: '#000',
//       },
//   orderIDContainer: {
//     fontWeight: 'bold',
//     fontSize: 16,
//     color: '#333',
//   },
//   orderID: {
//     fontSize: 14,
//     color: '#666',
//     marginTop: 5,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#fefefe',
//     borderTopWidth: 1,
//     borderTopColor: '#ddd',
//   },
//   buttonText: {
//     fontSize: 16,
//     padding: 5,
//     borderRadius: 5,
//     textAlign: 'center',
//     marginTop: 10,
//     borderWidth: 1,
//     borderColor: '#b7eb8f',
//     backgroundColor: '#f6ffed',
//     color: '#389e0d',
//   },
//   tripType: {
//     fontSize: 16,
//     padding: 5,
//     borderRadius: 5,
//     textAlign: 'center',
//     marginTop: 10,
//     borderWidth: 1,
//     borderColor: '#d4380d',
//     backgroundColor: '#fff2e8',
//     color: '#d4380d',
//   },
//   noOrdersContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   parcelIcon: {
//     width: 100,
//     height: 100,
//     marginBottom: 20,
//   },
//   noOrdersText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     color: '#666',
//   },
//   backButton: {
//     marginLeft: 10,
//   },
//   backIcon: {
//     width: 24,
//     height: 24,
//   },
//   headerStyle: {
//     backgroundColor: 'cyan',
//   },
//   flatList: {
//     flexGrow: 1,
//   },
// });

// export default HomeScreenStyles;
