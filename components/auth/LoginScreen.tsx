import { login } from "@/api/auth";

import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const LoginScreen = () => {
  const [userinfo, setUserInfo] = useState({
    username: "",
    password: "",
  });
  console.log(userinfo);
  const { mutate, data } = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onError: (error) => {
      console.log("Login failed:", error);
    },
    onSuccess: () => {
      console.log("Logged In Successfuly!");
    },
  });
  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Hello there, sign in to continue</Text>

        {/* Illustration placeholder */}
        <View style={styles.illustration} />

        {/* Email field */}
        <View style={styles.inputWrapper}>
          <View style={styles.inputBackground} />
          <TextInput
            style={styles.inputLabel}
            placeholder="Username"
            onChangeText={(text) =>
              setUserInfo({ ...userinfo, username: text })
            }
          ></TextInput>
        </View>

        {/* Password field */}
        <View style={[styles.inputWrapper, { top: 473 }]}>
          <View style={styles.inputBackground} />
          <TextInput
            secureTextEntry
            style={styles.inputLabel}
            placeholder="Password"
            onChangeText={(text) =>
              setUserInfo({ ...userinfo, password: text })
            }
          ></TextInput>
        </View>

        <Text style={styles.forgotPassword}>Forgot your password?</Text>

        {/* Primary button */}
        <TouchableOpacity
          style={styles.signInButton}
          activeOpacity={0.8}
          onPress={() => mutate(userinfo)}
        >
          <View style={styles.signInButtonBg} />
          <Text style={styles.signInButtonText}>Sign in</Text>
        </TouchableOpacity>

        {/* Bottom CTA */}
        <Text style={styles.bottomText}>"Don’t" have an account?</Text>
        <TouchableOpacity style={styles.bottomLinkWrapper}>
          <Text style={styles.bottomLink}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "transparent",
  },
  container: {
    position: "relative",
    width: 375,
    height: 812,
    backgroundColor: "#3629B7",
    overflow: "hidden",
    borderRadius: 0,
  },
  title: {
    position: "absolute",
    left: 100,
    top: 132,
    color: "#FFFFFF",
    fontFamily: "Poppins-SemiBold",
    fontSize: 24,
    fontWeight: "600",
  },
  subtitle: {
    position: "absolute",
    left: 100,
    top: 164,
    color: "#343434",
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    fontWeight: "500",
  },
  illustration: {
    position: "absolute",
    left: 81,
    top: 212,
    width: 213,
    height: 165,
    backgroundColor: "#E5E2FF",
    borderRadius: 16,
  },
  inputWrapper: {
    position: "absolute",
    left: 24,
    top: 409,
    width: 327,
    height: 44,
  },
  inputBackground: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 327,
    height: 44,
    borderWidth: 1,
    borderColor: "#CBCBCB",
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
  },
  inputLabel: {
    position: "absolute",
    left: 12,
    top: 12,
    color: "#CACACA",
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    fontWeight: "500",
  },
  forgotPassword: {
    position: "absolute",
    left: 207,
    top: 529,
    color: "#CACACA",
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    fontWeight: "500",
  },
  signInButton: {
    position: "absolute",
    left: 24,
    top: 585,
    width: 327,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  signInButtonBg: {
    position: "absolute",
    width: 327,
    height: 44,
    backgroundColor: "#F2F1F9",
    borderRadius: 15,
  },
  signInButtonText: {
    color: "Black",
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    fontWeight: "500",
  },
  bottomText: {
    position: "absolute",
    left: 88,
    top: 741,
    color: "White",
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    fontWeight: "400",
  },
  bottomLinkWrapper: {
    position: "absolute",
    left: 242,
    top: 741,
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  bottomLink: {
    color: "#3629B7",
    fontFamily: "Poppins-SemiBold",
    fontSize: 12,
    fontWeight: "600",
  },
});
