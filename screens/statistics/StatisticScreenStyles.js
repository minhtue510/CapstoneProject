import { StyleSheet } from 'react-native';

const StatisticScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  totalCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4caf50',
  },
  totalFailCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
  },
  backButton: {
    marginLeft: 16,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  headerStyle: {
    backgroundColor: '#f5f5f5',
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

export default StatisticScreenStyles;
