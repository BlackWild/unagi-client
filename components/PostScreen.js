
import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';

import {} from '../functions/StateSetters';

import { styles } from '../styles/PostScreenStyles';
import { headerStyles } from '../styles/HeaderStyles';

import { connect } from 'react-redux';
import actions from '../reducers/Actions'
import {addBackHandler} from '../functions/BackHandlerAdder';


class PostScreen extends Component {
  constructor(props) {
    super(props);
    addBackHandler(this);

  }

  componentWillMount() {
    
  }

  static navigationOptions = ({ navigation }) => {

    return {
      header: (
        null
      ),
    }
  };

  backTouchHandler = () => {
    this.props.dispatch({type: actions.SET_PAGE_NAME, pageName: "Home"});
    this.props.navigation.navigate("Home");
  }

  render() {
    return (
      <View style={{ flex: 1 }}>

        <View style={styles.bar}> 
          <View style={styles.header}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableWithoutFeedback onPress={this.backTouchHandler}>
                <Image source={require('../img/back.png')} style={styles.pic} />
              </TouchableWithoutFeedback>
              <Text style={styles.post}> پست</Text>
            </View>
          </View>
        </View>

         <View style={{flex:1,padding:10,margin:10,borderBottomWidth:2,borderColor:'#757575'}}>
          <View style={{flexDirection:'row',justifyContent:'flex-end',alignContent:'center',alignItems:'center',}}>
            <View style={{flexDirection:'column',justifyContent:'space-between',alignContent:'center',alignItems:'center'}}> 
              <View>
                <Text style={{color:'#212121', margin:15 ,width:200,}}>
                  متن پست متن پست متن پست متن پست متن پست متن پست متن پست متن پست متن پست متن پست متن پست متن پست متن پست متن پست متن پست متن پست متن پست متن پست متن پست متن پست 
                </Text>
              </View>
            </View>
            <View style={{flexDirection:'column',flex:1,justifyContent:'center',alignItems:'center',alignContent:'center',}}>
               <View style={{height:80,width:70,borderRadius:40,backgroundColor:'#689F38',}}/> 
               <View style={{flexDirection:'row',alignItems:'flex-end',alignContent:'flex-end'}}>
                <Text style={{color:'#689F38', margin:0,fontSize:18,textAlign:'right'}}>Username!</Text>
              </View>
            </View>
          </View> 
          <View style={{justifyContent:'space-between', flexDirection:'row'}}>
              <View>
                <Text style={{color:'#757575', margin:15,fontSize:12}}>
                  2017 Aug 9 12:12 Wed
                </Text>
              </View>
              <View style={{justifyContent:'flex-end', flexDirection:'row',alignItems:'center'}}>
                <Text>پسند</Text>
                <Image source={require('../img/heartUnLike.png')} style={{height:20, width:22, margin:5,}} />
              </View>
            </View>         
        </View>
          
        <View style={{borderBottomColor:'#cccccc',borderBottomWidth:0,}}>
          <Text style={{fontFamily:'Vazir',fontSize:18,margin:5,marginRight:20}}>
            پاسخ ها:
          </Text>
        </View>

        <View style={{height:250}}>
          {/*list of replies  */}
        </View>
      </View>

      
    );

  }

}


const mapStateToProps = (state) => {
  return {
    accessToken: state.userInfo.accessToken,
    location: state.location,
    pageName: state.pageName,
    refreshToken: state.userInfo.refreshToken,
    parentPost: state.replyContent.parentPost,
    replyPosts: state.replyContent.replyPosts
  }
};

export default connect(mapStateToProps)(PostScreen);