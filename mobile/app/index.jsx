import { useEffect, useState } from 'react';
import { Text, Button, TextInput } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemeToggle } from '../src/components/ThemeToggle';
import { ThemedView } from '../src/components/ThemedView';
import { useAppStore } from '../src/store/useAppStore';

export default function HomeScreen() {
	const { registerUser, loginUser, message } = useAppStore();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const router = useRouter();

	const handleNavigation = (href) => {
		router.navigate(href);
	}

	const handleLogin = async (email, password) => {
		try {
			const emailToLowerCase = email.toLowerCase();
			const passwordToLowerCase = password.toLowerCase();
			const { status } = await loginUser(emailToLowerCase, passwordToLowerCase);

			if (status === 200) {
				router.navigate('/(main)');
			}

		} catch (error) {
			console.error('Login failed:', error);
		}
	}

	return (
		<ThemedView>
			<SafeAreaView style={{ 
				flex: 1, 
				justifyContent: 'center'
			}}>

				<Text variant='displayMedium'>
					Please Sign In or Register to continue
				</Text>
				
				<TextInput
					label="Email"
					value={email}
					mode="outlined"
					autocapitalize="none"
					onChangeText={(text) => setEmail(text)}
				/>

				<TextInput
					label="Password"
					value={password}
					mode="outlined"
					autocapitalize="none"
					secureTextEntry
					onChangeText={(text) => setPassword(text)}
				/>

				{message && 
					<Text variant="headlineSmall" style={{ color: "red" }}>{message}</Text>}
			
				<Button 
					mode="contained"
					style={{ marginVertical: 40 }}
					disabled={!email || !password}
					onPress={() => handleLogin(email, password)}
				>
					Login
				</Button>

				<Button 
					onPress={() => handleNavigation('/register')}>
					Register an Account
				</Button>

				<Button
					onPress={() => handleNavigation('/forgot-password')}>
					Forgot Password?
				</Button>

			</SafeAreaView>
		</ThemedView>
	);
}
