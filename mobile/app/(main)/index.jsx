import { Text } from 'react-native-paper';
import { ImageBackground } from 'react-native';
import { ThemedView } from '../../src/components/ThemedView';

import beach from '../../assets/meditation-images/beach.jpg';

export default function GenericPage() {
  return (
    <ThemedView>
      <ImageBackground source={beach} style={{ flex: 1 }}>
        <Text>Generic Page Template</Text>
      </ImageBackground> 
    </ThemedView>
  );
}
