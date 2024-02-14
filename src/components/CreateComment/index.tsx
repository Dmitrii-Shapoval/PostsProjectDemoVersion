import {
  Icon,
  styles,
  SendButton,
  CommentInput,
  ShadowWrapper,
  CommentCreationWrapper,
  CommentCreationContainer,
} from './styles.ts';
import React from 'react';
import {useDispatch} from 'react-redux';
import {ToastAndroid} from 'react-native';
import {ThunkDispatch} from 'redux-thunk';
import {addComment, CommentActionTypes, IComment, RootState} from '../../redux';
interface IProps {
  postId: number;
}

export default ({postId}: IProps) => {
  const dispatch =
    useDispatch<ThunkDispatch<RootState, undefined, CommentActionTypes>>();
  const {shadowStyles, shadowContainerStyles} = styles;
  const [descriptionText, setDescriptionText] = React.useState<string>('');

  const saveChangeHandler = async (): Promise<void> => {
    const newData: IComment = {
      id: Date.now(),
      postId,
      text: descriptionText,
    };
    try {
      await dispatch(addComment(newData));
      setDescriptionText('');
      ToastAndroid.show('Comment added successfully', ToastAndroid.SHORT);
    } catch (error: any) {
      ToastAndroid.show('Error adding comment', ToastAndroid.SHORT);
    }
  };

  return (
    <ShadowWrapper
      distance={15}
      offset={[0, -2]}
      containerStyle={shadowContainerStyles}
      style={shadowStyles}>
      <CommentCreationWrapper>
        <CommentCreationContainer>
          <CommentInput
            autoFocus
            multiline
            onChangeText={(text: string) => setDescriptionText(text)}
            value={descriptionText}
            placeholder="Enter your comment"
            maxLength={800}
            placeholderTextColor="#847878"
            cursorColor="#757072"
          />
          <SendButton onPress={saveChangeHandler}>
            <Icon icon="paper-plane" size={22} />
          </SendButton>
        </CommentCreationContainer>
      </CommentCreationWrapper>
    </ShadowWrapper>
  );
};
