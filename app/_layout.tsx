import { getToken } from "@/api/storage";
import AuthContext from "@/context/auth-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
export default function RootLayout() {
  const queryClient = new QueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isReady, setIsReady] = useState(false);
  console.log(isReady);
  useEffect(() => {
    const checkToken = async () => {
      const token = await getToken();

      if (token) {
        setIsAuthenticated(true);
      }

      setIsReady(true);
    };
    checkToken();
  }, []);
  if (!isReady) return <ActivityIndicator />;
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
        <Stack>
          <Stack.Protected guard={isAuthenticated}>
            <Stack.Screen
              name="(protected)/(tabs)"
              options={{
                title: "MoWeyayBank",
              }}
            />
          </Stack.Protected>
        </Stack>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}
