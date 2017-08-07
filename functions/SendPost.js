
import { SERVER_DOMIN } from '../configs/config';

import actions from '../reducers/Actions';
import {tokenProvider} from '../functions/StateSetters';

export const sendPost = function (accessToken, location, content, that) {
  return new Promise((resol, rejec) => {
    fetch(SERVER_DOMIN + '/api/v3/posts/addPost', {
      headers: {
        'Content-Type': 'application/json',
        accessToken
      },
      body: JSON.stringify({
        newPost: {
          content,
          location,
        },
      }),
      method: 'POST',
    }).then((res) => {
      return res.json();
    }).then((resJ) => {
      if (!resJ.isAccessTokenValid) {
          tokenProvider(that).then(() => {
              sendPost(that.props.accessToken,location,content,that).then(()=>{
                // that.props.dispatch({type: actions.ADD_POST_TO_TOP, post: resJ.post});
                resol("ok");
            });
          }).catch(() => {
            console.log("this is our login page");
            this.props.dispatch({type: actions.SET_PAGE_NAME, pageName: "LogIn"})
            this.props.navigation.navigate('LogIn');
            rejec();
          });

      }
      else if (!resJ.isAdded) {
        rejec();
      } else {

          that.props.dispatch({type: actions.ADD_POST_TO_TOP, post: resJ.post});
          resol("ok");
      }
    }).catch((error) => {
      rejec();
    });
  });

};