import { StyleSheet } from 'react-native';

const LoginScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Set background color to white
    paddingBottom: 150, // Adjust padding as needed
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
    width: 24, // Set width of the icon
    height: 24, // Set height of the icon
  },
  input: {
    flex: 1,
    height: 40,
  },
  passwordToggleContainer: {
    position: 'absolute',
    right: 10,
    top: 40, // Adjusted top position
    zIndex: 999,
  },

  // Style for the password toggle button icon
  toggleIcon: {
    width: 20,
    height: 20,
    tintColor: '#666',
  },
  button: {
    marginTop: 15,
    width: '80%',
    alignItems: 'center',
    backgroundColor: '#007bff', // Blue color
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
  buttonText: {
    color: '#fff', // White color
    fontSize: 16,
    fontWeight: 'bold',
  },
  logo: {
    width: 150,
    height: 150,
  },
});

export default LoginScreenStyles;
