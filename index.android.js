
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
  AsyncStorage
} from 'react-native';
import ActionButton from 'react-native-action-button';
import uniqueId from 'react-native-unique-id';
import { 
  StackRouter,
  StackNavigator
} from 'react-navigation';

import {Post} from './components/Post';

import {styles} from './styles/Styles';

export default class unagiyooooo extends Component {
  constructor(props) {
    super(props);
    this.setState.bind(this);
    this.state = {
      Posts: [
        {
          userID: '454364343664',
          location: { x: 2312.213, y: 4234.21 },
          content: 'salama aleyka',
        },
        {
          userID: 'sd12e1ssdew',
          location: { x: 23344542.213, y: 424534.21 },
          content: 'salama aleyka sdasd',
        },
        {
          userID: '4523rwvq3fvb3',
          location: { x: 3.213, y: 4234.21 },
          content: 'salama12323131d aleyka',
        },
        {
          userID: '454364343664',
          location: { x: 2312.213, y: 4234.21 },
          content: 'salama aleyka',
        }

      ]
    };
  }

  componentWillMount() {
    // AsyncStorage.removeItem("userID").then((res) => {
    //   console.log("\n item deleted");
    // })
    AsyncStorage.getItem("userID").then((res) => {
      console.log("id geted:  " + res);
      if(res) {
        console.log("is not first run");
        this.setState((prevState, props) => {
          return {userID: res};
        });
      } else {
        console.log("hoy");
        uniqueId()
          .then(id => {
            console.log("id is : " + id);
            AsyncStorage.setItem("userID", id).then((res) => {
              console.log("id seted!! ", res);
            });
            this.setState((prevState, props) => {
              return {userID: id};
            });
            // fetch({
            //   url: 'https://local..../register/felan?userID=' + id,
            //   method: 'GET'
            // }).then((res) => {
            //     console.log("id sent to server");
            //     console.log(res);
            //   })
            //   .catch((error) => {
            //     console.error(error);
            //   });
          })
          .catch(error => console.error(error));
      }
    });

    

    // setTimeout(()=>{
    //   console.log(this.state.isFirstRun);
    // }, 5000);

    // fetch({
    //   url: 'https://facebook.github.io/react-native/movies.json',
    //   method: 'GET'
    // }).then((response) => response.json())
    //   .then((responseJson) => {
    //     console.log(responseJson.movies);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

  }

  render() {
    if (!this.state.Posts) {
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
