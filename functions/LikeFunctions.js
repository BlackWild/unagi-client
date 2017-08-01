// import URLSearchParams from 'url-search-params'
import _ from 'lodash';

import { SERVER_DOMIN } from '../configs/config';

export const likePost = (uID, pID, that, thePost) => {

  return new Promise((resol, rejec) => {


    ///// if isLiked return


    fetch(SERVER_DOMIN + '/api/v2/posts/likePost',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userID: uID,
        postID: pID
      })
    }).then((res) => {
      console.log("post Like Sent to server");

      if (res._bodyText === "liked") {
        console.log("res expression");
        thePost.setState(pervState => ({
          isLiked: true,
          likes: pervState.likes+1
        }),()=>{
          let newData = that.state.Posts;
          _.find(newData, (post) => (post._id === pID)).isLiked = true;
          _.find(newData, (post) => (post._id === pID)).likes++;
          that.setState(() => ({
            Posts: newData,
          }), () => {
            console.log("shad bashid");
            resol();
          });
        });
        
      }

    }).catch((error) => {
      console.log("inja: ",error);
      rejec();
    });

  });

};


export const unlikePost = (uID, pID, that, thePost) => {

  return new Promise((resol, rejec) => {


    ///// if isLiked return

    // const postBody = JSON.stringify({
    //   userID,
    //   postID
    // });
    

    fetch(SERVER_DOMIN + '/api/v2/posts/unlikePost',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userID: uID,
        postID: pID
      })
    }).then((res) => {
      console.log("post unLike Sent to server");

      if (res._bodyText === "unliked") {
        console.log("res expression");
        thePost.setState(pervState => ({
          isLiked: false,
          likes: pervState.likes-1
        }),()=>{
          let newData = that.state.Posts;
          _.find(newData, (post) => (post._id === pID)).isLiked = false;
          _.find(newData, (post) => (post._id === pID)).likes--;
          that.setState(() => ({
            Posts: newData,
          }), () => {
            console.log("shad bashid");
            resol();
          });
        });
        
      }

    }).catch((error) => {
      console.log("inja: ",error);
      rejec();
    });

  });

};