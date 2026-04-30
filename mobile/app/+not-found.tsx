import { StyleSheet, SafeAreaView } from 'react-native';
import { Surface, Text, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Surface style={styles.surface}>
        <Text variant="headlineMedium" style={styles.title}>
          Page Not Found
        </Text>
        <Text variant="bodyMedium" style={styles.message}>
          Sorry, we couldn't find the page you're looking for.
        </Text>
        <Button
          mode="contained"
          onPress={() => router.push('/(tabs)/affirmations')}
          style={styles.button}
        >
          Go to Home
        </Button>
      </Surface>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  surface: {
    padding: 24,
    margin: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  title: {
    marginBottom: 12,
    fontWeight: '600',
  },
  message: {
    marginBottom: 20,
    textAlign: 'center',
    color: '#666',
  },
  button: {
    marginTop: 8,
  },
});
