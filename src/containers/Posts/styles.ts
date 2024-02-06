import styled from 'styled-components/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

export const PostsWrapper = styled.View`
  height: 100%;
  background-color: #fffbff;
  justify-content: space-between;
  align-items: center;
  z-index: 999;
`;

export const PostsList = styled.FlatList`
  //background-color: chartreuse;
  height: 100%;
  width: 90%;
  z-index: -999;
  position: absolute;
  padding-top: 80px;
`;

export const LastItem = styled.View`
  height: 200px;
`;

export const Icon = styled(FontAwesomeIcon)`
  color: #201b18;
  //background-color: red;
  padding-left: 30px;
`;

export const Footer = styled.View`
  padding-bottom: 25px;
`;