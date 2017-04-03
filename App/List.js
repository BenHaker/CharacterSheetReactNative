import React, { Component, PropTypes } from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'whitesmoke',
  }
})

export default List = ({ Items, moveToCharacter, nameAttr }) => {
  const renderItem = (key) => {
      const item = Items[key];
      return (
      <View key={key} style={styles.item}>
        <TouchableOpacity onPress={ () => moveToCharacter(key) }>
          <Text>{ item[nameAttr] }</Text>
        </TouchableOpacity>
      </View>
    )
  }
  
  return (
      <ScrollView style={ styles.container }>
        { Object.keys(Items).map(renderItem) }
      </ScrollView>
    )
}

/*export default class List extends Component {
  constructor(props) {
    super(props);
    this.Items = this.props.Items;
  }

  render() {
    Alert.alert("render: " + this.Items.length);
    return (
      <ScrollView style={styles.container}>
        {Object.keys(this.Items).map(this.renderItem)}
      </ScrollView>
    )
  }

  renderItem = (key) => {
      const item = this.Items[key];
      return (
      <View key={key} style={styles.item}>
        <TouchableOpacity onPress={ () => this.props.moveToCharacter(key) }>
          <Text>{item.charactername}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}*/