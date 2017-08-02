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

    // this.state = {
    //   isLiked: this.props.isLiked,
    //   likes: this.props.likes
    // };

    
    // getIDState.bind(this);
  }
  
  
  likeHandler = () => {
    likePost(this.props.userID, this.props.postID, this).then(()=>console.log("POST LIKED"));
  }

  unlikeHandler = () => {
    unlikePost(this.props.userID, this.props.postID, this).then(()=>console.log("POST UNLIKED"));
  }
  
  render() {
    var date=new Date(this.props.date);
    var monthNames = ['Jan ', 'Feb ', 'Mar ', 'Apr ', 'May ', 'Jun ', 'Jul ', 'Aug ', 'Sep ', 'Oct ', 'Nov ', 'Dec '];

    return (
      // <View> <BoxShadow style={styles.shadowOpt}>
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
            {/* <Text style={{fontFamily: 'Vazir',}}>پاسخ</Text> */}
            <TouchableWithoutFeedback >
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
      // </BoxShadow></View>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    userID: state.userID,
  }
}

export default connect(mapStateToProps)(Post);