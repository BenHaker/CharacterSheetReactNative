import React, { Component } from 'react'
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import { actions } from '../data/Actions'
import initData from '../data/InitData'
import AppRouter from './AppRouter'

const store = createStore(actions, initData(false, false));

export default class App extends Component {
  
  render() {
    return (
      <Provider store={ store }>
        <AppRouter />
      </Provider>
    )
  }
}