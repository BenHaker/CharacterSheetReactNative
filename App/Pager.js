import React, { Component } from 'react'
import { View, ViewPagerAndroid, StyleSheet  } from 'react-native'
import ButtonBar from './ButtonBar'
import Character from './CharacterPages/Character'
import Attributes from './CharacterPages/Attributes'
import Battle from './CharacterPages/Battle'
import Equipment from './CharacterPages/Equipment'
import SpellBook from './CharacterPages/SpellBook'
import Treasure from './CharacterPages/Treasure'
import Notes from './CharacterPages/Notes'

const styles = StyleSheet.create({ container: { flex: 1 }})

export default class Pager extends Component {
    constructor(props) {
        super(props);
        this.navigator = this.props.navigator;
        this.toggleSideMenu = this.props.toggleSideMenu;
        this.onPageSelected = this.onPageSelected.bind(this);
        this.currentPage = 0;
        this.maxPage = 6;
    }

    onPageSelected = (e) => {
        this.currentPage = e.nativeEvent.position;
        this.buttonBar.setCurrentPage(this.currentPage);
    }

    navigateRight = () => {
        if(this.currentPage == this.maxPage)
            return;
        this.setPage(this.currentPage + 1);
    }

    navigateLeft = () => {
        if(this.currentPage == 0)
            return;
        this.setPage(this.currentPage - 1);
    }

    setPage = (page) => {
        this.currentPage = page;
        this.viewPager.setPage(page);
        this.buttonBar.setCurrentPage(this.currentPage);
    }

    render() {
        return (
            <View style={ styles.container }>
                <ViewPagerAndroid style={ styles.container } initialPage={ 0 } ref={ viewPager => { this.viewPager = viewPager; } } onPageSelected={ this.onPageSelected }>
                    <View>
                        <Character/>
                    </View>
                    <View>
                        <Attributes/>
                    </View>
                    <View>
                        <Battle/>
                    </View>
                    <View>
                        <Equipment/>
                    </View>
                    <View>
                        <Treasure/>
                    </View>
                    <View>
                        <SpellBook/>
                    </View>
                    <View>
                        <Notes/>
                    </View>
                </ViewPagerAndroid>
                <ButtonBar ref={ buttonBar => { this.buttonBar = buttonBar; } } navigator= { this.navigator } navigateRight={ this.navigateRight } navigateLeft={ this.navigateLeft } maxPage={ this.maxPage } toggleSideMenu= { this.toggleSideMenu }/>
            </View>
        );
  }
}