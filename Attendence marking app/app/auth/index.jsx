import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native"
import { useState } from "react"
import { useRouter } from "expo-router"
import { useAuth } from "@/context/AuthContext"

const AuthScreen = () => {

    const router = useRouter()
    const { login , isLoading } = useAuth()

    const [nic, setNic] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleLogin = async () => {
        if (!nic.trim() || !password.trim()) {
            setError('Please enter NIC number and password')
            return;
        }
        let resp = null;
        try {

            console.log('3.Attempting login with:', { nic, password });

            resp = await login(nic, password)

            console.log('4.Login successful');

            router.replace('/')
        } catch (error) {
            console.log('Login failed:', error)

            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log('5.Error data:', error.response.data);
                console.log('6.Error status:', error.response.status);
                console.log('7.Error headers:', error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.log('8.Error request:', error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('9.Error message:', error.message);
            }
            console.log('10.Error config:', error.config);
            setError('Invalid NIC number or password')
            Alert.alert('Login Failed', 'Invalid NIC number or password')
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Login</Text>

            {error ? <Text style={styles.errors}>{error}</Text> : null}

            <TextInput
                style={styles.input}
                value={nic}
                onChangeText={setNic}
                placeholder="NIC Number"
                placeholderTextColor='#aaa'
            />
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholderTextColor='#aaa'
                secureTextEntry
                placeholder="Password"
                textContentType="none"
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>




        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    header: {
        fontSize: 24,
        marginBottom: 24,
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        padding: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        marginBottom: 12,
        backgroundColor: '#fff',
        fontSize: 16,
    }, button: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    }, errors: {
        color: 'red',
        fontSize: 16,
        marginBottom: 12,
    }

})

export default AuthScreen