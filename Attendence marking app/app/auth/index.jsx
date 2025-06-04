import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import i18n from "@/locales/i18n";

const AuthScreen = () => {
    const router = useRouter();
    const { login, isLoading } = useAuth();
    const { language } = useLanguage();

    const [nic, setNic] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Update i18n locale when language changes
    useEffect(() => {
        if (language) {
            i18n.locale = language;
        }
    }, [language]);

    const handleLogin = async () => {
        if (!nic.trim() || !password.trim()) {
            setError(i18n.t('pleaseEnterCredentials'));
            return;
        }
        
        try {
            await login(nic, password);
            router.replace('/');
        } catch (error) {
            console.log('Login failed:', error);
            setError(i18n.t('invalidCredentials'));
            Alert.alert(i18n.t('loginFailed'), i18n.t('invalidCredentials'));
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{i18n.t('login')}</Text>

            {error ? <Text style={styles.errors}>{error}</Text> : null}

            <TextInput
                style={styles.input}
                value={nic}
                onChangeText={setNic}
                placeholder={i18n.t('nicNumber')}
                placeholderTextColor='#aaa'
            />
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholderTextColor='#aaa'
                secureTextEntry
                placeholder={i18n.t('password')}
                textContentType="none"
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>{i18n.t('login')}</Text>
            </TouchableOpacity>
        </View>
    );
};

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
    }, 
    button: {
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
    }, 
    errors: {
        color: 'red',
        fontSize: 16,
        marginBottom: 12,
    }
});

export default AuthScreen;