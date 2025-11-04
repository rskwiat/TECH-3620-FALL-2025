import { Text, Button } from 'react-native-paper';
import { ThemedView } from '../src/components/ThemedView';
import { Stack } from 'expo-router';
import { ThemeToggle } from '../src/components/ThemeToggle';
import { useAppStore } from '../src/store/useAppStore';

export default function Settings() {
  const { user, logoutUser } = useAppStore();
  return (
    <ThemedView>
      <Stack.Screen
        options={{ 
          title: 'Settings',
          headerShown: true 
        }}
      />
      <ThemeToggle />  

      <Text>{user ? `Logged in as ${user}` : 'Not logged in'}</Text>
      {user && (
        <Button onPress={() => logoutUser()}>Logout User</Button>
      )}
    </ThemedView>
  );
}
