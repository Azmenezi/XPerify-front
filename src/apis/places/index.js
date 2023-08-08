const { instance } = require("..");

exports.getAllPlaces = async () => {
  const res = await instance.get("/place/");
  return res.data;
};

exports.getPlaceById = async (id) => {
  const res = await instance.get(`/place/${id}`);
  return res.data;
};
