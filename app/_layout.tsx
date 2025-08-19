import { getToken } from "@/api/storage";
import AuthContext from "@/context/auth-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
export default function RootLayout() {
  const queryClient = new QueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    const checkToken = async () => {
      const token = await getToken();
      console.log(token);
      if (token) {
        setIsAuthenticated(true);
        setIsReady(true);
      }
    };
    checkToken();
  }, []);
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
