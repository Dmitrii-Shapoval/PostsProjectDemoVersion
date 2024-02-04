import {ButtonWrapper, TextWrapper, ShadowWrapper} from './styles.ts';
import React from 'react';

interface iProps {
  text?: string;
  onPress: any;
  disableShadow?: boolean;
  children?: any;
}

export default ({text, onPress, disableShadow, children}: iProps) => (
  <ShadowWrapper distance={10} disabled={disableShadow}>
    <ButtonWrapper onPressIn={onPress}>
      {children ?? <TextWrapper>{text}</TextWrapper>}
    </ButtonWrapper>
  </ShadowWrapper>
);
