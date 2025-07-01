import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext,useContext, useEffect, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state for better UX

    const baseUrl = 'http://192.168.8.156:3000/api'; // Base URL for your API
    // const baseUrl = 'http://localhost:3000/api'; // Use this for local development

    

    // Check if user is already logged in when the app starts
    useEffect(() => {
        checkAuthStatus();
    }, []);

    // Function to check if user is authenticated (uses profile endpoint)
    async function checkAuthStatus() {
        try {
            const token = await AsyncStorage.getItem('authToken');
            
            if (token) {
                // Use existing profile endpoint to verify token and get user data
                const response = await fetch(`${baseUrl}/profile`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const userData = await response.json();
                    // Transform userData to match expected format
                    setUser({
                        id: userData._id,
                        name: userData.name,
                        nic: userData.nic,
                    });
                } else {
                    // Token is invalid, remove it
                    await AsyncStorage.removeItem('authToken');
                }
            }
        } catch (error) {
            console.error("Auth check failed:", error);
            await AsyncStorage.removeItem('authToken');
        } finally {
            setLoading(false);
        }
    }

    // Login function - authenticates user with NIC and password
    async function login(nic, password) {
        try {
            setLoading(true);

            // Make API call to backend login endpoint (matches your backend route)
            const response = await fetch(`${baseUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nic: nic,
                    password: password,
                }),
            });

            // Parse the response
            const data = await response.json();

            // Check if login was successful
            if (response.ok) {
                // Store the JWT token in AsyncStorage for persistent authentication
                await AsyncStorage.setItem('authToken', data.token);
                
                // Update user state with the returned user data
                setUser(data.user);
                
                return { success: true, user: data.user };
            } else {
                // Login failed - handle error message from backend
                throw new Error(data.message || 'Login failed');
            }

        } catch (error) {
            console.error("Login failed:", error);
            // Clear any existing auth data on login failure
            await AsyncStorage.removeItem('authToken');
            setUser(null);
            throw error; // Re-throw the error for component-level handling
        } finally {
            setLoading(false);
        }
    }

    // Logout function - clears user session (simplified for your backend)
    async function logout() {
        try {
            setLoading(true);
            
            // Since your backend doesn't have a logout endpoint,
            // we just clear the AsyncStorage and user state
            await AsyncStorage.removeItem('authToken');
            setUser(null);
            
            return { success: true };

        } catch (error) {
            console.error("Logout failed:", error);
            // Even if there's an error, clear local data
            await AsyncStorage.removeItem('authToken');
            setUser(null);
            throw error; // Re-throw the error for further handling if needed
        } finally {
            setLoading(false);
        }
    }

    // Function to update user profile (uses existing profile endpoint)
    async function updateProfile(updatedData) {
        try {
            const token = await AsyncStorage.getItem('authToken');
            
            // Note: Your backend doesn't have an update profile endpoint yet
            // You would need to add a PUT /api/profile route for this to work
            const response = await fetch(`${baseUrl}/profile`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            if (response.ok) {
                const data = await response.json();
                setUser({
                    id: data._id,
                    name: data.name,
                    nic: data.nic,
                });
                return { success: true, user: data };
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Profile update failed');
            }
        } catch (error) {
            console.error("Profile update failed:", error);
            throw Error(`Profile update failed: ${error.message}`);
        }
    }

    // Context value object containing all the functions and state
    const contextValue = {
        user,              // Current user object
        login,             // Login function
        logout,            // Logout function
        updateProfile,     // Update profile function
        loading,           // Loading state
        isAuthenticated: !!user, // Boolean to check if user is logged in
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
}