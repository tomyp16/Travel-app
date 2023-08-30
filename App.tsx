import React from 'react';
import Route from './src/route/Route';
import { UserProvider } from './src/context/authContext';

const App = () => {
  return <UserProvider>
    <Route/>
  </UserProvider>;
};

export default App;
