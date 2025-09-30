import { Text, Button } from 'react-native-paper';
import { ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ThemedView } from '../../src/components/ThemedView';

import beach from '../../assets/meditation-images/beach.jpg';

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
          <Text>Generic Page Template</Text>
          
          <Button mode="contained" onPress={() => openMeditationModal(1)}>One</Button>
          
          <Button mode="contained" onPress={() => openMeditationModal(2)}>Two</Button>
          
          <Button mode="contained" onPress={() => openMeditationModal(3)}>Three</Button>
        </SafeAreaView>
      </ImageBackground> 
    </ThemedView>
  );
}
