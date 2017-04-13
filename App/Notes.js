import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Text  } from 'react-native'
import { Styles } from './Styles'
import { connect } from 'react-redux'
import { Actions } from '../data/Actions'

class Notes extends Component {
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
                        <Text>Journal</Text>
                        <TextInput style={ [Styles.container, Styles.topText] } multiline={ true } placeholder={ "Enter Journal Notes" } value={ this.character.journal } onChange= { (event) => { this.onTextChange(event, "journal"); }}/>
                    </View>
                    <View style={ Styles.container }>
                        <Text>Notes</Text>
                        <TextInput style={ [Styles.container, Styles.topText] } multiline={ true } placeholder={ "Enter General Notes" } value={ this.character.notes } onChange= { (event) => { this.onTextChange(event, "notes"); }}/>
                    </View>
                </View>
            </View>)
    }
}

Notes.contextTypes = {
    store: React.PropTypes.object
};

export default Notes;
//export default connect()(Notes)