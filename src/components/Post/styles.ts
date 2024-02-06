import styled from 'styled-components/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

export const PostWrapper = styled.View`
  background-color: #faf1f4;
  padding: 15px 15px;
  margin-top: 10px;
  border-radius: 10px;
  flex-direction: row;
  justify-content: space-between;
`;

export const Icon = styled(FontAwesomeIcon)`
  color: #241a00;
`;

export const MessageCountContainer = styled.TouchableOpacity``;

export const MessageCount = styled.Text`
  color: #ffe9e2;
  font-weight: bold;
  font-size: 14px;
  z-index: 999;
  position: absolute;
  bottom: 4px;
  left: 7px;
`;

export const ContentContainer = styled.TouchableOpacity`
  width: 80%;
  min-height: 100px;
  max-height: 500px;
  overflow: hidden;
  padding: 0 10px;
`;

export const TitleWrapper = styled.Text`
  color: #1b1c1f;
  font-size: 22px;
  padding-bottom: 26px;
`;

export const InputTitle = styled.TextInput`
  color: #1b1c1f;
  font-size: 22px;
  text-align-vertical: top;
  padding: 0;
`;

export const DescriptionWrapper = styled.Text`
  color: #1b1c1f;
`;

export const InputDescription = styled.TextInput`
  text-align-vertical: top;
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

export const CloseButton = styled.TouchableOpacity``;

export const EditButton = styled.View``;
