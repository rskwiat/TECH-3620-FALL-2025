import { Text } from 'react-native-paper';
import { Stack } from 'expo-router';
import { ThemedView } from '../src/components/ThemedView';
import { ThemeToggle } from '../src/components/ThemeToggle';

export default function Settings() {
  return (
    <ThemedView>
      <Stack.Screen name='Settings' options={{ headerShown: true }}/>
      <ThemeToggle />
    </ThemedView>
  );
}
