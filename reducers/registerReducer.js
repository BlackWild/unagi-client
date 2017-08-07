import actions from './Actions'
export const registerReducer = (state = {}, action) => {
    switch (action.type){
        case actions.SET_INFO:
            return {
                username: action.username,
                password: action.password,
                accessToken: action.accessToken,
                refreshToken: action.refreshToken,
            };
            break;
        case actions.SET_TOKEN:
            return {
                accessToken: action.accessToken,
                refreshToken: action.refreshToken,
            };
            break;
        default:
            return state;

    }
}