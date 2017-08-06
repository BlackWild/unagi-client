import { mainReducer } from '../reducers/Reducers.js';
import actions from '../reducers/Actions.js';
describe("salam", () => {
  it('should be answered', () => {

  })
})
const initialState =
  {
    userID: 'userID',
    location: {x:30,y:30},
    posts: [{
      // _id
      username:'user',
      location:{
        x:37,
        y=40,
      },
      date:new Date(),
      timeOfLastHotScoreUpdate:new Date(),
      hotScore:6,
      like:5,
      content:'post Content',
      
    }],
    hotPosts: hotPostsReducer,
    pageName: 'pageNameReducer',
    userInfo: registerReducer,
  };
const actionLoction={
  type: actions.SET_LOCATION,
  location:{
    x:0,
    y:0,
  }
}
describe('reducers',()=>{
  describe('locationReducer',()=>{
    it('should be location',()=>{
      expect(mainReducer(initialState,actionLoction).location).toEqual({
        x:0,
        y:0
      });
    })

  })
})