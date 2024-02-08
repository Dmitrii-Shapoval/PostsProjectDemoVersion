import Post from '../../components/Post';
import {View, Keyboard} from 'react-native';
import Header from '../../components/Header';
import React, {useEffect, useState} from 'react';
import CreatePost from '../../components/CreatePost';
import {DATA, iPost} from '../../assets/data/DATA.ts';
import RoundButton from '../../components/RoundВutton';
import {Footer, LastItem, PostsList, PostsWrapper, Icon} from './styles.ts';

const Posts = () => {
  const [data, setData] = useState<Array<iPost>>(DATA);
  const [postEditClick, setPostEditClick] = useState<number>(0);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState<boolean>(false);
  const [createPostVisible, setCreatePostVisible] = useState<boolean>(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (): void => {
        setIsKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardVisible(false);
      },
    );

    return (): void => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  const visibilitySwitchHandler = () =>
    setCreatePostVisible((prevState: boolean) => !prevState);

  const postEditClickHandler = (postId: number): void => {
    setPostEditClick(postId);
  };

  const postDeletionHandler = (postId: number): void => {
    setData((prevState: Array<object>): any => {
      const newData: any = [...prevState];
      return newData.filter((item: any): boolean => item.id !== postId);
    });
  };

  const postUpdateHandler = (newData: iPost): void => {
    setData((prevState: Array<iPost>): any => {
      return prevState.map((item: iPost): iPost => {
        if (item.id === newData.id) {
          return {...item, ...newData};
        }
        return item;
      });
    });
  };

  const postCreateHandler = (newData: iPost): void => {
    setData((prevState: Array<iPost>): any => {
      return [newData, ...prevState];
    });
  };

  return (
    <PostsWrapper>
      <Header title="Posts App Demo" />
      <PostsList
        data={data}
        renderItem={({item}: any) => (
          <Post
            postId={item.id}
            title={item.title}
            description={item.body}
            editMode={item.id === postEditClick}
            commentEditClickHandler={postEditClickHandler}
            postUpdateHandler={postUpdateHandler}
            postDeletionHandler={postDeletionHandler}
          />
        )}
        keyExtractor={(item: any) => item.id}
        ListFooterComponent={LastItem}
        // ListHeaderComponent={
        //   <View
        //     style={{
        //       flexDirection: 'row',
        //       justifyContent: 'center',
        //       alignItems: 'center',
        //       height: 50,
        //       width: '100%',
        //       backgroundColor: '#f9e09e',
        //     }}>
        //     <Icon icon="left-long" />
        //     <Icon icon="arrow-left-long" />
        //     <Icon icon="angle-left" />
        //     <Icon icon="envelopes-bulk" />
        //   </View>
        // }
      />
      {isKeyboardVisible || (
        <Footer>
          <RoundButton
            onPress={visibilitySwitchHandler}
            disableShadow={createPostVisible}>
            <Icon icon="plus" size={22} />
          </RoundButton>
        </Footer>
      )}
      <CreatePost
        visible={createPostVisible}
        visibilityHandler={visibilitySwitchHandler}
        postCreateHandler={postCreateHandler}
      />
    </PostsWrapper>
  );
};

export default Posts;
