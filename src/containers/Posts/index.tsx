import Post from '../../components/Post';
import {ThunkDispatch} from 'redux-thunk';
import Header from '../../components/Header';
import CreatePost from '../../components/CreatePost';
import RoundButton from '../../components/RoundВutton';
import {Animated, Keyboard, ToastAndroid} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Footer, LastItem, PostsList, PostsWrapper, Icon} from './styles.ts';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchPosts,
  RootState,
  PostActionTypes,
  IPost,
  addPost,
  updatePost,
  deletePost,
} from '../../redux';

const Posts = ({navigation}: any) => {
  const dispatch =
    useDispatch<ThunkDispatch<RootState, undefined, PostActionTypes>>();
  const posts = useSelector((state: RootState) => state.posts.posts);
  const slideAnimation = useRef(new Animated.Value(0)).current;
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

  const postDeletionHandler = async (postId: number): Promise<void> => {
    try {
      await dispatch(deletePost(postId));
      ToastAndroid.show('Post deleted successfully', ToastAndroid.SHORT);
    } catch (error: any) {
      ToastAndroid.show('Error deleting post', ToastAndroid.SHORT);
    }
  };

  const postUpdateHandler = async (updatedPost: IPost): Promise<void> => {
    try {
      await dispatch(updatePost(updatedPost));
      ToastAndroid.show('Post updated successfully', ToastAndroid.SHORT);
    } catch (error: any) {
      ToastAndroid.show('Error updating post', ToastAndroid.SHORT);
    }
  };

  const postCreateHandler = async (newData: IPost): Promise<void> => {
    try {
      await dispatch(addPost(newData));
      ToastAndroid.show('Post added successfully', ToastAndroid.SHORT);
    } catch (error: any) {
      ToastAndroid.show('Error adding post', ToastAndroid.SHORT);
    }
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
            postUpdateHandler={postUpdateHandler}
            postDeletionHandler={postDeletionHandler}
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
        postCreateHandler={postCreateHandler}
      />
    </PostsWrapper>
  );
};

export default Posts;
