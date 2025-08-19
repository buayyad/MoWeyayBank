import instance from ".";
interface UserInfo {
  username: string;
  password: string;
}
const login = async (userInfo: UserInfo) => {
  const res = await instance.post("/auth/login", userInfo);
  return res.data;
};

const register = async (userInfo: UserInfo) => {
  const res = await instance.post("/auth/register", userInfo);
  return res.data;
};
export { login, register };
