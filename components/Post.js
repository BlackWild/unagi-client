import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {styles} from '../styles/PostStyles';

import {likePost, unlikePost} from '../functions/LikeFunctions';


export class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLiked: this.props.isLiked,
      likes: this.props.likes
    };

    
    // getIDState.bind(this);
  }
  
  
  likeHandler = () => {
    likePost(this.props.HomeScreen.state.userID, this.props.postID, this.props.HomeScreen, this).then(()=>console.log("POST LIKED"));
  }

  unlikeHandler = () => {
    unlikePost(this.props.HomeScreen.state.userID, this.props.postID, this.props.HomeScreen, this).then(()=>console.log("POST UNLIKED"));
  }
  
  render() {
    return (
      <View style={styles.postBox}>
        <View>
          <View>
            <Text> {this.props.date} </Text>
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
            <Text>{this.state.likes}</Text>
            <TouchableWithoutFeedback onPress={this.state.isLiked?this.unlikeHandler:this.likeHandler}>
              <Image source={this.state.isLiked?require('../img/heartLike.png'):require('../img/heartUnLike.png')} style={{height:20, width:22, margin:5,}} />
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    );
  }
}