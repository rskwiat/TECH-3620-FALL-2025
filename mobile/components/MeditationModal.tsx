import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Image, Modal, Pressable } from 'react-native';
import { Surface, Text, Button } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Audio } from 'expo-av';
import { MeditationSession } from '@/lib/meditation-gallery';

interface MeditationModalProps {
  visible: boolean;
  meditation: MeditationSession | null;
  onDismiss: () => void;
}

export const MeditationModal: React.FC<MeditationModalProps> = ({
  visible,
  meditation,
  onDismiss,
}) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      // Clean up sound when component unmounts
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  useEffect(() => {
    if (!visible) {
      // Stop audio when modal closes
      if (sound && isPlaying) {
        sound.pauseAsync();
        setIsPlaying(false);
      }
    }
  }, [visible]);

  const loadAudio = async () => {
    try {
      setLoading(true);
      // Set audio mode for playback
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
        playsInSilentModeIOS: true,
      });

      if (sound) {
        await sound.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync(meditation!.audioPath);
      const status = await newSound.getStatusAsync();
      setSound(newSound);
      setDuration(status.durationMillis || 0);
      setCurrentTime(0);
      setLoading(false);
    } catch (error) {
      console.error('Error loading audio:', error);
      setLoading(false);
    }
  };

  const togglePlayPause = async () => {
    try {
      if (!sound) {
        await loadAudio();
        return;
      }

      const status = await sound.getStatusAsync();
      if (status.isLoaded) {
        if (status.isPlaying) {
          await sound.pauseAsync();
          setIsPlaying(false);
        } else {
          await sound.playAsync();
          setIsPlaying(true);
          // Update current time while playing
          const updateInterval = setInterval(async () => {
            const currentStatus = await sound.getStatusAsync();
            if (currentStatus.isLoaded && currentStatus.isPlaying) {
              setCurrentTime(currentStatus.positionMillis || 0);
            } else {
              clearInterval(updateInterval);
            }
          }, 100);
        }
      }
    } catch (error) {
      console.error('Error toggling playback:', error);
    }
  };

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (!meditation) return null;

  return (
    <Modal visible={visible} onRequestClose={onDismiss} transparent animationType="fade">
      <Pressable style={styles.backdrop} onPress={onDismiss}>
        <View style={styles.centerContainer}>
          <Surface style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
              <View style={styles.content}>
            <Text variant="headlineMedium" style={styles.title}>
              {meditation.title} Meditation
            </Text>

            {/* Image placeholder */}
            <Image source={meditation.image} style={styles.image} />

            {/* Progress bar */}
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${progressPercentage}%` },
                  ]}
                />
              </View>
              <View style={styles.timeContainer}>
                <Text variant="bodySmall">{formatTime(currentTime)}</Text>
                <Text variant="bodySmall">{formatTime(duration)}</Text>
              </View>
            </View>

            {/* Play/Pause button */}
            <View style={styles.controlsContainer}>
              <TouchableOpacity
                style={styles.playButton}
                onPress={togglePlayPause}
                disabled={loading}
              >
                <MaterialCommunityIcons
                  name={isPlaying ? 'pause' : 'play'}
                  size={48}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>

            {loading && (
              <Text variant="bodySmall" style={styles.loadingText}>
                Loading audio...
              </Text>
            )}

            <Button
              mode="outlined"
              onPress={onDismiss}
              style={styles.closeButton}
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
  title: {
    marginBottom: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: '#6200EE',
  },
  imagePlaceholder: {
    height: 200,
    borderRadius: 12,
    marginBottom: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    elevation: 0,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 24,
  },
  progressContainer: {
    marginBottom: 24,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6200EE',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  controlsContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#6200EE',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  loadingText: {
    textAlign: 'center',
    color: '#999',
    marginBottom: 12,
  },
  closeButton: {
    marginTop: 8,
  },
  buttonLabel: {
    fontSize: 14,
  },
});
