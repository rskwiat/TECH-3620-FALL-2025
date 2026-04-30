import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, KeyboardAvoidingView, Platform, Alert, ScrollView } from 'react-native';
import { TextInput, Button, Text, Surface } from 'react-native-paper';
import { Link, useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAppStore } from '@/lib/stores';
import { register as apiRegister, login as apiLogin } from '@/lib/api';

export default function RegisterScreen() {
  const colorScheme = useColorScheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setToken, setUser, setLoading: setAppLoading } = useAppStore();

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    try {
      setLoading(true);
      setAppLoading(true);
      
      // Register user
      await apiRegister({ email, password });

      // Auto-login after registration
      const loginResponse = await apiLogin({ email, password });
      setToken(loginResponse.token);
      setUser({ id: 0, email: loginResponse.email });
      
      setAppLoading(false);
      
      // Redirect to home (tabs)
      router.replace('/(tabs)/journals');
    } catch (error: any) {
      Alert.alert('Registration Failed', error.response?.data?.message || 'An error occurred');
      setLoading(false);
      setAppLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#121212' : '#f5f5f5' }]}>
      <SafeAreaView style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#121212' : '#f5f5f5' }]}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Surface style={[styles.header, { backgroundColor: colorScheme === 'dark' ? '#121212' : 'transparent' }]} elevation={0}>
              <Text variant="headlineLarge" style={styles.title}>
                Create Account
              </Text>
              <Text variant="bodyMedium" style={[styles.subtitle, { color: colorScheme === 'dark' ? '#999' : '#666' }]}>
                Join our mindfulness community
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

              <TextInput
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                mode="outlined"
                secureTextEntry
                editable={!loading}
                style={[styles.input, { backgroundColor: colorScheme === 'dark' ? '#1e1e1e' : '#fff' }]}
              />

              <Button
                mode="contained"
                onPress={handleRegister}
                loading={loading}
                disabled={loading}
                style={styles.button}
              >
                Create Account
              </Button>
            </View>

            <View style={styles.footer}>
              <Text variant="bodyMedium" style={[styles.footerText, { color: colorScheme === 'dark' ? '#999' : '#666' }]}>
                Already have an account?{' '}
                <Link href="/(auth)/login" asChild>
                  <Text style={styles.link}>Sign in</Text>
                </Link>
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
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
    marginTop: 20,
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
