import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },

    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.posts = [];
    },

    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      }
    },

    /* ================= POSTS ================= */

    // ✅ FIXED: expects ARRAY directly
    setPosts: (state, action) => {
      state.posts = Array.isArray(action.payload)
        ? action.payload
        : [];
    },

    // ✅ FIXED: updates ONLY one post
    setPost: (state, action) => {
      const updatedPost = action.payload.post;

      const index = state.posts.findIndex(
        (post) => post._id === updatedPost._id
      );

      if (index !== -1) {
        state.posts[index] = updatedPost;
      }
    },

    // ✅ ADD POST SAFELY
    addPost: (state, action) => {
      state.posts.unshift(action.payload.post);
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setFriends,
  setPosts,
  setPost,
  addPost,
} = authSlice.actions;

export default authSlice.reducer;
