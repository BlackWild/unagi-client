import actions from './Actions'
export const navRefReducer = (state = {}, action) => {
    switch (action.type){
        case actions.SET_NAV_REF:
          return action.nav;
          break;
        default:
            return state;
    }
}