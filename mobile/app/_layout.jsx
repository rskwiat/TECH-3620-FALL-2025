import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { lightTheme, darkTheme } from '../src/utils/theme';
import { useAppStore } from '../src/store/useAppStore';

export default function RootLayout() {
  const theme = useAppStore((state) => state.theme);
  const paperTheme = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <SafeAreaProvider>
      <PaperProvider theme={paperTheme}>

        <Stack />
        <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
