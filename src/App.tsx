import React, { Component } from 'react';
import logo from './logo.svg';

import { ApolloProvider } from "react-apollo";
import api from "./core/Api";
import ThingSelect from "./components/ThingSelect";
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <ApolloProvider client={api}>
      <ThingSelect />
      </ApolloProvider>
      </div>
    );
  }
}

export default App;
