const { instance } = require("..");

exports.getMyChats = async () => {
  const res = await instance.get("/chat");
  return res.data;
};
exports.getChatUser = async (userId) => {
  const res = await instance.get(`/chat/user/${userId}`);
  return res.data;
};

exports.getChatMsgs = async (chatId) => {
  const res = await instance.get(`/chat/msgs/${chatId}`);
  return res.data;
};
exports.sendMsg = async (chatId, msg) => {
  const res = await instance.post(`/chat/msgs/send/${chatId}`, { msg });
  return res.data;
};
exports.getPublicChats = async () => {
  const res = await instance.get("/chat/publicChats");
  return res.data;
};
exports.getPlaceChat = async (placeId) => {
  const res = await instance.get(`/chat/publicChat/${placeId}`);
  return res.data;
};
exports.sendPublicChat = async (placeId, msg) => {
  const res = await instance.post(`/chat/publicChat/${placeId}`, { msg });
  return res.data;
};
