import { useRouter, Stack } from 'expo-router';
import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native';

import { ThemedView } from '../src/components/ThemedView';

export default function HomeScreen() {
  const router = useRouter();

  const handleSettingsNavigation = () => {
    router.navigate('/settings');
  }

  const hadleLoginNavigation = () => {
    router.navigate('/(main)');
  }

  return (
    <ThemedView>
      <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <Stack.Screen name='Welcome'/>

      <Text 
        style={{ textAlign: 'center', marginBottom: 320 }} 
        variant='displayLarge'>Welcome, Robert ✌️
      </Text>

        <Button 
          style={{ marginBottom: 20 }} 
          mode="contained" 
          onPress={() => hadleLoginNavigation()}
        >
          Namaste
        </Button>

        <Button mode="contained" onPress={() => handleSettingsNavigation()}>
          Settings
        </Button>
      </SafeAreaView>
    </ThemedView>
  );
}
