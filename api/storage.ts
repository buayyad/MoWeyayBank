import * as SecureStore from "expo-secure-store";
import { deleteItemAsync } from "expo-secure-store";

const getToken = async () => {
  try {
    const res = await SecureStore.getItemAsync("token");
  } catch (error) {}
};

const storeToken = async (token: string) => {
  try {
    await setItemAsync("token", token);
  } catch (error) {
    console.error("Error storing token:", error);
  }
};

function setItemAsync(arg0: string, token: string) {
  throw new Error("Function not implemented.");
}

const deleteToken = async () => {
  try {
    await deleteItemAsync("token");
  } catch (error) {
    console.error("Error deleting token:", error);
  }
};

export { deleteToken, getToken, storeToken };
