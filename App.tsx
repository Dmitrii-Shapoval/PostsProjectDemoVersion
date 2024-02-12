import axios from 'axios';
import * as React from 'react';
import { BASE_URL } from "./links";
import Posts from './src/containers/Posts';
import {fas} from '@fortawesome/free-solid-svg-icons';
import PostDetails from './src/containers/PostDetails';
import {library} from '@fortawesome/fontawesome-svg-core';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

console.log('BASE_URL', BASE_URL);
export const fetchPosts = async (): Promise<any> => {
  try {
    const response = await axios.get(`${BASE_URL}/posts`);
    return response.data;
  } catch (error) {
    console.error('Error getting list of posts:', error);
    return [];
  }
};

export const fetchComments = async (): Promise<any> => {
  try {
    const response = await axios.get(`${BASE_URL}/comments`);
    return response.data;
  } catch (error) {
    console.error('Error getting list of comments:', error);
    return [];
  }
};

library.add(fas);
const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Posts"
          component={Posts}
          initialParams={{fetchPosts}}
        />
        <Stack.Screen
          name="PostDetails"
          component={PostDetails}
          initialParams={{fetchComments}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
