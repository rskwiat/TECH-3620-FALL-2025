import { useEffect, useRef } from "react";
import { Tabs, Redirect, useRouter } from "expo-router";
import { View, Alert } from 'react-native';
import { Appbar } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useAppStore } from '../../src/store/useAppStore';

function Navbar({ route, options }) {
  const router = useRouter();
  const { logoutUser } = useAppStore();

  const getCurrentPageTitle = (routeName) => {
    const pages = {
      'index': 'Meditation',
      'affirmations': 'Affirmations', 
      'journals': 'Daily Journals'
    };
    return pages[routeName] || 'App';
  };

  return (
    <Appbar.Header mode="small">
      <Appbar.Action icon="account" onPress={() => {
        Alert.alert("Sign out", "Are you sure?",
          [
            {
              text: "Cancel",
              onPress: () => {}
            },
            {
              text: "Ok",
              onPress: () => {
                logoutUser();
                router.dismissAll()
                // router.replace('/');
              },
              style: 'destructive'
            }
          ]
        )
      }} />
      <Appbar.Content title={getCurrentPageTitle(route.name)} />
      <Appbar.Action icon="cog" onPress={() => 
        router.navigate('/settings')} />
    </Appbar.Header>
  );
}

export default function MainLayout() {
  const { user } = useAppStore();

  if (!user) return null;

  const pages = [
    { name: 'index', title: 'Meditation', icon: 'spa' },
    { name: 'affirmations', title: 'Affirmations', icon: 'sunny' },
    { name: 'journals', title: 'Daily Journals', icon: 'draw'}
  ];

  return (
    <View style={{ flex: 1 }}>
      <Tabs screenOptions={{
        header: (props) => <Navbar {...props} />,
      }}>
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