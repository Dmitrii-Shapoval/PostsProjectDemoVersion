import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { AppState } from './stateTypes';
import { PostActionTypes } from './postTypes';
import { CommentActionTypes } from './commentTypes';

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export type AppActions = PostActionTypes | CommentActionTypes;