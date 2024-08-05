import { StyleSheet } from 'react-native';

const ProfileScreenStyles = StyleSheet.create({
  formContainer: {
    width: '90%',
    height: 400,
    position: 'relative',
    borderWidth: 1,
    borderRadius: 25,
    borderColor: '#000', // Adjust border color as needed
    padding: 10,
    left: 20,
    right: 20,
    backgroundColor: '#fff', // Adjust background color as needed
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    top: -70,
    zIndex: -1, // Adjust the top position as needed to move the container higher
  },
  boxContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
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
  textButton: {},
  buttonText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'blue',
  },
  buttonTextLogout: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    width: 'auto',
    height: 50,
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 25,
    justifyContent: 'center',
    marginTop: 20,
  },
  // buttonContent: {
  //   width:'100%',
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-around', // Đảm bảo các cột nằm thẳng hàng và iconVector ở cuối
  //   paddingRight: 10, // Khoảng cách giữa icon và nội dung nút
  // },

  buttonContent: {
    width:'100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10, // Phân bố không gian đều giữa các phần tử
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  iconVector: {
    width: 12,
    height: 20,
    top:3, // Sử dụng chiều cao của nút
    marginLeft: 'auto',
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

export default ProfileScreenStyles;
