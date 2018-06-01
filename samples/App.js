import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import createStore from './store';
import { AuthenticatedRoute, LoginPage } from '@openmrs/react-components';
import SamplePage from './SamplePage';

const store = createStore();

const App =  props => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={LoginPage}/>
          <AuthenticatedRoute path="/" component={SamplePage}/>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
