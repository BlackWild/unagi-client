import actions from './Actions'
export const replyReducer = (state = { parentPost: {}, replyPosts: [] }, action) => {
    switch (action.type) {
        case actions.SET_PARENT_POST:
            return {
                parentPost: action.parentPost,
                replyPosts: [],
            };
            break;
        case actions.CLONE_WITH_REPLY_POSTS:
            return {
                ...state,
                replyPosts: action.replyPosts,
            };
            break;
        case actions.ADD_REPLY_POSTS:
            return {
                ...state,
                replyPosts: [...state.replyPosts, ...action.newPosts],
            };
            break;
        case actions.ADD_REPLY_TO_TOP:

            return {
                ...state,
                replyPosts: [action.newPost, ...state.replyPosts],
            };
            break;
        case actions.LIKE:
            return {
                parentPost: (() => {
                    if (state.parentPost._id === action.postID) {
                        return {
                            ...state.parentPost,
                            isLiked: true,
                            likes: state.parentPost.likes + 1
                        }
                    } else {
                        return state.parentPost
                    }
                })(),
                replyPosts: (() => {
                    return state.replyPosts.map((post) => {
                        if (post._id === action.postID) {
                            return {
                                ...post,
                                isLiked: true,
                                likes: post.likes + 1
                            };
                        } else {
                            return post;
                        }
                    });
                })()
            }
            break;
        case actions.UNLIKE:
            return {
                parentPost: (() => {
                    if (state.parentPost._id === action.postID) {
                        return {
                            ...state.parentPost,
                            isLiked: false,
                            likes: state.parentPost.likes - 1
                        }
                    } else {
                        return state.parentPost
                    }
                })(),
                replyPosts: (() => {
                    return state.replyPosts.map((post) => {
                        if (post._id === action.postID) {
                            return {
                                ...post,
                                isLiked: false,
                                likes: post.likes - 1
                            };
                        } else {
                            return post;
                        }
                    });
                })()
            }
            break;
        default:
            return state;
    }
}