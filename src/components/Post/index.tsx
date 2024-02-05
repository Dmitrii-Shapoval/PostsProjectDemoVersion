import React from 'react';
import {PostWrapper} from './styles.ts';
import {Text} from 'react-native';

interface iProps {
  title: string;
  description: string;
}
export default ({title, description}: iProps) => {
  return (
    <PostWrapper>
      <Text>{title}</Text>
      <Text>{description}</Text>
    </PostWrapper>
  );
};
