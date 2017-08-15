import actions from "./Actions";
export const registerReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.SET_INFO:
      return {
        username: action.username,
        password: action.password,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken
      };
      break;
    case actions.SET_TOKEN:
      return {
        ...state,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken
      };
      break;
    case actions.SET_IMAGE:
      // console.log(action.uri, "registerReducer");
      return {
        ...state,
        imageUri: action.uri
      };
    default:
      return state;
  }
};
