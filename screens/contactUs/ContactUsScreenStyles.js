import { StyleSheet } from 'react-native';

const ContactUsScreenStyles = StyleSheet.create({
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
    backgroundColor: 'cyan', 
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', 
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  contactButton: {
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '100%',
  },
  contactButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactText: {
    fontSize: 18,
    textAlign: 'center',
    marginLeft: 10, 
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
});

export default ContactUsScreenStyles;
