import { register } from "@/api/auth";
import Feather from "@expo/vector-icons/Feather";
import { useMutation } from "@tanstack/react-query";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

const RegisterScreen = () => {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      const imageURL = result.assets[0].uri;
      setUserInfo({ ...userinfo, image: imageURL });
    }
  };
  type UserIndotype = {
    username: string;
    password: string;
    image: string | null;
  };
  const [userinfo, setUserInfo] = useState<UserIndotype>({
    username: "",
    password: "",
    image: "",
  });
  console.log(userinfo);
  const { mutate, data } = useMutation({
    mutationKey: ["register"],
    mutationFn: register,
    onError: (error) => {
      console.log("Registration failed:", error);
    },
    onSuccess: () => {
      console.log("Created Successfuly!");
    },
  });
  return (
    <View>
      {/* Profile Image */}
      <View style={styles.fieldContainer}>
        {userinfo.image ? (
          <Image
            source={{ uri: userinfo.image }}
            style={{ width: 100, height: 100, borderRadius: "100%" }}
          />
        ) : null}
        <TouchableOpacity
          style={{ width: 100, height: 100 }}
          onPress={pickImage}
        >
          <Feather name="upload" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Username */}
      <View style={styles.fieldContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Username"
          placeholderTextColor="#34343499"
          onChangeText={(text) => setUserInfo({ ...userinfo, username: text })}
        />
      </View>

      {/* Password */}
      <View style={styles.fieldRow}>
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          placeholderTextColor="#34343499"
          secureTextEntry
          onChangeText={(text) => setUserInfo({ ...userinfo, password: text })}
        />
        <View style={styles.trailingIconPlaceholder} />
      </View>
      {/* Primary button */}
      <TouchableOpacity
        style={styles.primaryButton}
        accessibilityRole="button"
        onPress={() => mutate(userinfo)}
      >
        <Text style={styles.primaryButtonText}>Sign up</Text>
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Have an account?</Text>
        <TouchableOpacity
          accessibilityRole="link"
          onPress={() => router.push("/login")}
        >
          <Text style={styles.linkText}> Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
  },

  // Header
  headerContainer: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  backButtonPlaceholder: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.white, // replace with your back icon
  },
  headerTitleText: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    color: Colors.white,
  },
  headerRightSpacer: { width: 24 },

  // Content sheet
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  headlineText: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.primary,
    marginBottom: 4,
  },
  subheadlineText: {
    fontSize: 12,
    fontWeight: "500",
    color: Colors.text,
    opacity: 0.9,
    marginBottom: 16,
  },

  // Fields
  fieldContainer: { marginTop: 16 },
  fieldRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  textInput: {
    height: 44,
    width: 327,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 15,
    paddingHorizontal: 12,
    fontSize: 14,
    color: Colors.text,
    backgroundColor: Colors.white,
  },
  textInputGrow: { flex: 1 },
  trailingIconPlaceholder: {
    width: 16,
    height: 16,
    marginLeft: 12,
    borderRadius: 2,
    backgroundColor: "#E6E6E6", // replace with eye/chevron icon
  },

  // Terms
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  checkboxOutline: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.primary,
    marginRight: 12,
  },
  termsText: { flex: 1, fontSize: 14, color: Colors.text },
  linkText: { color: Colors.primary, fontWeight: "600" },

  // CTA
  primaryButton: {
    height: 44,
    width: 327,
    backgroundColor: "#3629b7FF",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 32,
  },
  primaryButtonText: { color: Colors.white, fontSize: 16, fontWeight: "500" },

  // Footer
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "baseline",
    marginTop: 12,
  },
  footerText: { fontSize: 12, color: Colors.text },
});
function setImage(uri: string) {
  throw new Error("Function not implemented.");
}
