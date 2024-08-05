// import { StyleSheet } from 'react-native';

// const InformationScreenStyles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f9f9f9',
//     padding: 20,
//   },
//   titleContainer: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     color: '#333', // Dark gray color
//   },
//   avatarContainer: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   avatar: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//   },
//   formContainer: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//     backgroundColor: '#fff', // White background color
//   },
//   rowContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   label: {
//     flex: 2,
//     fontSize: 15,
//     fontWeight: 'bold',
//     color: '#555', // Medium gray color
//   },
//   value: {
//     flex: 3,
//     fontSize: 14,
//     color: '#333', // Dark gray color
//     // marginLeft: 50,
//   },
//   buttonText: {
//     fontSize: 16,
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
// });

// export default InformationScreenStyles;


import { StyleSheet } from 'react-native';

const InformationScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  headerStyle: {
    backgroundColor: '#f8f8f8',
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  formContainer: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#666',
  },
  changeImageText: {
    marginTop: 8,
    color: '#007bff',
    fontSize: 16,
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
});

export default InformationScreenStyles;
