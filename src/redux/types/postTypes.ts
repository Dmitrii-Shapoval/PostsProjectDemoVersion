import { ADD_POST, DELETE_POST, UPDATE_POST, FETCH_POSTS_REQUEST, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAILURE } from './actionTypes';

export interface Post {
  id: number;
  title: string;
  body: string;
}

export interface PostState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

interface AddPostAction {
  type: typeof ADD_POST;
  payload: Post;
}

interface DeletePostAction {
  type: typeof DELETE_POST;
  payload: number;
}

interface UpdatePostAction {
  type: typeof UPDATE_POST;
  payload: Post;
}

interface FetchPostsRequestAction {
  type: typeof FETCH_POSTS_REQUEST;
}

interface FetchPostsSuccessAction {
  type: typeof FETCH_POSTS_SUCCESS;
  payload: Post[];
}

interface FetchPostsFailureAction {
  type: typeof FETCH_POSTS_FAILURE;
  payload: string;
}

export type PostActionTypes =
  | AddPostAction
  | DeletePostAction
  | UpdatePostAction
  | FetchPostsRequestAction
  | FetchPostsSuccessAction
  | FetchPostsFailureAction;
