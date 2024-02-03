import React from 'react';
import Posts from './src/containers/Posts';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
library.add(fas);
function App(): React.JSX.Element {
  return (
    <>
      <Posts />
    </>
  );
}
export default App;
