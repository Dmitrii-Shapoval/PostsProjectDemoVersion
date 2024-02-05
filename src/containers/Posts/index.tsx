import React, {useState} from 'react';
import {View} from 'react-native';
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
    title: 'Dwight Schrute',
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
  const [createPostVisible, setCreatePostVisible] = useState(false);
  const visibilitySwitchHandler = () =>
    setCreatePostVisible((prevState: boolean) => !prevState);

  return (
    <PostsWrapper>
      <Header title="Posts App Demo" />
      <PostsList
        data={DATA}
        renderItem={({item}) => (
          <Post title={item.title} description={item.body} />
        )}
        keyExtractor={item => item.id}
        ListFooterComponent={LastItem}
        ListHeaderComponent={
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: 50,
              width: '100%',
              backgroundColor: '#f9e09e',
            }}>
            <Icon icon="comment" />
            <Icon icon="xmark" />
            <Icon icon="pen" />
            <Icon icon="ban" />
            <Icon icon="floppy-disk" />
            <Icon icon="paper-plane" />
            <Icon icon="left-long" />
            <Icon icon="arrow-left-long" />
            <Icon icon="angle-left" />
            <Icon icon="envelopes-bulk" />
          </View>
        }
      />
      <Footer>
        <RoundButton
          onPress={visibilitySwitchHandler}
          disableShadow={createPostVisible}>
          <Icon icon="plus" size={22} />
        </RoundButton>
      </Footer>
      <CreatePost
        visible={createPostVisible}
        visibilityHandler={visibilitySwitchHandler}
      />
    </PostsWrapper>
  );
};

export default Posts;
