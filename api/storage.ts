import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";

const getToken = async () => {
  try {
    const token = await getItemAsync("token");
    return token;
  } catch (error) {}
};

const storeToken = async (token: string) => {
  try {
    await setItemAsync("token", token);
    console.log("settokendone");
  } catch (error) {
    console.error("Error storing token:", error);
  }
};

const deleteToken = async () => {
  try {
    await deleteItemAsync("token");
  } catch (error) {
    console.error("Error deleting token:", error);
  }
};
// import { getToken } from "@/api/storage";

const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || "";

async function authFetch(url: string, init: RequestInit = {}) {
  const token = await getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(init.headers || {}),
    Authorization: `Bearer ${token}`,
  };
  const res = await fetch(`${BASE_URL}${url}`, { ...init, headers });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.json();
}

export async function deposit(amount: number) {
  return authFetch("/mini-project/api/transactions/deposit", {
    method: "PUT",
    body: JSON.stringify({ amount }),
  });
}

export async function withdraw(amount: number) {
  return authFetch("/mini-project/api/transactions/withdraw", {
    method: "PUT",
    body: JSON.stringify({ amount }),
  });
}

export async function transfer(username: string, amount: number) {
  return authFetch(
    `/mini-project/api/transactions/transfer/${encodeURIComponent(username)}`,
    {
      method: "PUT",
      body: JSON.stringify({ amount }),
    }
  );
}

export { deleteToken, getToken, storeToken };
