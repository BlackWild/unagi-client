import React, { Component } from 'react';
import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 6 + 8,
    paddingHorizontal: 6,
    backgroundColor: '#e0e0e0',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  postBox: {
    marginBottom: 8,
    backgroundColor: '#f1f1f1',
    borderColor: '#858585',
    borderBottomWidth: 3,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  headerBox: {
    height: 70,
    backgroundColor: '#8BC34A',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  logo: {
    fontSize: 30,
    color: 'white',
    marginLeft: 13,
  },

  tabBox: {
    marginBottom: 8,
    backgroundColor: 'red',
  },
  deleteButton: {
    width: 24,
    height: 24,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },

});