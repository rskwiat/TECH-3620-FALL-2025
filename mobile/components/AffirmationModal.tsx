import React from 'react';
import { StyleSheet, ScrollView, Image, View, Modal, Pressable } from 'react-native';
import { Surface, Text, Button } from 'react-native-paper';
import { Affirmation } from '@/lib/affirmation-gallery';

interface AffirmationModalProps {
  visible: boolean;
  affirmation: Affirmation | null;
  categoryTitle: string;
  onDismiss: () => void;
}

export const AffirmationModal: React.FC<AffirmationModalProps> = ({
  visible,
  affirmation,
  categoryTitle,
  onDismiss,
}) => {
  if (!affirmation) return null;

  return (
    <Modal visible={visible} onRequestClose={onDismiss} transparent animationType="fade">
      <Pressable style={styles.backdrop} onPress={onDismiss}>
        <View style={styles.centerContainer}>
          <Surface style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
              <View style={styles.content}>
            <Text variant="headlineMedium" style={styles.categoryTitle}>
              {categoryTitle}
            </Text>

            <Image source={affirmation.image} style={styles.image} />

            <Surface style={styles.affirmationBox} elevation={2}>
              <Text variant="bodyLarge" style={styles.affirmationText}>
                {affirmation.text}
              </Text>
            </Surface>

            <Button
              mode="contained"
              onPress={onDismiss}
              style={styles.button}
              labelStyle={styles.buttonLabel}
            >
              Close
            </Button>
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
    maxHeight: '90%',
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
  categoryTitle: {
    marginBottom: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: '#6200EE',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  affirmationBox: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 8,
    marginBottom: 24,
    elevation: 0,
  },
  affirmationText: {
    fontSize: 16,
    lineHeight: 26,
    color: '#333',
    textAlign: 'center',
  },
  button: {
    marginTop: 8,
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 16,
  },
});
