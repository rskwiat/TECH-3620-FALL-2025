import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Modal, Pressable, Alert } from 'react-native';
import { Surface, Text, Button, ActivityIndicator } from 'react-native-paper';
import { JournalEntry, deleteJournal, updateJournal } from '@/lib/api';

interface JournalModalProps {
  visible: boolean;
  journal: JournalEntry | null;
  onDismiss: () => void;
  onRefresh: () => void;
}

export const JournalModal: React.FC<JournalModalProps> = ({
  visible,
  journal,
  onDismiss,
  onRefresh,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(journal?.title || '');
  const [editedEntry, setEditedEntry] = useState(journal?.entry || '');
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (journal) {
      setEditedTitle(journal.title);
      setEditedEntry(journal.entry);
      setIsEditing(false);
    }
  }, [journal, visible]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleSave = async () => {
    if (!journal) return;

    try {
      setLoading(true);
      await updateJournal(journal.id, {
        title: editedTitle,
        entry: editedEntry,
      });
      setIsEditing(false);
      onRefresh();
    } catch (error: any) {
      Alert.alert('Error', 'Failed to save journal');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    if (!journal) return;

    Alert.alert(
      'Delete Journal',
      'Are you sure you want to delete this entry? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);
              await deleteJournal(journal.id);
              onDismiss();
              onRefresh();
            } catch (error: any) {
              Alert.alert('Error', 'Failed to delete journal');
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  if (!journal) return null;

  return (
    <Modal visible={visible} onRequestClose={onDismiss} transparent animationType="fade">
      <Pressable style={styles.backdrop} onPress={onDismiss}>
        <View style={styles.centerContainer}>
          <Surface style={styles.container}>
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.content}>
                {isEditing ? (
                  <>
                    <Text variant="labelSmall" style={styles.label}>
                      TITLE
                    </Text>
                    <Surface style={styles.input} elevation={0}>
                      <Text
                        style={styles.inputText}
                        onPress={() => {
                          /* For demo, just display */
                        }}
                      >
                        {editedTitle}
                      </Text>
                    </Surface>

                    <Text variant="labelSmall" style={[styles.label, { marginTop: 16 }]}>
                      ENTRY
                    </Text>
                    <Surface style={[styles.input, styles.entryInput]} elevation={0}>
                      <Text style={styles.inputText}>{editedEntry}</Text>
                    </Surface>
                  </>
                ) : (
                  <>
                    <Text variant="headlineSmall" style={styles.title}>
                      {journal.title}
                    </Text>
                    <Text variant="bodySmall" style={styles.date}>
                      {formatDate(journal.created_at)}
                    </Text>

                    <Surface style={styles.entryBox} elevation={0}>
                      <Text variant="bodyMedium" style={styles.entryText}>
                        {journal.entry}
                      </Text>
                    </Surface>
                  </>
                )}

                <View style={styles.buttonContainer}>
                  {isEditing ? (
                    <>
                      <Button
                        mode="contained"
                        onPress={handleSave}
                        loading={loading}
                        disabled={loading}
                        style={styles.button}
                      >
                        Save
                      </Button>
                      <Button
                        mode="outlined"
                        onPress={() => {
                          setIsEditing(false);
                          setEditedTitle(journal.title);
                          setEditedEntry(journal.entry);
                        }}
                        disabled={loading}
                        style={styles.button}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        mode="contained"
                        onPress={() => setIsEditing(true)}
                        disabled={loading}
                        style={styles.button}
                      >
                        Edit
                      </Button>
                      <Button
                        mode="contained-tonal"
                        onPress={handleDelete}
                        loading={loading}
                        disabled={loading}
                        style={[styles.button, styles.deleteButton]}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                  <Button
                    mode="text"
                    onPress={onDismiss}
                    disabled={loading}
                    style={styles.button}
                  >
                    Close
                  </Button>
                </View>
              </View>
            </ScrollView>
          </Surface>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
  container: {
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
    marginBottom: 8,
  },
  date: {
    color: '#999',
    marginBottom: 24,
  },
  label: {
    color: '#999',
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    minHeight: 50,
  },
  inputText: {
    fontSize: 16,
    color: '#333',
  },
  entryInput: {
    minHeight: 150,
  },
  entryBox: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    marginBottom: 24,
  },
  entryText: {
    color: '#333',
    lineHeight: 24,
  },
  buttonContainer: {
    gap: 12,
    marginTop: 16,
  },
  button: {
    marginBottom: 8,
  },
  deleteButton: {
    backgroundColor: '#ffebee',
  },
});
