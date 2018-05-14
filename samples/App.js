import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Header } from 'openmrs-contrib-reactcomponents';
import './App.css';
import createStore from './redux-store';

const store = createStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Header />
        </div>
      </Provider>
    );
  }
}

export default App;
