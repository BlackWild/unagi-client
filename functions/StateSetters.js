import { AsyncStorage } from 'react-native';
import uniqueId from 'react-native-unique-id';

import actions from '../reducers/Actions';

import { SERVER_DOMIN } from '../configs/config';

export const setLocationState = function (that) {
  return new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition((pos) => {
      that.props.dispatch({ type: actions.SET_LOCATION, location: { x: pos.coords.longitude, y: pos.coords.latitude } })
      res();
    }, (err) => {
      rej();
    });
  });
}

export const sendUsernameId = function(username,password,that){
    return new Promise((resol, rej) => {
        fetch({
            url: SERVER_DOMIN + '/api/v3/users/signUp?username=' + username + '&password=' + password ,
            method: 'GET',
            // headers:{
            //     username:username,
            //     password:password,
            // }
        }).then((res) => {
            return res.json();
        }).then((resJ) => {
            if(resJ.success) {
              that.props.dispatch({
                type: actions.SET_INFO,
                username: username,
                password: password,
                accessToken:resJ.accessToken,
                refreshToken: resJ.refreshToken,
              });
          }
            resol(resJ.success);
        }).catch((error) => {
            console.log("post fetch error: " + error);
            rej();
        });
    });
};
export const tokenProvider=function (that) {
    return new Promise((resol, rej) => {
        fetch({
            url: SERVER_DOMIN + '/api/v3/users/tokenProvider',
            method: 'GET',
            headers:{
              refreshToken: that.props.refreshToken,
            }
        }).then((res) => {
            return res.json();
        }).then((resJ) => {
            if(resJ.isRefreshTokenValid) {
                that.props.dispatch({
                    type: actions.SET_TOKEN,
                    accessToken:resJ.accessToken,
                    refreshToken: resJ.refreshToken,
                });
                resol();
            }
            else{
                rej();
            }

        }).catch((error) => {
            console.log("post fetch error: " + error);
            rej();
        });
    });

};
export const logIn = function(username,password,that){
    return new Promise((resol, rej) => {
        fetch({
          url: SERVER_DOMIN + '/api/v3/users/logIn?username=' + username + '&password=' + password ,
          method: 'GET',
          // headers:{
          //     username:username,
          //     password:password,
          // }
        }).then((res) => {
          return res.json();
        }).then((resJ) => {
          if(resJ.success){
            that.props.dispatch({
              type: actions.SET_INFO,
              username:username,
              password:password,
              accessToken:resJ.accessToken,
              refreshToken: resJ.refreshToken,
            });
            
          }
          resol(resJ.success);

        }).catch((error) => {
          console.log("post fetch error: " + error);
          rej();
        });
    });

};


export const setPostState = function (accessToken, location, that) {
  return new Promise((resol, rej) => {
    
    fetch({
      url: SERVER_DOMIN + '/api/v3/posts/getPosts?location='+JSON.stringify({x:location.x, y:location.y}),
      headers: {
        accessToken
      },
      method: 'GET'
    }).then((res) => {
      return res.json();
    }).then((resJ) => {

      if(!resJ.isAccessTokenValid) {
        rej();
      } else {
        that.props.dispatch({type: actions.CLONE_WITH_POSTS, newPosts: resJ.results});
        that.setState(() => {
          return {
            nextStr: resJ.next,
            hasNext: resJ.hasNext,
          }
        }, () => {
          resol();
        });
      }
    }).catch((error) => {
      rej();
    });
  });

};

export const getMorePost = (accessToken, location, that, qu) => {
  return new Promise((resol, rej) => {

    fetch({
      url: SERVER_DOMIN + '/api/v3/posts/getPosts?location='+JSON.stringify({x:location.x, y:location.y})
                                                +'&cursor=' + qu,
      headers: {
        accessToken
      },
      method: 'GET',
    }).then((res) => {
      return res.json();
    }).then((resJ) => {

      if(!resJ.isAccessTokenValid) {
        rej();
      } else {
        that.props.dispatch({type: actions.ADD_POSTS, newPosts: resJ.results});
        that.setState(() => {
          return {
            nextStr: resJ.next,
            hasNext: resJ.hasNext,
          }
        }, () => {
          resol();
        });
      }
    }).catch((error) => {
      rej();
    });
  });
};

export const setHotPostState = (accessToken, location, that) => {
  return new Promise((resol, rej) => {

    fetch({
      url: SERVER_DOMIN + '/api/v3/posts/getHotPosts?location='+JSON.stringify({x:location.x, y:location.y}),
      headers: {
        accessToken
      },
      method: 'GET',
    }).then((res) => {
      return res.json();
    }).then((resJ) => {

      if(!resJ.isAccessTokenValid) {
        rej();
      } else {
        that.props.dispatch({type: actions.CLONE_WITH_HOTPOSTS, newPosts: resJ.results});
        that.setState(() => {
          return {
            nextStr: resJ.next,
            hasNext: resJ.hasNext,
          }
        }, () => {
          resol();
        });
      }
    }).catch((error) => {
      rej();
    });
  });
};


export const getMoreHotPost = (accessToken, location, that, qu) => {
  return new Promise((resol, rej) => {

    fetch({
      url: SERVER_DOMIN + '/api/v3/posts/getHotPosts?location='+JSON.stringify({x:location.x, y:location.y})
                                                +'&cursor=' + qu,
      headers: {
        accessToken
      },
      method: 'GET',
    }).then((res) => {
      return res.json();
    }).then((resJ) => {

      if(!resJ.isAccessTokenValid) {
        rej();
      } else {
        const filteredPosts=resJ.results.filter((newItem)=>{
          return !that.props.hotPosts.find((item)=>{return item._id===newItem._id})
        });
        that.props.dispatch({type: actions.ADD_HOT_POSTS, newPosts: filteredPosts});
        that.setState(() => {
          return {
            nextStr: resJ.next,
            hasNext: resJ.hasNext,
          }
        }, () => {
          resol();
        });
      }
    }).catch((error) => {
      rej();
    });
  });
};
