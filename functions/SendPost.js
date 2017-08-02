
import { SERVER_DOMIN } from '../configs/config';

export const sendPost = function(id , loc ,content, that) {
  return new Promise((resol, rejec) => {
    const newPost = JSON.stringify({
      userID: id,
      content: content,
      location: {x:loc.x, y:loc.y}
    });
    fetch({
        url: SERVER_DOMIN + '/api/v1/posts/addPost?newPost='+newPost,
        method: 'GET'
      }).then((res) => {
          console.log("post sent to server");
          console.log(res);
          resol();
        })
        .catch((error) => {
          console.error(error);
          rejec();
        });
    });

};