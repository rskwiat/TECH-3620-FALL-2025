import { Text, Button } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';
import { useAudioPlayer } from 'expo-audio';
import { ThemedView } from '../../src/components/ThemedView';

import MEDITATION_GALLERY from '../../src/constants/meditation-gallery';

export default function DynamicRoute() {
  const { id } = useLocalSearchParams();
  const galleryItem = MEDITATION_GALLERY.find(item => item.id === parseInt(id));

  const player = useAudioPlayer(galleryItem.audio);

  return (
    <ThemedView>
      <Text variant="displayMedium">
        {galleryItem.title} Meditation
      </Text>

      <Button 
        onPress={() => player.play()}
        mode="contained"
      >
        Start Meditation
      </Button>

      <Button 
        onPress={() => player.pause()}
        mode="contained"
      >
        Stop Meditation
      </Button>
    </ThemedView>
  );
}
