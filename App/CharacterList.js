import React, { Component } from 'react';
import { View, Text, StyleSheet, Button  } from 'react-native'
import { Styles } from './Styles'
import List from './List'
import { Actions } from '../data/Actions'
import { loadStore } from '../data/DataStorage'
//import { connect } from 'react-redux'

class CharacterList extends Component {
    constructor(props, context) {
        super(props, context);
        this.navigator = this.props.navigator;
        this.onAddCharacter = this.onAddCharacter.bind(this);
        this.moveToCharacter = this.moveToCharacter.bind(this);
    }

    componentDidMount() {
        loadStore().then(
            (data) => {
                console.log("Store Data:" + data);
                this.context.store.dispatch({ type: Actions.LOAD_DATA, data: JSON.parse(data) });
            })
            .catch((error) => {
                console.log("Failed Load Store: " + JSON.stringify(error));
            });
        this.unsubscribe = this.context.store.subscribe(() => this.forceUpdate());
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const characters = this.context.store.getState().characters;
        return (
            <View style={ Styles.container }>
                <Text>Character List</Text>
                <List Items={ characters } moveToCharacter= { this.moveToCharacter } nameAttr="charactername"/>              
                <Button onPress={ this.onAddCharacter } title="New Character"/>
            </View>)
    }

    onAddCharacter() {
        this.context.store.dispatch({ type: Actions.ADD_CHARACTER });
        this.navigator.push({ page: "CHARACTER" });
    }

    moveToCharacter(key) {
        this.context.store.dispatch({ type: Actions.LOAD_CHARACTER, key: key });
        this.navigator.push({ page: "CHARACTER" });
    }
}

CharacterList.contextTypes = {
    store: React.PropTypes.object
};

export default CharacterList;
//export default connect()(CharacterList)