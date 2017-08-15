import { SERVER_DOMIN } from "../configs/config";
import { ImageStore } from "react-native";
import { tokenProvider } from "./StateSetters";
import actions from "../reducers/Actions";
export const sendPicture = (that, arr, data) => {
  return new Promise((resol, rej) => {
    fetch(SERVER_DOMIN + "/api/v4/users/setPic", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accessToken: that.props.accessToken
      },
      body: JSON.stringify({
        type: arr[1],
        pic: data
      })
    })
      .then(res => {
        return res.json();
      })
      .then(resJ => {
        console.log(resJ);
        if (!resJ.isAccessTokenValid) {
          tokenProvider(that)
            .then(() => {
              sendPicture(that, arr, data).then(arg => {
                if (resJ.isSaved) resol(resJ.isSaved);
              });
            })
            .catch(() => {
              rej();
            });
        } else {
          console.log(SERVER_DOMIN + "/" + resJ.path, that.props.username);
          if (resJ.isSaved) {
            that.props.dispatch({
              type: actions.SET_IMAGE,
              uri: SERVER_DOMIN + "/" + resJ.path,
              username: that.props.username
            });
            resol(resJ.isSaved);
          } else rej();
        }
      })
      .catch(error => {
        rej();
      });
  });
};
export const getPicture = (that, username) => {
  return new Promise((resol, rej) => {
    fetch({
      url: SERVER_DOMIN + "/api/v4/users/getUrl?username=" + username,
      headers: {
        accessToken: that.props.accessToken
      },
      method: "GET"
    })
      .then(res => {
        return res.json();
      })
      .then(resJ => {
        if (!resJ.isAccessTokenValid) {
          tokenProvider(that)
            .then(() => {
              getPicture(that, username).then(() => {
                resol();
              });
            })
            .catch(() => {
              that.props.dispatch({
                type: actions.SET_PAGE_NAME,
                pageName: "LogIn"
              });
              that.props.navigation.navigate("LogIn");
              rej();
            });
        } else {
          that.props.dispatch({
            type: actions.SET_IMAGE,
            uri: SERVER_DOMI + "/" + resJ.path,
            username
          });
        }
      })
      .catch(error => {
        rej();
      });
  });
};

export const getUserPosts = (accessToken, that) => {
  return new Promise((resol, rej) => {
    fetch({
      url: SERVER_DOMIN + "/api/v4/posts/getUserPosts",
      headers: {
        accessToken
      },
      method: "GET"
    })
      .then(res => {
        return res.json();
      })
      .then(resJ => {
        console.log(resJ);
        if (!resJ.isAccessTokenValid) {
          tokenProvider(that)
            .then(() => {
              getUserPosts(that.props.accessToken, that).then(() => {
                resol();
              });
            })
            .catch(() => {
              that.props.dispatch({
                type: actions.SET_PAGE_NAME,
                pageName: "LogIn"
              });
              that.props.navigation.navigate("LogIn");
              rej();
            });
        } else {
          that.props.dispatch({
            type: actions.CLONE_WITH_USER_POSTS,
            newPosts: resJ.results
          });
          that.setState(
            () => {
              return {
                nextStr: resJ.next,
                hasNext: resJ.hasNext
              };
            },
            () => {
              resol();
            }
          );
        }
      })
      .catch(error => {
        rej();
      });
  });
};

export const getMoreUserPosts = (accessToken, that, qu) => {
  return new Promise((resol, rej) => {
    fetch({
      url: SERVER_DOMIN + "/api/v4/posts/getUserPosts&cursor=" + qu,
      headers: {
        accessToken
      },
      method: "GET"
    })
      .then(res => {
        return res.json();
      })
      .then(resJ => {
        if (!resJ.isAccessTokenValid) {
          tokenProvider(that)
            .then(() => {
              getMoreUserPosts(that.props.accessToken, that, qu).then(() => {
                resol();
              });
            })
            .catch(() => {
              that.props.dispatch({
                type: actions.SET_PAGE_NAME,
                pageName: "LogIn"
              });
              that.props.navigation.navigate("LogIn");
              rej();
            });
        } else {
          const filteredPosts = resJ.results.filter(newItem => {
            return !that.props.hotPosts.find(item => {
              return item._id === newItem._id;
            });
          });
          that.props.dispatch({
            type: actions.ADD_USER_POSTS,
            newPosts: filteredPosts
          });
          that.setState(
            () => {
              return {
                nextStr: resJ.next,
                hasNext: resJ.hasNext
              };
            },
            () => {
              resol();
            }
          );
        }
      })
      .catch(error => {
        rej();
      });
  });
};
