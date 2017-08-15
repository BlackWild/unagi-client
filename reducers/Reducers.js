import { combineReducers } from "redux";

import { userIDReducer } from "./UserIDReducer";
import { locationReducer } from "./locationReducer";
import { postsReducer } from "./PostsReducer";
import { hotPostsReducer } from "./HotPostsReducer";
import { pageNameReducer } from "./PageNameReducer";
import { registerReducer } from "./registerReducer";
import { replyReducer } from "./replyReducer";
import { appRefReducer } from "./AppRefReducer";
import { navRefReducer } from "./NavRefReducer";
import { userPostsReducer } from "./UserPosts";

export const mainReducer = combineReducers({
  location: locationReducer,
  posts: postsReducer,
  hotPosts: hotPostsReducer,
  pageName: pageNameReducer,
  userInfo: registerReducer,
  replyContent: replyReducer,
  app: appRefReducer,
  navigation: navRefReducer,
  userPosts: userPostsReducer
});
