import axios from 'axios';
import { Dispatch } from 'redux';
import { PostActionTypes, ADD_POST, DELETE_POST, UPDATE_POST, FETCH_POSTS_REQUEST, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAILURE, Post } from '../types';

// Action Creators
export const addPost = (post: Post): PostActionTypes => ({
  type: ADD_POST,
  payload: post,
});

export const deletePost = (postId: number): PostActionTypes => ({
  type: DELETE_POST,
  payload: postId,
});

export const updatePost = (post: Post): PostActionTypes => ({
  type: UPDATE_POST,
  payload: post,
});

export const fetchPostsRequest = (): PostActionTypes => ({
  type: FETCH_POSTS_REQUEST,
});

export const fetchPostsSuccess = (posts: Post[]): PostActionTypes => ({
  type: FETCH_POSTS_SUCCESS,
  payload: posts,
});

export const fetchPostsFailure = (error: string): PostActionTypes => ({
  type: FETCH_POSTS_FAILURE,
  payload: error,
});

// Async Action Creator
export const fetchPosts = () => {
  return async (dispatch: Dispatch<PostActionTypes>) => {
    dispatch(fetchPostsRequest());
    try {
      const response = await axios.get('/posts');
      dispatch(fetchPostsSuccess(response.data));
    } catch (error) {
      dispatch(fetchPostsFailure(error.message));
    }
  };
};
