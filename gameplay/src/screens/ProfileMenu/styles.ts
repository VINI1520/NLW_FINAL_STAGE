import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    fontSize: 18,
    fontFamily: theme.fonts.title700,
    color: theme.colors.heading,    
  },
  form: {
    paddingHorizontal: 24,
    marginTop: 32
  },
  header: {
    width: '100%',
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: getStatusBarHeight() + 26,
    marginBottom: 42,
  },
  select: {
    flexDirection: 'row',
    width: '100%', 
    height: 68,
    borderColor: theme.colors.secondary50,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',    
    paddingRight: 25,
    overflow: 'hidden',    
  },
  selectBody: {
    flex: 1,
    alignItems: 'center',    
  },
  image: {
    width: 64,
    height: 68,
    backgroundColor: theme.colors.secondary40,
    borderColor: theme.colors.secondary50,
    borderWidth: 1,
    borderRadius: 8,    
  },
  footer: {
    marginVertical: 25,
    marginBottom: 25,
    paddingHorizontal: 25,
  },
});