import {
  Icon,
  EditButton,
  CloseButton,
  CommentWrapper,
  InputDescription,
  ContentContainer,
  DescriptionWrapper,
  LeftButtonContainer,
  CommentCountContainer,
  RigthButtonsContainer,
} from './styles.ts';
import {
  IComment,
  RootState,
  deleteComment,
  updateComment,
  CommentActionTypes,
} from '../../redux';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {ToastAndroid} from 'react-native';
import {ThunkDispatch} from 'redux-thunk';

interface iProps {
  postId: number;
  editMode: boolean;
  commentId: number;
  description: string;
  commentFocusHandler: any;
  commentEditClickHandler: any;
}
export default ({
  postId,
  editMode,
  commentId,
  description,
  commentFocusHandler,
  commentEditClickHandler,
}: iProps) => {
  const dispatch =
    useDispatch<ThunkDispatch<RootState, undefined, CommentActionTypes>>();
  const [contentSize, setContentSize] = useState<number>(100);
  const [descriptionHeight, setDescriptionHeight] = useState<number>(500);
  const [descriptionText, setDescriptionText] =
    React.useState<string>(description);

  const commentDeletionHandler = async (): Promise<void> => {
    try {
      await dispatch(deleteComment(commentId));
      ToastAndroid.show('Comment deleted successfully', ToastAndroid.SHORT);
    } catch (error: any) {
      ToastAndroid.show('Error deleting comment', ToastAndroid.SHORT);
    }
  };
  const commentSavedHandler = async (): Promise<void> => {
    const newData: IComment = {
      id: commentId,
      postId,
      text: descriptionText,
    };
    try {
      await dispatch(updateComment(newData));
      commentEditClickHandler(0);
      ToastAndroid.show('Comment updated successfully', ToastAndroid.SHORT);
    } catch (error: any) {
      ToastAndroid.show('Error updating comment', ToastAndroid.SHORT);
    }
  };

  const cancelEventHandler = (): void => {
    commentEditClickHandler(0);
    setDescriptionText(description);
  };
  const contentHeightHandler = (e: any): void => {
    const {height} = e.nativeEvent.layout;
    setContentSize(height);
  };
  const descriptionHeightHandler = (e: any): void => {
    const {height} = e.nativeEvent.layout;
    setDescriptionHeight(height);
  };

  return (
    <CommentWrapper>
      <LeftButtonContainer>
        {editMode ? (
          <CommentCountContainer onPress={cancelEventHandler}>
            <Icon icon="ban" size={17} />
          </CommentCountContainer>
        ) : (
          <CommentCountContainer>
            <Icon icon="message" size={22} color={'#a13f28'} />
          </CommentCountContainer>
        )}
      </LeftButtonContainer>
      {editMode ? (
        <ContentContainer height={contentSize}>
          <InputDescription
            autoFocus
            multiline
            height={descriptionHeight}
            onChangeText={(text: string) => setDescriptionText(text)}
            onFocus={commentFocusHandler}
            value={descriptionText}
            placeholder="Enter your comment"
            maxLength={800}
            placeholderTextColor="#847878"
            cursorColor="#757072"
          />
        </ContentContainer>
      ) : (
        <ContentContainer onLayout={contentHeightHandler} disabled>
          <DescriptionWrapper onLayout={descriptionHeightHandler}>
            {description}
          </DescriptionWrapper>
        </ContentContainer>
      )}
      <RigthButtonsContainer>
        <CloseButton onPress={commentDeletionHandler}>
          {editMode || <Icon icon="xmark" size={24} />}
        </CloseButton>
        {editMode ? (
          <EditButton onPress={commentSavedHandler}>
            <Icon icon="floppy-disk" size={17} />
          </EditButton>
        ) : (
          <EditButton onPress={commentEditClickHandler.bind(this, commentId)}>
            <Icon icon="pen" size={17} />
          </EditButton>
        )}
      </RigthButtonsContainer>
    </CommentWrapper>
  );
};
