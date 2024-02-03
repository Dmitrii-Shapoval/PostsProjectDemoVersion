import React from 'react';
import {ButtonWrapper, TextWrapper, ShadowWrapper, styles} from './styles.ts';
interface iProps {
  text?: string;
  onPress: any;
  disableShadow?: boolean;
  children?: any;
}

const {shadowStyles, shadowContainerStyles}: any = styles;
export default ({text, onPress, disableShadow, children}: iProps) => (
  <ShadowWrapper
    distance={15}
    style={shadowStyles}
    containerStyle={shadowContainerStyles}
    disabled={disableShadow}>
    <ButtonWrapper onPress={onPress}>
      {children ?? <TextWrapper>{text}</TextWrapper>}
    </ButtonWrapper>
  </ShadowWrapper>
);
