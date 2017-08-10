import { SERVER_DOMIN } from '../configs/config';

import {tokenProvider} from "./StateSetters"
import actions from '../reducers/Actions';
 export const sendParentGetReplies=(that,parentPost)=>{
     return new Promise((resol, rej) => {

         fetch({
             url: SERVER_DOMIN + '/api/v4/posts/getReplies?postID=' + parentPost._id,
             headers: {
                 accessToken: that.props.accessToken,
             },
             method: 'GET',
         }).then((res) => {
             return res.json();
         }).then((resJ) => {

             if(!resJ.isAccessTokenValid) {
                 tokenProvider(that).then(() => {
                     sendParentGetReplies(that,parentPost).then(()=>{
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
export const getMoreReplyPost=(that,parentPost,qu)=>{
  return new Promise((resol, rej) => {

    fetch({
      url: SERVER_DOMIN + '/api/v4/posts/getPosts?cursor=' + qu + '&postID' + parentPost._id,
      headers: {
        accessToken: that.props.accessToken
      },
      method: 'GET',
    }).then((res) => {
      return res.json();
    }).then((resJ) => {

      if(!resJ.isAccessTokenValid) {
          tokenProvider(that).then(() => {
              getMoreReplyPost(that,parentPost,qu).then(()=>{
                  resol();
              });
          }).catch(() => {
              that.props.dispatch({type: actions.SET_PAGE_NAME, pageName: "LogIn"})
              that.props.navigation.navigate('LogIn');
              rej();
          });
      } else {
        that.props.dispatch({type: actions.ADD_REPLY_POSTS, newPosts: resJ.results});//
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
export const replyPost=(content, that)=>{
    return new Promise((resol, rejec) => {
        let temp = JSON.stringify({
            post: {
                content,
                location: that.props.location,
            },
            repliedPost: that.props.parentPost._id
        });
        fetch(SERVER_DOMIN + '/api/v4/posts/replyPost', {
            headers: {
                'Content-Type': 'application/json',
                accessToken: that.props.accessToken,
            },
            body: temp,
            method: 'POST',

        }).then((res) => {
            return res.json();
        }).then((resJ) => {
            if (!resJ.isAccessTokenValid) {
                console.log("expire");
                tokenProvider(that).then(() => {
                    replyPost(content,that).then(()=>{
                        resol("ok");
                    });
                }).catch(() => {
                    console.log("this is our login page");
                    that.props.dispatch({type: actions.SET_PAGE_NAME, pageName: "LogIn"})
                    that.props.navigation.navigate('LogIn');
                    rejec();
                });

            }
            else if (!resJ.isAdded) {
                rejec();
            } else {

                that.props.dispatch({type: actions.ADD_REPLY_TO_TOP, newPost: resJ.post});
                resol("ok");
            }
        }).catch((error) => {
            rejec();
        });
    });

}