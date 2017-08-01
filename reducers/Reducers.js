import { combineReducers } from 'redux'

import {userIDReducer} from './UserIDReducer'
import {locationReducer} from './locationReducer'

export const mainReducer = combineReducers({
    userID: userIDReducer,
    location: locationReducer
});
