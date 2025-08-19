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
export { login, register };
