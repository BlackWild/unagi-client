import { mainReducer } from '../reducers/Reducers.js';
import actions from '../reducers/Actions.js';

const initialState ={
  userID: 'userID',
  location: {
    x:30,
    y:30
  },
  posts: [
    {
      _id:1,
      username:'user',
      location:{
        x:37,
        y:40,
    },
    date:new Date("2017-08-06T13:05:33.340Z"),
    timeOfLastHotScoreUpdate:new Date("2017-08-06T13:05:33.340Z"),
    hotScore:6,
    likes:5,
    content:'post Content',
    }
  ],
  hotPosts: [{
    _id:2,
    username:'user2',
    location:{
      x:38,
      y:40,
    },
    date:new Date("2017-08-06T13:05:33.340Z"),
    timeOfLastHotScoreUpdate:new Date("2017-08-06T13:05:33.340Z"),
    hotScore:6,
    likes:5,
    content:'post Content 2',
  }],
  pageName: 'pageNameReducer',
  userInfo: {
    username:'name',
    password:'pass',
    accessToken:'accessToken',
  },
};

const actionLoction={
    type: actions.SET_LOCATION,
    location:{
      x:37,
      y:40,
    }
}

describe('reducers',()=>{
  describe('locationReducer',()=>{
    it('should be location',()=>{
      expect(mainReducer(initialState,actionLoction).location).toEqual({
        x:37,
        y:40,
      });
    })
  })
});

const newPostAction={
  type: actions.ADD_POSTS,
  newPosts:[{
      _id:2,
      username:'user2',
      location:{
        x:38,
        y:40,
      },
      date:new Date("2017-08-06T13:05:33.340Z"),
      timeOfLastHotScoreUpdate:new Date("2017-08-06T13:05:33.340Z"),
      hotScore:6,
      likes:5,
      content:'post Content 2',
    }],
}

const likePostAction={
  type: actions.LIKE,
  postID:1,
}

const unLikePostAction={
  type: actions.UNLIKE,
  postID:1,
}

describe('reducers',()=>{
  describe('postsReducer',()=>{
    describe('new post',()=>{
      it('should add post',()=>{
        expect(mainReducer(initialState,newPostAction).posts).toEqual([{
          _id:1,
          username:'user',
          location:{
            x:37,
            y:40,
          },
          date:new Date("2017-08-06T13:05:33.340Z"),
          timeOfLastHotScoreUpdate:new Date("2017-08-06T13:05:33.340Z"),
          hotScore:6,
          likes:5,
          content:'post Content',
          },{
            _id:2,
          username:'user2',
          location:{
            x:38,
            y:40,
          },
          date:new Date("2017-08-06T13:05:33.340Z"),
          timeOfLastHotScoreUpdate:new Date("2017-08-06T13:05:33.340Z"),
          hotScore:6,
          likes:5,
          content:'post Content 2',
          }]
        );
      })
    })

    describe('like post',()=>{
      it('should like post',()=>{
        expect(mainReducer(initialState,likePostAction).posts[0]).toEqual({
          _id:1,
          username:'user',
          location:{
            x:37,
            y:40,
          },
          date:new Date("2017-08-06T13:05:33.340Z"),
          timeOfLastHotScoreUpdate:new Date("2017-08-06T13:05:33.340Z"),
          hotScore:6,
          likes:6,
          isLiked:true,              
          content:'post Content',
        });
      })
    })
    
    describe('unlike post',()=>{
      it('should unlike post',()=>{
        expect(mainReducer(initialState,unLikePostAction).posts[0]).toEqual({
          _id:1,
          username:'user',
          location:{
            x:37,
            y:40,
          },
          date:new Date("2017-08-06T13:05:33.340Z"),
          timeOfLastHotScoreUpdate:new Date("2017-08-06T13:05:33.340Z"),
          hotScore:6,
          likes:4,
          isLiked:false,              
          content:'post Content',
        });
      })
    })

  })
});

const setInfo={
  type:actions.SET_INFO,
  username:'fackUser',
  password:'fackUserPass',
  accessToken:'fackUserAccessToken',
}

const setToken={
  type:actions.SET_TOKEN,
  accessToken:'fackUserAccessToken',
  refreshToken:'fackUserRefreshToken'
}

describe('reducers',()=>{
  describe('register',()=>{

    describe('set info',()=>{
      it('should set user info',()=>{
        expect(mainReducer(initialState,setInfo).userInfo).toEqual({
          username:'fackUser',
          password:'fackUserPass',
          accessToken:'fackUserAccessToken',
        })
      })
    })

    describe('set token',()=>{
      it('should set user token',()=>{
        expect(mainReducer(initialState,setToken).userInfo).toEqual({
          accessToken:'fackUserAccessToken',
          refreshToken:'fackUserRefreshToken'
        })
      })

    })

  })
});


const setID={
  type:actions.SET_ID,
  userID:'test'
}

describe('reducers',()=>{
  describe('UserID',()=>{
    it('should set user id',()=>{
      expect(mainReducer(initialState,setID).userID).toEqual(
          'test'
      )
    })

  })
})

