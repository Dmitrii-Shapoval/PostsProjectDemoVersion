import {Animated, Keyboard} from 'react-native';
import Post from '../../components/Post';
import Header from '../../components/Header';
import React, {useEffect, useState} from 'react';
import CreatePost from '../../components/CreatePost';
import {DATA, iPost} from '../../assets/data/DATA.ts';
import RoundButton from '../../components/RoundВutton';
import {NavigationProp} from '@react-navigation/native';
import {Footer, LastItem, PostsList, PostsWrapper, Icon} from './styles.ts';
const Posts = ({navigation}: {navigation: NavigationProp<any>}) => {
  const slideAnimation = useState(new Animated.Value(0))[0];
  const [data, setData] = useState<Array<iPost>>(DATA);
  const [postEditClick, setPostEditClick] = useState<number>(0);
  const [createPostVisible, setCreatePostVisible] = useState<boolean>(false);

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        Animated.timing(slideAnimation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start();
      },
    );
    return (): void => {
      keyboardDidHideListener.remove();
    };
  }, [slideAnimation]);

  const postClickHandler = (item: iPost): void => {
    navigation.navigate('PostDetails', item);
  };

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

  const postFocusHandler = (): void => {
    Animated.timing(slideAnimation, {
      toValue: 200,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <PostsWrapper>
      <Header title="Posts App Demo" backButton={false} />
      <PostsList
        data={data}
        renderItem={({item}: any) => (
          <Post
            title={item.title}
            postId={item.id}
            editMode={item.id === postEditClick}
            description={item.body}
            postFocusHandler={postFocusHandler}
            postClickHandler={postClickHandler.bind(this, item)}
            postUpdateHandler={postUpdateHandler}
            postDeletionHandler={postDeletionHandler}
            commentEditClickHandler={postEditClickHandler}
          />
        )}
        keyExtractor={(item: any) => item.id}
        ListFooterComponent={LastItem}
      />
      {/*{isKeyboardVisible || (*/}
      <Animated.View
        style={{
          transform: [{translateY: slideAnimation}],
        }}>
        <Footer>
          <RoundButton
            onPress={visibilitySwitchHandler}
            disableShadow={createPostVisible}>
            <Icon icon="plus" size={22} />
          </RoundButton>
        </Footer>
      </Animated.View>
      {/*)}*/}
      <CreatePost
        visible={createPostVisible}
        visibilityHandler={visibilitySwitchHandler}
        postCreateHandler={postCreateHandler}
      />
    </PostsWrapper>
  );
};

export default Posts;
