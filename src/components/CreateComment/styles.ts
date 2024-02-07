import styled from 'styled-components/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import { Shadow } from "react-native-shadow-2";
import { StyleSheet } from "react-native";

export const CommentСreationWrapper = styled.View`
  background-color: #f9e09e;
  background-color: #fffbff;
  background-color: #faf1f4;

  min-height: 100px;
  padding: 20px 20px 15px;
`;

export const CommentСreationСontainer = styled.View`
  background-color: #f9e09e;
  background-color: #faf1f4;
  background-color: #fffbff;

  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  min-height: 50px;
  border-radius: 5px;
  border: 1px solid #85736f;
`;

export const CommentInput = styled.TextInput`
  //background-color: red;
  color: #1b1c1f;
  flex: 1;
  max-height: 150px;
`;

export const SendButton = styled.TouchableOpacity`
  //background-color: darkcyan;
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
`;

export const Icon = styled(FontAwesomeIcon)`
  color: #1b1c1f;
`;

export const ShadowWrapper = styled(Shadow)`
  align-self: stretch;
`;

export const styles = StyleSheet.create({
  shadowStyles: {
    alignSelf: 'stretch',
  },
  shadowContainerStyles: {
    alignSelf: 'stretch',
  },
});
