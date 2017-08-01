import actions from './Actions'

export const hotPostsReducer = (state = [], action) => {
    switch (action.type){
        case actions.ADD_HOT_POSTS:
            return [
                ...action.newPosts,
                ...state
            ];
            break;
        default:
            return state;
    }
};