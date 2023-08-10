const { instance } = require("..");

exports.getAllAmenities = async () => {
  const res = await instance.get("/amenity/");
  return res.data;
};
