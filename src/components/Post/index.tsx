import React, {useState} from 'react';
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

interface iProps {
  title: string;
  postId: number;
  editMode: boolean;
  description: string;
  postClickHandler: any;
  postUpdateHandler: any;
  postDeletionHandler: any;
  commentEditClickHandler: any;
}
export default ({
  title,
  postId,
  editMode,
  description,
  postClickHandler,
  postUpdateHandler,
  postDeletionHandler,
  commentEditClickHandler,
}: iProps) => {
  const [titleText, setTitleText] = React.useState<string>(title);
  const [contentSize, setContentSize] = useState<number>(100);
  const [titleHeight, setTitleHeight] = useState<number>(100);
  const [descriptionHeight, setDescriptionHeight] = useState<number>(500);
  const [descriptionText, setDescriptionText] =
    React.useState<string>(description);

  const commentCount: number = 7;
  const cancelEventHandler = (): void => {
    setTitleText(title);
    setDescriptionText(description);
    commentEditClickHandler(0);
  };
  const postSavedHandler = (): void => {
    commentEditClickHandler(0);
    postUpdateHandler({id: postId, title: titleText, body: descriptionText});
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
          <CommentCountContainer>
            <Icon icon="message" size={22} color={'#a13f28'} />
            <CommentCount>
              {commentCount < 9 ? commentCount : '9+'}
            </CommentCount>
          </CommentCountContainer>
        )}
      </LeftButtonContainer>
      {editMode ? (
        <ContentContainer height={contentSize}>
          <InputTitle
            multiline
            height={titleHeight}
            onChangeText={(text: string) => setTitleText(text)}
            value={titleText}
            placeholder="Введите заголовок"
            maxLength={100}
            placeholderTextColor="#847878"
            cursorColor="#757072"
          />
          <InputDescription
            autoFocus
            multiline
            height={descriptionHeight}
            onChangeText={(text: string) => setDescriptionText(text)}
            value={descriptionText}
            placeholder="Введите описание поста"
            maxLength={800}
            placeholderTextColor="#847878"
            cursorColor="#757072"
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
        <CloseButton onPress={postDeletionHandler.bind(this, postId)}>
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
