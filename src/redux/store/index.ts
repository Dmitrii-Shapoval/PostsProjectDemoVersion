import thunk from 'redux-thunk';
import {AppState} from '../types';
import {commentReducer, postReducer} from '../reducers';
import {createStore, combineReducers, applyMiddleware} from 'redux';

const rootReducer = combineReducers({
  comments: commentReducer,
  posts: postReducer,
});

const initialState: Partial<AppState> = {
  comments: {comments: [], loading: false, error: null},
  posts: {posts: [], loading: false, error: null},
};

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(
  rootReducer,
  initialState as any,
  applyMiddleware(thunk),
);

export default store;
