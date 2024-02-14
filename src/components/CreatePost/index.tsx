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
import React from 'react';
import {useDispatch} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {Modal, ToastAndroid} from 'react-native';
import RectangularButton from '../RectangularButton';
import {addPost, IPost, PostActionTypes, RootState} from '../../redux';

interface IProps {
  visible: boolean;
  visibilityHandler: any;
}
export default ({visible, visibilityHandler}: IProps) => {
  const dispatch =
    useDispatch<ThunkDispatch<RootState, undefined, PostActionTypes>>();
  const [titleText, setTitleText] = React.useState<string>('');
  const [descriptionText, setDescriptionText] = React.useState<string>('');
  const windowCloseHandler = (): void => {
    visibilityHandler();
    setTitleText('');
    setDescriptionText('');
  };

  const saveChangeHandler = async (): Promise<void> => {
    try {
      const newData: IPost = {
        id: Date.now(),
        title: titleText,
        body: descriptionText,
      };
      await dispatch(addPost(newData));
      visibilityHandler();
      setTitleText('');
      setDescriptionText('');
      ToastAndroid.show('Post added successfully', ToastAndroid.SHORT);
    } catch (error: any) {
      ToastAndroid.show('Error adding post', ToastAndroid.SHORT);
    }
  };

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <CreatePostWrapper>
        <CreatePostContainer>
          <TitleContainer>
            <Title>CREATE NEW POST</Title>
            <IconContainer onPress={windowCloseHandler}>
              <Icon icon="xmark" size={22} />
            </IconContainer>
          </TitleContainer>
          <InputContainer>
            <InputTitle
              autoFocus={true}
              placeholder="Enter post title"
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
              placeholder="Enter post description"
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
