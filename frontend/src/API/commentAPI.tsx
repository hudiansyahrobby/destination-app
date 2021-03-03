import axios from "../axios";
import { CommentData } from "../interfaces/CommentInterface";

export const addComment = async (commentData: CommentData) => {
  axios.post("/comments", commentData);
};

export const getComments = async () => {
  axios.get("/comments");
};

export const updateComment = async (commentData: CommentData, id: number) => {
  axios.put(`/comments/${id}`, commentData);
};

export const removeComment = async (id: number) => {
  axios.delete(`/comments/${id}`);
};
