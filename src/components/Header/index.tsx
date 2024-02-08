import {
  Icon,
  styles,
  TextWrapper,
  HeaderWrapper,
  ShadowWrapper,
  LeftContainer,
  RightContainer,
  TitleContainer,
} from './styles.ts';
import React from 'react';
interface iProps {
  title: string;
  backButton?: boolean;
}
const Header = ({title, backButton}: iProps) => {
  const {shadowContainerStyles, shadowStyles}: any = styles;
  return (
    <ShadowWrapper
      distance={15}
      offset={[0, 2]}
      containerStyle={shadowContainerStyles}
      style={shadowStyles}>
      <HeaderWrapper>
        <LeftContainer>
          {backButton ? (
            <Icon icon="angle-left" size={35} />
          ) : (
            <Icon icon="envelopes-bulk" size={45} />
          )}
        </LeftContainer>
        <TitleContainer>
          <TextWrapper>{title}</TextWrapper>
        </TitleContainer>
        <RightContainer />
      </HeaderWrapper>
    </ShadowWrapper>
  );
};

export default Header;
