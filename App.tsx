import * as React from 'react';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import Posts from './src/containers/Posts';
import {fas} from '@fortawesome/free-solid-svg-icons';
import PostDetails from './src/containers/PostDetails';
import {library} from '@fortawesome/fontawesome-svg-core';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

library.add(fas);
const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Posts" component={Posts} />
          <Stack.Screen name="PostDetails" component={PostDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
export default App;
