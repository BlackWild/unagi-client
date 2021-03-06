import actions from "./Actions";

export const postsReducer = (state = [], action) => {
  switch (action.type) {
    case actions.ADD_POSTS:
      return [...state, ...action.newPosts];
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
    case actions.CLONE_WITH_POSTS:
      return action.newPosts;
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
    case actions.ADD_POST_TO_TOP:
      return [action.post, ...state];
      break;
    case actions.SET_IMAGE:
      // console.log(action.uri, "postreducer");
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
