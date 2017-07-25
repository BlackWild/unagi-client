
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from 'react-native';

import {styles} from '../styles/SendPostScreenStyles';

export class SendPostScreen extends Component {
  
  constructor(props) {
    super(props);
    this.state = {text: '',textLenght:0};
  }


  static navigationOptions = ({ navigation }) => {
    const {state} = navigation;
    
    return {
      // title: `Chat with ${navigation.state.params.user}`,
      title: 'افزودن پست',
      headerRight: (
        <View>
          <View style={{flex: 1, flexDirection: 'row'}}>
          </View>
          <Text
            style={ state.isLengthOverLimit ? [styles.charRemain, styles.overChar] : [styles.charRemain] }
          >
            {160}
          </Text>
          
        </View> 
      ),
    }
  };

  // <Image source={require('./img/send1.png')} style={styles.pic}/>
  // <Text style={[styles.charRemain, overChar]}>
  //         {160-this.state.textLenght}
  //       </Text>

  render() { 
    
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={{flex:1}}>
            <TextInput 
              style={styles.textarea} 
              underlineColorAndroid="transparent" 
              multiline={true} 
              placeholder="بنویسید" 
              onChangeText={(text) => {
                leng = text.split('').length;
                this.setState({
                  text,
                  textLenght: leng,
                  isLengthOverLimit: leng > 160
                });}
              }
            />
          
          </View>
        </View>
      </View>
      
    );
  }
}

