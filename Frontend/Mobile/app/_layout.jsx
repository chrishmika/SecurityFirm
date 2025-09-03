import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { UserProvider } from "@/contexts/UserContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { LocationProvider } from "@/contexts/LocationContext";

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
              options={{ title: "Home" }}
            />
          </Stack>
        </LocationProvider>
      </UserProvider>

    </LanguageProvider>
  );
}