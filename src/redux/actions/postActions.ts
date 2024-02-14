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
import {IPost} from '../types';
import {BASE_URL} from '../../../links';
import {ThunkAction} from 'redux-thunk';
import {RootState} from '../store';
import {Alert} from 'react-native';

// Action Creators
export const addPost = (post: IPost) => {
  return async (dispatch: Dispatch<PostActionTypes>) => {
    try {
      const response = await axios.post(`${BASE_URL}/posts`, post);
      dispatch({
        type: ADD_POST,
        payload: response.data,
      });
      console.log('Post added successfully:', post.title);
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };
};

export const deletePost = (postId: number) => {
  return async (dispatch: Dispatch<PostActionTypes>) => {
    try {
      await axios.delete(`${BASE_URL}/posts/${postId}`);
      dispatch({
        type: DELETE_POST,
        payload: postId,
      });
      console.log('Post deleted successfully:', postId);
    } catch (error: any) {
      Alert.alert(
        'Delete Error',
        `
        An error occurred while deleting the post. This error occurs only when attempting to delete new posts that were added during the current session with the fake server.
        
        The deletion functionality is available only for posts that already exist on the server. Please keep this in mind when working with posts.`,
      );
      console.error('Error deleting post:', postId, error.message);
    }
  };
};

export const updatePost = (post: IPost) => {
  return async (dispatch: Dispatch<PostActionTypes>) => {
    try {
      const response = await axios.put(`${BASE_URL}/posts/${post.id}`, post);
      dispatch({
        type: UPDATE_POST,
        payload: response.data,
      });
      console.log('Post updated successfully:', post);
    } catch (error: any) {
      Alert.alert(
        'Update Error',
        `
        An error occurred while updating the post. This error occurs only when attempting to update new posts that were added during the current session with the fake server.
        
        The update functionality is available only for posts that already exist on the server. Please keep this in mind when working with posts.`,
      );
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
