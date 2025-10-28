import { useEffect, useState } from 'react';
import { Text, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemeToggle } from '../src/components/ThemeToggle';
import { ThemedView } from '../src/components/ThemedView';

export default function HomeScreen() {
	const [loadingText, setLoadingText] = useState('Loading...');
	const router = useRouter();

	const checkIfLoadingComplete = async () => {
		try {
			const data = await fetch('http://localhost:3000/healthcheck');
			const response = await data.json();
			setLoadingText(response.message);
		} catch (error) {
			setLoadingText(JSON.stringify(error));
		}
	}

	useEffect(() => {
		checkIfLoadingComplete();
	}, []);

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
					{loadingText}
				</Text>

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
