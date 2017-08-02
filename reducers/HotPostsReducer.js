import actions from './Actions'

export const hotPostsReducer = (state = [], action) => {
    switch (action.type){
        case actions.ADD_HOT_POSTS:
            return [
                ...action.newPosts,
                ...state
            ];
            break;
        case actions.LIKE:
            return state.map(function(post){
                if (post.postID === action.postID){
                    return {
                        ...post,
                        isLiked: true
                    };
                } else{
                    return post;
                }
            });
            break;
        case actions.UNLIKE:
            return state.map(function(post){
                if (post.postID === action.postID){
                    return {
                        ...post,
                        isLiked: false
                    };
                } else{
                    return post;
                }
            });
            break;
        default:
            return state;
    }
};