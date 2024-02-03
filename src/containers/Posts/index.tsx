import React, {useState} from 'react';
import {PostsWrapper} from './styles.ts';
import Header from '../../components/Header';
import RoundButton from '../../components/RoundВutton';
import {View} from 'react-native';
import {Icon} from './styles.ts';
import CreatePost from '../../components/CreatePost';

const Posts = () => {
  const [createPostVisible, setCreatePostVisible] = useState(false);
  const visibilitySwitchHandler = () =>
    setCreatePostVisible((prevState: boolean) => !prevState);

  return (
    <PostsWrapper>
      <Header title="Posts App Demo" />
      <CreatePost
        visible={createPostVisible}
        visibilityHandler={visibilitySwitchHandler}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: 50,
          width: '100%',
          backgroundColor: '#f9e09e',
        }}>
        <Icon icon="comment" />
        <Icon icon="xmark" />
        <Icon icon="pen" />
        <Icon icon="ban" />
        <Icon icon="floppy-disk" />
        <Icon icon="paper-plane" />
        <Icon icon="left-long" />
        <Icon icon="arrow-left-long" />
        <Icon icon="angle-left" />
        <Icon icon="envelopes-bulk" />
      </View>
      <RoundButton
        onPress={visibilitySwitchHandler}
        disableShadow={createPostVisible}>
        <Icon icon="plus" size={22} />
      </RoundButton>
    </PostsWrapper>
  );
};

export default Posts;
