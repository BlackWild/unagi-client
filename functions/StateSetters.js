import { AsyncStorage } from 'react-native';

export const setLocationState = function(that) {
  console.log("dont worry");
  navigator.geolocation.getCurrentPosition( (pos) => {
    var crd = pos.coords;
    console.log(crd);
    that.setState( () => {
        return { location:{
            x:crd.latitude,
            y:crd.longitude,
        } };
    });
  }, (error) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
  });
}

export const setIDState = function(that) {
  // AsyncStorage.removeItem("userID").then((res) => {
  //   console.log("\n item deleted");
  // })
  AsyncStorage.getItem("userID").then((res) => {
    console.log("id was:  " + res);
    if(res) {
      console.log("is not first run");
      that.setState(() => {
        return {userID: res};
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
          });
          // fetch({
          //   url: 'https://local..../register/felan?userID=' + id,
          //   method: 'GET'
          // }).then((res) => {
          //     console.log("id sent to server");
          //     console.log(res);
          //   })
          //   .catch((error) => {
          //     console.error(error);
          //   });
        }).catch(error => console.error(error));
    }
  }).catch( (err) => {
    console.log("get storage error : " + err);
  });
};

export const setPostState = function(id, location , that) {
  const tempPosts = [
    {
      userID: '454364343664',
      location: { x: 2312.213, y: 4234.21 },
      content: 'salama aleyka',
    },
    {
      userID: 'sd12e1ssdew',
      location: { x: 23344542.213, y: 424534.21 },
      content: 'salama aleyka sdasd',
    },
    {
      userID: '4523rwvq3fvb3',
      location: { x: 3.213, y: 4234.21 },
      content: 'salama12323131d aleyka',
    },
    {
      userID: '454364343664',
      location: { x: 2312.213, y: 4234.21 },
      content: 'salama aleyka',
    }
  ];

  that.setState(() => {
    return {Posts: tempPosts};
  });

};
