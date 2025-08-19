import { register } from "@/api/auth";
import Feather from "@expo/vector-icons/Feather";
import { useMutation } from "@tanstack/react-query";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
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
};

const RegisterScreen = () => {
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      const imageURL = result.assets[0].uri;
      setUserInfo((v) => ({ ...v, image: imageURL }));
    }
  };

  type UserIndotype = {
    username: string;
    password: string;
    image: string | null;
  };

  const [userInfo, setUserInfo] = useState<UserIndotype>({
    username: "",
    password: "",
    image: null,
  });

  const [agreed, setAgreed] = useState(false);

  const canSubmit = useMemo(
    () =>
      agreed &&
      userInfo.username.trim().length > 0 &&
      userInfo.password.trim().length > 0,
    [agreed, userInfo.username, userInfo.password]
  );

  const { mutate, isPending } = useMutation({
    mutationKey: ["register"],
    mutationFn: register,
    onError: (error: any) => {
      console.log("Register error:", {
        status: error?.response?.status,
        data: error?.response?.data,
      });
    },
    onSuccess: () => {
      router.replace("/login");
    },
  });
  const onSubmit = () => {
    if (!agreed) {
      Alert.alert("Alert", "You must agree to the terms and conditions.");
      return;
    }
    if (!userInfo.username.trim() || !userInfo.password.trim()) {
      Alert.alert("Alert", "Please fill in username and password.");
      return;
    }
    mutate(userInfo);
  };

  return (
    <View style={styles.screenContainer}>
      {/* هيدر */}
      <View style={styles.headerContainer}>
        <Pressable style={styles.backButtonPlaceholder} />
        <Text style={styles.headerTitleText}>Sign up</Text>
        <View style={styles.headerRightSpacer} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.select({ ios: "padding", android: undefined })}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          bounces={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.contentContainer}>
            <Text style={styles.headlineText}>Welcome to us,</Text>
            <Text style={styles.subheadlineText}>
              Hello there, create New account
            </Text>

            <View style={styles.fieldContainer}>
              {userInfo.image ? (
                <Image
                  source={{ uri: userInfo.image }}
                  style={styles.profileImage}
                />
              ) : (
                <View style={[styles.profileImage, styles.profilePlaceholder]}>
                  <Feather name="user" size={40} />
                </View>
              )}
              <TouchableOpacity style={styles.uploadBtn} onPress={pickImage}>
                <Feather
                  name="upload"
                  size={20}
                  color="white"
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.uploadBtnText}>Upload</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.fieldContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Name"
                placeholderTextColor={Colors.muted}
                autoCapitalize="none"
                value={userInfo.username}
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
                value={userInfo.password}
                onChangeText={(text) =>
                  setUserInfo((v) => ({ ...v, password: text }))
                }
              />
            </View>

            <Pressable
              style={styles.termsContainer}
              onPress={() => setAgreed((v) => !v)}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: agreed }}
            >
              <View
                style={[
                  styles.checkboxOutline,
                  agreed && styles.checkboxOutlineChecked,
                ]}
              >
                {agreed && <View style={styles.checkboxFill} />}
              </View>
              <Text style={styles.termsText}>
                By creating an account your agree to our{" "}
                <Text style={styles.linkText}>Term and Conditions</Text>
              </Text>
            </Pressable>

            <TouchableOpacity
              style={[
                styles.primaryButton,
                !canSubmit && styles.primaryButtonDisabled,
              ]}
              accessibilityRole="button"
              onPress={onSubmit}
              disabled={!canSubmit || isPending}
              activeOpacity={canSubmit ? 0.8 : 1}
            >
              <Text
                style={[
                  styles.primaryButtonText,
                  !canSubmit && styles.primaryButtonTextDisabled,
                ]}
              >
                {isPending ? "Creating..." : "Sign up"}
              </Text>
            </TouchableOpacity>

            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>Have an account? </Text>
              <Pressable onPress={() => router.push("/login")}>
                <Text style={styles.linkText}>Log in</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  screenContainer: { flex: 1, backgroundColor: Colors.primary },
  headerContainer: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  backButtonPlaceholder: { width: 24, height: 24, borderRadius: 12 },
  headerRightSpacer: { width: 24 },
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
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    elevation: 5,
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
    marginBottom: 24,
  },
  fieldContainer: { marginTop: 16 },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
  },
  profilePlaceholder: {
    backgroundColor: "#EEF2F6",
    justifyContent: "center",
    alignItems: "center",
  },
  uploadBtn: {
    marginTop: 12,
    alignSelf: "center",
    flexDirection: "row",
    backgroundColor: Colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
  },
  uploadBtnText: { color: "white", fontSize: 14, fontWeight: "600" },
  textInput: {
    height: 48,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 15,
    paddingHorizontal: 14,
    backgroundColor: Colors.white,
    color: Colors.text,
  },
  termsContainer: { flexDirection: "row", alignItems: "center", marginTop: 20 },
  checkboxOutline: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.primary,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
  },
  checkboxOutlineChecked: { borderColor: Colors.primary },
  checkboxFill: {
    width: 12,
    height: 12,
    borderRadius: 2,
    backgroundColor: Colors.primary,
  },
  termsText: { flex: 1, fontSize: 14, color: Colors.text },
  linkText: { color: Colors.primary, fontWeight: "600" },
  primaryButton: {
    height: 48,
    marginTop: 28,
    backgroundColor: Colors.primary,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
  },
  primaryButtonDisabled: { backgroundColor: "#F2F1F9", shadowOpacity: 0 },
  primaryButtonText: { color: Colors.white, fontSize: 16, fontWeight: "600" },
  primaryButtonTextDisabled: { color: Colors.muted },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "baseline",
    marginTop: 12,
  },
  footerText: { fontSize: 12, color: Colors.text },
});
