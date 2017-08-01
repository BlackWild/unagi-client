import { combineReducers } from 'redux'

import {userIDReducer} from './UserIDReducer'

export const mainReducer = combineReducers({
    userID: userIDReducer
});
