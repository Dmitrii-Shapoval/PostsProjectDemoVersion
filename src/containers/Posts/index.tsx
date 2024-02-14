import Post from '../../components/Post';
import {ThunkDispatch} from 'redux-thunk';
import Header from '../../components/Header';
import {Animated, Keyboard} from 'react-native';
import CreatePost from '../../components/CreatePost';
import {useDispatch, useSelector} from 'react-redux';
import RoundButton from '../../components/RoundВutton';
import React, {useEffect, useRef, useState} from 'react';
import {fetchPosts, RootState, PostActionTypes, IPost} from '../../redux';
import {Footer, LastItem, PostsList, PostsWrapper, Icon} from './styles.ts';

const Posts = ({navigation}: any) => {
  const dispatch =
    useDispatch<ThunkDispatch<RootState, undefined, PostActionTypes>>();
  const slideAnimation = useRef(new Animated.Value(0)).current;
  const posts = useSelector((state: RootState) => state.posts.posts);
  const [postEditClick, setPostEditClick] = useState<number>(0);
  const [createPostVisible, setCreatePostVisible] = useState<boolean>(false);

  useEffect((): void => {
    dispatch(fetchPosts());
  }, [dispatch]);

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

  const postClickHandler = (item: IPost): void => {
    navigation.navigate('PostDetails', item);
  };

  const visibilitySwitchHandler = () =>
    setCreatePostVisible((prevState: boolean) => !prevState);

  const postEditClickHandler = (postId: number): void => {
    setPostEditClick(postId);
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
        data={posts}
        renderItem={({item}: any) => (
          <Post
            title={item.title}
            postId={item.id}
            editMode={item.id === postEditClick}
            description={item.body}
            postFocusHandler={postFocusHandler}
            postClickHandler={postClickHandler.bind(this, item)}
            commentEditClickHandler={postEditClickHandler}
          />
        )}
        keyExtractor={(item: any) => item.id}
        ListFooterComponent={LastItem}
      />
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
      <CreatePost
        visible={createPostVisible}
        visibilityHandler={visibilitySwitchHandler}
      />
    </PostsWrapper>
  );
};

export default Posts;
