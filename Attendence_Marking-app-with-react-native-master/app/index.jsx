import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useUser } from '../hooks/useUser';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageToggle from '../components/LanguageToggle';

const Home = () => {
    const router = useRouter();
    const [error, setError] = useState(null);
    const { user, logout, loading, isAuthenticated } = useUser();

    const { t } = useLanguage();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.replace('/login');
        }
    }, [loading, isAuthenticated]);

    async function handleLogout() {
        setError(null);
        try {
            await logout();
            router.replace('/login');
        } catch (error) {
            setError(error.message || 'Logout failed. Please try again.');
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.greeting}>{t('greeting')}</Text>
                <Text style={styles.userName}>{user?.name || 'Guest'}</Text>
                <View style={styles.titleContainer}>
                    <Text style={styles.appTitle}>{t('appTitle')}</Text>
                </View>

                {error && <Text style={styles.errorText}>{error}</Text>}
            </View>

            <View style={styles.mainActions}>
                <View style={styles.actionCard}>
                    <Text style={styles.actionLabel}>{t('todayStatus')}</Text>
                    <View style={styles.statusContainer}>
                        <View style={[styles.statusDot, styles.pendingDot]} />
                        <Text style={styles.actionTime}>{t('notCheckedIn')}</Text>
                    </View>
                    <LanguageToggle />
                </View>

                <View style={styles.buttonGroup}>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.checkInButton, styles.disabledButton]}
                        disabled={true}
                    >
                        <Text style={styles.actionButtonText}>{t('checkIn')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.actionButton, styles.checkOutButton, styles.disabledButton]}
                        disabled={true}
                    >
                        <Text style={styles.actionButtonText}>{t('checkOut')}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={handleLogout}
                >
                    <Text style={styles.secondaryButtonText}>{t('logout')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 24,
        backgroundColor: '#f8fafc',
    },
    header: {
        alignItems: 'center',
        marginTop: 40,
        width: '100%',
    },
    greeting: {
        fontSize: 20,
        fontWeight: '400',
        color: '#64748b',
        marginBottom: 4,
    },
    userName: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: 16,
    },
    titleContainer: {
        backgroundColor: '#e0f2fe',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginBottom: 8,
    },
    appTitle: {
        fontSize: 22,
        fontWeight: '600',
        color: '#0369a1',
    },
    errorText: {
        color: '#ef4444',
        marginTop: 12,
        fontSize: 14,
        backgroundColor: '#fee2e2',
        padding: 8,
        borderRadius: 6,
        width: '100%',
        textAlign: 'center',
    },
    mainActions: {
        width: '100%',
        alignItems: 'center',
    },
    actionCard: {
        backgroundColor: '#ffffff',
        width: '100%',
        padding: 24,
        borderRadius: 16,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    actionLabel: {
        fontSize: 16,
        color: '#64748b',
        marginBottom: 12,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    statusDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    pendingDot: {
        backgroundColor: '#f59e0b',
    },
    actionTime: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1e293b',
    },
    buttonGroup: {
        width: '100%',
        gap: 12,
    },
    actionButton: {
        paddingVertical: 16,
        borderRadius: 12,
        width: '100%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    checkInButton: {
        backgroundColor: '#4f46e5',
    },
    checkOutButton: {
        backgroundColor: '#10b981',
    },
    actionButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    disabledButton: {
        opacity: 0.6,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    secondaryButton: {
        backgroundColor: '#ffffff',
        paddingVertical: 14,
        borderRadius: 12,
        width: '100%',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1,
    },
    secondaryButtonText: {
        color: '#64748b',
        fontSize: 16,
        fontWeight: '500',
    },
});