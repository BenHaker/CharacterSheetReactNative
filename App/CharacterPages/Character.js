import React, { Component } from 'react';
import { View, Text, Button, TextInput, Picker, Alert, StyleSheet  } from 'react-native'
import CSTextInput from '../CSTextInput'
import { Styles } from '../Styles'
import { connect } from 'react-redux'
import { Actions } from '../../data/Actions'
import { Races, Classes } from '../../data/MetaData'
import { isValidateClass } from '../../data/Validations'

class Character extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = this.context.store.getState();
        this.character = this.state.characters[this.state.currentCharacter];
        this.onTextChange = this.onTextChange.bind(this);
        this.onItemChange = this.onItemChange.bind(this);
    }

    componentDidMount = () => {
        this.unsubscribe = this.context.store.subscribe(() => this.forceUpdate());
    }
    
    componentWillUnmount = () => {
        this.unsubscribe();
    }

    onTextChange = (event, attr) => {
        this.context.store.dispatch({ type: Actions.UPDATE_CHARACTER, fieldname: attr, value: event.nativeEvent.text });
    }

    onItemChange = (key, attr) => {
//Validate class is valid for race
        if((attr == "class") && (isValidateClass(this.character, key) == false)) {
            Alert.alert("When the Race is Humam, Class can be " + Classes.Cleric + ", " + Classes.Fighter + "," + Classes.MagicUser + " or " + Classes.Thief);
            return;
        }
        this.context.store.dispatch({ type: Actions.UPDATE_CHARACTER, fieldname: attr, value: key });
    }

    renderItem = (key, Items) => {
        return (<Picker.Item label={ Items[key] } value={ key } key={ key }/>);
    }

    isClassEnabled = () => {
        return this.character.race == Races.Human;
    }

    setClass = () => {
        return this.isClassEnabled() == true ? this.character.class : this.character.race;
    }

    render = () => {
        return (
            <View style={ Styles.container }>
                <View style={ Styles.container }>
                    <CSTextInput text="Player Name" value={ this.character.playername } textChange= { (event) => { this.onTextChange(event, "playername"); }} isNumeric={ false } />
                    <CSTextInput text="Character Name" value= { this.character.charactername } textChange= { (event) => { this.onTextChange(event, "charactername"); }} isNumeric={ false } />
                    <CSTextInput text="Alignment" value= { this.character.alignment } textChange= { (event) => { this.onTextChange(event, "alignment"); }} isNumeric={ false } />
                    <View style={ Styles.labelcontainer }>
                        <Text style={ Styles.label }>Race</Text>
                        <Picker style={ Styles.text } selectedValue={ this.character.race } onValueChange={ (key) => this.onItemChange(key, "race") }>
                            { Object.keys(Races).map((key) => this.renderItem(key, Races)) }
                        </Picker>
                    </View>
                    <View style={ Styles.labelcontainer }>
                        <Text style={ Styles.label }>Class</Text>
                        <Picker style={ Styles.text } selectedValue={ this.setClass() } onValueChange={ (key) => this.onItemChange(key, "class") } enabled={ this.isClassEnabled() }>
                            { Object.keys(Classes).map((key) => this.renderItem(key, Classes)) }
                        </Picker>
                    </View>
                    <CSTextInput text="Level" value= { this.character.level } textChange= { (event) => { this.onTextChange(event, "level"); }} isNumeric={ true } />
                </View>
            </View>)
    }
}

Character.contextTypes = {
    store: React.PropTypes.object
};

export default Character;
//export default connect()(Character)