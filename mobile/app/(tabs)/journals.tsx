import { useState, useEffect } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View } from 'react-native';
import { Surface, Text, FAB, ActivityIndicator, Appbar } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAppStore } from '@/lib/stores';
import { getJournals, JournalEntry } from '@/lib/api';
import { JournalModal } from '@/components/JournalModal';
import { CreateJournalModal } from '@/components/CreateJournalModal';

export default function JournalsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [journals, setJournals] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJournal, setSelectedJournal] = useState<JournalEntry | null>(null);
  const [showJournalModal, setShowJournalModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const token = useAppStore((state) => state.token);

  useEffect(() => {
    // Only fetch if token exists (prevents errors during logout)
    if (token) {
      fetchJournals();
    }
  }, [token]);

  const fetchJournals = async () => {
    try {
      setLoading(true);
      const response = await getJournals();
      setJournals(response.data);
    } catch (error) {
      console.error('Failed to fetch journals:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleSelectJournal = (journal: JournalEntry) => {
    setSelectedJournal(journal);
    setShowJournalModal(true);
  };

  const handleJournalRefresh = () => {
    fetchJournals();
  };

  const renderJournalCard = ({ item }: { item: JournalEntry }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => handleSelectJournal(item)}
      style={styles.cardContainer}
    >
      <Surface style={[styles.card, { backgroundColor: colorScheme === 'dark' ? '#1e1e1e' : '#fff' }]} elevation={2}>
        <Text variant="titleMedium" style={[styles.cardTitle, { color: '#6200EE' }]} numberOfLines={2}>
          {item.title}
        </Text>
        <Text variant="bodySmall" style={[styles.cardDate, { color: colorScheme === 'dark' ? '#999' : '#999' }]}>
          {formatDate(item.created_at)}
        </Text>
        <Text
          variant="bodySmall"
          style={[styles.cardPreview, { color: colorScheme === 'dark' ? '#ccc' : '#555' }]}
          numberOfLines={2}
        >
          {item.entry}
        </Text>
      </Surface>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text variant="headlineMedium" style={[styles.emptyTitle, { color: colorScheme === 'dark' ? '#e0e0e0' : '#333' }]}>
        No Journals Yet
      </Text>
      <Text variant="bodyMedium" style={[styles.emptySubtitle, { color: colorScheme === 'dark' ? '#999' : '#999' }]}>
        Start your journaling journey by creating your first entry
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#121212' : '#f5f5f5' }]}>
      <Appbar.Header style={[styles.appbar, { backgroundColor: colorScheme === 'dark' ? '#1e1e1e' : '#fff' }]}>
        <Appbar.Content title="My Journal" />
        <Appbar.Action icon="account-circle" onPress={() => router.push('/(tabs)/profile')} />
      </Appbar.Header>

      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator animating size="large" color="#6200EE" />
        </View>
      ) : (
        <FlatList
          data={journals}
          renderItem={renderJournalCard}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={renderEmptyState}
          showsVerticalScrollIndicator={false}
        />
      )}

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setShowCreateModal(true)}
      />

      <CreateJournalModal
        visible={showCreateModal}
        onDismiss={() => setShowCreateModal(false)}
        onSuccess={() => {
          setShowCreateModal(false);
          handleJournalRefresh();
        }}
      />

      <JournalModal
        visible={showJournalModal}
        journal={selectedJournal}
        onDismiss={() => {
          setShowJournalModal(false);
          setSelectedJournal(null);
        }}
        onRefresh={handleJournalRefresh}
      />
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
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexGrow: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    marginVertical: 8,
  },
  card: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontWeight: '600',
    color: '#6200EE',
    marginBottom: 8,
  },
  cardDate: {
    color: '#999',
    marginBottom: 12,
  },
  cardPreview: {
    color: '#555',
    lineHeight: 18,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    color: '#999',
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#6200EE',
  },
});
