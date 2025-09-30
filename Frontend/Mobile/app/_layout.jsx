import { LanguageProvider } from "@/contexts/LanguageContext";
import { LocationProvider } from "@/contexts/LocationContext2";
import { UserProvider } from "@/contexts/UserContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image } from "react-native";

export default function RootLayout() {
  return (
    <LanguageProvider>

      <UserProvider>
        <LocationProvider>

          <StatusBar style="auto" />
          <Stack screenOptions={{
            headerStyle: { backgroundColor: "#f8f9fa" },
            headerTintColor: "#212529",
          }}>
            <Stack.Screen
              name="(auth)"
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="index"
              options={{
                headerTitle: () => (
                  <Image
                    source={require('@/assets/logo/logo-02.png')}
                    alt="Logo"
                    style={{ width: 100, height: 40, objectFit: 'contain' }}
                  />
                ),
              }}
            />
          </Stack>
        </LocationProvider>
      </UserProvider>

    </LanguageProvider>
  );
}