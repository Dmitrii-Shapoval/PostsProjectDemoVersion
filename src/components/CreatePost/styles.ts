import styled from 'styled-components/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

export const CreatePostWrapper = styled.View`
  height: 100%;
  background-color: rgba(36, 26, 0, 0.8);
  //background-color: rgba(133, 115, 111, 0.7);
  align-items: center;
  justify-content: center;
`;

export const CreatePostContainer = styled.View`
  background-color: #fffbff;
  border-radius: 15px;
  min-height: 380px;
  width: 90%;
  padding: 25px;
  justify-content: space-between;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`;
export const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #221b01;
`;
export const IconContainer = styled.TouchableOpacity`
  position: absolute;
  right: -10px;
  top: -10px;
`;
export const Icon = styled(FontAwesomeIcon)`
  color: #221b01;
`;
export const InputContainer = styled.View`
  border-bottom-color: #757072;
  border-bottom-width: 1px;
  background-color: #f7f2f6;
`;
export const InputTitle = styled.TextInput`
  padding: 10px;
`;
export const InputDescription = styled.TextInput`
  padding: 10px;
  max-height: 150px;
`;
