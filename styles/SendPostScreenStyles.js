
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  pic:{
    width: 30, height: 30,
    margin:10
  },
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor: '#F1F1F1',
  },
  charRemain: {
    fontSize: 20,
    // color:'#F1F1F1',
    color:'#0000FF',
    textAlign: 'center',
    justifyContent:'center',
    margin: 10,
  },
  overChar: {
    color: '#ff0000' 
  },
  textarea: {
    flex:1,
    width:350,
    color: '#000000',
    backgroundColor: '#F1F1F1',
    justifyContent: 'center',
    alignItems: 'flex-start',
    textAlign: 'auto',
    textAlignVertical: 'top'    
  }
});