import React, {Component} from 'react';
import Drawer from 'react-native-drawer';
import { connect } from 'react-redux';

import SideBarContent from './SideBarContent';
import {Text,View} from 'react-native';

class Menue extends Component{

    constructor(){
        super();
        this.closeControlPanel = this.closeControlPanel.bind(this);
        this.openControlPanel = this.openControlPanel.bind(this);
    }

    closeControlPanel = () => {
        this._drawer.close()
    };
    openControlPanel = () => {
        this._drawer.open()
    };

    render()
    {

        const drawerStyles = {
            drawer: { shadowColor: '#000000',backgroundColor:"red", shadowOpacity: 0.8, shadowRadius: 3},
            main: {paddingLeft: 3},
        }

        return (
            <Drawer
                type="static"
                content={<SideBarContent />}
                ref = {(ref) => this._drawer = ref}
                openDrawerOffset={2000}
                styles={drawerStyles}
                tweenHandler={Drawer.tweenPresets.parallax}
            >
                <View>
                    <Text onPress={this.openControlPanel}>
                        Drawer
                    </Text>
                </View>
            </Drawer>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        posts: state.posts,
        accessToken: state.userInfo.accessToken,
        location: state.location,
        pageName: state.pageName,
        refreshToken: state.userInfo.refreshToken,
    }
};
export default connect(mapStateToProps)(Menue);