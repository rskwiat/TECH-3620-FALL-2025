import { Text } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';
import { ThemedView } from '../../src/components/ThemedView';

import MEDITATION_GALLERY from '../../src/constants/meditation-gallery';

export default function DynamicRoute() {
  const { id } = useLocalSearchParams();
  const galleryItem = MEDITATION_GALLERY.find(item => item.id === parseInt(id));

  return (
    <ThemedView>
      <Text variant="displayLarge">
        Dynamic Route -- {id}
        {galleryItem.title} Meditation
      </Text>
    </ThemedView>
  );
}
