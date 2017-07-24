
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  Button,
  Image,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import uniqueId from 'react-native-unique-id';
import { StackNavigator } from 'react-navigation';

import {Post} from './components/Post';
import {styles} from './styles/Styles';
import {setIDState, setLocationState, setPostState} from './functions/StateSetters';


class unagiyooooo extends Component {
  constructor(props) {
    super(props);
    // this.setState.bind(this);
    // getIDState.bind(this);
  }
  
  componentWillMount() {
    setIDState(this);
    setLocationState(this);
    if( this.state.userID && this.state.location ) {
      setPostState("id", "loc" , this);
    }
  
  }

  render() {
    if (!this.state.Posts) {
      console.log("not ready");
      return null;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <StatusBar backgroundColor='#689F38' barStyle="light-content" />
          <View style={styles.headerBox} >
            <Text style={styles.logo}>اوناگی</Text>
          </View>
          <View style={styles.container}>
            <ScrollView>
              {this.state.Posts.map((post) => (<Post key={this.state.Posts.indexOf(post)} content={post.content} />))}
            </ScrollView>
            <ActionButton degrees={0} offsetX={10} offsetY={20} buttonColor="rgba(231,76,60,1)">
              <Text style={styles.actionButtonIcon}>+</Text>
            </ActionButton>
          </View>
        </View>
      );
    }
  }

}

// const App = StackNavigator({
//   Home: { screen: unagiyooooo },
//   Profile: { screen: unagiyooooo },
// })

AppRegistry.registerComponent('unagiyooooo', () => unagiyooooo);
