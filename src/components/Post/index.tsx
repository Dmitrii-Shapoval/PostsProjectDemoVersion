import React from 'react';
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
  updatePostHandler: any;
  postDeletionHandler: any;
  editMode: boolean;
  postId: number;
}
export default ({
  postId,
  title,
  description,
  postEditClickHandler,
  updatePostHandler,
  postDeletionHandler,
  editMode,
}: iProps) => {
  const [titleText, setTitleText] = React.useState(title);
  const [descriptionText, setDescriptionText] = React.useState(description);

  const messageCount: number = 7;
  const cancelEventHandler = () => {
    postEditClickHandler(0);
    setTitleText(title);
    setDescriptionText(description);
  };
  const postSavedHandler = () => {
    postEditClickHandler(0);
    updatePostHandler(postId, {title: titleText, body: descriptionText});
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
        <ContentContainer>
          <InputTitle
            multiline
            onChangeText={text => setTitleText(text)}
            value={titleText}
            placeholder="Введите заголовок поста"
            maxLength={100}
            placeholderTextColor="#847878"
            cursorColor="#757072"
          />
          <InputDescription
            // autoFocus
            multiline
            onChangeText={text => setDescriptionText(text)}
            value={descriptionText}
            placeholder="Введите описание поста"
            maxLength={800}
            placeholderTextColor="#847878"
            cursorColor="#757072"
          />
        </ContentContainer>
      ) : (
        <ContentContainer>
          <TitleWrapper>{title}</TitleWrapper>
          <DescriptionWrapper>{description}</DescriptionWrapper>
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
