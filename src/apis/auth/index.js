
const { instance } = require("..");

exports.login = async (userInfo) => {
  const res = await instance.post("/auth/sign-in", userInfo);
  return res.data;
};

exports.getUsers = async () => {
  const res = await instance.get("/auth/");
  return res.data;
};

