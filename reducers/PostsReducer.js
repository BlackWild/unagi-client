import actions from './Actions'

export const postsReducer = (state = [], action) => {
    switch (action.type){
        case actions.ADD_POSTS:
            return [
                ...action.newPosts,
                ...state
            ];
            break;
        default:
            return state;
    }
};