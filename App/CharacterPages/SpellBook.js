import React, { Component } from 'react';
import { ScrollView, View, Button, TextInput, StyleSheet, Text  } from 'react-native'
import { Styles } from '../Styles'
import { connect } from 'react-redux'
import { Actions } from '../../data/Actions'

class SpellBook extends Component {
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

    renderLevel = (level) => {
        const currentSlotsAttr = "currentSlots" + level;
        const spellsAttr = "spells" + level;
        return (<View style={ Styles.container } key={ level }>
            <Text>Spell Level { " " + level }</Text>
            <CSTextInput text="Current Slots" value= { this.character[currentSlotsAttr] } textChange= { (event) => { this.onTextChange(event, currentSlotsAttr); }} isNumeric={ true } />
            <TextInput style={ [Styles.container, Styles.topText] } multiline={ true } placeholder={ "Spells List for Level " + level } value={ this.character[spellsAttr] } onChange= { (event) => { this.onTextChange(event, spellsAttr); }}/>
        </View>)
    }

    render() {
        const spellLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        return (
            <ScrollView style={ Styles.container }>
                { spellLevels.map(this.renderLevel) }
            </ScrollView>)
    }
}

SpellBook.contextTypes = {
    store: React.PropTypes.object
};

export default SpellBook;
//export default connect()(SpellBook)