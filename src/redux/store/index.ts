import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {commentReducer, postReducer} from '../reducers';
import {AppState} from '../types'; // Импортируем тип AppState из наших типов

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
