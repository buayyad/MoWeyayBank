import instance from ".";
import { storeToken } from "./storage";
interface UserInfo {
  username: string;
  password: string;
}
const login = async (userInfo: UserInfo) => {
  const res = await instance.post("/auth/login", userInfo);
  await storeToken(res.data.token);
  console.log(res.data);
  return res.data;
};

const register = async (userInfo: UserInfo) => {
  const res = await instance.post("/auth/register", userInfo);
  await storeToken(res.data.token);
  console.log(res.data);

  return res.data;
};
export interface Profile {
  balance: string;
  username: string;
  image: null | string;
}

const me = async () => {
  const res = await instance.get("/auth/me");
  console.log("res.data", res.data);
  return res.data;
};
const profile = async () => {
  const res = await instance.get("/auth/profile");
  console.log("res.data", res.data);
  return res.data;
};

export { login, me, profile, register };
