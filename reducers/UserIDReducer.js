import actions from './Actions'

export const userIDReducer = (state = '', action) => {
    switch (action.type){
        case actions.SET_ID:
            return action.userID;
            break;
        default:
            return state;
    }
};