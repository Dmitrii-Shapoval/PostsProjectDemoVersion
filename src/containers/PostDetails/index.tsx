import axios from 'axios';
import { BASE_URL } from "../../../links";
import Header from '../../components/Header';
import Comment from '../../components/Comment';
import {iComment} from '../../assets/data/DATA.ts';
import OpenedPost from '../../components/OpenedPost';
import {Keyboard, Animated, Alert} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import CreateComment from '../../components/CreateComment';
import {LastItem, CommentsList, CommentsWrapper} from './styles.ts';

const PostsDetails = ({route}: any) => {
  const {id, title, body, fetchComments} = route.params;
  const slideAnimation: Animated.Value = useRef(new Animated.Value(0)).current;
  const [postEditClick, setPostEditClick] = useState<number>(0);
  const [deleteError, setDeleteError] = useState<boolean>(false);
  const [comments, setComments] = useState<Array<iComment> | null>(null);

  const selectCommentsById = (data: Array<iComment>, postId: number) => {
    return data.filter((item: iComment): boolean => item.postId === postId);
  };

  useEffect(() => {
    fetchComments()
      .then((responseData: any) => {
        const selectedComments: Array<iComment> = selectCommentsById(
          responseData,
          id,
        );
        setComments(selectedComments);
      })
      .catch((error: any) => {
        console.error('Error loading comments:', error.message);
      });
  }, [fetchComments, id]);

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

  const commentCreateHandler = async (newData: iComment): Promise<void> => {
    try {
      const response = await axios.post(`${BASE_URL}/comments`, newData);
      const addedComment: iComment = response.data;
      setComments(prevState =>
        prevState ? [addedComment, ...prevState] : [addedComment],
      );
      console.log('Comment added successfully', addedComment);
    } catch (error: any) {
      console.error('Error adding comment:', error.message);
    }
  };

  const commentUpdateHandler = async (
    updatedComment: iComment,
  ): Promise<void> => {
    try {
      const response = await axios.put(
        `${BASE_URL}/comments/${updatedComment.id}`,
        updatedComment,
      );
      const modifiedComment: iComment = response.data;
      setComments(
        (prevState: any): Array<iComment> =>
          prevState.map((comment: iComment): iComment => {
            if (comment.id === modifiedComment.id) {
              return modifiedComment;
            }
            return comment;
          }),
      );
      console.log('Comment updated successfully:', modifiedComment);
    } catch (error: any) {
      console.error('Error updating comment:', error.message);
    }
  };

  const commentDeletionHandler = async (commentId: number): Promise<void> => {
    try {
      await axios.delete(`${BASE_URL}/comments/${commentId}`);
      setComments(
        (prevState: any): Array<iComment> =>
          prevState.filter(({id}: iComment): boolean => id !== commentId),
      );
      console.log('Comment deleted successfully');
    } catch (error: any) {
      console.error('Error deleting comment:', error.message);
      setDeleteError(true);
    }
  };

  const commentEditClickHandler = (commentId: number): void => {
    setPostEditClick(commentId);
  };

  useEffect(() => {
    if (deleteError) {
      Alert.alert(
        'Delete Error',
        `
          An error occurred while deleting the comment. This error occurs only when attempting to delete new comments that were added during the current session with the fake server.
         
         The deletion functionality is available only for comments that already exist on the server. Please keep this in mind when working with comments.`,
        [{text: 'OK', onPress: () => setDeleteError(false)}],
      );
    }
  }, [deleteError]);

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
            listTitle="Coments"
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
