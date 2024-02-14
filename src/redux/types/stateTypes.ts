import { PostState } from './postTypes';
import { CommentState } from './commentTypes';
export interface AppState {
  posts: PostState;
  comments: CommentState;
}
