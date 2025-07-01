import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Keyboard } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { useUser } from "@/hooks/useUser";
import { Link } from "expo-router";
import { useRouter } from "expo-router";
import { useLanguage } from "../../contexts/LanguageContext";
// import LanguageToggle from "../../components/LanguageToggle";
// import { logo } from "@/assets/logo/logo.png"; 

const AuthScreen = () => {

    const router = useRouter();

    const [nic, setNic] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const { login,loading,isAuthenticated } = useUser()

    const { t } = useLanguage();

    useEffect(() => {
        if(!loading && isAuthenticated) {
            router.replace('/'); // Redirect to home if authenticated
        }
    }, [loading, isAuthenticated]);



    async function handleLogin() {
        // Handle login logic here
        setError(null); 

        try {
            await login(nic, password);
            // Redirect to home or dashboard after successful login
            console.log("Login successful");
        } catch (error) {
            // console.error("Login failed:", error);
            setError(error.message || 'Login failed. Please try again.');
            
        }
    }


    return (
        <LinearGradient
            colors={['#f8f9fa', '#e9ecef']}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.card}>
                    <Image
                        source={require('@/assets/logo/logo.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />

                    <Text style={styles.title}>{t('welcomeBack')}</Text>
                    <Text style={styles.subtitle}>{t('enterCredentials')}</Text>

                    {/* <LanguageToggle /> */}

                    {error && <Text style={styles.errors}>{error}</Text>}



                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>{t('nicNumber')}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={t('enterNic')}
                            placeholderTextColor='#adb5bd'
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={setNic}
                            value={nic}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>{t('password')}</Text>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor='#adb5bd'
                            secureTextEntry
                            placeholder={t('enterPassword')}
                            textContentType="none"
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={setPassword}
                            value={password}
                        />
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleLogin} >
                        <LinearGradient
                            colors={['#4e54c8', '#8f94fb']}
                            style={styles.gradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}

                            
                        >
                            <Link href="/">
                            <Text style={styles.buttonText}>{t('login')}</Text>
                            </Link>
                            
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.forgotButton}>
                        <Text style={styles.forgotText}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>

            </TouchableWithoutFeedback>


        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    card: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 30,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    logo: {
        width: 120,
        height: 120,
        alignSelf: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#212529',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#6c757d',
        textAlign: 'center',
        marginBottom: 30,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        color: '#495057',
        marginBottom: 8,
        fontWeight: '500',
    },
    input: {
        width: '100%',
        padding: 15,
        borderWidth: 1,
        borderColor: '#e9ecef',
        borderRadius: 10,
        backgroundColor: '#f8f9fa',
        fontSize: 16,
        color: '#212529',
    },
    button: {
        width: '100%',
        borderRadius: 10,
        overflow: 'hidden',
        marginTop: 10,
    },
    gradient: {
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    forgotButton: {
        alignSelf: 'center',
        marginTop: 20,
    },
    forgotText: {
        color: '#4e54c8',
        fontSize: 14,
        fontWeight: '500',
    },errors: {
        color: 'red',
        fontSize: 16,
        marginBottom: 12,
        textAlign: 'center',
    },
});

export default AuthScreen;