import React, { Component } from 'react';
import { View, Button, TextInput, Alert, StyleSheet, Text  } from 'react-native'
import CSTextInput from '../CSTextInput'
import { Styles } from '../Styles'
import { connect } from 'react-redux'
import { Actions } from '../../data/Actions'
import { isValidAttribute } from '../../data/Validations'

class Attributes extends Component {
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

    onTextChange = (event, attr, validate = false) => {
        let attrValue = event.nativeEvent.text;
        if((validate) && (attrValue != null)) {
            if(isValidAttribute(parseInt(attrValue)) == true)
                this.context.store.dispatch({ type: Actions.UPDATE_CHARACTER, fieldname: attr, value: attrValue });
            else
                Alert.alert("Attribute value cannot be below 3");
        }
        else
            this.context.store.dispatch({ type: Actions.UPDATE_CHARACTER, fieldname: attr, value: attrValue });
    }

    render() {
        return (
            <View style={ Styles.container }>
                <View style={ Styles.container }>
                    <CSTextInput text="Strength" value={ this.character.strength } textChange={ (event) => { this.onTextChange(event, "strength"); }} isNumeric={ true } addModifier = { true }/>
                    <CSTextInput text="Dexterity" value={ this.character.dexterity } textChange={ (event) => { this.onTextChange(event, "dexterity"); }} isNumeric={ true } addModifier = { true }/>
                    <CSTextInput text="Constitution" value={ this.character.constitution } textChange={ (event) => { this.onTextChange(event, "constitution"); }} isNumeric={ true } addModifier = { true }/>
                    <CSTextInput text="Intelligence" value={ this.character.intelligence } textChange={ (event) => { this.onTextChange(event, "intelligence"); }} isNumeric={ true } addModifier = { true }/>
                    <CSTextInput text="Wisdom" value={ this.character.wisdom } textChange={ (event) => { this.onTextChange(event, "wisdom"); }} isNumeric={ true } addModifier = { true }/>
                    <CSTextInput text="Charisma" value={ this.character.charisma } textChange={ (event) => { this.onTextChange(event, "charisma"); }} isNumeric={ true } addModifier = { true }/>
                    <CSTextInput text="XP" value={ this.character.xp } textChange={ (event) => { this.onTextChange(event, "xp", false); }} isNumeric={ true }/>
                </View>
            </View>)
    }
}

Attributes.contextTypes = {
    store: React.PropTypes.object
};

export default Attributes;
//export default connect()(Attributes)