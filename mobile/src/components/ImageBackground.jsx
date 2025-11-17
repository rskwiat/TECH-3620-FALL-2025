import { TouchableOpacity, ImageBackground, Text } from 'react-native';

export const ImageBackgroundButton = ({ source, openMeditationModal }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.4}
      onPress={() => openMeditationModal(source.id)}
    >
      <ImageBackground 
        source={source.image} 
        style={{ 
          height: 200, 
          flex: 1, 
          marginBottom: 30,
          shadowColor: '#171717',
          shadowOffset: {
            width: -2, height: 4
          },
          shadowOpacity: 0.2,
          shadowRadius: 3,
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
        }}>
      <Text
        style={{
          position: 'absolute',
          top: 50,
          fontSize: 75,
          fontWeight: 'bold',
          color: '#fff',
          textShadowColor: 'rgba(0, 0, 0, 0.75)',
          textShadowOffset: { width: -1, height: 1 },
          textShadowRadius: 10
        }}
      >
        {source.title}
      </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}