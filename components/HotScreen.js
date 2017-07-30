
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    StatusBar,
    Button,
    Image,
    ListView,
    FlatList,
} from 'react-native';
import ActionButton from 'react-native-action-button';

import { NavigationActions  } from 'react-navigation';

import async from 'async';

import {Post} from '../components/Post';
import {setIDState, setLocationState, setPostState, getMorePost} from '../functions/StateSetters';

import {styles} from '../styles/HomeScreenStyles';
import {headerStyles} from '../styles/HeaderStyles'
export class HotScreen extends Component {
    constructor(props) {
        super(props);
        // getIDState.bind(this);
    }
    static navigationOptions = ({ navigation }) => {

        return {
        header:(
            <View style={headerStyles.headerBox} >
                <Text style={headerStyles.logo} >اوناگی</Text>
            </View>
        ) ,
        }
    };
    render() {

        return (
            <Text>asghar</Text>

        );
    }
}