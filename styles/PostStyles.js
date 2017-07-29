import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  paragraph: {
    margin: 14,
    fontSize: 14,//18
    // fontWeight: 'bold',
    textAlign: 'auto',
    color: '#34495e',
    fontFamily: 'Vazir',
    
  },
  postBox: {
    //paddingRight:15,
    padding:10,
    marginBottom: 8,
    backgroundColor: '#f1f1f1',
    borderColor: '#9E9E9E',
    borderBottomWidth: 3,
    borderLeftWidth: 1,
    borderRightWidth: 2,
    
  },
  userBox:{
    flexDirection:'row',
    justifyContent: 'flex-end',
    
  },
  likeBox:{
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding:5 ,
  },
  user:{
    color:'#689F38', 
    // fontWeight: 'bold', 
    // fontSize: 16,
    fontFamily: 'Vazir',
  },
  replyText:{
    paddingRight:10,
    borderRightWidth: 3,
    borderColor:'#689F38',
  },
  reply:{
    paddingRight:10,
    paddingTop:5,
  }
});