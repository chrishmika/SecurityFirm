import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const baseUrl = 'http://192.168.8.156:5000/api/auth';

    useEffect(() => {
        checkAuthStatus();
    }, []);

    // Function to check if user is authenticated
    async function checkAuthStatus() {
        try {
            const token = await AsyncStorage.getItem('authToken');
            if (token) {
                const response = await fetch(`${baseUrl}/profile`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const userData = await response.json();
                    setUser({
                        id: userData._id,
                        name: userData.name,
                        nic: userData.NIC || userData.nic, // Handle both field names
                        role: userData.role,
                        empId: userData.empId,
                    });
                } else if (response.status === 401 || response.status === 403) {
                    // Only remove token if authentication failed
                    await AsyncStorage.multiRemove(['authToken', 'nic']);
                    setUser(null);
                } else {
                    // For other errors (500, etc.), keep token but clear user state
                    // This prevents auto-redirect but keeps token for retry
                    setUser(null);
                }
            } else {
                // No token found
                setUser(null);
            }
        } catch (error) {
            console.error("Auth check failed:", error);
            // Network error - keep token but clear user state
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    //login function
    async function login(nic, password) {
        try {
            setLoading(true);
            const response = await fetch(`${baseUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nic: nic, // Send as 'nic' but backend will handle both
                    password: password,
                }),
            });

            const data = await response.json();
            if (response.ok && data.success) {
                // Store both token and nic
                await AsyncStorage.setItem('authToken', data.token);
                await AsyncStorage.setItem('nic', data.user.nic);
                await AsyncStorage.setItem('employee_id', data.user.employeID);  //<--------newly added code

                // Set user state
                setUser({
                    id: data.user._id,
                    name: data.user.name,
                    nic: data.user.nic,
                    role: data.user.role,
                    empId: data.user.empId,
                    employeeID: data.user.employeeID //<---- newly added code
                });
                
                return { success: true, user: data.user };
            } else {
                throw new Error(data.error || data.message || 'Login failed');
            }
        } catch (error) {
            console.error("Login failed:", error);
            await AsyncStorage.multiRemove(['authToken', 'nic']);
            setUser(null);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    // Logout function
    async function logout() {
        try {
            setLoading(true);
            await AsyncStorage.multiRemove(['authToken', 'nic']);
            setUser(null);
            return { success: true };
        } catch (error) {
            console.error("Logout failed:", error);
            await AsyncStorage.multiRemove(['authToken', 'nic']);
            setUser(null);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const contextValue = {
        user,
        login,
        logout,
        loading,
        isAuthenticated: !!user,
        checkAuthStatus, // Expose this for manual refresh if needed
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
}