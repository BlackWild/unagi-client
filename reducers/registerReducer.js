import actions from './Actions'
export const registerReducer = (state = {}, action) => {
    switch (action.type){
        case actions.SET_INFO:
            return {
                userName: action.userName,
                passWord: action.passWord,
                accessToken: action.accessToken,
                refreshToken: action.refreshToken,
            };
            break;
        default:
            return state;

    }
}