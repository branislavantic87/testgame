import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import Router from './src/Router';
import store from './store';


export default class App extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <Provider store={store} >
          <Router />
        </Provider>
      </SafeAreaView>
    )
  }
}
