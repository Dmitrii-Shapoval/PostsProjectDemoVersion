import React from 'react';
import {Modal} from 'react-native';
import {
  Icon,
  Title,
  InputTitle,
  IconContainer,
  InputContainer,
  TitleContainer,
  InputDescription,
  CreatePostWrapper,
  CreatePostContainer,
} from './styles.ts';
import RectangularButton from '../RectangularButton';

interface iProps {
  visible: boolean;
  visibilityHandler: any;
  postCreateHandler: any;
}
export default ({visible, visibilityHandler, postCreateHandler}: iProps) => {
  const [titleText, setTitleText] = React.useState<string>('');
  const [descriptionText, setDescriptionText] = React.useState<string>('');
  const windowCloseHandler = (): void => {
    visibilityHandler();
    setTitleText('');
    setDescriptionText('');
  };
  const saveChangeHandler = (): void => {
    postCreateHandler({
      id: Date.now(),
      title: titleText,
      body: descriptionText,
    });
    visibilityHandler();
    setTitleText('');
    setDescriptionText('');
  };

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <CreatePostWrapper>
        <CreatePostContainer>
          <TitleContainer>
            <Title>COЗДАТЬ НОВЫЙ ПОСТ</Title>
            <IconContainer onPress={windowCloseHandler}>
              <Icon icon="xmark" size={22} />
            </IconContainer>
          </TitleContainer>
          <InputContainer>
            <InputTitle
              autoFocus={true}
              placeholder="Введите заголовок поста"
              maxLength={100}
              placeholderTextColor="#847878"
              onChangeText={(text: string) => setTitleText(text)}
              value={titleText}
              cursorColor="#757072"
            />
          </InputContainer>
          <InputContainer>
            <InputDescription
              multiline
              numberOfLines={5}
              onChangeText={(text: string) => setDescriptionText(text)}
              value={descriptionText}
              placeholder="Введите описание поста"
              maxLength={800}
              placeholderTextColor="#847878"
              cursorColor="#757072"
            />
          </InputContainer>
          <RectangularButton
            onPress={saveChangeHandler}
            text="Save"
            disableShadow={!visible}
          />
        </CreatePostContainer>
      </CreatePostWrapper>
    </Modal>
  );
};
