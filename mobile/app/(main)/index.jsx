import { Text, Button, Card } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { ImageBackground, View } from 'react-native';
import { ThemedView } from '../../src/components/ThemedView';
import MEDITATION_GALLERY from '../../src/constants/meditation-gallery';

import beach from '../../assets/meditation-images/beach.jpg';

export default function GenericPage() {
  const router = useRouter();

  const openMeditationModal = (gallery) => {
    router.push({
      pathname: '/meditation/[id]',
      params: {
        id: gallery.id
      }
    });
  };

  return (
    <ThemedView>
      <ImageBackground source={beach} style={{ flex: 1 }}>
        <Text>Meditation</Text>

        {MEDITATION_GALLERY.map((gallery) => {
          return (
            <Card key={gallery.id} onPress={() => openMeditationModal(gallery)}>
              <View style={{ position: 'relative'}}>

              <Card.Cover source={gallery.image} />
                <View style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <Text style={{ color: '#fff', fontSize: 28, fontWeight: 'bold', textAlign: 'center'}}>{gallery.title}</Text>
              </View>



              </View>
            </Card>
          );
        })}

      </ImageBackground> 
    </ThemedView>
  );
}
