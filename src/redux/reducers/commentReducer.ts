import {
  CommentActionTypes,
  CommentState,
  IComment,
  ADD_COMMENT,
  DELETE_COMMENT,
  UPDATE_COMMENT,
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE,
} from '../types';

const initialState: CommentState = {
  comments: [],
  loading: false,
  error: null,
};

const commentReducer = (
  state = initialState,
  action: CommentActionTypes,
): CommentState => {
  switch (action.type) {
    case FETCH_COMMENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: action.payload,
        error: null,
      };
    case FETCH_COMMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: [action.payload, ...state.comments],
      };
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(
          (comment: IComment): boolean => comment.id !== action.payload,
        ),
      };
    case UPDATE_COMMENT:
      return {
        ...state,
        comments: state.comments.map(
          (comment: IComment): IComment =>
            comment.id === action.payload.id ? action.payload : comment,
        ),
      };
    default:
      return state;
  }
};

export default commentReducer;
