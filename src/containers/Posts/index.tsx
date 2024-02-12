import axios from 'axios';
import {BASE_URL} from "../../../links";
import Post from '../../components/Post';
import Header from '../../components/Header';
import {iPost} from '../../assets/data/DATA.ts';
import CreatePost from '../../components/CreatePost';
import RoundButton from '../../components/RoundВutton';
import {Alert, Animated, Keyboard} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Footer, LastItem, PostsList, PostsWrapper, Icon} from './styles.ts';

const Posts = ({navigation, route}: any) => {
  const slideAnimation = useRef(new Animated.Value(0)).current;
  const [postEditClick, setPostEditClick] = useState<number>(0);
  const [deleteError, setDeleteError] = useState<boolean>(false);
  const [posts, setPosts] = useState<Array<iPost> | null>(null);
  const [createPostVisible, setCreatePostVisible] = useState<boolean>(false);

  const {fetchPosts} = route.params;

  useEffect(() => {
    fetchPosts()
      .then((responseData: any) => {
        setPosts(responseData);
      })
      .catch((error: any) => {
        console.error('Error loading data:', error);
      });
  }, [fetchPosts]);

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

  const postDeletionHandler = async (postId: number): Promise<void> => {
    try {
      await axios.delete(`${BASE_URL}/posts/${postId}`);
      setPosts((prevState: Array<iPost> | null): any =>
        prevState?.filter(({id}: iPost): boolean => id !== postId),
      );
      console.log('Post deleted successfully');
    } catch (error: any) {
      console.error('Error deleting post:', error.message);
      setDeleteError(true);
    }
  };

  const postUpdateHandler = async (updatedPost: iPost): Promise<void> => {
    try {
      const response = await axios.put(
        `${BASE_URL}/posts/${updatedPost.id}`,
        updatedPost,
      );
      const modifiedPost: iPost = response.data;
      setPosts(
        (prevState: any): Array<iPost> =>
          prevState.map((post: iPost): iPost => {
            if (post.id === modifiedPost.id) {
              return modifiedPost;
            }
            return post;
          }),
      );
      console.log('Comment updated successfully:', modifiedPost);
    } catch (error: any) {
      console.error('Error updating post:', error.message);
    }
  };

  const postCreateHandler = async (newData: iPost): Promise<void> => {
    try {
      const response = await axios.post(`${BASE_URL}/posts`, newData);
      const addedPosts: iPost = response.data;
      setPosts((prevState: Array<iPost> | null): any =>
        prevState ? [addedPosts, ...prevState] : [addedPosts],
      );
      console.log('Post added successfully', addedPosts);
    } catch (error: any) {
      console.error('Error adding post:', error.message);
    }
  };

  const postFocusHandler = (): void => {
    Animated.timing(slideAnimation, {
      toValue: 200,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (deleteError) {
      Alert.alert(
        'Delete Error',
        `
          An error occurred while deleting the post. This error occurs only when attempting to delete new posts that were added during the current session with the fake server.
         
         The deletion functionality is available only for posts that already exist on the server. Please keep this in mind when working with posts.`,
        [{text: 'OK', onPress: () => setDeleteError(false)}],
      );
    }
  }, [deleteError]);

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
