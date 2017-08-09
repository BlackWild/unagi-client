import actions from './Actions'
export const appRefReducer = (state = {}, action) => {
    switch (action.type){
        case actions.SET_APP_REF:
          return action.app;
          break;
        default:
            return state;
    }
}