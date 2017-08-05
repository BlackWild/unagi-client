import actions from './Actions'

export const pageNameReducer = (state = null, action) => {
    
    switch (action.type){
        case actions.SET_PAGE_NAME:
            return action.pageName;
            break;
        default:
            return state;
    }
};