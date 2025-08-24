import { View, StyleSheet } from 'react-native';
import { useAppStore } from '../store/useAppStore';
import { lightTheme, darkTheme } from '../utils/theme';

export const ThemedView = ({ children }) => {
  const { theme } = useAppStore();

  return (
    <View style={[styles.container, { 
      backgroundColor: theme === 'dark' ? darkTheme.colors.background : lightTheme.colors.background,
    }]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});