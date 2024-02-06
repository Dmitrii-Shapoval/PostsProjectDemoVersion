import React, {useEffect, useState} from 'react';
import {View, Keyboard} from 'react-native';
import {Footer, LastItem, PostsList, PostsWrapper, Icon} from './styles.ts';
import Header from '../../components/Header';
import RoundButton from '../../components/RoundВutton';
import CreatePost from '../../components/CreatePost';
import Post from '../../components/Post';

interface iPost {
  id: number;
  title: string;
  body: string;
}

const DATA = [
  {
    id: 1,
    title: 'Michael Scott',
    body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    id: 2,
    title: 'Jim Halpert',
    body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    id: 3,
    title: 'Pam Beesly',
    body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  },
  {
    id: 4,
    title:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    body: 'Lorem Ipsum is simply dummy tethe 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  },
  {
    id: 5,
    title: 'Andy Bernard',
    body: 'Lorem Ipsum is simply dummy text',
  },
  {
    id: 6,
    title: 'Ryan Howard',
    body: 'Lorem Ipsum is simply dummy text of the printing and typedummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  },
  {
    id: 7,
    title: 'Kelly Kapoor',
    body: 'Lorem Ipsum is simply dummy text of the printing and types standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  },
  {
    id: 9,
    title: 'Toby Flenderson',
    body: 'Lorem Ipsum is simply dummy text of the pri',
  },
  {
    id: 10,
    title: 'Stanley Hudson',
    body: 'Lorem Ipsum is simply dummy texype and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  },
  {
    id: 11,
    title: 'Phyllis Vance',
    body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
];

const Posts = () => {
  const [data, setData] = useState(DATA);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [createPostVisible, setCreatePostVisible] = useState(false);
  const [postEditClik, setPostEditClik] = useState(0);

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
    setPostEditClik(postId);
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
            editMode={item.id === postEditClik}
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
