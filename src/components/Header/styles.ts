import {StyleSheet} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import styled from 'styled-components/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

export const ShadowWrapper = styled(Shadow)``;

export const HeaderWrapper = styled.View`
  height: 80px;
  background-color: #f9e09e;
  flex-direction: row;
  justify-content: space-between;
`;

export const TitleContainer = styled.View`
  justify-content: center;
`;
export const TextWrapper = styled.Text`
  color: #201b18;
  font-size: 30px;
`;

export const Icon = styled(FontAwesomeIcon)`
  color: #201b18;
`;

export const LeftContainer = styled.TouchableOpacity`
  width: 20%;
  align-items: center;
  justify-content: center;
`;
export const RightContainer = styled.View`
  width: 20%;
  align-items: center;
  justify-content: center;
`;

export const styles = StyleSheet.create({
  shadowStyles: {
    alignSelf: 'stretch',
  },
  shadowContainerStyles: {
    alignSelf: 'stretch',
  },
});
