import React from 'react';
import { Switch, Route } from 'react-router-dom';
// Components
import Navbar from './components/Navbar';
// Screens
import Detail from './screens/Detail';
import GrantsTable from './screens/GrantsTable';

export default function App() {

  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/" component={GrantsTable} />
        <Route exact path="/details/:oppId" component={Detail} />
      </Switch>
      <div></div>
    </div>
  )
}
