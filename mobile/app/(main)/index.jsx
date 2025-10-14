import { Text, Button } from 'react-native-paper';
import { ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ThemedView } from '../../src/components/ThemedView';

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
          <Text 
            variant="displaySmall" 
            style={{ 
              marginHorizontal: 18, 
              color: '#fff', 
              marginBottom: 20,
              fontWeight: 'bold',
              textShadowColor: 'rgba(0, 0, 0, 0.75)',
              textShadowOffset: { width: -1, height: 1 },
              textShadowRadius: 10
            }}
          >
            Guided Meditation
          </Text>

          <ScrollView style={{ paddingHorizontal: 18 }}>
            {MEDITATION_GALLERY.map((meditation) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.4}
                  onPress={() => openMeditationModal(meditation.id)}
                >
                  <ImageBackground 
                    source={meditation.image} 
                    style={{ 
                      height: 200, 
                      flex: 1, 
                      marginBottom: 30,
                      shadowColor: '#171717',
                      shadowOffset: {
                        width: -2, height: 4
                      },
                      shadowOpacity: 0.2,
                      shadowRadius: 3,
                      flexDirection: 'column',
                      alignItems: 'center',
                      position: 'relative',
                    }}>
                  <Text
                    style={{
                      position: 'absolute',
                      top: 50,
                      fontSize: 75,
                      fontWeight: 'bold',
                      color: '#fff',
                      textShadowColor: 'rgba(0, 0, 0, 0.75)',
                      textShadowOffset: { width: -1, height: 1 },
                      textShadowRadius: 10
                    }}
                  >
                    {meditation.title}
                  </Text>
                  </ImageBackground>
                </TouchableOpacity>
              );
            })};
          </ScrollView>
        </SafeAreaView>
      </ImageBackground> 
    </ThemedView>
  );
}
