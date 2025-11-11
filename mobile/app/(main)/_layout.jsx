import { Tabs, Redirect } from "expo-router";
import { View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAppStore } from '../../src/store/useAppStore';

export default function MainLayout() {
  const { user } = useAppStore();
  console.log(user);
  if (!user) {
    return <Redirect href="./settings" />;
  }

  const pages = [
    { name: 'index', title: 'Meditation', icon: 'spa' },
    { name: 'affirmations', title: 'Affirmations', icon: 'sunny' },
  ];

  return (
    <View style={{ flex: 1 }}>
      <Tabs screenOptions={{ headerShown: false }}>
        {pages.map((page) => (
          <Tabs.Screen
            key={page.name}
            name={page.name}
            options={{
              title: page.title,
              tabBarIcon: ({ color }) => {
                return (
                  <MaterialIcons size={24} name={page.icon} color={color} />
                )
              }
            }}
          />
        ))}
      </Tabs>
    </View>
  );
};