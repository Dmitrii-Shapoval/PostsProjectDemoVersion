import Header from '../../components/Header';
import Comment from '../../components/Comment';
import {Keyboard, Animated} from 'react-native';
import React, {useEffect, useState} from 'react';
import OpenedPost from '../../components/OpenedPost';
import CreateComment from '../../components/CreateComment';
import {LastItem, PostsList, PostsWrapper} from './styles.ts';
import {DATA_COMMENT, iComment} from '../../assets/data/DATA.ts';

const PostsDetails = ({route}: any) => {
  const {title, body} = route.params;
  const slideAnimation = useState(new Animated.Value(0))[0];
  const [data, setData] = useState<Array<iComment>>(DATA_COMMENT);
  const [postEditClick, setPostEditClick] = useState<number>(0);

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

  const commentFocusHandler = (): void => {
    Animated.timing(slideAnimation, {
      toValue: 200,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const commentCreateHandler = (newData: iComment): void => {
    setData((prevState: Array<iComment>): Array<iComment> => {
      return [newData, ...prevState];
    });
  };
  const commentUpdateHandler = (newData: iComment): void => {
    setData((prevState: Array<iComment>): Array<iComment> => {
      return prevState.map((item: iComment): iComment => {
        if (item.id === newData.id) {
          return {...item, ...newData};
        }
        return item;
      });
    });
  };
  const commentDeletionHandler = (comment: number): void => {
    setData((prevState: Array<iComment>): Array<iComment> => {
      const newData: Array<iComment> = [...prevState];
      return newData.filter((item: iComment): boolean => item.id !== comment);
    });
  };
  const commentEditClickHandler = (commentId: number): void => {
    setPostEditClick(commentId);
  };

  return (
    <PostsWrapper>
      <Header title="Comments" backButton />
      <PostsList
        data={data}
        renderItem={({item}: any) => (
          <Comment
            postId={item.postId}
            editMode={item.id === postEditClick}
            commentId={item.id}
            description={item.text}
            commentFocusHandler={commentFocusHandler}
            commentUpdateHandler={commentUpdateHandler}
            commentDeletionHandler={commentDeletionHandler}
            commentEditClickHandler={commentEditClickHandler}
          />
        )}
        keyExtractor={(item: any) => item.id}
        ListFooterComponent={LastItem}
        ListHeaderComponent={
          <OpenedPost
            title={title}
            listTitle="Coments"
            description={body}
            commentNumber={data.length < 9 ? data.length : '9+'}
          />
        }
      />
      <Animated.View
        style={{
          alignSelf: 'stretch',
          transform: [{translateY: slideAnimation}],
        }}>
        <CreateComment commentCreateHandler={commentCreateHandler} />
      </Animated.View>
    </PostsWrapper>
  );
};

export default PostsDetails;
