import { StyleSheet } from 'react-native';

const LoginScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingBottom: 150,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
    width: 24,
    height: 24,
  },
  input: {
    flex: 1,
    height: 40,
  },
  passwordToggleContainer: {
    position: 'absolute',
    right: 10,
    top: 40,
    zIndex: 999,
  },
  toggleIcon: {
    width: 20,
    height: 20,
    tintColor: '#666',
  },
  button: {
    marginTop: 15,
    width: '90%',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    elevation: 3,
    shadowColor: '#659bbb',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logo: {
    width: 150,
    height: 150,
  },
  errorText: {
    color: 'red',
    // marginTop: 10,
    // textAlign: 'center',
    textAlign: 'left',
    justifyContent: 'flex-start',
  },
  usernameError: {
    color: 'red',
    // marginBottom: 5,
    textAlign: 'left',
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
  },
  passwordError: {
    color: 'red',
    // marginBottom: 5,
    textAlign: 'left',
    alignSelf: 'flex-start',
    paddingHorizontal: 20,

  },
});

export default LoginScreenStyles;
