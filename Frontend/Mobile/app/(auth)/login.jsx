import { useUser } from "@/hooks/useUser";
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLanguage } from "../../contexts/LanguageContext";


const AuthScreen = () => {

    const router = useRouter();

    const [nic, setNic] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);

    const { login, loading, isAuthenticated } = useUser()

    const { t } = useLanguage();

    useEffect(() => {
        // Only redirect if authentication check is complete and user is authenticated
        if (!loading && isAuthenticated) {
            router.replace('/'); // Redirect to home if authenticated
        }
    }, [loading, isAuthenticated]);

    // Show loading screen while checking authentication
    if (loading) {
        return (
            <LinearGradient
                colors={['#f8f9fa', '#e9ecef']}
                style={styles.container}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={[styles.card, styles.loadingContainer]}>
                    <Text style={styles.loadingText}>Loading...</Text>
                </View>
            </LinearGradient>
        );
    }



    async function handleLogin() {
        // Handle login logic here
        setError(null);

        try {
            await login(nic, password);
            // Redirect to home or dashboard after successful login
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
                <SafeAreaView style={styles.card}>
                    <Image
                        source={require('@/assets/logo/logo2.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />

                    <Text style={styles.title}>{t('welcomeBack')}</Text>
                    <Text style={styles.subtitle}>{t('enterCredentials')}</Text>

                    {/* <LanguageToggle /> */}

                    {error && <Text style={styles.errors}>{error}</Text>}


                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        keyboardVerticalOffset={10}

                    >
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>{t('nicNumber')}</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={t('enterNic')}
                                placeholderTextColor='#adb5bd'
                                autoCapitalize="none"
                                autoCorrect={false}
                                maxLength={12}
                                onChangeText={text => {
                                    // Only allow numbers and V/v, up to 12 chars
                                    const filtered = text.replace(/[^0-9Vv]/g, '');
                                    setNic(filtered);
                                }}
                                value={nic}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>{t('password')}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TextInput
                                    style={[styles.input, { flex: 1 }]}
                                    placeholderTextColor='#adb5bd'
                                    secureTextEntry={!showPassword}
                                    placeholder={t('enterPassword')}
                                    textContentType="none"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    onChangeText={setPassword}
                                    value={password}
                                />
                                <TouchableOpacity
                                    onPress={() => setShowPassword((prev) => !prev)}
                                    style={{ position: 'absolute', right: 10 }}
                                    accessibilityLabel={showPassword ? t('hidePassword') : t('showPassword')}
                                >
                                    <Ionicons
                                        name={showPassword ? 'eye-off' : 'eye'}
                                        size={22}
                                        color="#adb5bd"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>

                    <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                        <LinearGradient
                            colors={['#4e54c8', '#8f94fb']}
                            style={styles.gradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <Text style={styles.buttonText}>
                                {loading ? t('loading') || 'Loading...' : t('login')}
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    {/* <TouchableOpacity style={styles.forgotButton}>
                        <Text style={styles.forgotText}>Forgot Password?</Text>
                    </TouchableOpacity> */}
                </SafeAreaView>

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
        marginTop: -90,
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
    }, errors: {
        color: 'red',
        fontSize: 16,
        marginBottom: 12,
        textAlign: 'center',
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 18,
        color: '#64748b',
        fontWeight: '500',
    },
});

export default AuthScreen;