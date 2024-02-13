import axios from 'axios';
import { Dispatch } from 'redux';
import { CommentActionTypes, ADD_COMMENT, DELETE_COMMENT, UPDATE_COMMENT, FETCH_COMMENTS_REQUEST, FETCH_COMMENTS_SUCCESS, FETCH_COMMENTS_FAILURE } from '../types';

export const addComment = (comment: any) => {
  return async (dispatch: Dispatch<CommentActionTypes>) => {
    try {
      const response = await axios.post('/comments', comment);
      dispatch({
        type: ADD_COMMENT,
        payload: response.data,
      });
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };
};

export const deleteComment = (commentId: number) => {
  return async (dispatch: Dispatch<CommentActionTypes>) => {
    try {
      await axios.delete(`/comments/${commentId}`);
      dispatch({
        type: DELETE_COMMENT,
        payload: commentId,
      });
      console.log('Comment deleted successfully');
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };
};

export const updateComment = (comment: any) => {
  return async (dispatch: Dispatch<CommentActionTypes>) => {
    try {
      const response = await axios.put(`/comments/${comment.id}`, comment);
      dispatch({
        type: UPDATE_COMMENT,
        payload: response.data,
      });
      console.log('Comment updated successfully');
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };
};

export const fetchComments = () => {
  return async (dispatch: Dispatch<CommentActionTypes>) => {
    dispatch({ type: FETCH_COMMENTS_REQUEST });
    try {
      const response = await axios.get('/comments');
      dispatch({
        type: FETCH_COMMENTS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_COMMENTS_FAILURE,
        payload: error.message,
      });
    }
  };
};
