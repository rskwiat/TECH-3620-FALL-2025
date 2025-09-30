import { Tabs } from "expo-router";
import { View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function MainLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name="index"
          options={{
            title: "Meditation",
            tabBarIcon: ({ color }) => {
              return (
                <MaterialIcons size={24} name='spa' color={color} />
              )
            }
          }}
        />
      </Tabs>
    </View>
  );
};
