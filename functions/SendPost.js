
import { SERVER_DOMIN } from '../configs/config';

export const sendPost = function(id , loc ,content, that) {
  return new Promise((resol, rejec) => {
    let newPost = {
      userID: id,
      content,
      location: {x:loc.x, y:loc.y}
    };
    fetch({
        url: SERVER_DOMIN + '/api/v1/posts/addPost?newPost='+JSON.stringify(newPost),
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