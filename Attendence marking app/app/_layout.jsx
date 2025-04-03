import { Stack } from "expo-router";
import { AuthProvider } from '@/context/AuthContext'

const RootLayout = () => {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: 'orange'
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold'
          },
          contentStyle: {
            paddingHorizontal: 10,
            paddingTop: 10,
            backgroundColor: '#fff'
          }
        }}
      >
        <Stack.Screen name='index' options={{ title: 'Home' }} />
        <Stack.Screen name='auth' options={{ headerTitle: '/Login' }} />
      </Stack>
    </AuthProvider>
  );
}

export default RootLayout;
