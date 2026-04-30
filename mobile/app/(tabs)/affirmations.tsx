import { useState } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { Surface, Text, Appbar } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import AFFIRMATION_GALLERY, { Affirmation } from '@/lib/affirmation-gallery';
import { AffirmationModal } from '@/components/AffirmationModal';

export default function AffirmationsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAffirmation, setSelectedAffirmation] = useState<Affirmation | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('');

  const getRandomAffirmation = (categoryIndex: number) => {
    const category = AFFIRMATION_GALLERY[categoryIndex];
    const randomIndex = Math.floor(Math.random() * category.data.length);
    setSelectedAffirmation(category.data[randomIndex]);
    setSelectedCategory(category.title);
    setModalVisible(true);
  };

  const renderCategoryCard = ({ item, index }: { item: (typeof AFFIRMATION_GALLERY)[0]; index: number }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => getRandomAffirmation(index)}
      style={styles.cardContainer}
    >
      <Surface style={[styles.card, { backgroundColor: colorScheme === 'dark' ? '#1e1e1e' : '#fff' }]} elevation={2}>
        <Text variant="titleMedium" style={[styles.cardTitle, { color: '#6200EE' }]}>
          {item.title}
        </Text>
      </Surface>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#121212' : '#f5f5f5' }]}>
      <Appbar.Header style={[styles.appbar, { backgroundColor: colorScheme === 'dark' ? '#1e1e1e' : '#fff' }]}>
        <Appbar.Content title="Affirmations" />
        <Appbar.Action icon="account-circle" onPress={() => router.push('/(tabs)/profile')} />
      </Appbar.Header>

      <FlatList
        data={AFFIRMATION_GALLERY}
        renderItem={renderCategoryCard}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <AffirmationModal
        visible={modalVisible}
        affirmation={selectedAffirmation}
        categoryTitle={selectedCategory}
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
    paddingHorizontal: 16,
    paddingVertical: 8,
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
    marginBottom: 4,
  },
});
