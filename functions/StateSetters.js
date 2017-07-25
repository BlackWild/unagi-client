import { AsyncStorage } from 'react-native';
import uniqueId from 'react-native-unique-id';

export const setLocationState = function(that) {
    return new Promise( (res, rej) => {
    navigator.geolocation.getCurrentPosition( (pos) => {
      that.setState( () => {
          return { location:{
              x:pos.coords.latitude,
              y:pos.coords.longitude,
          }};
      }, () => {
        console.log("loc done!");
        res();
      });
    }, (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        rej();
    });
  });
}

export const setIDState = function(that) {
  return new Promise( (resol, rej) => {
    // AsyncStorage.removeItem("userID").then((res) => {
    //   console.log("\n item deleted");
    // })
    AsyncStorage.getItem("userID").then((res) => {
      console.log("id was:  " + res);
      if(res) {
        console.log("is not first run");
        that.setState(() => {
          return {userID: res};
        }, () => {
          console.log("id done!");
          resol();
        });
      } else {
        uniqueId()
          .then(id => {
            console.log("id is : " + id);
            AsyncStorage.setItem("userID", id).then((res) => {
              console.log("id saved!! ", res);
            });
            that.setState(() => {
              return {userID: id};
            }, () => {
              console.log("id done!");
              resol();
            });
            fetch({
              url: 'http://192.168.10.215:3000/api/v1/register/registerGuest?userID='+id,
              method: 'GET'
            }).then((res) => {
                console.log("id sent to server");
                console.log(res);
              })
              .catch((error) => {
                console.error(error);
              });
          }).catch(error => {
            console.error(error);
            rej();
          });
      }
    }).catch( (err) => {
      console.log("get storage error : " + err);
      rej();
    });

  });
};

export const setPostState = function(id, location , that) {
  return new Promise( (res, rej) => {
      var tempPosts=[];
      fetch({
            url: 'http://192.168.10.215:3000/api/v1/posts/getPosts?userID='+id+'&location={"x":'+location.x+',"y":'+location.y+'}',
            method: 'GET'
        }).then((res) => {

          return res.json();
      }).then((res)=>{
          tempPosts=res;
          that.setState(() => {
              return {Posts: tempPosts};
          }, () => {
              console.log("Post done!");
              res();
          });
      }).catch(()=>{})
      });
  //   that.setState(() => {
  //     return {Posts: tempPosts};
  //   }, () => {
  //     console.log("Post done!");
  //     res();
  //   });
  // })

};
