import actions from './Actions'

export const postsReducer = (state = [], action) => {

    switch (action.type) {
        case actions.ADD_POSTS:
            return [
                ...state,
                ...action.newPosts,
            ];
            break;
        case actions.LIKE:
            return state.map(function (post) {
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
            break;
        case actions.CLONE_WITH_POSTS:
            return (action.newPosts);
            break;

        case actions.UNLIKE:
            return state.map(function (post) {
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
            break;
        case actions.ADD_POST_TO_TOP:
            return [
                {
                    ...action.post,
                    _id: "testid",
                    location: { y: 51.4224484, x: 35.7293566 },
                    date: '2017-08-01T06:56:58.210Z',
                },
                ...state
            ];
            break;
        default:
            return state;
    }
};