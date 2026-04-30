import { useState } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { Surface, Text, Appbar } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MEDITATION_GALLERY, { MeditationSession } from '@/lib/meditation-gallery';
import { MeditationModal } from '@/components/MeditationModal';

export default function MeditationScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMeditation, setSelectedMeditation] = useState<MeditationSession | null>(null);

  const handleSelectMeditation = (meditation: MeditationSession) => {
    setSelectedMeditation(meditation);
    setModalVisible(true);
  };

  const renderMeditationCard = ({ item }: { item: MeditationSession }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => handleSelectMeditation(item)}
      style={styles.cardContainer}
    >
      <Surface style={[styles.card, { backgroundColor: colorScheme === 'dark' ? '#1e1e1e' : '#fff' }]} elevation={2}>
        <Surface style={[styles.iconContainer, { backgroundColor: colorScheme === 'dark' ? '#2a2a2a' : '#f0f0f0' }]} elevation={0}>
          <MaterialCommunityIcons name="music" size={40} color="#6200EE" />
        </Surface>
        <Text variant="titleMedium" style={[styles.cardTitle, { color: colorScheme === 'dark' ? '#e0e0e0' : '#333' }]}>
          {item.title}
        </Text>
        <Text variant="bodySmall" style={[styles.cardDuration, { color: colorScheme === 'dark' ? '#999' : '#999' }]}>
          ~10 minutes
        </Text>
      </Surface>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#121212' : '#f5f5f5' }]}>
      <Appbar.Header style={[styles.appbar, { backgroundColor: colorScheme === 'dark' ? '#1e1e1e' : '#fff' }]}>
        <Appbar.Content title="Meditation" />
        <Appbar.Action icon="account-circle" onPress={() => router.push('/(tabs)/profile')} />
      </Appbar.Header>

      <FlatList
        data={MEDITATION_GALLERY}
        renderItem={renderMeditationCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
      />

      <MeditationModal
        visible={modalVisible}
        meditation={selectedMeditation}
        onDismiss={() => setModalVisible(false)}
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
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  cardContainer: {
    flex: 1,
    marginHorizontal: 8,
    marginVertical: 8,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 0,
  },
  cardTitle: {
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  cardDuration: {
    color: '#999',
    textAlign: 'center',
  },
});
