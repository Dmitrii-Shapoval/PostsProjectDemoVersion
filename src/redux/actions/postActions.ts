import axios from 'axios';
import {Dispatch} from 'redux';
import {
  PostActionTypes,
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
} from '../types';
import {IPost} from '../types/postTypes';
import {BASE_URL} from '../../../links';
import {ThunkAction} from 'redux-thunk';
import {RootState} from '../store';

// Action Creators
export const addPost = (post: IPost) => {
  return async (dispatch: Dispatch<PostActionTypes>) => {
    try {
      const response = await axios.post('/posts', post);
      dispatch({
        type: ADD_POST,
        payload: response.data,
      });
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };
};

export const deletePost = (postId: number) => {
  return async (dispatch: Dispatch<PostActionTypes>) => {
    try {
      await axios.delete(`/posts/${postId}`);
      dispatch({
        type: DELETE_POST,
        payload: postId,
      });
      console.log('Post deleted successfully');
    } catch (error: any) {
      console.error('Error deleting post:', error.message);
    }
  };
};

export const updatePost = (post: IPost) => {
  return async (dispatch: Dispatch<PostActionTypes>) => {
    try {
      const response = await axios.put(`/posts/${post.id}`, post);
      dispatch({
        type: UPDATE_POST,
        payload: response.data,
      });
      console.log('Post updated successfully');
    } catch (error: any) {
      console.error('Error updating post:', error.message);
    }
  };
};

// Async Action Creator
export const fetchPosts = (): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  PostActionTypes
> => {
  return async (dispatch: Dispatch<PostActionTypes>): Promise<void> => {
    dispatch({type: FETCH_POSTS_REQUEST});
    try {
      const response = await axios.get(`${BASE_URL}/posts`);
      dispatch({
        type: FETCH_POSTS_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_POSTS_FAILURE,
        payload: error.message,
      });
    }
  };
};
