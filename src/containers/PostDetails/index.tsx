import Header from '../../components/Header';
import Comment from '../../components/Comment';
import {Keyboard, Animated} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import OpenedPost from '../../components/OpenedPost';
import CreateComment from '../../components/CreateComment';
import {LastItem, CommentsList, CommentsWrapper} from './styles.ts';
import {DATA_COMMENT, iComment} from '../../assets/data/DATA.ts';

const PostsDetails = ({route}: any) => {
  const {id, title, body} = route.params;
  const slideAnimation: Animated.Value = useRef(new Animated.Value(0)).current;
  const selectCommentsById = (data: Array<iComment>, postId: number) => {
    return data.filter((item: iComment): boolean => item.postId === postId);
  };
  const selectedComments: Array<iComment> = selectCommentsById(
    DATA_COMMENT,
    id,
  );
  const [data, setData] = useState<Array<iComment>>(selectedComments);
  const [postEditClick, setPostEditClick] = useState<number>(0);

  console.log('selectedComments', selectedComments.length, id);

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      (): void => {
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
    <CommentsWrapper>
      <Header title="Comments" backButton />
      <CommentsList
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
    </CommentsWrapper>
  );
};

export default PostsDetails;
