import { Text, Button } from 'react-native-paper';
import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { ThemedView } from '../../src/components/ThemedView';

import MEDITATION_GALLERY from '../../src/constants/meditation-gallery';

export default function DynamicRoute() {
  const { id } = useLocalSearchParams();
  const galleryItem = MEDITATION_GALLERY.find(item => item.id === parseInt(id));

  const player = useAudioPlayer(galleryItem.audio);
  const status = useAudioPlayerStatus(player);

  const formatDuration = (seconds) => {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <ThemedView>
      <View style={{ 
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
      }}>
        <Text variant="displayMedium">
          {galleryItem.title} Meditation
        </Text>

        <Text variant="bodyMedium">
          Duration {formatDuration(status.duration)}
        </Text>

        <Button 
          onPress={() => player.play()}
          mode="contained"
        >
          Start Meditation
        </Button>

      </View>
    </ThemedView>
  );
}
