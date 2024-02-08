import React from 'react';
import {
  Icon,
  InfoBlock,
  ListTitle,
  PostTitle,
  PostContainer,
  ElementsNumber,
  MessageCounter,
  PostDescription,
} from './styles.ts';

interface iProps {
  title: string;
  listTitle: string;
  description: string;
  commentNumber: number | string;
}

export default ({title, description, listTitle, commentNumber}: iProps) => (
  <PostContainer>
    <PostTitle>{title}</PostTitle>
    <PostDescription>{description}</PostDescription>
    <InfoBlock>
      <ListTitle>{listTitle}</ListTitle>
      <ElementsNumber>
        <Icon icon="message" size={30} />
        <MessageCounter>{commentNumber}</MessageCounter>
      </ElementsNumber>
    </InfoBlock>
  </PostContainer>
);
