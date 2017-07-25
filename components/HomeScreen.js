
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

import { StackNavigator } from 'react-navigation';

import async from 'async';

import {Post} from '../components/Post';
import {styles} from '../styles/HomeScreenStyles';
import {setIDState, setLocationState, setPostState} from '../functions/StateSetters';


export class HomeScreen extends Component {
  constructor(props) {
    super(props);
    // getIDState.bind(this);
  }
  
  componentWillMount() {
    
    async.parallel([
      (callback) => {
        setIDState(this).then( () => callback()).catch( () => {} );
      },
      (callback) => {
        setLocationState(this).then( () => callback()).catch( () => {} );
      }
    ], (err) => {
      setPostState("id", "loc" , this).then( () => console.log("good")).catch( () => {} );
    });
  
  }

  static navigationOptions = ({ navigation }) => ({
    // title: `Chat with ${navigation.state.params.user}`,
    title: 'اوناگی'
  });


  render() {
    if (!this.state || !this.state.Posts) {
      console.log("not ready");
      return null;
    } else {
      const { navigate } = this.props.navigation;
      // const { params } = this.props.navigation.state;
      return (
        <View style={{ flex: 1 }}>
          <View style={styles.container}>
            <ScrollView>
              {this.state.Posts.map((post) => (<Post key={this.state.Posts.indexOf(post)} content={post.content} />))}
            </ScrollView>
            <ActionButton onPress={()=>{navigate('SendPostScreen')}} degrees={0} offsetX={10} offsetY={20} buttonColor="rgba(231,76,60,1)" fixNativeFeedbackRadius={true} hideShadow={true} />
          </View>
        </View>
      );
    }
  }

}