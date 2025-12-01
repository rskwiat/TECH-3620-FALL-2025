import { Text, Button } from 'react-native-paper';
import { ImageBackground, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ThemedView } from '../../src/components/ThemedView';

import { ImageBackgroundButton } from '../../src/components/ImageBackground';

import beach from '../../assets/meditation-images/waterfall.jpg';
import MEDITATION_GALLERY from '../../src/constants/meditation-gallery';

export default function MeditationPage() {
  const router = useRouter();

  const openMeditationModal = (gallery) => {
    // meditation/page?id=1
    router.push({
      pathname: '/meditation/[id]',
      params: {
        id: gallery
      }
    });
  };

  return (
    <ThemedView>
      <ImageBackground source={beach} style={{ flex: 1 }}>
        <SafeAreaView>

          <ScrollView style={{ paddingHorizontal: 18 }}>
            {MEDITATION_GALLERY.map((meditation, index) => {
              return (
                <ImageBackgroundButton 
                  key={index}
                  source={meditation}
                  openMeditationModal={openMeditationModal}
                />
              );
            })}
          </ScrollView>
        </SafeAreaView>
      </ImageBackground> 
    </ThemedView>
  );
}
