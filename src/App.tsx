import React, { Component } from 'react';
import logo from './logo.svg';

import { ApolloProvider } from "react-apollo";
import api from "./core/Api";
import ThingLogger from "./components/ThingLogger";
import './App.css';
import 'bulma/css/bulma.min.css';

class App extends Component {
  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="App">
          <ApolloProvider client={api}>
          <ThingLogger />
          </ApolloProvider>
          </div>
        </div>
      </section>
    );
  }
}

export default App;
