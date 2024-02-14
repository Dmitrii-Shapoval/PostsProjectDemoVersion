import {
  Icon,
  InputTitle,
  EditButton,
  PostWrapper,
  CloseButton,
  TitleWrapper,
  CommentCount,
  InputDescription,
  ContentContainer,
  DescriptionWrapper,
  LeftButtonContainer,
  RigthButtonsContainer,
  CommentCountContainer,
} from './styles.ts';
import {
  IPost,
  RootState,
  updatePost,
  deletePost,
  PostActionTypes,
} from '../../redux';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {ToastAndroid} from 'react-native';
import {ThunkDispatch} from 'redux-thunk';

interface iProps {
  title: string;
  postId: number;
  editMode: boolean;
  description: string;
  commentCount?: number;
  postClickHandler: any;
  postFocusHandler: any;
  commentEditClickHandler: any;
}
export default ({
  title,
  postId,
  editMode,
  description,
  commentCount,
  postClickHandler,
  postFocusHandler,
  commentEditClickHandler,
}: iProps) => {
  const dispatch =
    useDispatch<ThunkDispatch<RootState, undefined, PostActionTypes>>();
  const [titleText, setTitleText] = React.useState<string>(title);
  const [contentSize, setContentSize] = useState<number>(100);
  const [titleHeight, setTitleHeight] = useState<number>(100);
  const [descriptionHeight, setDescriptionHeight] = useState<number>(500);
  const [descriptionText, setDescriptionText] =
    React.useState<string>(description);

  const postSavedHandler = async (): Promise<void> => {
    commentEditClickHandler(0);
    const updatedPost: IPost = {
      id: postId,
      title: titleText,
      body: descriptionText,
    };
    try {
      await dispatch(updatePost(updatedPost));
      ToastAndroid.show('Post updated successfully', ToastAndroid.SHORT);
    } catch (error: any) {
      ToastAndroid.show('Error updating post', ToastAndroid.SHORT);
    }
  };
  const cancelEventHandler = (): void => {
    setTitleText(title);
    setDescriptionText(description);
    commentEditClickHandler(0);
  };
  const postDeletionHandler = async (): Promise<void> => {
    try {
      await dispatch(deletePost(postId));
      ToastAndroid.show('Post deleted successfully', ToastAndroid.SHORT);
    } catch (error: any) {
      ToastAndroid.show('Error deleting post', ToastAndroid.SHORT);
    }
  };

  const contentHeightHandler = (e: any): void => {
    const {height} = e.nativeEvent.layout;
    setContentSize(height);
  };

  const titleHeightHandler = (e: any): void => {
    const {height} = e.nativeEvent.layout;
    setTitleHeight(height);
  };

  const descriptionHeightHandler = (e: any): void => {
    const {height} = e.nativeEvent.layout;
    setDescriptionHeight(height);
  };

  return (
    <PostWrapper>
      <LeftButtonContainer>
        {editMode ? (
          <CommentCountContainer onPress={cancelEventHandler}>
            <Icon icon="ban" size={17} />
          </CommentCountContainer>
        ) : (
          <CommentCountContainer onPress={postClickHandler}>
            <Icon icon="file-lines" size={22} color={'#a13f28'} />
            <CommentCount>
              {commentCount ? (commentCount < 9 ? commentCount : '9+') : ''}
            </CommentCount>
          </CommentCountContainer>
        )}
      </LeftButtonContainer>
      {editMode ? (
        <ContentContainer height={contentSize}>
          <InputTitle
            multiline
            maxLength={100}
            value={titleText}
            height={titleHeight}
            cursorColor="#757072"
            onFocus={postFocusHandler}
            placeholderTextColor="#847878"
            placeholder="Enter post title"
            onChangeText={(text: string) => setTitleText(text)}
          />
          <InputDescription
            autoFocus
            multiline
            maxLength={800}
            cursorColor="#757072"
            value={descriptionText}
            height={descriptionHeight}
            onFocus={postFocusHandler}
            placeholder="Enter post description"
            onChangeText={(text: string) => setDescriptionText(text)}
            placeholderTextColor="#847878"
          />
        </ContentContainer>
      ) : (
        <ContentContainer
          onLayout={contentHeightHandler}
          onPress={postClickHandler}>
          <TitleWrapper onLayout={titleHeightHandler}>{title}</TitleWrapper>
          <DescriptionWrapper onLayout={descriptionHeightHandler}>
            {description}
          </DescriptionWrapper>
        </ContentContainer>
      )}
      <RigthButtonsContainer>
        <CloseButton onPress={postDeletionHandler}>
          {editMode || <Icon icon="xmark" size={24} />}
        </CloseButton>
        {editMode ? (
          <EditButton onPress={postSavedHandler}>
            <Icon icon="floppy-disk" size={17} />
          </EditButton>
        ) : (
          <EditButton onPress={commentEditClickHandler.bind(this, postId)}>
            <Icon icon="pen" size={17} />
          </EditButton>
        )}
      </RigthButtonsContainer>
    </PostWrapper>
  );
};
