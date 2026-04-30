import { Tabs } from 'expo-router';
import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#6200EE',
        tabBarInactiveTintColor: colorScheme === 'dark' ? '#666' : '#999',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? '#1e1e1e' : '#fff',
          borderTopColor: colorScheme === 'dark' ? '#333' : '#eee',
        },
      }}
      sceneContainerStyle={{ backgroundColor: colorScheme === 'dark' ? '#121212' : '#f5f5f5' }}
    >
      <Tabs.Screen
        name="affirmations"
        options={{
          title: 'Affirmations',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="star-circle" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="meditation"
        options={{
          title: 'Meditation',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="meditation" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="journals"
        options={{
          title: 'Journal',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="notebook" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
