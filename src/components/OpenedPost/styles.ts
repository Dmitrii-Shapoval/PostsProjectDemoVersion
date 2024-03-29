import styled from 'styled-components/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

export const PostContainer = styled.View`
  min-height: 100px;
`;

export const PostTitle = styled.Text`
  min-height: 35px;
  text-align: center;
  font-size: 22px;
  color: #201b18;
  border-bottom-width: 1px;
  padding: 20px 0;
`;

export const PostDescription = styled.Text`
  width: 100%;
  min-height: 60px;
  color: #201b18;
  padding: 15px 0 20px;
`;

export const InfoBlock = styled.View`
  width: 100%;
  min-height: 20px;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 0 5px;
`;

export const ListTitle = styled.Text`
  font-size: 22px;
  color: #201b18;
`;

export const ElementsNumber = styled.View`
`;

export const Icon = styled(FontAwesomeIcon)`
  color: #a13f28;
`;

export const MessageCounter = styled.Text`
  color: #faf1f4;
  position: absolute;
  font-size: 18px;
  width: 100%;
  text-align: center;
`;
