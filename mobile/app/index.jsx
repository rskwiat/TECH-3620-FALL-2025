import { useEffect, useState } from 'react';
import { Text, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemeToggle } from '../src/components/ThemeToggle';
import { ThemedView } from '../src/components/ThemedView';
import { useAppStore } from '../src/store/useAppStore';

export default function HomeScreen() {
	const { registerUser, loginUser, message } = useAppStore();
	const router = useRouter();

	const handleNavigation = (href) => {
		router.navigate(href);
	}

	return (
		<ThemedView>
			<SafeAreaView style={{ 
				flex: 1, 
				justifyContent: 'center'
			}}>
				<Text variant='displayLarge'>
					Welcome, **your name** 👋 
					{message}
				</Text>

				<Button mode="contained" 
					style={{ marginVertical: 40 }
				}
					onPress={() => registerUser('email1@example.com', 'password')}
				>Register User</Button>
				<Button mode="contained" 
				onPress={() => loginUser('email1@example.com', 'password')}>Login User</Button>

				<Button
					style={{
						marginVertical: 40,
					}}
					mode="contained" 
					onPress={() => handleNavigation('/(main)')}
				>
					Namaste
				</Button>
				<Button
					mode="contained"
					onPress={() => handleNavigation('/settings')}  
				>
					Settings
				</Button>

			</SafeAreaView>
		</ThemedView>
	);
}
