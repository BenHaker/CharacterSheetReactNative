import React, { Component } from 'react';
import { View, Button, TextInput, StyleSheet, Text  } from 'react-native'
import { Styles } from './Styles'
import { connect } from 'react-redux'
import { Actions } from '../data/Actions'

class Equipment extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = this.context.store.getState();
        this.character = this.state.characters[this.state.currentCharacter];
        this.onTextChange = this.onTextChange.bind(this);
    }

    componentDidMount() {
        this.unsubscribe = this.context.store.subscribe(() => this.forceUpdate());
    }
    
    componentWillUnmount() {
        this.unsubscribe();
    }

    onTextChange = (event, attr) => {
        this.context.store.dispatch({ type: Actions.UPDATE_CHARACTER, fieldname: attr, value: event.nativeEvent.text });
    }

    render() {
        return (
            <View style={ Styles.container }>
                <View style={ Styles.container }>
                    <View style={ Styles.container }>
                        <Text>Regular Equipment</Text>
                        <TextInput style={ [Styles.container, Styles.topText] } multiline={ true } placeholder={ "Regular Equipment List" } value={ this.character.equipment } onChange= { (event) => { this.onTextChange(event, "equipment"); }}/>
                    </View>
                    <View style={ Styles.container }>
                        <Text>Magical Equipment</Text>
                        <TextInput style={ [Styles.container, Styles.topText] } multiline={ true } placeholder={ "Magical Equipment List" } value={ this.character.magicalequipment } onChange= { (event) => { this.onTextChange(event, "magicalequipment"); }}/>
                    </View>
                    <View style={ Styles.container }>
                        <Text>Weapons & Armor</Text>
                        <TextInput style={ [Styles.container, Styles.topText] } multiline={ true } placeholder={ "Weapons & Armor List" } value={ this.character.weaponandarmor } onChange= { (event) => { this.onTextChange(event, "weaponandarmor"); }}/>
                    </View>
                </View>
            </View>)
    }
}

Equipment.contextTypes = {
    store: React.PropTypes.object
};

export default Equipment;
//export default connect()(Equipment)