import {
  IPost,
  PostId,
  IComment,
  RootState,
  fetchComments,
  CommentActionTypes,
} from '../../redux';
import {ThunkDispatch} from 'redux-thunk';
import Header from '../../components/Header';
import Comment from '../../components/Comment';
import {Keyboard, Animated} from 'react-native';
import OpenedPost from '../../components/OpenedPost';
import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useRef, useState} from 'react';
import CreateComment from '../../components/CreateComment';
import {LastItem, CommentsList, CommentsWrapper} from './styles.ts';

const PostsDetails = ({route}: any) => {
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
        <CreateComment postId={id} />
      </Animated.View>
    </CommentsWrapper>
  );
};

export default PostsDetails;
