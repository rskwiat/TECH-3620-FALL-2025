import { useEffect } from 'react';
import { Text, FAB } from 'react-native-paper';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '../../src/components/ThemedView';
import { useAppStore } from '../../src/store/useAppStore';

export default function JournalsPage() {
  const { getJournals, user } = useAppStore();

  useEffect(() => {
    getJournals();
  }, []);

  return (
    <ThemedView>
      <SafeAreaView style={{ flex: 1 }}>
        <Text variant="displaySmall" style={{ marginHorizontal: 18, marginBottom: 20, fontWeight: 'bold' }}>
          Journals
        </Text>
        <FlatList
          data={user.journals}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <Text>{item.title}</Text>
              <Text>{item.entry}</Text>
            </View>
          )}
        />
        <FAB
          icon="draw"
          style={{
            position: 'absolute',
            margin: 16,
            right: 0,
            bottom: 0,
          }}
          onPress={() => console.log('text entry')}
        />
      </SafeAreaView> 
    </ThemedView>
  );
}