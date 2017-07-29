import React, { Component } from 'react';
import {
  Text,
  View,
  Image
} from 'react-native';
import {styles} from '../styles/PostStyles'


export class Post extends Component {
  render() {
    return (
      <View style={styles.postBox}>
        <View style={styles.userBox} >
          <Text style={styles.user}> کاربر مهمان</Text>
        </View>
        <View>
          <Text style={styles.paragraph}>
            {this.props.content}
          </Text>
        </View>
        <View style={styles.likeBox}>
          <View>
            <Text style={{fontFamily: 'Vazir',}}>پاسخ</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems:'center', }}>
            <Text style={{fontFamily: 'Vazir',}}>  نفر پسندیدند!</Text>
            <Text>n </Text>
            <Image source={require('../img/heartUnLike.png')} style={{height:20, width:22, margin:5,}} />
          </View>
        </View>
      </View>
    );
  }
}