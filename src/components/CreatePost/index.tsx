import React from 'react';
import {Modal} from 'react-native';
import {
  CreatePostWrapper,
  CreatePostContainer,
  TitleContainer,
  Icon,
  Title,
  InputContainer,
  InputTitle,
  InputDescription,
  IconContainer,
} from './styles.ts';
import RectangularButton from '../RectangularButton';

interface iProps {
  visible: boolean;
  visibilityHandler: any;
}
export default ({visible, visibilityHandler}: iProps) => {
  const [titleText, setTitleText] = React.useState('');
  const [descriptionText, setDescriptionText] = React.useState('');
  const windowCloseHandler = () => {
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
              onChangeText={text => setTitleText(text)}
              value={titleText}
              cursorColor="#757072"
            />
          </InputContainer>
          <InputContainer>
            <InputDescription
              multiline
              numberOfLines={5}
              onChangeText={text => setDescriptionText(text)}
              value={descriptionText}
              placeholder="Введите описание поста"
              maxLength={800}
              placeholderTextColor="#847878"
              cursorColor="#757072"
            />
          </InputContainer>
          <RectangularButton
            onPress={visibilityHandler}
            text="Save"
            disableShadow={!visible}
          />
        </CreatePostContainer>
      </CreatePostWrapper>
    </Modal>
  );
};
