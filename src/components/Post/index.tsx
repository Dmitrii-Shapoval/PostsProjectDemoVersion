import React, {useState} from 'react';
import {
  PostWrapper,
  MessageCountContainer,
  Icon,
  MessageCount,
  ContentContainer,
  TitleWrapper,
  DescriptionWrapper,
  LeftButtonContainer,
  RigthButtonsContainer,
  CloseButton,
  InputDescription,
  InputTitle,
  EditButton,
} from './styles.ts';

interface iProps {
  title: string;
  description: string;
  postEditClickHandler: any;
  postUpdateHandler: any;
  postDeletionHandler: any;
  editMode: boolean;
  postId: number;
}
export default ({
  postId,
  title,
  description,
  postEditClickHandler,
  postUpdateHandler,
  postDeletionHandler,
  editMode,
}: iProps) => {
  const [titleText, setTitleText] = React.useState<string>(title);
  const [descriptionText, setDescriptionText] =
    React.useState<string>(description);
  const [contentSize, setContentSize] = useState<number>(100);
  const [titleHeight, setTitleHeight] = useState<number>(100);
  const [descriptionHeight, setDescriptionHeight] = useState<number>(500);

  const messageCount: number = 7;
  const cancelEventHandler = (): void => {
    postEditClickHandler(0);
    setTitleText(title);
    setDescriptionText(description);
  };
  const postSavedHandler = (): void => {
    postEditClickHandler(0);
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
          <MessageCountContainer onPress={cancelEventHandler}>
            <Icon icon="ban" size={17} />
          </MessageCountContainer>
        ) : (
          <MessageCountContainer>
            <Icon icon="message" size={22} color={'#a13f28'} />
            <MessageCount>
              {messageCount < 9 ? messageCount : '9+'}
            </MessageCount>
          </MessageCountContainer>
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
        <ContentContainer onLayout={contentHeightHandler}>
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
          <EditButton onPress={postEditClickHandler.bind(this, postId)}>
            <Icon icon="pen" size={17} />
          </EditButton>
        )}
      </RigthButtonsContainer>
    </PostWrapper>
  );
};
