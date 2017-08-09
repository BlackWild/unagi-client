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
            url: SERVER_DOMIN + '/api/v4/users/signUp',
            method: 'GET',
            headers:{
                username:username,
                password:password,
            }
        }).then((res) => {
            return res.json();
        }).then((resJ) => {
            if(resJ.isSignedUp) {
              that.props.dispatch({
                type: actions.SET_INFO,
                username: username,
                password: password,
                accessToken:resJ.accessToken,
                refreshToken: resJ.refreshToken,
              });
          }
            resol(resJ.isSignedUp);
        }).catch((error) => {
            console.log("post fetch error: " + error);
            rej();
        });
    });
};
export const tokenProvider=function (that) {
    return new Promise((resol, rej) => {
        fetch({
            url: SERVER_DOMIN + '/api/v4/users/tokenProvider',
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
                console.log("valid naboode refresh token");
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
          url: SERVER_DOMIN + '/api/v4/users/logIn',
          method: 'GET',
          headers:{
              username:username,
              password:password,
          }
        }).then((res) => {
          return res.json();
        }).then((resJ) => {
          if(resJ.isFound){
            that.props.dispatch({
              type: actions.SET_INFO,
              username:username,
              password:password,
              accessToken:resJ.accessToken,
              refreshToken: resJ.refreshToken,
            });
            
          }
          resol(resJ.isFound);

        }).catch((error) => {
          console.log("post fetch error: " + error);
          rej();
        });
    });

};


export const setPostState = function (accessToken, location, that) {
  return new Promise((resol, rej) => {
    
    fetch({
      url: SERVER_DOMIN + '/api/v4/posts/getPosts?location='+JSON.stringify({x:location.x, y:location.y}),
      headers: {
        accessToken
      },
      method: 'GET'
    }).then((res) => {
      return res.json();
    }).then((resJ) => {

      if(!resJ.isAccessTokenValid) {
          tokenProvider(that).then(() => {
              console.log("set post again");
              setPostState(that.props.accessToken,location,that).then(()=>{
                  // that.props.dispatch({type: actions.ADD_POST_TO_TOP, post: resJ.post});
                  resol();
              });
          }).catch(() => {
              console.log("this is our login page");
              that.props.dispatch({type: actions.SET_PAGE_NAME, pageName: "LogIn"})
              that.props.navigation.navigate('LogIn');
              rej();
          });
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
      url: SERVER_DOMIN + '/api/v4/posts/getPosts?location='+JSON.stringify({x:location.x, y:location.y})
                                                +'&cursor=' + qu,
      headers: {
        accessToken
      },
      method: 'GET',
    }).then((res) => {
      return res.json();
    }).then((resJ) => {

      if(!resJ.isAccessTokenValid) {
          tokenProvider(that).then(() => {
              console.log("set post again");
              getMorePost(that.props.accessToken,location,that,qu).then(()=>{
                  resol();
              });
          }).catch(() => {
              console.log("this is our login page");
              that.props.dispatch({type: actions.SET_PAGE_NAME, pageName: "LogIn"})
              that.props.navigation.navigate('LogIn');
              rej();
          });
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
      url: SERVER_DOMIN + '/api/v4/posts/getHotPosts?location='+JSON.stringify({x:location.x, y:location.y}),
      headers: {
        accessToken
      },
      method: 'GET',
    }).then((res) => {
      return res.json();
    }).then((resJ) => {

      if(!resJ.isAccessTokenValid) {
          tokenProvider(that).then(() => {
              console.log("set post again");
              setHotPostState(that.props.accessToken,location,that).then(()=>{
                  resol();
              });
          }).catch(() => {
              console.log("this is our login page");
              that.props.dispatch({type: actions.SET_PAGE_NAME, pageName: "LogIn"})
              that.props.navigation.navigate('LogIn');
              rej();
          });
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
      url: SERVER_DOMIN + '/api/v4/posts/getHotPosts?location='+JSON.stringify({x:location.x, y:location.y})
                                                +'&cursor=' + qu,
      headers: {
        accessToken
      },
      method: 'GET',
    }).then((res) => {
      return res.json();
    }).then((resJ) => {

      if(!resJ.isAccessTokenValid) {
          tokenProvider(that).then(() => {
              console.log("set post again");
              getMoreHotPost(that.props.accessToken,location,that,qu).then(()=>{
                  resol();
              });
          }).catch(() => {
              console.log("this is our login page");
              that.props.dispatch({type: actions.SET_PAGE_NAME, pageName: "LogIn"})
              that.props.navigation.navigate('LogIn');
              rej();
          });
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


export const getReplies = function (accessToken, location, that) {
  return new Promise((resol, rej) => {
    
    fetch({
      url: SERVER_DOMIN + '/api/v4/posts/getReplies?location='+JSON.stringify({x:location.x, y:location.y}),
      headers: {
        accessToken
      },
      method: 'GET'
    }).then((res) => {
      return res.json();
    }).then((resJ) => {

      if(!resJ.isAccessTokenValid) {
          tokenProvider(that).then(() => {
              console.log("set post again");
              getReplies(that.props.accessToken,location,that).then(()=>{
                  resol();
              });
          }).catch(() => {
              that.props.dispatch({type: actions.SET_PAGE_NAME, pageName: "LogIn"})
              that.props.navigation.navigate('LogIn');
              rej();
          });
      } else {
        that.props.dispatch({type: actions.CLONE_WITH_REPLY_POSTS, newPosts: resJ.results});
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

export const getMoreReplies = (accessToken, location, that, qu) => {
  return new Promise((resol, rej) => {

    fetch({
      url: SERVER_DOMIN + '/api/v4/posts/getReplies?location='+JSON.stringify({x:location.x, y:location.y})
                                                +'&cursor=' + qu,
      headers: {
        accessToken
      },
      method: 'GET',
    }).then((res) => {
      return res.json();
    }).then((resJ) => {

      if(!resJ.isAccessTokenValid) {
          tokenProvider(that).then(() => {
              getMoreReplies(that.props.accessToken,location,that,qu).then(()=>{
                  resol();
              });
          }).catch(() => {
              that.props.dispatch({type: actions.SET_PAGE_NAME, pageName: "LogIn"})
              that.props.navigation.navigate('LogIn');
              rej();
          });
      } else {
        that.props.dispatch({type: actions.ADD_REPLY_POSTS, newPosts: resJ.results});
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
