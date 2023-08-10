const { instance } = require("..");

exports.getAllPlaces = async () => {
  const res = await instance.get("/place/");
  return res.data;
};

exports.getPlaceById = async (id) => {
  const res = await instance.get(`/place/${id}`);
  return res.data;
};
exports.getPlacePosts = async (id) => {
  const res = await instance.get(`/place/posts/${id}`);
  return res.data;
};
exports.getNearbyPlaces = async (lat, lon) => {
  const res = await instance.get(`/place/nearby?lat=${lat}&lon=${lon}`);
  return res.data;
};

exports.checkIn = async (checkInInfo) => {
  const formData = new FormData();

  for (const key in checkInInfo) {
    if (key != "image") {
      formData.append(key, checkInInfo[key]);
    } else {
      formData.append("image", {
        name: checkInInfo.image,
        type: "image/jpeg",
        uri: checkInInfo.image,
      });
    }
  }

  const res = await instance.post("/place/check-in", formData, {
    headers: {
      Accept: "application/json, text/plain, /",
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};
