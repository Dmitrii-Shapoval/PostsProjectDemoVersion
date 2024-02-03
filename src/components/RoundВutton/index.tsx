import {ButtonWrapper, TextWrapper, ShadowWrapper, styles} from './styles.ts';
import React from 'react';

interface iProps {
  text?: string;
  onPress: any;
  disableShadow?: boolean;
  children?: any;
}
const {shadowStyles}: any = styles;

export default ({text, onPress, disableShadow, children}: iProps) => (
  <ShadowWrapper distance={10} style={shadowStyles} disabled={disableShadow}>
    <ButtonWrapper onPressIn={onPress}>
      {children ?? <TextWrapper>{text}</TextWrapper>}
    </ButtonWrapper>
  </ShadowWrapper>
);
