import styled from 'styled-components/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

export const CommentWrapper = styled.View`
  background-color: #faf1f4;
  padding: 20px 15px;
  margin-top: 15px;
  border-radius: 10px;
  flex-direction: row;
  justify-content: space-between;
`;

export const Icon = styled(FontAwesomeIcon)`
  color: #241a00;
`;

export const CommentCountContainer = styled.TouchableOpacity`
  width: 100%;
  height: 35px;
  align-items: center;
  justify-content: flex-end;
`;

export const ContentContainer = styled.TouchableOpacity<{height?: number}>`
  width: 80%;
  min-height: ${({height}) => height}px;
  max-height: 500px;
  overflow: hidden;
  padding: 0 10px;
`;

export const DescriptionWrapper = styled.Text`
  min-height: 60px;
  color: #1b1c1f;
`;

export const InputDescription = styled.TextInput<{height?: number}>`
  min-height: ${({height}) => height}px;
  color: #1b1c1f;
  padding: 0;
`;

export const LeftButtonContainer = styled.View`
  width: 10%;
  justify-content: flex-end;
  align-items: center;
`;
export const RigthButtonsContainer = styled.View`
  width: 10%;
  color: #251a00;
  justify-content: space-between;
  align-items: center;
`;

export const CloseButton = styled.TouchableOpacity`
  width: 100%;
  height: 35px;
  align-items: center;
  justify-content: flex-start;
`;
export const EditButton = styled.TouchableOpacity`
  width: 100%;
  height: 35px;
  align-items: center;
  justify-content: flex-end;
`;
