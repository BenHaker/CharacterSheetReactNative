import React, { Component } from 'react';
import { View, Button, StyleSheet, Alert  } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from '../data/Actions'

export const Styles = StyleSheet.create({ 
    container: { flex: 0, justifyContent: 'space-between', flexDirection: 'row' },
    smallbutton: { flex: 1, alignSelf: 'center' },
    largebutton: { flex: 4 }
})

class ButtonBar extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = this.context.store.getState();
        this.navigator = this.props.navigator;
        this.toggleSideMenu = this.props.toggleSideMenu;
        this.navigateLeft = this.props.navigateLeft;
        this.navigateRight = this.props.navigateRight;
        this.currentPage = 0;
        this.maxPage = this.props.maxPage;
        this.moveRight = this.moveRight.bind(this);
        this.moveLeft = this.moveLeft.bind(this);
        this.backToCharacterList = this.backToCharacterList.bind(this);
        this.deleteCharacter = this.deleteCharacter.bind(this);
    }

    setCurrentPage = (currentPage) => {
        this.currentPage = currentPage;
        this.forceUpdate();
    }

    moveRight = () => {
        this.navigateRight();
    }

    moveLeft = () => {
        this.navigateLeft();
    }

    backToCharacterList = () => {
        this.navigator.pop();
    }

    deleteCharacter = () => {
        Alert.alert("Delete Character", "Are you sure you want to delete the current character?", [ { text: 'Cancel', onPress: () => { return }}, { text: 'OK', onPress: () => this.deleteCharacterAction() }])
    }

    deleteCharacterAction = () => {
        this.context.store.dispatch({ type: Actions.REMOVE_CHARACTER, key: this.state.currentCharacter });
        this.backToCharacterList();
    }

    isRight = () => {
        return this.currentPage != this.maxPage;
    }

    isLeft = () => {
        return this.currentPage != 0;
    }

    renderButton = (condition, action, text, style) => {
        if(condition != null && (condition() == false))
            return null;
        return (<View style={ style }><Button onPress={ () => action() } title={ text } /></View>);
    }

    render() {
        return (
            <View style={ Styles.container }>
                { this.renderButton(this.isLeft, this.moveLeft, "<", Styles.smallbutton) }
                { this.renderButton(null, this.toggleSideMenu, "...", Styles.smallbutton) }
                { this.renderButton(null, this.backToCharacterList, "Back to List", Styles.largebutton) }
                { this.renderButton(null, this.deleteCharacter, "Delete", Styles.largebutton) }
                { this.renderButton(this.isRight, this.moveRight, ">", Styles.smallbutton) }
            </View>)
    }
}

ButtonBar.contextTypes = {
    store: React.PropTypes.object
};

export default ButtonBar;
//export default connect()(ButtonBar)