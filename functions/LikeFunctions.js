// import URLSearchParams from 'url-search-params'
import _ from 'lodash';

import { SERVER_DOMIN } from '../configs/config';

import actions from '../reducers/Actions';

export const likePost = (uID, pID, that) => {

  return new Promise((resol, rejec) => {
    that.props.dispatch({ type: actions.LIKE, postID: pID })
    fetch(SERVER_DOMIN + '/api/v2/posts/likePost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userID: uID,
        postID: pID
      })
    }).then((res) => {
      console.log("post Like Sent to server", res);

      if (res._bodyText === "liked") {
        console.log("PostLiked");
        resol();
      } else {
          that.props.dispatch({ type: actions.UNLIKE, postID: pID })
          resol();
      }
    }).catch((error) => {
      console.log("inja: ", error);
      rejec();
    });

  });

};



export const unlikePost = (uID, pID, that) => {
  that.props.dispatch({ type: actions.UNLIKE, postID: pID });
  return new Promise((resol, rejec) => {
    fetch(SERVER_DOMIN + '/api/v2/posts/unlikePost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userID: uID,
        postID: pID
      })
    }).then((res) => {
      console.log("post Like Sent to server", res);

      if (res._bodyText === "unliked") {
        console.log("post unliked");
        resol();
      } else {
          that.props.dispatch({ type: action.LIKE, postID: pID })
          resol();
      }
    }).catch((error) => {
      console.log("inja: ", error);
      rejec();
    });

  });

};
