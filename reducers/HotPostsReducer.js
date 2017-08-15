import actions from "./Actions";

export const hotPostsReducer = (state = [], action) => {
  switch (action.type) {
    case actions.ADD_HOT_POSTS:
      return [...state, ...action.newPosts];
      break;
    case actions.CLONE_WITH_HOTPOSTS:
      return action.newPosts;
      break;
    case actions.LIKE:
      return state.map(function(post) {
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
    case actions.UNLIKE:
      return state.map(function(post) {
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
    case actions.SET_IMAGE:
      return state.map(function(post) {
        if (post.username === action.username) {
          return {
            ...post,
            imageUri: action.uri
          };
        } else {
          return post;
        }
      });
      break;
    default:
      return state;
  }
};