const setPageName={
  type:actions.SET_PAGE_NAME,
  pageName:'fakeHome'
}

describe('reducers',()=>{
  describe('page name',()=>{
    it('should ...',()=>{
      expect(mainReducer(initialState,setPageName).pageName).toEqual(
          'fakeHome'
      )
    })

  })
})

const addHotPsts={
  type: actions.ADD_HOT_POSTS,
  newPosts:[{
      _id:2,
      username:'user2',
      location:{
        x:38,
        y:40,
      },
      date:new Date("2017-08-06T13:05:33.340Z"),
      timeOfLastHotScoreUpdate:new Date("2017-08-06T13:05:33.340Z"),
      hotScore:6,
      likes:5,
      content:'post Content 2',
    }],
}

describe('reducers',()=>{
  describe('postsReducer',()=>{
    describe('new post',()=>{
      it('should add HOT post',()=>{
        expect(mainReducer(initialState,newPostAction).posts).toEqual([{
          _id:1,
          username:'user',
          location:{
            x:37,
            y:40,
          },
          date:new Date("2017-08-06T13:05:33.340Z"),
          timeOfLastHotScoreUpdate:new Date("2017-08-06T13:05:33.340Z"),
          hotScore:6,
          likes:5,
          content:'post Content',
          },{
            _id:2,
          username:'user2',
          location:{
            x:38,
            y:40,
          },
          date:new Date("2017-08-06T13:05:33.340Z"),
          timeOfLastHotScoreUpdate:new Date("2017-08-06T13:05:33.340Z"),
          hotScore:6,
          likes:5,
          content:'post Content 2',
          }]
        );
      })
    })

  })
})

const addToTop={
  type: actions.ADD_POST_TO_TOP,
  post:{
      _id:2,
      username:'user2',
      location:{
        x:38,
        y:40,
      },
      date:new Date("2017-08-06T13:05:33.340Z"),
      timeOfLastHotScoreUpdate:new Date("2017-08-06T13:05:33.340Z"),
      hotScore:6,
      likes:5,
      content:'post Content 2',
    },
}

const cloneWithPosts={
  type: actions.CLONE_WITH_POSTS,
  newPosts:[{
      _id:2,
      username:'user2',
      location:{
        x:38,
        y:40,
      },
      date:new Date("2017-08-06T13:05:33.340Z"),
      timeOfLastHotScoreUpdate:new Date("2017-08-06T13:05:33.340Z"),
      hotScore:6,
      likes:5,
      content:'post Content 2',
    }],
}

const cloneWithHotPosts={
  type: actions.CLONE_WITH_HOTPOSTS,
  newPosts:[{
      _id:2,
      username:'user2',
      location:{
        x:38,
        y:40,
      },
      date:new Date("2017-08-06T13:05:33.340Z"),
      timeOfLastHotScoreUpdate:new Date("2017-08-06T13:05:33.340Z"),
      hotScore:6,
      likes:5,
      content:'post Content 2',
    }],
}

describe('reducers',()=>{
  describe('postsReducer',()=>{
    describe('on top',()=>{
      it('should add post on top',()=>{
        expect(mainReducer(initialState,addToTop).posts).toEqual([
          {
            _id:2,
            username:'user2',
            location:{
              x:38,
              y:40,
            },
            date:new Date("2017-08-06T13:05:33.340Z"),
            timeOfLastHotScoreUpdate:new Date("2017-08-06T13:05:33.340Z"),
            hotScore:6,
            likes:5,
            content:'post Content 2',
          },
          {
            _id:1,
            username:'user',
            location:{
              x:37,
              y:40,
            },
            date:new Date("2017-08-06T13:05:33.340Z"),
            timeOfLastHotScoreUpdate:new Date("2017-08-06T13:05:33.340Z"),
            hotScore:6,
            likes:5,
            content:'post Content',
          }]
        );
      })
    })

    describe('clone with post',()=>{
      it('should clone (post)',()=>{
        expect(mainReducer(initialState,cloneWithPosts).posts).toEqual([{
          _id:2,
          username:'user2',
          location:{
            x:38,
            y:40,
          },
          date:new Date("2017-08-06T13:05:33.340Z"),
          timeOfLastHotScoreUpdate:new Date("2017-08-06T13:05:33.340Z"),
          hotScore:6,
          likes:5,
          content:'post Content 2',
        }
        ]);
      })
    })

    describe('clone with HOT post',()=>{
      it('should clone (HOTpost)',()=>{
        expect(mainReducer(initialState,cloneWithHotPosts).posts).toEqual([{
          _id:1,
          username:'user',
          location:{
              x:37,
              y:40,
          },
          date:new Date("2017-08-06T13:05:33.340Z"),
          timeOfLastHotScoreUpdate:new Date("2017-08-06T13:05:33.340Z"),
          hotScore:6,
          likes:5,
          content:'post Content',
        }
        ]);
      })
    })

  })
})



// CLONE_WITH_POSTS: 'CLONE_WITH_POSTS',
// CLONE_WITH_HOTPOSTS: 'CLONE_WITH_HOTPOSTS',

