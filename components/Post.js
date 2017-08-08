import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {styles} from '../styles/PostStyles';

import {likePost, unlikePost} from '../functions/LikeFunctions';
import { connect } from 'react-redux';

class Post extends Component {
  constructor(props) {
    super(props);
  }

  
  likeHandler = () => {
    likePost(this.props.accessToken, this.props.postID, this).then(()=>console.log("POST LIKED"));
  }

  unlikeHandler = () => {
    unlikePost(this.props.accessToken, this.props.postID, this).then(()=>console.log("POST UNLIKED"));
  }
  replyHandler = () => {
    
  }
  postTouchHandler = () => {
    
  }
  
  render() {
    var date=new Date(this.props.date);
    var monthNames = ['Jan ', 'Feb ', 'Mar ', 'Apr ', 'May ', 'Jun ', 'Jul ', 'Aug ', 'Sep ', 'Oct ', 'Nov ', 'Dec '];

    return (
      <TouchableWithoutFeedback onPress={this.postTouchHandler}>

        <View style={styles.postBox}>
          <View style={{flexDirection:'row', justifyContent:'space-between',alignContent:'center'}}>
            <View style={{justifyContent:'center'}}>
              <Text style={{color:'#9E9E9E', fontSize:10}}> 
              {monthNames[date.getMonth()]}  
              {date.getUTCDate()} 
              {'  '}
              {date.getHours()}:{date.getMinutes()}
              </Text>
            </View>
            <View style={styles.userBox} >
              <Text style={styles.user}> {this.props.username? this.props.username: "کاربر مهمان"}</Text>
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
              {/* <Text style={{fontFamily: 'Vazir',}}>پاسخ</Text> */}
              <TouchableWithoutFeedback onPress={this.replyHandler}>
                <Image source={require('../img/reply.png')} style={{height:20, width:22, margin:5,}} />
              </TouchableWithoutFeedback>
            </View>
            <View style={{flexDirection: 'row', alignItems:'center', }}>
              <Text style={{fontFamily: 'Vazir',}}>  نفر پسندیدند!</Text>
              <Text>{this.props.likes}</Text>
              <TouchableWithoutFeedback onPress={this.props.isLiked?this.unlikeHandler:this.likeHandler}>
                <Image source={this.props.isLiked?require('../img/heartLike.png'):require('../img/heartUnLike.png')} style={{height:20, width:22, margin:5,}} />
              </TouchableWithoutFeedback>
              
            </View>
          </View>
        </View>

      </TouchableWithoutFeedback>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    accessToken: state.userInfo.accessToken,
    refreshToken: state.userInfo.refreshToken,

  }
}

export default connect(mapStateToProps)(Post);