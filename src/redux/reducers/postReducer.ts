import { PostActionTypes, PostState } from '../types';

const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
};

const postReducer = (state = initialState, action: PostActionTypes): PostState => {
  switch (action.type) {
    // Implement reducer cases here
    default:
      return state;
  }
};

export default postReducer;
