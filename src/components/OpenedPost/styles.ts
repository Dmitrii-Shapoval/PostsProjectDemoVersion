import styled from 'styled-components/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

export const PostContainer = styled.View`
  min-height: 100px;
  //background-color: red;
`;

export const PostTitle = styled.Text`
  min-height: 35px;
  text-align: center;
  //background-color: red;
  font-size: 22px;
  color: #201b18;
  border-bottom-width: 1px;
  padding: 20px 0;
`;

export const PostDescription = styled.Text`
  width: 100%;
  min-height: 60px;
  color: #201b18;
  padding: 20px 0;
`;

export const InfoBlock = styled.View`
  width: 100%;
  min-height: 20px;
  //background-color: red;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 0 5px;
`;

export const ListTitle = styled.Text`
  font-size: 22px;
  color: #201b18;
  //background-color: blue;
`;

export const ElementsNumber = styled.View`
  //background-color: blue;
`;

export const Icon = styled(FontAwesomeIcon)`
  color: #a13f28;
`;

export const MessageCounter = styled.Text`
  color: #faf1f4;
  position: absolute;
  font-size: 18px;
  //background-color: red;
  width: 100%;
  text-align: center;
`;
