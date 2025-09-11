import { Tabs } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function MainLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>

          <Tabs.Screen name="index" options={{ 
            tabBarIcon: ({ color }) => <MaterialIcons name="spa" size={24} color={color} />,
            tabBarLabel: 'Meditation' }} />
    </Tabs>
  );
}
