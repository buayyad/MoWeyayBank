import { login } from "@/api/auth";
import AuthContext from "@/context/auth-context";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Colors = {
  primary: "#0C00DF",
  white: "#FFFFFF",
  text: "#343434",
  border: "#E6E6E6",
  muted: "#9AA0A6",
  sheet: "#F7F7FC",
};

const LoginScreen = () => {
  const [userinfo, setUserInfo] = useState({
    username: "",
    password: "",
  });
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const router = useRouter();
  const { mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onError: (error) => {
      console.log("Login failed:", error);
    },
    onSuccess: () => {
      setIsAuthenticated(true);
      router.replace("/");
      Alert.alert("Welcome", "Signed in successfully!");
    },
  });

  return (
    <View style={styles.screenContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitleText}>Login To Your Account</Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: "padding", android: undefined })}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          bounces={false}
        >
          <View style={styles.contentContainer}>
            <Text style={styles.headlineText}>Welcome Back</Text>
            <Text style={styles.subheadlineText}>
              Hello there, sign in to continue
            </Text>

            <View style={styles.avatarContainer}>
              <Image
                source={require("@/assets/images/mopweyay.png")}
                style={styles.avatar}
              />
            </View>

            <View style={styles.fieldContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Username"
                placeholderTextColor={Colors.muted}
                value={userinfo.username}
                onChangeText={(text) =>
                  setUserInfo((v) => ({ ...v, username: text }))
                }
              />
            </View>

            <View style={styles.fieldContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Password"
                placeholderTextColor={Colors.muted}
                secureTextEntry
                value={userinfo.password}
                onChangeText={(text) =>
                  setUserInfo((v) => ({ ...v, password: text }))
                }
              />
            </View>

            <Text style={styles.forgotPassword}>Forgot your password ?</Text>

            <TouchableOpacity
              style={styles.primaryButton}
              accessibilityRole="button"
              onPress={() => mutate(userinfo)}
              activeOpacity={0.8}
            >
              <Text style={styles.primaryButtonText}>Login</Text>
            </TouchableOpacity>

            <View style={styles.fingerprint} />

            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => router.push("/register")}>
                <Text style={styles.linkText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.primary,
  },

  headerContainer: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 16,
    alignItems: "center",
    flexDirection: "row",
  },
  headerTitleText: {
    flex: 1,
    textAlign: "center",
    color: Colors.white,
    fontSize: 18,
    fontWeight: "600",
  },

  contentContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },

  headlineText: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.primary,
    marginBottom: 4,
  },
  subheadlineText: {
    fontSize: 12,
    fontWeight: "500",
    color: Colors.text,
    opacity: 0.9,
    marginBottom: 20,
  },

  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 400,
    height: 200,
    // borderRadius: 50,
    borderWidth: 2,
    borderColor: Colors.primary,
  },

  fieldContainer: { marginTop: 14 },
  textInput: {
    height: 48,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 15,
    paddingHorizontal: 14,
    backgroundColor: Colors.white,
    color: Colors.text,
  },

  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: 10,
    color: Colors.muted,
    fontSize: 12,
    fontWeight: "500",
  },

  primaryButton: {
    height: 48,
    marginTop: 24,
    backgroundColor: Colors.primary,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
  },
  primaryButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },

  fingerprint: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: Colors.primary,
    alignSelf: "center",
    marginTop: 24,
  },

  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "baseline",
    marginTop: 16,
  },
  footerText: { fontSize: 12, color: Colors.text },
  linkText: { fontSize: 12, color: Colors.primary, fontWeight: "600" },
});
