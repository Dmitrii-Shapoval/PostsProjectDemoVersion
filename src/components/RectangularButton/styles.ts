import styled from 'styled-components/native';
import {Shadow} from 'react-native-shadow-2';
import {StyleSheet} from 'react-native';

export const ShadowWrapper = styled(Shadow)`
  background-color: rgba(255, 218, 210, 0.38);
  //align-self: stretch;
  //border-radius: 10px;
`;

export const ButtonWrapper = styled.TouchableOpacity`
  background-color: #ffdad2;
  height: 50px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

export const TextWrapper = styled.Text`
  color: #431212;
  font-size: 20px;
`;

export const styles = StyleSheet.create({
  shadowStyles: {
    borderRadius: 10,
    alignSelf: 'stretch',
  },
  shadowContainerStyles: {
    borderRadius: 10,
  },
});
