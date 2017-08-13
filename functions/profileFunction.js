import { SERVER_DOMIN } from "../configs/config";

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
              sendParentGetReplies(that).then(() => {
                resol();
              });
            })
            .catch(() => {
              rej();
            });
        } else {
        }
      })
      .catch(error => {
        rej();
      });
  });
};
