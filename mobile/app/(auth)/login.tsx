import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { TextInput, Button, Text, Surface } from 'react-native-paper';
import { Link, useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAppStore } from '@/lib/stores';
import { login as apiLogin } from '@/lib/api';

export default function LoginScreen() {
  const colorScheme = useColorScheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setToken, setUser, setLoading: setAppLoading } = useAppStore();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    try {
      setLoading(true);
      setAppLoading(true);
      const response = await apiLogin({ email, password });
      setToken(response.token);
      setUser({ id: 0, email: response.email }); // ID will be in token payload
      setAppLoading(false);
      
      // Redirect to home (tabs)
      router.replace('/(tabs)/journals');
    } catch (error: any) {
      Alert.alert('Login Failed', error.response?.data?.message || 'An error occurred');
      setLoading(false);
      setAppLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#121212' : '#f5f5f5' }]}>
      <SafeAreaView style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#121212' : '#f5f5f5' }]}>
        <View style={styles.content}>
          <Surface style={[styles.header, { backgroundColor: colorScheme === 'dark' ? '#121212' : 'transparent' }]} elevation={0}>
            <Text variant="headlineLarge" style={styles.title}>
              Namaste
            </Text>
            <Text variant="bodyMedium" style={[styles.subtitle, { color: colorScheme === 'dark' ? '#999' : '#666' }]}>
              Sign in to continue
            </Text>
          </Surface>

          <View style={styles.form}>
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading}
              style={[styles.input, { backgroundColor: colorScheme === 'dark' ? '#1e1e1e' : '#fff' }]}
            />

            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              mode="outlined"
              secureTextEntry
              editable={!loading}
              style={[styles.input, { backgroundColor: colorScheme === 'dark' ? '#1e1e1e' : '#fff' }]}
            />

            <Button
              mode="contained"
              onPress={handleLogin}
              loading={loading}
              disabled={loading}
              style={styles.button}
            >
              Sign In
            </Button>
          </View>

          <View style={styles.footer}>
            <Text variant="bodyMedium" style={[styles.footerText, { color: colorScheme === 'dark' ? '#999' : '#666' }]}>
              Don't have an account?{' '}
              <Link href="/(auth)/register" asChild>
                <Text style={styles.link}>Sign up</Text>
              </Link>
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingVertical: 24,
  },
  header: {
    marginTop: 20,
    marginBottom: 40,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6200EE',
    marginBottom: 8,
  },
  subtitle: {
    color: '#666',
  },
  form: {
    gap: 16,
  },
  input: {
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 8,
    paddingVertical: 6,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    color: '#666',
    textAlign: 'center',
  },
  link: {
    color: '#6200EE',
    fontWeight: '600',
  },
});
