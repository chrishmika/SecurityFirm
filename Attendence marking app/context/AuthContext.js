import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BackHandler } from "react-native";

const BASE_URL = "http://192.168.72.220:4000/api/v1/user"; // Use your server IP http://localhost:4000/api/v1/user

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  // Initialize and check token
  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        const userInfoString = await AsyncStorage.getItem("userInfo");

        if (token && userInfoString) {
          setUserToken(token);
          setUserInfo(JSON.parse(userInfoString));

          // Configure axios default headers
          axios.defaults.headers.common["x-auth-token"] = token;
        }
      } catch (error) {
        console.error("Error restoring token", error);
      } finally {
        setIsLoading(false);
      }
    };

    bootstrapAsync();
  }, []);

  // Set up back button handler for logout
  useEffect(() => {
    const backAction = () => {
      if (userToken) {
        // If logged in, handle logout when back button is pressed
        logout();
        return true; // Prevent default back action
      }
      return false; // Let default back action happen
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => backHandler.remove();
  }, [userToken]);

  // Auth functions
  const login = async (nicNumber, password) => {
    setIsLoading(true);
    try {
      console.log(`1.Sending request to ${BASE_URL}/signin with:`, { nic: nicNumber, password });

      const response = await axios.post(`${BASE_URL}/signin`, {
        nic: nicNumber,
        password,
      });

      console.log("Raw response data structure:", JSON.stringify(response.data, null, 2));
      console.log("2.Response received:", response.data);

      const { token, nic, role } = response.data;

      if (!token) {
        console.error("Invalid response format. Missing token or user data.");
        throw new Error("Invalid response from server");
      }

      const user = {
        nic,
        role,
      };

      // Store user info and token
      await AsyncStorage.setItem("userToken", token);
      await AsyncStorage.setItem("userInfo", JSON.stringify(user));

      // Set axios default header
      axios.defaults.headers.common["x-auth-token"] = token;

      setUserToken(token);
      setUserInfo(user);
    } catch (error) {
      console.error("Login error", error.response?.data || error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      // Clear storage
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("userInfo");

      // Clear axios default header
      delete axios.defaults.headers.common["x-auth-token"];

      setUserToken(null);
      setUserInfo(null);
    } catch (error) {
      console.error("Logout error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userToken,
        userInfo,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
