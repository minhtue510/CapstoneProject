import { StyleSheet } from 'react-native';

const ProfileScreenStyles = StyleSheet.create({
  formContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  textButton: {
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'blue', // Set button text color
  },
  buttonTextLogout: {
    color: '#fff', // White color
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 15,
    width: '100%',
    alignItems: 'center',
    // backgroundColor: '#007bff', // Blue color
    backgroundColor: 'red',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    elevation: 3, // Shadow on Android
    shadowColor: '#659bbb', // Shadow color
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.84, // Shadow radius
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Đảm bảo các cột nằm thẳng hàng
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  }
});

export default ProfileScreenStyles;
