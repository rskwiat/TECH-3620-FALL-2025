import { Text, Button } from 'react-native-paper';
import { FlatList, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ThemedView } from '../../src/components/ThemedView';
import affirmationsGallery from '../../src/constants/affirmation-gallery';

export default function Affirmations() {
  const router = useRouter();

  const openAffirmationModal = (affirmation) => {
    router.push({
      pathname: '/affirmation/[title]',
      params: {
        title: affirmation
      }
    });
  }

  return (
    <ThemedView>
      <SafeAreaView style={{ flex: 1 }}>
        <Text variant="displaySmall">Daily Affirmations</Text>
        <ScrollView style={{ marginTop: 20, paddingHorizontal: 18 }}>
          <FlatList 
            data={affirmationsGallery}
            keyExtractor={(item) => item.title}
            renderItem={({ item }) => (
              <Button mode="contained" 
                style={{ marginBottom: 20, padding: 20 }}
                onPress={() => openAffirmationModal(item.title)}
              >
                <Text variant="headlineMedium" 
                  style={{ color: '#FFF' }}>
                    {item.title}
                </Text>
              </Button>
            )}
          />
        </ScrollView>      
      </SafeAreaView> 
    </ThemedView>
  );
}