import React from 'react';
import {ButtonWrapper, TextWrapper, ShadowWrapper} from './styles.ts';
interface iProps {
  text?: string;
  onPress: any;
  children?: any;
  disableShadow?: boolean;
}

export default ({text, onPress, disableShadow, children}: iProps) => (
  <ShadowWrapper distance={15} disabled={disableShadow}>
    <ButtonWrapper onPress={onPress}>
      {children ?? <TextWrapper>{text}</TextWrapper>}
    </ButtonWrapper>
  </ShadowWrapper>
);
