import {
  PostActionTypes,
  PostState,
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  IPost,
} from '../types';

const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
};

const postReducer = (
  state = initialState,
  action: PostActionTypes,
): PostState => {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload,
        error: null,
      };
    case FETCH_POSTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(
          (post: IPost): boolean => post.id !== action.payload,
        ),
      };
    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map(
          (post: IPost): IPost =>
            post.id === action.payload.id ? action.payload : post,
        ),
      };
    default:
      return state;
  }
};

export default postReducer;
