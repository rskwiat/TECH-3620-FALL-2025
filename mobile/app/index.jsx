import { Text, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemeToggle } from '../src/components/ThemeToggle';
import { ThemedView } from '../src/components/ThemedView';

export default function HomeScreen() {
  const router = useRouter();

  const handleNavigation = (href) => {
    router.navigate(href);
  }

  return (
    <ThemedView>
      <SafeAreaView style={{ 
        flex: 1, 
        justifyContent: 'center'
      }}>
        <Text variant='displayLarge'>
          Welcome, **your name** 👋 
        </Text>

        <Button
          style={{
            marginVertical: 40,
          }}
          mode="contained" 
          onPress={() => handleNavigation('/(main)')}
        >
          Namaste
        </Button>
        <Button
          mode="contained"
          onPress={() => handleNavigation('/settings')}  
        >
          Settings
        </Button>

      </SafeAreaView>
    </ThemedView>
  );
}
