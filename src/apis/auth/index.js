const { instance } = require("..");

exports.login = async (userInfo) => {
  const res = await instance.post("/auth/sign-in", userInfo);
  return res.data;
};
exports.register = async (userInfo) => {
  const formData = new FormData();

  for (const key in userInfo) {
    if (key != "image") {
      formData.append(key, userInfo[key]);
    } else {
      formData.append("image", {
        name: userInfo.image,
        type: "image/jpeg",
        uri: userInfo.image,
      });
    }
  }

  const res = await instance.post("/auth/register", formData, {
    headers: {
      Accept: "application/json, text/plain, /",
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
exports.getUsers = async () => {
  const res = await instance.get("/auth/");
  return res.data;
};

exports.checkUsername = async (username) => {
  const res = await instance.put(`/auth/username`, { username });

  return res.data;
};

exports.addNotificationToken = async (token) => {
  const res = await instance.put("/auth/store-notification-token", { token });
  return res.data;
};
exports.getMyProfile = async () => {
  const res = await instance.get("/auth/my-profile");
  return res.data;
};

exports.getUserProfile = async (id) => {
  const res = await instance.get(`/auth/profile/${id}`);
  return res.data;
};
exports.profile = async (id) => {
  const res = await instance.get(`/auth/profile/${id}`);
  return res.data;
};

exports.getMyFriends = async () => {
  const res = await instance.get("/auth/my-friends");
  return res.data;
};
