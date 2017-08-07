import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  picUp:{
    width: 120, height: 120,
    margin:15,
  },
  picIn:{
    width: 150, height: 150,
    margin:15,
  },
  textIn:{
    height:70,
    margin:5,
  },
  buttonText:{
    color:'#FFFFFF',
    fontSize:20,
    fontFamily:'Vazir',
    textAlign:'center',
  },
  button:{
    backgroundColor:'#8BC34A',
    padding:10,
    width:200,
    borderRadius:8,
    marginTop:10,
  },
  headerBox: {
    height:70,
    backgroundColor: '#8BC34A',
    justifyContent: 'center',
    alignItems:'flex-start',
  },
  textarea: {
    flex:1,
    width:200,
    height:40,
    color: '#000000',
    justifyContent: 'center',
    textAlign: 'auto',
    textAlignVertical: 'center',
    fontSize:15,    
  },
textAreaView:{
    marginVertical:5,
    borderWidth:1,
    borderColor:'#9e9e9e',
    borderRadius:3,
    height:40,
    flexDirection:'row',
    alignItems:'center'
},
fieldName:{
    fontFamily:'Vazir',
    textAlign:'right',
    width:200,
    marginBottom:5,
    fontSize:14,
},
checkBox:{
  margin:5,
  height:16,
  width:16,
  borderWidth:1,
  borderRadius:8,
  borderColor:'#9e9e9e',
},
});