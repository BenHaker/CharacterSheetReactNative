import React, { Component } from 'react'
import { Navigator, View } from 'react-native'
import { connect } from 'react-redux'
import Title from './Title'
import Pager from './Pager'
import CharacterList from './CharacterList'

export default class AppRouter extends Component {
  render() {
    const routes = [
      {title: 'Character List', page: "LIST"},
      {title: 'Character', page: "CHARACTER"}
    ];
    return (
      <View style={ { flex: 1 } }>
        <Title title="BECMI Character Sheet" />
        <Navigator sceneStyle={ { flex: 1 } }
          initialRoute={ routes[0] }
          renderScene={ this.navigatorRenderScene }
        />
      </View>
    );
  }

  navigatorRenderScene(route, navigator) {
    switch(route.page) {
      case "LIST":
        return (<CharacterList navigator={ navigator }/>);
      case "CHARACTER":
        return (<Pager navigator={ navigator }/>);
    }
  }
}

//export default connect()(AppRouter)