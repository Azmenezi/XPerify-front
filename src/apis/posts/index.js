import { instance, BASE_URL } from "..";
import * as SecureStore from "expo-secure-store";

const getAllPosts = async () => {
    const res = await instance.get("/posts/");
    return res.data.reverse();
};
const getPostById = async (id) => {
    const res = await instance.get(`/posts/${id}`);
    return res.data;
};

const createPost = async (data) => {
    const token = await SecureStore.getItemAsync("token");

    const formData = new FormData();

    for (const key in data) {
        if (key != "image") {
            formData.append(key, data[key]);
        } else {
            formData.append("image", {
                name: data.image,
                type: "image/jpeg",
                uri: data.image,
            });
        }
    }
    const res = await instance.post("/posts/", formData, {
        headers: {
            Accept: "application/json. text/plain, /",
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data;
};

const deletePost = async (id) => {
    const res = await instance.delete(`/posts/${id}`);
    return res.data;
};
export { createPost, getAllPosts, deletePost, getPostById };
