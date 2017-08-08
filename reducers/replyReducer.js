import actions from './Actions'
export const replyReducer = (state = {parentPost: {}, replayPosts: []}, action) => {
    switch (action.type){
        case actions.SET_PARENT_POST :
            return {
                parentPost: action.parentPost,
                replyPosts: [],
            };
            break;
        case actions.CLONE_WITH_REPLY_POSTS:
            return{
                ...state,
                replayPosts: action.replayPosts,
            };
            break;
        case actions.ADD_REPLY_POSTS:
            return{
                ...state,
                replyPosts: [...state.replayPosts,...action.newPosts],
            };
            break;
        case actions.ADD_REPLY_TO_TOP:
            return{
                ...state,
                replayPosts: [action.newPost,...state.replayPosts],
            };
            break;
        default:
            return state;
    }
}