import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6200EE',
    onPrimary: '#fff',
    background: '#f5f5f5',
    surface: '#fff',
    onSurface: '#333',
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#6200EE',
    onPrimary: '#fff',
    background: '#121212',
    surface: '#1e1e1e',
    onSurface: '#e0e0e0',
  },
};
