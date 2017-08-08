import { combineReducers } from 'redux'

import {userIDReducer} from './UserIDReducer'
import {locationReducer} from './locationReducer'
import {postsReducer} from './PostsReducer'
import {hotPostsReducer} from './HotPostsReducer'
import {pageNameReducer} from './PageNameReducer'
import {registerReducer} from './registerReducer'
import {replyReducer} from './replyReducer'

export const mainReducer = combineReducers({
    userID: userIDReducer,
    location: locationReducer,
    posts: postsReducer,
    hotPosts: hotPostsReducer,
    pageName: pageNameReducer,
    userInfo: registerReducer,
    replyContent: replyReducer,
});
