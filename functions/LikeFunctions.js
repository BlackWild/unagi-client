// import URLSearchParams from 'url-search-params'
import _ from 'lodash';

import { SERVER_DOMIN } from '../configs/config';

import actions from '../reducers/Actions';

export const likePost = (accessToken, pID, that) => {

  return new Promise((resol, rejec) => {
    that.props.dispatch({ type: actions.LIKE, postID: pID })
    fetch(SERVER_DOMIN + '/api/v3/posts/likePost',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accessToken,
      },
      body: JSON.stringify({
        postID: pID
      }),
    }).then((res) => {
      return res.json();
    }).then((resJ) => {

      if (!resJ.isAccessTokenValid) {
        that.props.dispatch({ type: actions.UNLIKE, postID: pID });
        rejec();
      } else if (!resJ.isLiked) {
        that.props.dispatch({ type: actions.UNLIKE, postID: pID });
        rejec();
      } else {
        resol();
      }

    }).catch((error) => {
      that.props.dispatch({ type: actions.UNLIKE, postID: pID });
      rejec();
    });

  });

};



export const unlikePost = (accessToken, pID, that) => {
  that.props.dispatch({ type: actions.UNLIKE, postID: pID });
  return new Promise((resol, rejec) => {
    fetch(SERVER_DOMIN + '/api/v3/posts/unlikePost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accessToken,
      },
      body: JSON.stringify({
        postID: pID
      })
    }).then((res) => {
      return res.json();
    }).then((resJ) => {

      if (!resJ.isAccessTokenValid) {
        that.props.dispatch({ type: actions.LIKE, postID: pID });
        rejec();
      } else if (!resJ.isUnliked) {
        that.props.dispatch({ type: actions.LIKE, postID: pID });
        rejec();
      } else {
        resol();
      }

    }).catch((error) => {
      that.props.dispatch({ type: actions.LIKE, postID: pID });
      rejec();
    });

  });

};
