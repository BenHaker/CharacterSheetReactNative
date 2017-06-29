import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import Pager from './Pager'
import { SideMenu, List, ListItem } from 'react-native-elements'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  }});
export default class SidemenuWrapper extends Component {
    constructor () {
        super()
        this.state = {
            isOpen: false
        }
        this.toggleSideMenu = this.toggleSideMenu.bind(this)
    }

    onSideMenuChange(isOpen) {
        this.setState({
            isOpen: isOpen
        })
    }

    toggleSideMenu () {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render () {
        const pages = ["General", "Attributes", "Combat", "Equipment", "Treasure", "Spells", "Notes"];
        const MenuComponent = (
            <View style={{ flex: 1, backgroundColor: '#ededed', paddingTop: 50 }}>
            <List containerStyle={{ marginBottom: 20 }}>
            {
                pages.map((l, i) => (
                <ListItem
                    roundAvatar
                    onPress={ () => { this.pager.setPage(i); this.toggleSideMenu() }}
                    key={ i }
                    title={ l }
                />
                ))
            }
            </List>
            </View>
        )
        return (
            <SideMenu
                isOpen={ this.state.isOpen }
                onChange={ this.onSideMenuChange.bind(this) }
                menu={ MenuComponent }>
                <View style={ styles.container }>
                    <Pager navigator={ this.props.navigator } toggleSideMenu={ this.toggleSideMenu.bind(this) } ref={ pager => { this.pager = pager; } }/>
                </View>
            </SideMenu>
        )
    }
}

//export default connect()(SidemenuWrapper)