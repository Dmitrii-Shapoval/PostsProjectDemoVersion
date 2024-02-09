import {
  Icon,
  styles,
  TextWrapper,
  ArrowButton,
  HeaderWrapper,
  ShadowWrapper,
  LeftContainer,
  RightContainer,
  TitleContainer,
} from './styles.ts';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
interface iProps {
  title: string;
  backButton?: boolean;
}
const Header = ({title, backButton}: iProps) => {
  const navigation = useNavigation();
  const getBack = () => navigation.goBack();
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
            <ArrowButton onPress={getBack}>
              <Icon icon="angle-left" size={35} />
            </ArrowButton>
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
