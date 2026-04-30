import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Appbar, Surface, Text, Button, ActivityIndicator } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAppStore } from '@/lib/stores';
import { getJournals } from '@/lib/api';
import { useState, useEffect } from 'react';

export default function ProfileScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const { user, logout } = useAppStore();
  const token = useAppStore((state) => state.token);
  const [journalCount, setJournalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [createdAt, setCreatedAt] = useState('');

  useEffect(() => {
    // Only fetch if token exists
    if (token) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await getJournals();
      setJournalCount(response.data.length);
      // Get creation date from first journal or use today
      if (response.data.length > 0) {
        const oldestJournal = response.data[response.data.length - 1];
        const date = new Date(oldestJournal.created_at);
        setCreatedAt(date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
      } else {
        const today = new Date();
        setCreatedAt(today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            logout();
            router.replace('/(auth)/login');
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#121212' : '#f5f5f5' }]}>
      <Appbar.Header style={[styles.appbar, { backgroundColor: colorScheme === 'dark' ? '#1e1e1e' : '#fff' }]}>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Profile" />
      </Appbar.Header>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator animating size="large" color="#6200EE" />
        </View>
      ) : (
        <View style={styles.content}>
          <Surface style={[styles.profileCard, { backgroundColor: colorScheme === 'dark' ? '#1e1e1e' : '#fff' }]} elevation={2}>
            <View style={styles.profileHeader}>
              <Surface style={styles.avatar} elevation={1}>
                <Text style={styles.avatarText}>
                  {user?.email?.[0].toUpperCase() || 'U'}
                </Text>
              </Surface>
            </View>

            <View style={styles.infoSection}>
              <Text variant="labelSmall" style={[styles.label, { color: colorScheme === 'dark' ? '#999' : '#999' }]}>
                EMAIL
              </Text>
              <Text variant="bodyLarge" style={[styles.value, { color: colorScheme === 'dark' ? '#e0e0e0' : '#333' }]}>
                {user?.email || 'Not available'}
              </Text>
            </View>

            <View style={styles.infoSection}>
              <Text variant="labelSmall" style={[styles.label, { color: colorScheme === 'dark' ? '#999' : '#999' }]}>
                MEMBER SINCE
              </Text>
              <Text variant="bodyLarge" style={[styles.value, { color: colorScheme === 'dark' ? '#e0e0e0' : '#333' }]}>
                {createdAt}
              </Text>
            </View>

            <View style={styles.infoSection}>
              <Text variant="labelSmall" style={[styles.label, { color: colorScheme === 'dark' ? '#999' : '#999' }]}>
                JOURNAL ENTRIES
              </Text>
              <Text variant="bodyLarge" style={[styles.value, { color: colorScheme === 'dark' ? '#e0e0e0' : '#333' }]}>
                {journalCount} {journalCount === 1 ? 'entry' : 'entries'}
              </Text>
            </View>
          </Surface>

          <Button
            mode="contained-tonal"
            onPress={handleLogout}
            style={styles.logoutButton}
            labelStyle={styles.logoutLabel}
          >
            Logout
          </Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  appbar: {
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    marginTop: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#6200EE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  infoSection: {
    marginBottom: 24,
  },
  label: {
    color: '#999',
    marginBottom: 8,
    fontWeight: '600',
  },
  value: {
    color: '#333',
    fontWeight: '500',
  },
  logoutButton: {
    marginBottom: 20,
    paddingVertical: 6,
  },
  logoutLabel: {
    fontSize: 16,
  },
});
