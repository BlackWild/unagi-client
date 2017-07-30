
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    StatusBar,
    Button,
    Image,
    ListView,
    FlatList,
} from 'react-native';
import ActionButton from 'react-native-action-button';

import { NavigationActions  } from 'react-navigation';

import async from 'async';

import {Post} from '../components/Post';
import {setIDState, setLocationState, setPostStateHotScreen, getMorePostHotScreen} from '../functions/StateSetters';

import {styles} from '../styles/HomeScreenStyles';
import {headerStyles} from '../styles/HeaderStyles'


export class HotScreen extends Component {
    constructor(props) {
        super(props);

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds,
            Posts: [],
        };


        // getIDState.bind(this);
    }

    // ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});


    componentWillMount() {
        async.parallel([
            (callback) => {
                setIDState(this).then( () => callback()).catch( () => {} );
            },
            (callback) => {
                setLocationState(this).then( () => callback()).catch( () => {} );
            }
        ], (err) => {
            setPostStateHotScreen(this.state.userID, this.state.location, this).then( () => console.log("good")).catch( () => {} );
        });

    }

    static navigationOptions = ({ navigation }) => {
        return {
            header:(
                <View style={headerStyles.headerBox} >
                    <Text style={headerStyles.logo} >اوناگی</Text>
                </View>
            ) ,
        }
    };

    render() {
        if (!this.state || !this.state.Posts) {
            console.log("not ready");
            return null;
        } else {
            const { navigate } = this.props.navigation;
            onEndHandler = () => {
                console.log("end reached");
                getMorePostHotScreen(this.state.userID, this.state.location, this, this.state.nextStr).then( () => console.log("more good")).catch( () => console.log("no more post") );
            };

            return (
                <View style={{ flex: 1 }}>


                    <View style={styles.container}>
                        <ListView
                            dataSource={this.state.dataSource}
                            renderRow={(rowData) => (
                                <Post likes={rowData.likes} isLiked={rowData.isLiked} content={rowData.content} date={rowData.date} postID={rowData._id} userID={rowData.userID} HomeScreen={this}/>
                            )}
                            onEndReached={onEndHandler}
                            onEndReachedThreshold={320}
                        />
                    </View>
                </View>
            );
        }
    }

}