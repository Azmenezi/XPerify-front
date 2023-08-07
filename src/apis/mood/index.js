const { instance } = require("..");

exports.getAllMood = async () => {
  const res = await instance.get("/mood/");
  return res.data.reverse();
};
