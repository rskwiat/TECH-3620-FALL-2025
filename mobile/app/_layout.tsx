import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { PaperProvider } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAppStore } from '@/lib/stores';
import { lightTheme, darkTheme } from '@/lib/theme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  const initializeAuth = useAppStore((state) => state.initializeAuth);
  const [authInitialized, setAuthInitialized] = useState(false);

  useEffect(() => {
    // Initialize auth on app load
    initializeAuth().then(() => {
      setAuthInitialized(true);
    });
  }, [initializeAuth]);


  if (!authInitialized) {
    // Show loading state while checking auth
    const bgColor = colorScheme === 'dark' ? '#121212' : '#f5f5f5';
    return (
      <PaperProvider theme={colorScheme === 'dark' ? darkTheme : lightTheme}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: bgColor }}>
          <ActivityIndicator size="large" color="#6200EE" />
        </View>
      </PaperProvider>
    );
  }

  return (
    <PaperProvider theme={colorScheme === 'dark' ? darkTheme : lightTheme}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        {isAuthenticated ? (
          <Stack screenOptions={{ animationEnabled: false }}>
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="+not-found"
              options={{
                title: 'Page Not Found',
              }}
            />
          </Stack>
        ) : (
          <Stack screenOptions={{ animationEnabled: false }}>
            <Stack.Screen
              name="(auth)"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="+not-found"
              options={{
                title: 'Page Not Found',
              }}
            />
          </Stack>
        )}
        <StatusBar style="auto" />
      </ThemeProvider>
    </PaperProvider>
  );
}
