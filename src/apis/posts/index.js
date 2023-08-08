import instance, { BASE_URL } from "..";
import axios from "axios";
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
    const instance = axios.create({
        baseURL: BASE_URL + "/api",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
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

// const updatePost = async (id, data) => {

//     for (const key in data) {
//         if (key !== "image")
//             if (data[key] == undefined || data[key] == "") {
//                 return new Error({ message: "post data can not be empty!" })
//             }
//     }

//     const formData = new FormData();

//     for (const key in data) {
//         if (key != "image") {
//             formData.append(key, data[key]);
//         } else {
//             console.log(data.image);
//             if (data.image?.includes("file"))
//                 formData.append("image", {
//                     name: data.image,
//                     type: "image/jpeg",
//                     uri: data.image,
//                 });
//         }
//     }
//     console.log("HELLLLLLO", formData);
//     const res = await instance.put(`/posts/${id}`, formData, {
//         headers: {
//             Accept: "application/json. text/plain, /",
//             "Content-Type": "multipart/form-data",
//         },
//     });
//     return res.data;
// };