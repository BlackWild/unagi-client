import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import {styles} from '../styles/Styles'


export class Post extends Component {
  render() {
    return (
      <View style={styles.postBox}>
        <Text style={styles.paragraph}>
          {this.props.content}
        </Text>
      </View>
    );
  }
}