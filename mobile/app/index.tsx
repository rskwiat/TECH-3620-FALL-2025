import { Redirect } from 'expo-router';
import { useAppStore } from '@/lib/stores';

export default function RootIndex() {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  
  // Redirect based on auth state
  if (isAuthenticated) {
    return <Redirect href="/(tabs)/affirmations" />;
  } else {
    return <Redirect href="/(auth)/login" />;
  }
}
