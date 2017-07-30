import React, { Component } from 'react';
import {
  Text,
  View,
  Image
} from 'react-native';
import {styles} from '../styles/PostStyles'


export class Post extends Component {
  render() {
    var date=new Date(this.props.date);
    var monthNames = ['Jan ', 'Feb ', 'Mar ', 'Apr ', 'May ', 'Jun ', 'Jul ', 'Aug ', 'Sep ', 'Oct ', 'Nov ', 'Dec '];
    return (
      <View style={styles.postBox}>
        <View style={{flexDirection:'row', justifyContent:'space-between',alignContent:'center'}}>
          <View style={{justifyContent:'center'}}>
            <Text style={{color:'#9E9E9E', fontSize:10}}> 
             {monthNames[date.getMonth()-1]}  
             {date.getUTCDate()} 
             {'  '}
             {date.getHours()}:{date.getMinutes()}
            </Text>
          </View>
          <View style={styles.userBox} >
            <Text style={styles.user}> کاربر مهمان</Text>
          </View>
        </View>
         <View style={styles.reply} >
          <Text style={styles.replyText}> پاسخ این پست:</Text>
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