import { useEffect, useState } from 'react';
import { Text, Button, TextInput } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemeToggle } from '../src/components/ThemeToggle';
import { ThemedView } from '../src/components/ThemedView';
import { useAppStore } from '../src/store/useAppStore';

export default function RegisterScreen() {
	const { registerUser } = useAppStore();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const router = useRouter();
  
	const handleRegisterUser = async (email, password) => {
		try {
			const emailToLowerCase = email.toLowerCase();
			const passwordToLowerCase = password.toLowerCase();
			await registerUser(emailToLowerCase, passwordToLowerCase);
			router.navigate('/');
		} catch (error) {
			console.error('Regsitration failed:', error);
		}
	}

	return (
		<ThemedView>
			<SafeAreaView style={{ 
				flex: 1, 
				justifyContent: 'center'
			}}>

				<Text variant='displayMedium'>
					Please Register an account.
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
			
				<Button 
					mode="contained"
					style={{ marginVertical: 40 }}
					disabled={!email || !password}
					onPress={() => handleRegisterUser(email, password)}
				>
					Register an Account
				</Button>

			</SafeAreaView>
		</ThemedView>
	);
}
