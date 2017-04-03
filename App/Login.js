import React, { Component } from 'react';
import { View, Text, TouchableHighlight  } from 'react-native'

class Login extends Component {
    constructor(props, context) {
        super(props, context);
        this.navigator = this.props.navigator;
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
    }

    render() {
        return (
            <View>
                <TouchableHighlight onPress={() => this.onClick()}>
                    <Text>Login</Text>
                </TouchableHighlight>
            </View>)
    }
}

export default Login;