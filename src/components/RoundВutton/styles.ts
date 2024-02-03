import styled from 'styled-components/native';
import {Shadow} from 'react-native-shadow-2';
import {StyleSheet} from 'react-native';

export const ShadowWrapper = styled(Shadow)``;
export const ButtonWrapper = styled.TouchableOpacity`
  background-color: #f9e09e;
  height: 50px;
  width: 50px;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
`;
export const TextWrapper = styled.Text`
  color: #221b01;
  font-size: 30px;
`;

export const styles = StyleSheet.create({
  shadowStyles: {
    borderRadius: 15,
  },
});
