import React, { Component } from 'react'
import { View, ViewPagerAndroid, StyleSheet  } from 'react-native'
import ButtonBar from './ButtonBar'
import Character from './Character'
import Attributes from './Attributes'
import Battle from './Battle'
import Equipment from './Equipment'
import SpellBook from './SpellBook'
import Treasure from './Treasure'

const styles = StyleSheet.create({ container: { flex: 1 }})

export default class Pager extends Component {
    constructor(props) {
        super(props);
        this.navigator = this.props.navigator;
        this.onPageSelected = this.onPageSelected.bind(this);
        this.currentPage = 0;
        this.maxPage = 5;
    }

    onPageSelected = (e) => {
        this.currentPage = e.nativeEvent.position;
        this.buttonBar.setCurrentPage(this.currentPage);
    }

    navigateRight = () => {
        if(this.currentPage == this.maxPage)
            return;
        this.viewPager.setPage(this.currentPage + 1);
        this.currentPage += 1;
        this.buttonBar.setCurrentPage(this.currentPage);
    }

    navigateLeft = () => {
        if(this.currentPage == 0)
            return;
        this.viewPager.setPage(this.currentPage - 1);
        this.currentPage -= 1;
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
                </ViewPagerAndroid>
                <ButtonBar ref={ buttonBar => { this.buttonBar = buttonBar; } } navigator= { this.navigator } navigateRight={ this.navigateRight } navigateLeft={ this.navigateLeft } maxPage={ this.maxPage } />
            </View>
        );
  }
}