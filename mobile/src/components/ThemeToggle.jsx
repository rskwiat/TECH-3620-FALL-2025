import { View, StyleSheet } from 'react-native';
import { Card, Switch, Text } from 'react-native-paper';
import { useAppStore } from '../store/useAppStore';

export const ThemeToggle = () => {
  const { theme, setTheme } = useAppStore();

  const handleThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.toggleContainer}>
          <Text variant="bodyLarge">Dark Mode</Text>
          <Switch
            value={theme === 'dark'}
            onValueChange={handleThemeToggle}
          />
        </View>
        <Text variant="bodyMedium" style={styles.description}>
          Current theme: {theme}
        </Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  description: {
    opacity: 0.7,
  },
});
