import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Modal, Pressable, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Surface, Text, Button, TextInput } from 'react-native-paper';
import { createJournal } from '@/lib/api';

interface CreateJournalModalProps {
  visible: boolean;
  onDismiss: () => void;
  onSuccess: () => void;
}

export const CreateJournalModal: React.FC<CreateJournalModalProps> = ({
  visible,
  onDismiss,
  onSuccess,
}) => {
  const [title, setTitle] = useState('');
  const [entry, setEntry] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!title.trim() || !entry.trim()) {
      Alert.alert('Error', 'Please fill in both title and entry');
      return;
    }

    try {
      setLoading(true);
      await createJournal({
        title: title.trim(),
        entry: entry.trim(),
      });
      setTitle('');
      setEntry('');
      onSuccess();
    } catch (error: any) {
      Alert.alert('Error', 'Failed to create journal entry');
    } finally {
      setLoading(false);
    }
  };

  const handleDismiss = () => {
    if (loading) return;
    setTitle('');
    setEntry('');
    onDismiss();
  };

  return (
    <Modal visible={visible} onRequestClose={handleDismiss} transparent animationType="fade">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <Pressable style={styles.backdrop} onPress={handleDismiss}>
          <View style={styles.centerContainer}>
            <Surface style={styles.modal}>
              <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.content}>
                  <Text variant="headlineSmall" style={styles.title}>
                    New Journal Entry
                  </Text>

                  <TextInput
                    label="Title"
                    value={title}
                    onChangeText={setTitle}
                    mode="outlined"
                    editable={!loading}
                    style={styles.input}
                    maxLength={100}
                  />

                  <TextInput
                    label="Write your thoughts..."
                    value={entry}
                    onChangeText={setEntry}
                    mode="outlined"
                    multiline
                    numberOfLines={8}
                    editable={!loading}
                    style={[styles.input, styles.entryInput]}
                    maxLength={2000}
                  />

                  <View style={styles.buttonContainer}>
                    <Button
                      mode="contained"
                      onPress={handleCreate}
                      loading={loading}
                      disabled={loading}
                      style={styles.button}
                    >
                      Save Entry
                    </Button>
                    <Button
                      mode="outlined"
                      onPress={handleDismiss}
                      disabled={loading}
                      style={styles.button}
                    >
                      Cancel
                    </Button>
                  </View>
                </View>
              </ScrollView>
            </Surface>
          </View>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContainer: {
    width: '90%',
    maxHeight: '95%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    padding: 24,
  },
  title: {
    fontWeight: '600',
    color: '#6200EE',
    marginBottom: 20,
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  entryInput: {
    minHeight: 150,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    gap: 12,
    marginTop: 16,
  },
  button: {
    marginBottom: 8,
  },
});
