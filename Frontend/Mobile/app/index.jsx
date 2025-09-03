import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button, ActivityIndicator, Alert } from 'react-native';

import { useUser } from '../hooks/useUser';
import { useLocation } from '../hooks/useLocation';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageToggle from '../components/LanguageToggle';
import { initializeLocation } from '../utils/permissions';

const Home = () => {
    const router = useRouter();
    const [error, setError] = useState(null);
    const { user, logout, loading, isAuthenticated } = useUser();

    const {
        currentLocation,
        assignedLocation,
        dutyInfo,
        locationStatus,
        isLoading,
        error: locationError,
        performLocationCheck,
        fetchTodaysDutyLocation,
        performCheckIn,
        performCheckOut,
    } = useLocation();
    const { t } = useLanguage();

    // Initialize location services on mount
    useEffect(() => {
        const setupLocation = async () => {
            const isLocationReady = await initializeLocation();
            if (!isLocationReady) {
                console.log('Location initialization failed');
            }
        };
        setupLocation();
    }, []);

    // Handle authentication redirects
    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.replace('/login');
        }
    }, [loading, isAuthenticated]);

    // Fetch today's duty location when authenticated
    useEffect(() => {
        if (isAuthenticated && !loading) {
            fetchTodaysDutyLocation().catch(console.error);
        }
    }, [isAuthenticated, loading]);

    const handleCheckLocation = async () => {
        try {
            await performLocationCheck();
            if (locationStatus) {
                Alert.alert('Location Check', locationStatus.message, [{ text: 'OK' }]);
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    const handleCheckIn = async () => {
        try {
            const result = await performCheckIn();
            Alert.alert(
                'Check-in Successful', 
                `You have successfully checked in at ${new Date().toLocaleTimeString()}`,
                [{ text: 'OK' }]
            );
            // Refresh duty location to get updated status
            await fetchTodaysDutyLocation();
        } catch (error) {
            Alert.alert('Check-in Failed', error.message, [{ text: 'OK' }]);
        }
    };

    const handleCheckOut = async () => {
        Alert.alert(
            'Confirm Check-out',
            'Are you sure you want to check out?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Check Out',
                    onPress: async () => {
                        try {
                            const result = await performCheckOut();
                            Alert.alert(
                                'Check-out Successful',
                                `You have successfully checked out at ${new Date().toLocaleTimeString()}`,
                                [{ text: 'OK' }]
                            );
                            // Refresh duty location to get updated status
                            await fetchTodaysDutyLocation();
                        } catch (error) {
                            Alert.alert('Check-out Failed', error.message, [{ text: 'OK' }]);
                        }
                    }
                }
            ]
        );
    };

    const handleLogout = async () => {
        setError(null);
        try {
            await logout();
            router.replace('/login');
        } catch (error) {
            setError(error.message || 'Logout failed. Please try again.');
        }
    };

    const getStatusColor = () => {
        if (!locationStatus) return '#6B7280';
        return locationStatus.isInRange ? '#10B981' : '#EF4444';
    };

    const canCheckIn = () => {
        return dutyInfo && locationStatus && locationStatus.isInRange && !isLoading;
    };

    const canCheckOut = () => {
        return dutyInfo && !isLoading;
    };

    // Loading states
    if (loading) {
        return (
            <View style={[styles.container, styles.centered]}>
                <ActivityIndicator size="large" color="#4F46E5" />
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    if (isLoading && !currentLocation) {
        return (
            <View style={[styles.container, styles.centered]}>
                <ActivityIndicator size="large" color="#4F46E5" />
                <Text style={styles.loadingText}>Loading location data...</Text>
            </View>
        );
    }

    if (!isAuthenticated) {
        return null; // Prevent flash before redirect
    }

    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <View style={styles.welcomeCard}>
                    <Text style={styles.greeting}>{t('greeting')}</Text>
                    <Text style={styles.userName}>{user?.name || 'Guest user'}</Text>
                </View>

                <LanguageToggle />

                {(error || locationError) && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>
                            {error || locationError}
                        </Text>
                    </View>
                )}
            </View>

            {/* Duty Information Section */}
            {dutyInfo ? (
                <View style={styles.dutySection}>
                    <Text style={styles.sectionTitle}>Today's Duty</Text>
                    <View style={styles.dutyCard}>
                        <Text style={styles.dutyText}>Duty ID: {dutyInfo.dutyId}</Text>
                        <Text style={styles.dutyText}>Location: {assignedLocation ? 'Assigned' : 'Loading...'}</Text>
                    </View>
                </View>
            ) : (
                <View style={styles.dutySection}>
                    <Text style={styles.sectionTitle}>Today's Duty</Text>
                    <View style={styles.noDutyCard}>
                        <Text style={styles.noDutyText}>No duty assigned for today</Text>
                    </View>
                </View>
            )}

            {/* Location Status Section */}
            <View style={styles.locationSection}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Location Status</Text>
                    <TouchableOpacity
                        style={styles.refreshButton}
                        onPress={handleCheckLocation}
                        disabled={isLoading || !dutyInfo}
                    >
                        <Text style={styles.refreshButtonText}>
                            {isLoading ? 'Checking...' : 'Check Now'}
                        </Text>
                    </TouchableOpacity>
                </View>

                {assignedLocation && dutyInfo && (
                    <View style={{ marginBottom: 15 }}>
                        <Text style={{ fontWeight: 'bold' }}>
                            Assigned Location: Duty Location (Lat: {assignedLocation.latitude.toFixed(6)}, Lng: {assignedLocation.longitude.toFixed(6)})
                        </Text>
                    </View>
                )}

                {locationStatus ? (
                    <View style={[
                        styles.statusCard,
                        {
                            backgroundColor: locationStatus.isInRange ? '#ECFDF5' : '#FEF2F2',
                            borderLeftColor: getStatusColor()
                        }
                    ]}>
                        <View style={styles.statusHeader}>
                            <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
                            <Text style={[styles.statusTitle, { color: getStatusColor() }]}>
                                {locationStatus.isInRange ? 'IN RANGE' : 'OUT OF RANGE'}
                            </Text>
                        </View>
                        <Text style={styles.statusMessage}>{locationStatus.message}</Text>
                    </View>
                ) : (
                    <View style={styles.noStatusCard}>
                        <Text style={styles.noStatusText}>
                            {dutyInfo ? 'No location check performed yet' : 'No duty assigned - location check unavailable'}
                        </Text>
                    </View>
                )}

                {isLoading && (
                    <View style={styles.loadingIndicator}>
                        <ActivityIndicator color="#4F46E5" />
                        <Text style={styles.loadingSubtext}>Checking location...</Text>
                    </View>
                )}
            </View>

            {/* Action Buttons Section */}
            <View style={styles.actionsSection}>
                <Text style={styles.sectionTitle}>Quick Actions</Text>

                <View style={styles.buttonGroup}>
                    <TouchableOpacity
                        style={[
                            styles.actionButton, 
                            styles.checkInButton,
                            !canCheckIn() && styles.disabledButton
                        ]}
                        onPress={handleCheckIn}
                        disabled={!canCheckIn()}
                    >
                        <Text style={[
                            styles.actionButtonText,
                            !canCheckIn() && styles.disabledButtonText
                        ]}>
                            {t('checkIn')}
                        </Text>
                        {!dutyInfo && (
                            <Text style={styles.comingSoonText}>No Duty Today</Text>
                        )}
                        {dutyInfo && (!locationStatus || !locationStatus.isInRange) && (
                            <Text style={styles.comingSoonText}>Must be in range</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.actionButton, 
                            styles.checkOutButton,
                            !canCheckOut() && styles.disabledButton
                        ]}
                        onPress={handleCheckOut}
                        disabled={!canCheckOut()}
                    >
                        <Text style={[
                            styles.actionButtonText,
                            !canCheckOut() && styles.disabledButtonText
                        ]}>
                            {t('checkOut')}
                        </Text>
                        {!dutyInfo && (
                            <Text style={styles.comingSoonText}>No Duty Today</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutButtonText}>{t('logout')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 20,
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Header Styles
    header: {
        marginBottom: 30,
    },
    welcomeCard: {
        backgroundColor: '#FFFFFF',
        padding: 24,
        borderRadius: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
        alignItems: 'center',
    },
    greeting: {
        fontSize: 18,
        fontWeight: '400',
        color: '#6B7280',
        marginBottom: 8,
    },
    userName: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1F2937',
        textAlign: 'center',
    },
    errorContainer: {
        backgroundColor: '#FEE2E2',
        padding: 12,
        borderRadius: 8,
        borderLeftWidth: 4,
        borderLeftColor: '#EF4444',
    },
    errorText: {
        color: '#DC2626',
        fontSize: 14,
        fontWeight: '500',
    },

    // Location Section Styles
    locationSection: {
        marginBottom: 30,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1F2937',
    },
    refreshButton: {
        backgroundColor: '#4F46E5',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    refreshButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '500',
    },
    statusCard: {
        padding: 16,
        borderRadius: 12,
        borderLeftWidth: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    statusHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    statusDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 8,
    },
    statusTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    statusMessage: {
        fontSize: 14,
        color: '#6B7280',
        lineHeight: 20,
    },
    noStatusCard: {
        backgroundColor: '#F9FAFB',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        alignItems: 'center',
    },
    noStatusText: {
        color: '#6B7280',
        fontSize: 14,
        fontStyle: 'italic',
    },

    // Actions Section Styles
    actionsSection: {
        flex: 1,
        marginBottom: 20,
    },
    buttonGroup: {
        gap: 12,
        marginTop: 16,
    },
    actionButton: {
        paddingVertical: 20,
        paddingHorizontal: 24,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    checkInButton: {
        backgroundColor: '#4F46E5',
    },
    checkOutButton: {
        backgroundColor: '#10B981',
    },
    actionButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 4,
    },
    comingSoonText: {
        color: '#FFFFFF',
        fontSize: 12,
        opacity: 0.8,
        fontStyle: 'italic',
    },
    disabledButton: {
        opacity: 0.6,
    },

    // Footer Styles
    footer: {
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
    },
    logoutButton: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1,
    },
    logoutButtonText: {
        color: '#6B7280',
        fontSize: 16,
        fontWeight: '500',
    },

    // Loading Styles
    loadingText: {
        fontSize: 16,
        color: '#6B7280',
        fontWeight: '500',
        marginTop: 12,
    },
    loadingSubtext: {
        fontSize: 14,
        color: '#6B7280',
        marginLeft: 8,
    },
    loadingIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
        padding: 12,
        backgroundColor: '#F9FAFB',
        borderRadius: 8,
    },
});