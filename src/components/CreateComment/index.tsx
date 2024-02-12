import React from 'react';
import {
  Icon,
  styles,
  SendButton,
  CommentInput,
  ShadowWrapper,
  CommentCreationWrapper,
  CommentCreationContainer,
} from './styles.ts';
interface iProps {
  postId: number;
  commentCreateHandler: any;
}

export default ({commentCreateHandler, postId}: iProps) => {
  const {shadowStyles, shadowContainerStyles} = styles;
  const [descriptionText, setDescriptionText] = React.useState<string>('');
  const saveChangeHandler = (): void => {
    commentCreateHandler({
      id: Date.now(),
      postId,
      text: descriptionText,
    });
    setDescriptionText('');
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
            placeholder="Введите комментарий"
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
