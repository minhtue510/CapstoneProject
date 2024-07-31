import { StyleSheet } from 'react-native';

const AboutUsScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  contactButton: {
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#007bff',
    alignItems: 'center',
    width: '100%',
  },
  contactText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
  export default AboutUsScreenStyles;
