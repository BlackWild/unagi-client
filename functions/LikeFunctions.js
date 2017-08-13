// import URLSearchParams from 'url-search-params'
import _ from "lodash";

import { SERVER_DOMIN } from "../configs/config";

import { tokenProvider } from "./StateSetters";
import actions from "../reducers/Actions";

export const likePost = (accessToken, pID, that) => {
  return new Promise((resol, rejec) => {
    that.props.dispatch({ type: actions.LIKE, postID: pID });
    fetch(SERVER_DOMIN + "/api/v4/posts/likePost", {
      headers: {
        "Content-Type": "application/json",
        accessToken
      },
      body: JSON.stringify({
        postID: pID
      }),
      method: "POST"
    })
      .then(res => {
        return res.json();
      })
      .then(resJ => {
        if (!resJ.isAccessTokenValid) {
          tokenProvider(that)
            .then(() => {
              that.props.dispatch({ type: actions.UNLIKE, postID: pID });
              likePost(that.props.accessToken, pID, that).then(() => {
                resol();
              });
            })
            .catch(() => {
              that.props.dispatch({ type: actions.UNLIKE, postID: pID });
              that.props.dispatch({
                type: actions.SET_PAGE_NAME,
                pageName: "LogIn"
              });
              that.props.navigation.navigate("LogIn");
              rejec();
            });
        } else if (!resJ.isLiked) {
          that.props.dispatch({ type: actions.UNLIKE, postID: pID });
          rejec();
        } else {
          resol();
        }
      })
      .catch(error => {
        that.props.dispatch({ type: actions.UNLIKE, postID: pID });
        rejec();
      });
  });
};

export const unlikePost = (accessToken, pID, that) => {
  that.props.dispatch({ type: actions.UNLIKE, postID: pID });
  return new Promise((resol, rejec) => {
    fetch(SERVER_DOMIN + "/api/v4/posts/unlikePost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accessToken
      },
      body: JSON.stringify({
        postID: pID
      })
    })
      .then(res => {
        return res.json();
      })
      .then(resJ => {
        if (!resJ.isAccessTokenValid) {
          tokenProvider(that)
            .then(() => {
              that.props.dispatch({ type: actions.LIKE, postID: pID });
              unlikePost(that.props.accessToken, pID, that).then(() => {
                resol();
              });
            })
            .catch(() => {
              that.props.dispatch({ type: actions.LIKE, postID: pID });
              that.props.dispatch({
                type: actions.SET_PAGE_NAME,
                pageName: "LogIn"
              });
              that.props.navigation.navigate("LogIn");
              rejec();
            });
        } else if (!resJ.isUnliked) {
          that.props.dispatch({ type: actions.LIKE, postID: pID });
          rejec();
        } else {
          resol();
        }
      })
      .catch(error => {
        that.props.dispatch({ type: actions.LIKE, postID: pID });
        rejec();
      });
  });
};
