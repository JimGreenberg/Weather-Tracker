import React from 'react';
import EntryContainer from './entry_container';

const App = ({children}) => (
  <div className="app">
    <EntryContainer />
    {children}
  </div>
);

export default App;
