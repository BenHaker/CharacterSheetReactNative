import React, { Component } from 'react';
import { View, Button, TextInput, StyleSheet, Text  } from 'react-native'
import CSTextInput from '../CSTextInput'
import { Styles } from '../Styles'
import { connect } from 'react-redux'
import { Actions } from '../../data/Actions'

class Treasure extends Component {
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
                <CSTextInput text="PP" value={ this.character.pp } textChange= { (event) => { this.onTextChange(event, "pp"); }} isNumeric={ true } />
                <CSTextInput text="GP" value={ this.character.gp } textChange= { (event) => { this.onTextChange(event, "gp"); }} isNumeric={ true } />
                <CSTextInput text="EP" value={ this.character.ep } textChange= { (event) => { this.onTextChange(event, "ep"); }} isNumeric={ true } />
                <CSTextInput text="SP" value={ this.character.sp } textChange= { (event) => { this.onTextChange(event, "sp"); }} isNumeric={ true } />
                <CSTextInput text="CP" value={ this.character.cp } textChange= { (event) => { this.onTextChange(event, "cp"); }} isNumeric={ true } />
                <View style={ Styles.container }>
                    <Text>Trasure</Text>
                    <TextInput style={ [Styles.container, Styles.topText] } multiline={ true } placeholder={ "Treasure" } value={ this.character.treasure } onChange= { (event) => { this.onTextChange(event, "treasure"); }}/>
                </View>
            </View>)
    }
}

Treasure.contextTypes = {
    store: React.PropTypes.object
};

export default Treasure;
//export default connect()(Equipment)