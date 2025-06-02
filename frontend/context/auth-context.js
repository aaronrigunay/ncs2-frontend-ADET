import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DUMMY_ACCOUNTS } from "../dummy-data/dummy-accounts";

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Failed to load user from AsyncStorage:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserSession();
  }, []);

  const signIn = async (username, password) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const foundUser = DUMMY_ACCOUNTS.find(
      (account) =>
        account.username === username && account.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      await AsyncStorage.setItem("user", JSON.stringify(foundUser));
      return { success: true, user: foundUser };
    } else {
      setUser(null);
      return { success: false, user: null };
    }
  };

  const signOut = async () => {
    setUser(null);
    try {
      await AsyncStorage.removeItem("user");
    } catch (error) {
      console.error("Error clearing user data:", error);
    }
  };

  const authContextValue = useMemo(
    () => ({
      user,
      signIn,
      signOut,
      isLoading,
    }),
    [user, isLoading]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
