import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import LanguageToggle from "../components/LanguageToggle";
import { useLanguage } from "../contexts/LanguageContext";
import { useLocation } from "../hooks/useLocation";
import { useUser } from "../hooks/useUser";
import { initializeLocation } from "../utils/permissions";

const Home = () => {
  const insets = useSafeAreaInsets();
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
    fetchDutyStatus,
    statusInfo, //for already checked in/out checking
  } = useLocation();

  const { t } = useLanguage();

  // Fetch duty status when dutyId is available
  useEffect(() => {
    if (dutyInfo?.dutyId) fetchDutyStatus();
  }, [dutyInfo]);

  // Initialize location services on mount
  useEffect(() => {
    (async () => {
      const isLocationReady = await initializeLocation();
    })();
  }, []);

  // Redirect unauthenticated users
  useEffect(() => {
    if (!loading && !isAuthenticated) router.replace("/login");
  }, [loading, isAuthenticated]);

  // Fetch today's duty location when authenticated
  useEffect(() => {
    if (isAuthenticated && !loading) fetchTodaysDutyLocation().catch(console.error);
  }, [isAuthenticated, loading]);

  const handleCheckLocation = async () => {
    try {
      await performLocationCheck();
      if (locationStatus) {
        Alert.alert("Location Check", locationStatus.message, [{ text: "OK" }]);
      }
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  // Refresh app state after check-in/check-out
  const handleCheckIn = async () => {
    Alert.alert(t("checkIn"), t("areYouSureCheckIn") || "Are you sure you want to check in?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        style: "default",
        onPress: async () => {
          try {
            await performCheckIn();
            await fetchDutyStatus();
            await performLocationCheck();
          } catch (err) {
            Alert.alert("Error", err.message || "Check In failed");
          }
        },
      },
    ]);
  };

  const handleCheckOut = async () => {
    Alert.alert(t("checkOut"), t("areYouSureCheckOut") || "Are you sure you want to check out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        style: "default",
        onPress: async () => {
          try {
            await performCheckOut();
            await fetchDutyStatus();
            await performLocationCheck();
          } catch (err) {
            Alert.alert("Error", err.message || "Check Out failed");
          }
        },
      },
    ]);
  };

  const handleLogout = async () => {
    Alert.alert(t("logout"), t("areYouSureLogout") || "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        style: "destructive",
        onPress: async () => {
          setError(null);
          try {
            await logout();
            router.replace("/login");
          } catch (err) {
            setError(err.message || "Logout failed. Please try again.");
          }
        },
      },
    ]);
  };

  const getStatusColor = () => {
    if (!locationStatus) return "#6B7280";
    return locationStatus.isInRange ? "#10B981" : "#EF4444";
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

  if (!isAuthenticated) return null; // Prevent flash before redirect

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.welcomeCard}>
              <View
                style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                <Text style={[styles.greeting, { marginBottom: 0 }]}>{t("greeting")}</Text>
                <Text style={[styles.userName, { marginLeft: 6 }]}>{user?.name || t("guest")}</Text>
              </View>
            </View>

            <LanguageToggle />

            {(error || locationError) && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error || locationError}</Text>
              </View>
            )}
          </View>

          {/* Duty Info */}
          <View style={styles.dutySection}>
            <Text style={styles.sectionTitle}>{t("todaysDuty")}</Text>
            {dutyInfo ? (
              <View style={styles.dutyCard}>
                <Text style={styles.dutyText}>
                  {t("location")}: {assignedLocation ? `${assignedLocation.name}` : "Loading..."}
                </Text>
              </View>
            ) : (
              <View style={styles.noDutyCard}>
                <Text style={styles.noDutyText}>{t("noDuty")}</Text>
              </View>
            )}
          </View>

          {/* Location Status */}
          <View style={styles.locationSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{t("locationStatus")}</Text>
              <TouchableOpacity
                style={styles.refreshButton}
                onPress={handleCheckLocation}
                disabled={isLoading || !dutyInfo}>
                <Text style={styles.refreshButtonText}>
                  {isLoading ? t("checking") : t("checkNow")}
                </Text>
              </TouchableOpacity>
            </View>

            {/* {currentLocation && (
                            <View style={{ marginBottom: 15 }}>
                                <Text style={{ fontWeight: 'bold' }}>Current Location:</Text>
                                <Text>
                                    Lat: {currentLocation.latitude}, Lng: {currentLocation.longitude}
                                </Text>
                            </View>
                        )} */}

            {locationStatus ? (
              <View
                style={[
                  styles.statusCard,
                  {
                    backgroundColor: locationStatus.isInRange ? "#ECFDF5" : "#FEF2F2",
                    borderLeftColor: getStatusColor(),
                  },
                ]}>
                <View style={styles.statusHeader}>
                  <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
                  <Text style={[styles.statusTitle, { color: getStatusColor() }]}>
                    {locationStatus.isInRange ? t("inRange") : t("outOfRange")}
                  </Text>
                </View>
                <Text style={styles.statusMessage}>{locationStatus.message}</Text>
              </View>
            ) : (
              <View style={styles.noStatusCard}>
                <Text style={styles.noStatusText}>
                  {dutyInfo ? t("noLocationCheck") : t("noLocationDuty")}
                </Text>
              </View>
            )}

            {isLoading && (
              <View style={styles.loadingIndicator}>
                <ActivityIndicator color="#4F46E5" />
                <Text style={styles.loadingSubtext}>{t("checkingLocation")}</Text>
              </View>
            )}
          </View>

          {/* Quick Actions */}
          <View style={styles.actionsSection}>
            <Text style={styles.sectionTitle}>{t("quickActions")}</Text>

            <View style={styles.buttonGroup}>
              {/* Check In Button */}
              <TouchableOpacity
                onPress={handleCheckIn}
                disabled={
                  !locationStatus?.isInRange || statusInfo?.isCheckedIn || statusInfo?.isCheckedOut
                }
                style={[
                  styles.actionButton,
                  (!locationStatus?.isInRange ||
                    statusInfo?.isCheckedIn ||
                    statusInfo?.isCheckedOut) &&
                    styles.disabledButton,
                ]}>
                <Text style={styles.buttonText}>
                  {statusInfo?.isCheckedIn
                    ? t("alreadyCheckedIn")
                    : statusInfo?.isCheckedOut
                    ? t("alreadyCheckedOut")
                    : t("checkIn")}
                </Text>
              </TouchableOpacity>

              {/* Check Out Button */}
              <TouchableOpacity
                onPress={handleCheckOut}
                disabled={
                  !locationStatus?.isInRange || !statusInfo?.isCheckedIn || statusInfo?.isCheckedOut
                }
                style={[
                  styles.actionButton,
                  (!locationStatus?.isInRange ||
                    !statusInfo?.isCheckedIn ||
                    statusInfo?.isCheckedOut) &&
                    styles.disabledButton,
                ]}>
                <Text style={styles.buttonText}>
                  {statusInfo?.isCheckedOut ? t("alreadyCheckedOut") : t("checkOut")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer */}
          <View style={[styles.footer, { paddingBottom: 24 + (insets.bottom || 0) }]}>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>{t("logout")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 30,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },

  /* ---------- Header ---------- */
  header: { marginBottom: 24 },
  welcomeCard: {
    backgroundColor: "#FFFFFF",
    padding: 17,
    borderRadius: 22,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    alignItems: "center",
    width: "100%",
  },
  greeting: { fontSize: 18, fontWeight: "400", color: "#64748B", marginBottom: 8 },
  userName: { fontSize: 28, fontWeight: "800", color: "#111827", textAlign: "center" },

  errorContainer: {
    backgroundColor: "#FEE2E2",
    padding: 16,
    borderRadius: 14,
    borderLeftWidth: 6,
    borderLeftColor: "#DC2626",
    marginTop: 10,
  },
  errorText: { color: "#B91C1C", fontSize: 15, fontWeight: "600" },

  /* ---------- Sections ---------- */
  sectionTitle: { fontSize: 22, fontWeight: "700", color: "#111827", marginBottom: 10 },

  dutySection: { marginBottom: 28 },
  dutyCard: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  dutyText: { fontSize: 20, color: "#1F2937", fontWeight: "500" },
  noDutyCard: {
    backgroundColor: "#F3F4F6",
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
  },
  noDutyText: { color: "#6B7280", fontSize: 16, fontStyle: "italic" },

  /* ---------- Location Status ---------- */
  locationSection: { marginBottom: 32 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  refreshButton: {
    backgroundColor: "#6366F1",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  refreshButtonText: { color: "#FFFFFF", fontSize: 15, fontWeight: "600" },

  statusCard: {
    padding: 18,
    borderRadius: 18,
    borderLeftWidth: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  statusHeader: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  statusDot: { width: 14, height: 14, borderRadius: 7, marginRight: 10 },
  statusTitle: { fontSize: 17, fontWeight: "700" },
  statusMessage: { fontSize: 15, color: "#475569", lineHeight: 22 },

  noStatusCard: {
    backgroundColor: "#F8FAFC",
    padding: 18,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
  },
  noStatusText: { color: "#64748B", fontSize: 15, fontStyle: "italic" },

  loadingIndicator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    padding: 14,
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
  },
  loadingText: {
    fontSize: 17,
    color: "#475569",
    fontWeight: "600",
    marginTop: 12,
  },
  loadingSubtext: { fontSize: 15, color: "#6B7280", marginLeft: 8 },

  /* ---------- Quick Actions ---------- */
  actionsSection: { flex: 1, marginBottom: 28 },
  buttonGroup: { flexDirection: "row", gap: 16, marginTop: 18 },
  actionButton: {
    flex: 1,
    paddingVertical: 16,
    backgroundColor: "#6366F1",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
    minWidth: width * 0.35, // responsive for smaller screens
  },
  buttonText: { color: "#FFFFFF", fontSize: 17, fontWeight: "700" },
  disabledButton: {
    backgroundColor: "#A5B4FC",
    opacity: 0.7,
  },

  /* ---------- Footer ---------- */
  footer: {
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  logoutButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutButtonText: { color: "#374151", fontSize: 16, fontWeight: "700" },
});
