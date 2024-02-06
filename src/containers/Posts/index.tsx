import React, {useEffect, useState} from 'react';
import {View, Keyboard} from 'react-native';
import {Footer, LastItem, PostsList, PostsWrapper, Icon} from './styles.ts';
import Header from '../../components/Header';
import RoundButton from '../../components/RoundВutton';
import CreatePost from '../../components/CreatePost';
import Post from '../../components/Post';
import DATA from '../../assets/data/data.ts';

const Posts = () => {
  const [data, setData] = useState(DATA);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [createPostVisible, setCreatePostVisible] = useState(false);
  const [postEditClick, setPostEditClick] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  const visibilitySwitchHandler = () =>
    setCreatePostVisible((prevState: boolean) => !prevState);

  const postEditClickHandler = (postId: number): void => {
    setPostEditClick(postId);
    console.log('postId:', postId);
  };

  const postDeletionHandler = (postId: number): void => {
    setData((prevState: Array<object>): any => {
      const newData: any = [...prevState];
      return newData.filter((item: any): boolean => item.id !== postId);
    });
  };

  const updatePostHandler = (postId: number, newData: object): void => {
    setData((prevState: Array<object>): any => {
      const updatedData: any[] = prevState.map((item: any) => {
        if (item.id === postId) {
          return {...item, ...newData}; // Обновляем данные элемента
        }
        return item;
      });
      return updatedData;
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
            postEditClickHandler={postEditClickHandler}
            updatePostHandler={updatePostHandler}
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
        //     <Icon icon="comment" />
        //     <Icon icon="xmark" />
        //     <Icon icon="pen" />
        //     <Icon icon="ban" />
        //     <Icon icon="floppy-disk" />
        //     <Icon icon="paper-plane" />
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
      />
    </PostsWrapper>
  );
};

export default Posts;
