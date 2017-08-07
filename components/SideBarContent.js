import React, {Component} from 'react';
import {Text,View} from 'react-native';
import { connect } from 'react-redux';


class SideBarContent extends Component{
    constructor() {
        super();
    }
    render()
    {
        return(
            <View>
                <Text>Order History</Text>
                <Text>Account</Text>
                <Text>Basket</Text>
                <Text>About us</Text>
            </View>
        );
    }
}
export default connect()(SideBarContent);