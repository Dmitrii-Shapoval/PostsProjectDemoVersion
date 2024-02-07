import React from 'react';
import {
  CommentСreationWrapper,
  CommentСreationСontainer,
  CommentInput,
  SendButton,
  Icon,
  ShadowWrapper,
  styles
} from './styles.ts';

export default () => {
  const {shadowStyles, shadowContainerStyles} = styles;
  return (
    <ShadowWrapper
      distance={15}
      offset={[0, -2]}
      containerStyle={shadowContainerStyles}
      style={shadowStyles}>
      <CommentСreationWrapper>
        <CommentСreationСontainer>
          <CommentInput
            autoFocus
            multiline
            // height={descriptionHeight}
            // onChangeText={(text: string) => setDescriptionText(text)}
            // value={descriptionText}
            placeholder="Введите комментарий"
            maxLength={800}
            placeholderTextColor="#847878"
            cursorColor="#757072"
          />
          <SendButton>
            <Icon icon="paper-plane" size={22} />
          </SendButton>
        </CommentСreationСontainer>
      </CommentСreationWrapper>
    </ShadowWrapper>
  );
};
