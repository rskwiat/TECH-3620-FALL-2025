import { Text, Button } from 'react-native-paper';
import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ThemedView } from '../../src/components/ThemedView';

import AFFIRMATION_GALLERY from '../../src/constants/affirmation-gallery';

export default function DynamicRoute() {
  const { id } = useLocalSearchParams(); // id is the title of the affirmation
  const affirmationItem = AFFIRMATION_GALLERY.find(item => item.title === id);

  const randomIndex = Math.floor(Math.random() * affirmationItem.data.length);
  const randomAffirmation = affirmationItem.data[randomIndex].text;
  const randomImage = affirmationItem.data[randomIndex].image;

  return (
    <ThemedView>
      <Text variant="">
        {randomAffirmation}
      </Text> 
    </ThemedView>
  );
}
