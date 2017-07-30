import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    StatusBar,
    Button,
    Image,
} from 'react-native';
import ActionButton from 'react-native-action-button';

import { NavigationActions  } from 'react-navigation';

import async from 'async';
export class HotScreen extends Component {
    constructor(props) {
        super(props);
        // getIDState.bind(this);
    }
    static navigationOptions = ({ navigation }) => {

        return {
            header: null,
        }
    };
    render() {

        return (
            <Text>asghar</Text>

        );
    }
}