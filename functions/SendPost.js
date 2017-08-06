
import { SERVER_DOMIN } from '../configs/config';

export const sendPost = function(id , loc ,content, that, accessToken) {
  return new Promise((resol, rejec) => {
    const newPost = JSON.stringify({
      username: id,
      content: content,
      location: {x:loc.x, y:loc.y}
    });
    fetch({
        url: SERVER_DOMIN + '/api/v3/posts/addPost?accessToken='+accessToken+'&newPost='+newPost,
        method: 'GET'
      }).then((res) => {
          console.log("post sent to server");
          console.log(res);
          if(res._bodyText === "saved") {
            resol("ok")
          } else rejec();
        })
        .catch((error) => {
          console.error(error);
          rejec();
        });
    });

};