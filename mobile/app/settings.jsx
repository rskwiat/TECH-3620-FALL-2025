import { Text } from 'react-native-paper';
import { ThemedView } from '../src/components/ThemedView';
import { Stack } from 'expo-router';
import { ThemeToggle } from '../src/components/ThemeToggle';

export default function Settings() {
  return (
    <ThemedView>
      <Stack.Screen
        options={{ 
          title: 'Settings',
          headerShown: true 
        }}
      />
      <ThemeToggle />  
    </ThemedView>
  );
}
