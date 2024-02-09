import React, {useState} from 'react';
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

interface iProps {
  postId: string;
  editMode: boolean;
  commentId: number;
  description: string;
  commentFocusHandler: any;
  commentUpdateHandler: any;
  commentDeletionHandler: any;
  commentEditClickHandler: any;
}
export default ({
  postId,
  editMode,
  commentId,
  description,
  commentFocusHandler,
  commentUpdateHandler,
  commentDeletionHandler,
  commentEditClickHandler,
}: iProps) => {
  const [contentSize, setContentSize] = useState<number>(100);
  const [descriptionHeight, setDescriptionHeight] = useState<number>(500);
  const [descriptionText, setDescriptionText] =
    React.useState<string>(description);
  const commentSavedHandler = (): void => {
    commentEditClickHandler(0);
    commentUpdateHandler({
      id: commentId,
      postId: postId,
      text: descriptionText,
    });
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
            placeholder="Введите описание поста"
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
        <CloseButton onPress={commentDeletionHandler.bind(this, commentId)}>
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
