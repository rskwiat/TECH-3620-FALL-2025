import { Tabs } from 'expo-router';
import { Text } from 'react-native-paper';
import { ThemedView } from '../../src/components/ThemedView';

export default function Page() {
  return (
    <ThemedView>
      <Tabs.Screen options={{ headerShown: false }} />
      <Text>Hello</Text>
    </ThemedView>
  );
}
