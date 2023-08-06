import instance from "..";

const signIn = async (userInfo) => {
  const res = await instance.post("/users/signin", userInfo);
  return res.data;
};

const signUp = async (userInfo) => {};

const profile = async (id) => {};

const updateProfile = async (id, userInfo) => {};

export { signIn, signUp, profile, updateProfile };
