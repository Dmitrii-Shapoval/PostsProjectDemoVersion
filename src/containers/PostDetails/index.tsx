import React, {useEffect, useState} from 'react';
import {View, Keyboard} from 'react-native';
import {LastItem, PostsList, PostsWrapper} from './styles.ts';
import Header from '../../components/Header';
import CreatePost from '../../components/CreatePost';
import Post from '../../components/Post';
import {DATA, iPost} from '../../assets/data/data.ts';
import OpenedPost from '../../components/OpenedPost';
import CreateComment from '../../components/CreateComment';

const PostsDetails = () => {
  const [data, setData] = useState<Array<iPost>>(DATA);




  const [createCommentVisible, setCreateCommentVisible] =
    useState<boolean>(true);
  const [postEditClick, setPostEditClick] = useState<number>(0);

  const [isKeyboardVisible, setIsKeyboardVisible] = useState<boolean>(false);
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
    createCommentVisible((prevState: boolean) => !prevState);

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
            postEditClickHandler={postEditClickHandler}
            postUpdateHandler={postUpdateHandler}
            postDeletionHandler={postDeletionHandler}
          />
        )}
        keyExtractor={(item: any) => item.id}
        ListFooterComponent={LastItem}
        ListHeaderComponent={
          <OpenedPost
            title="Ryan Howard"
            description="Lorem Ipsum is simply dummy text of the printing and typedummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            listTitle="Coments"
            messagesNumber={6}
          />
        }
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
        //     <Icon icon="paper-plane" />
        //     <Icon icon="left-long" />
        //     <Icon icon="arrow-left-long" />
        //     <Icon icon="angle-left" />
        //     <Icon icon="envelopes-bulk" />
        //   </View>
        // }
      />
      {/*{isKeyboardVisible || (*/}

      {createCommentVisible && <CreateComment />}
      {/*)}*/}
    </PostsWrapper>
  );
};

export default PostsDetails;
