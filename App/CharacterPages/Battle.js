import React, { Component } from 'react';
import { View, Button, TextInput, StyleSheet, Text  } from 'react-native'
import CSTextInput from '../CSTextInput'
import { Styles } from '../Styles'
import { connect } from 'react-redux'
import { Actions } from '../../data/Actions'
import { getTHAC0 } from '../../data/Validations'

export const localStyles = StyleSheet.create({ 
    weaponcontainer: { flexDirection: 'row', alignItems: 'center' }, 
    weaponname: { flex: 3 },
    weaponatk: { flex: 1 },
    weapondmg: { flex: 1 }
});
class Battle extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = this.context.store.getState();
        this.character = this.state.characters[this.state.currentCharacter];
        this.onTextChange = this.onTextChange.bind(this);
        this.onWeaponChange = this.onWeaponChange.bind(this);
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

    onWeaponChange = (event, weapon, attr) => {
        this.context.store.dispatch({ type: Actions.UPDATE_WEAPON, weapon: weapon, fieldname: attr, value: event.nativeEvent.text });
    }

    renderWeapon = (weapon) => {
        weaponObj = this.character[weapon];
        return (<View style={ localStyles.weaponcontainer } key={weapon}>
            <TextInput style={ localStyles.weaponname } placeholder="Weapon Name" value={ weaponObj == null ? "" : weaponObj["name"] } onChange={ (event) => { this.onWeaponChange(event, weapon, "name"); } }/>
            <TextInput style={ localStyles.weaponatk } placeholder="Attack Bonus" value={ weaponObj == null ? "" : weaponObj["atk"] } onChange={ (event) => { this.onWeaponChange(event, weapon, "atk"); } }/>
            <TextInput style={ localStyles.weapondmg } placeholder="Damage" value={ weaponObj == null ? "" : weaponObj["dmg"] } onChange={ (event) => { this.onWeaponChange(event, weapon, "dmg"); } }/>
        </View>);
    }

    render() {
        const weapons = ["weapon1", "weapon2", "weapon3", "weapon4"]
        return (
            <View style={ Styles.container }>
                <View style={ Styles.container }>
                    <CSTextInput text="Max HP" value={ this.character.maxhp } textChange={ (event) => { this.onTextChange(event, "maxhp"); }} isNumeric={ true }/>
                    <CSTextInput text="Current HP" value={ this.character.currenthp } textChange={ (event) => { this.onTextChange(event, "currenthp"); }} isNumeric={ true }/>
                    <View style={ Styles.labelcontainer }>
                        <Text style={ Styles.label }>THAC0</Text>
                        <Text style={ Styles.text }>{ getTHAC0(this.character.class, this.character.level) }</Text>
                    </View>
                    <CSTextInput text="AC" value={ this.character.ac } textChange={ (event) => { this.onTextChange(event, "ac"); }} isNumeric={ true }/>
                    { weapons.map(this.renderWeapon) }
                </View>
            </View>)
    }
}

Battle.contextTypes = {
    store: React.PropTypes.object
};

export default Battle;
//export default connect()(Battle)