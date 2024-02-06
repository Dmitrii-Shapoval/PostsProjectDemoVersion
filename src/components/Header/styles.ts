import styled from 'styled-components/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Shadow} from 'react-native-shadow-2';
import {StyleSheet} from 'react-native';

export const ShadowWrapper = styled(Shadow)``;

export const HeaderWrapper = styled.View`
  height: 80px;
  background-color: #f9e09e;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const TextWrapper = styled.Text`
  color: #201b18;
  font-size: 30px;
  text-align: center;
  padding-left: 20px;
`;

export const Icon = styled(FontAwesomeIcon)`
  color: #201b18;
`;

export const styles = StyleSheet.create({
  shadowStyles: {
    width: '100%',
  },
  shadowContainerStyles: {
    width: '100%',
  },
});