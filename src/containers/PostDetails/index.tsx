import Header from '../../components/Header';
import Comment from '../../components/Comment';
import OpenedPost from '../../components/OpenedPost';
import {Keyboard, Animated, ToastAndroid} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import CreateComment from '../../components/CreateComment';
import {LastItem, CommentsList, CommentsWrapper} from './styles.ts';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchComments,
  RootState,
  CommentActionTypes,
  IComment,
  PostId,
  addComment,
  updateComment,
  deleteComment,
  IPost,
} from '../../redux';
import {ThunkDispatch} from 'redux-thunk';
interface RouteParams {
  route: {
    params: IPost;
  };
}

const PostsDetails = ({route}: RouteParams) => {
  const {id, title, body} = route.params;
  const dispatch =
    useDispatch<ThunkDispatch<RootState, undefined, CommentActionTypes>>();
  const comments: Array<IComment> = useSelector((state: RootState) =>
    state.comments.comments.filter(
      ({postId}: PostId): boolean => postId === id,
    ),
  );
  const slideAnimation: Animated.Value = useRef(new Animated.Value(0)).current;
  const [postEditClick, setPostEditClick] = useState<number>(0);

  useEffect((): void => {
    dispatch(fetchComments());
  }, [dispatch]);

  console.log(
    'selectedComments',
    comments && comments.length < 9 ? comments.length : '9+',
    id,
  );

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      (): void =>
        Animated.timing(slideAnimation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(),
    );
    return (): void => keyboardDidHideListener.remove();
  }, [slideAnimation]);

  const commentFocusHandler = (): void =>
    Animated.timing(slideAnimation, {
      toValue: 200,
      duration: 500,
      useNativeDriver: true,
    }).start();

  const commentCreateHandler = async (newData: IComment): Promise<void> => {
    try {
      await dispatch(addComment(newData));
      ToastAndroid.show('Comment added successfully', ToastAndroid.SHORT);
    } catch (error: any) {
      ToastAndroid.show('Error adding comment', ToastAndroid.SHORT);
    }
  };

  const commentUpdateHandler = async (
    updatedComment: IComment,
  ): Promise<void> => {
    try {
      await dispatch(updateComment(updatedComment));
      ToastAndroid.show('Comment updated successfully', ToastAndroid.SHORT);
    } catch (error: any) {
      ToastAndroid.show('Error updating comment', ToastAndroid.SHORT);
    }
  };

  const commentDeletionHandler = async (commentId: number): Promise<void> => {
    try {
      await dispatch(deleteComment(commentId));
      ToastAndroid.show('Comment deleted successfully', ToastAndroid.SHORT);
    } catch (error: any) {
      ToastAndroid.show('Error deleting comment', ToastAndroid.SHORT);
    }
  };

  const commentEditClickHandler = (commentId: number): void => {
    setPostEditClick(commentId);
  };

  return (
    <CommentsWrapper>
      <Header title="Comments" backButton />
      <CommentsList
        data={comments}
        renderItem={({item}: any) => (
          <Comment
            postId={item.postId}
            editMode={item.id === postEditClick}
            commentId={item.id}
            description={item.text}
            commentFocusHandler={commentFocusHandler}
            commentUpdateHandler={commentUpdateHandler}
            commentDeletionHandler={commentDeletionHandler}
            commentEditClickHandler={commentEditClickHandler}
          />
        )}
        keyExtractor={(item: any) => item.id}
        ListFooterComponent={LastItem}
        ListHeaderComponent={
          <OpenedPost
            title={title}
            listTitle="Comments"
            description={body}
            commentNumber={
              comments && comments.length < 9 ? comments.length : '9+'
            }
          />
        }
      />
      <Animated.View
        style={{
          alignSelf: 'stretch',
          transform: [{translateY: slideAnimation}],
        }}>
        <CreateComment
          postId={id}
          commentCreateHandler={commentCreateHandler}
        />
      </Animated.View>
    </CommentsWrapper>
  );
};

export default PostsDetails;
