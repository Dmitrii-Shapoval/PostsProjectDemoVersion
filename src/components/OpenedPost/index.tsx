import React from 'react';
import {
  PostContainer,
  PostTitle,
  PostDescription,
  InfoBlock,
  ListTitle,
  ElementsNumber,
  Icon,
  MessageCounter,
} from './styles.ts';

interface iProps {
  title: string;
  description: string;
  listTitle: string;
  messagesNumber: number;
}

export default ({title, description, listTitle, messagesNumber}: iProps) => (
  <PostContainer>
    <PostTitle>{title}</PostTitle>
    <PostDescription>{description}</PostDescription>
    <InfoBlock>
      <ListTitle>{listTitle}</ListTitle>
      <ElementsNumber>
        <Icon icon="message" size={30} />
        <MessageCounter>{messagesNumber}</MessageCounter>
      </ElementsNumber>
    </InfoBlock>
  </PostContainer>
);
