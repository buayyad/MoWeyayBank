import instance from ".";
interface UserInfo {
  username: string;
  password: string;
}
const login = async (userInfo: UserInfo) => {
  const res = await instance.post("/auth/LoginScreen");
  return res.data;
};

const register = async (userInfo: UserInfo) => {
  const res = await instance.post("/auth/RegisterScreen", userInfo);
  return res.data;
};
export { login, register };
