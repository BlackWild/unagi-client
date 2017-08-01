import { combineReducers } from 'redux'

import {userIDReducer} from './UserIDReducer'
import {locationReducer} from './locationReducer'
import {postsReducer} from './PostsReducer'

export const mainReducer = combineReducers({
    userID: userIDReducer,
    location: locationReducer,
    posts: postsReducer
});
