import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { ThemedView } from '../../src/components/ThemedView';
import MEDITATION_GALLERY from '../../src/constants/meditation-gallery';

import { useAudioPlayer } from 'expo-audio';

export default function MeditationPage() {
  const { id } = useLocalSearchParams();



  // console.log(JSON.stringify(params));
  const galleryItem = MEDITATION_GALLERY.find(item => item.id === parseInt(id));

  const player = useAudioPlayer(galleryItem.audio);

  return (
    <ThemedView>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button mode="contained" onPress={() => player.play()}>Play</Button>

        </View>
    </ThemedView>
  );
}
