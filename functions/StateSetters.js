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
      console.warn(`ERROR(${err.code}): ${err.message}`);
      rej();
    });
  });
}

export const setIDState = function (that) {
  return new Promise((resol, rej) => {

    uniqueId().then(id => {
      console.log("id is : " + id);
      that.props.dispatch({ type: actions.SET_ID, userID: id });
      fetch({
        url: SERVER_DOMIN + '/api/v1/register/registerGuest?userID=' + id,
        method: 'GET'
      }).then((res) => {
        console.log("id sent to server");
        resol();
      }).catch((error) => {
        console.error(error);
        rej();
      });
    })

  });
};
export const sendUsernameId = function(username,password,that){
    return new Promise((resol, rej) => {
        fetch({
            url: SERVER_DOMIN + '/api/v3/users/signUp?username=' + username + '&password=' + password ,
            method: 'GET'
        }).then((res) => {
            return res.json();
        }).then((resJ) => {
            if(resJ.success) {
              that.props.dispatch({
                type: actions.SET_INFO,
                userName: username,
                passWord: password,
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
export const logIn = function(username,password,that){
    return new Promise((resol, rej) => {
        fetch({
          url: SERVER_DOMIN + '/api/v3/users/logIn?username=' + username + '&password=' + password ,
          method: 'GET'
        }).then((res) => {
          return res.json();
        }).then((resJ) => {
          if(resJ.success){
            that.props.dispatch({
              type: actions.SET_INFO,
              userName:username,
              passWord:password,
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


export const setPostState = function (id, location, that) {
  return new Promise((resol, rej) => {

    // const post = JSON.stringify({
    //   accessToken: id,
    //   location:{x: location.x, y:location.y },
    // });
    
    fetch({
      url: SERVER_DOMIN + '/api/v3/posts/getPosts?accessToken=' + id + '&location={"x":' + location.x + ',"y":' + location.y + '}',
      method: 'GET'
    }).then((res) => {
      return res.json();
    }).then((resJ) => {
      // console.log("server result: ", resJ.results);
      // console.log("that state: " , that.state.Posts);
      that.props.dispatch({type: actions.CLONE_WITH_POSTS, newPosts: resJ.results});
      
      that.setState(() => {
        return {
          nextStr: resJ.next,
          hasNext: resJ.hasNext,
        }
      }, () => {
        console.log("Post done!");
        resol();
      });
    }).catch((error) => {
      console.log("post fetch error: " + error);
      rej();
    });
  });

};

export const getMorePost = (id, location, that, qu) => {
  return new Promise((resol, rej) => {

    if (!that.state.hasNext) rej();

    // const post = JSON.stringify({
    //   accessToken: id,
    //   location:{x: location.x, y:location.y },
    // });
    fetch({
      url: SERVER_DOMIN + '/api/v3/posts/getPosts?accessToken=' + id + '&location={"x":' + location.x + ',"y":' + location.y + '}&cursor=' + qu,
      method: 'GET',
    }).then((res) => {
      return res.json();
    }).then((resJ) => {
      // console.log("server result: ", resJ.results);
      // console.log("that state: " , that.state.Posts);
      that.props.dispatch({type: actions.ADD_POSTS, newPosts: resJ.results});
      that.setState(() => {
        return {
          nextStr: resJ.next,
          hasNext: resJ.hasNext,

        }
      }, () => {
        console.log("Post done!");
        resol();
      });
    }).catch((error) => {
      console.log("more post fetch error: " + error);
      rej();
    });
  });
};

export const setHotPostState = function (id, location, that) {
  return new Promise((resol, rej) => {

    // const post = JSON.stringify({
    //   accessToken: id,
    //   location:{x: location.x, y:location.y },
    // });
    
    fetch({
      url: SERVER_DOMIN + '/api/v3/posts/getHotPosts?accessToken=' + id + '&location={"x":' + location.x + ',"y":' + location.y + '}',
      method: 'GET'
    }).then((res) => {
      return res.json();
    }).then((resJ) => {
      // console.log("server result: ", resJ.results);
      // console.log("that state: " , that.state.Posts);
      that.props.dispatch({type: actions.CLONE_WITH_HOTPOSTS, newPosts: resJ.results});
      
      that.setState(() => {
        return {
          nextStr: resJ.next,
          hasNext: resJ.hasNext,
        }
      }, () => {
        console.log("Post done!");
        resol();
      });
    }).catch((error) => {
      console.log("post fetch error: " + error);
      rej();
    });
  });

};

export const getMoreHotPost = (id, location, that, qu) => {
  return new Promise((resol, rej) => {

    if (!that.state.hasNext) rej();

    // const post = JSON.stringify({
    //   accessToken: id,
    //   location:{x: location.x, y:location.y },
    // });
    fetch({
      url: SERVER_DOMIN + '/api/v3/posts/getHotPosts?accessToken=' + id + '&location={"x":' + location.x + ',"y":' + location.y + '}&cursor=' + qu,
      method: 'GET',
    }).then((res) => {
      return res.json();
    }).then((resJ) => {
      // console.log("server result: ", resJ.results);
      // console.log("that state: " , that.state.Posts);
      let filteredPosts=resJ.results.filter((newItem)=>{
          return !that.props.hotPosts.find((item)=>{return item._id===newItem._id})
      });
      that.props.dispatch({type: actions.ADD_HOT_POSTS, newPosts: filteredPosts});
      that.setState(() => {
        return {
          nextStr: resJ.next,
          hasNext: resJ.hasNext,
        }
      }, () => {
        console.log("Post done!");
        resol();
      });
    }).catch((error) => {
      console.log("more post fetch error: " + error);
      rej();
    });
  });
};
