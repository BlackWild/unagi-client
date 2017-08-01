import actions from './Actions'

export const locationReducer = (state = {x: 0, y: 0}, action) => {
    switch (action.type){
        case actions.SET_LOCATION:
            return {
                x: action.location.x,
                y: action.location.y
            };
            break;
        default:
            return state;
    }
};