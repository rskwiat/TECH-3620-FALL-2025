import { useEffect, useState } from 'react';
import { Text, FAB, Modal, Portal } from 'react-native-paper';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '../../src/components/ThemedView';
import { useAppStore } from '../../src/store/useAppStore';

export default function JournalsPage() {
  const [visible, setVisible] = useState(false);
  const { getJournals, user } = useAppStore();

  const onDismiss = () => setVisible(false);
  const openModal = () => setVisible(true);

  useEffect(() => {
    getJournals();
  }, []);

  const containerStyle = {backgroundColor: '#fff', padding: 20};

  return (
    <ThemedView>
      <Portal>
              <Modal visible={visible} onDismiss={() => onDismiss()} containerStyle={containerStyle}>
        <Text>Entry Inputs</Text>
      </Modal>
      </Portal>
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={user?.journals || []}
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
          onPress={() => openModal()}
        />
      </SafeAreaView> 
    </ThemedView>
  );
}