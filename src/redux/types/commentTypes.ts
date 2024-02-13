import { ADD_COMMENT, DELETE_COMMENT, UPDATE_COMMENT, FETCH_COMMENTS_REQUEST, FETCH_COMMENTS_SUCCESS, FETCH_COMMENTS_FAILURE } from './actionTypes';

export interface Comment {
  id: number;
  postId: number;
  text: string;
}

export interface CommentState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

interface AddCommentAction {
  type: typeof ADD_COMMENT;
  payload: Comment;
}

interface DeleteCommentAction {
  type: typeof DELETE_COMMENT;
  payload: number;
}

interface UpdateCommentAction {
  type: typeof UPDATE_COMMENT;
  payload: Comment;
}

interface FetchCommentsRequestAction {
  type: typeof FETCH_COMMENTS_REQUEST;
}

interface FetchCommentsSuccessAction {
  type: typeof FETCH_COMMENTS_SUCCESS;
  payload: Comment[];
}

interface FetchCommentsFailureAction {
  type: typeof FETCH_COMMENTS_FAILURE;
  payload: string;
}

export type CommentActionTypes =
  | AddCommentAction
  | DeleteCommentAction
  | UpdateCommentAction
  | FetchCommentsRequestAction
  | FetchCommentsSuccessAction
  | FetchCommentsFailureAction;
