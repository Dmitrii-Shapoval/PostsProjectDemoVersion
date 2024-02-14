import axios from 'axios';
import {Dispatch} from 'redux';
import {
  CommentActionTypes,
  ADD_COMMENT,
  DELETE_COMMENT,
  UPDATE_COMMENT,
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE,
} from '../types';
import {BASE_URL} from '../../../links';
import {RootState} from '../store';
import {ThunkAction} from 'redux-thunk';
import {Alert} from 'react-native';

export const addComment = (comment: any) => {
  return async (dispatch: Dispatch<CommentActionTypes>) => {
    try {
      const response = await axios.post(`${BASE_URL}/comments`, comment);
      dispatch({
        type: ADD_COMMENT,
        payload: response.data,
      });
      console.log('Comment added successfully:', comment.text);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };
};

export const deleteComment = (commentId: number) => {
  return async (dispatch: Dispatch<CommentActionTypes>) => {
    try {
      await axios.delete(`${BASE_URL}/comments/${commentId}`);
      dispatch({
        type: DELETE_COMMENT,
        payload: commentId,
      });
      console.log('Comment deleted successfully:', commentId);
    } catch (error) {
      Alert.alert(
        'Delete Error',
        `
        An error occurred while deleting the comment. This error occurs only when attempting to delete new comments that were added during the current session with the fake server.
        
        The deletion functionality is available only for comments that already exist on the server. Please keep this in mind when working with comments.`,
      );
      console.error('Error deleting comment:', commentId, error);
    }
  };
};

export const updateComment = (comment: any) => {
  return async (dispatch: Dispatch<CommentActionTypes>) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/comments/${comment.id}`,
        comment,
      );
      dispatch({
        type: UPDATE_COMMENT,
        payload: response.data,
      });
      console.log('Comment updated successfully:', comment.text);
    } catch (error) {
      Alert.alert(
        'Update Error',
        `
        An error occurred while updating the comment. This error occurs only when attempting to update new comments that were added during the current session with the fake server.
        
        The update functionality is available only for comments that already exist on the server. Please keep this in mind when working with comments.`,
      );
      console.error('Error updating comment:', error);
    }
  };
};

export const fetchComments = (): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  CommentActionTypes
> => {
  return async (dispatch: Dispatch<CommentActionTypes>): Promise<void> => {
    dispatch({type: FETCH_COMMENTS_REQUEST});
    try {
      const response = await axios.get(`${BASE_URL}/comments`);
      dispatch({
        type: FETCH_COMMENTS_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_COMMENTS_FAILURE,
        payload: error.message,
      });
    }
  };
};
