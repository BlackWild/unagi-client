import actions from "./Actions";
import _ from "underscore";

export const pageNameReducer = (
  state = { current: "", currentNotFromDrawer: "" },
  action
) => {
  let drawerPageList = ["AboutUsPage", "UserPage"];
  switch (action.type) {
    case actions.SET_PAGE_NAME:
      return {
        current: action.pageName,
        currentNotFromDrawer: (() => {
          if (_.indexOf(drawerPageList, action.pageName) === -1) {
            return action.pageName;
          } else {
            return state.currentNotFromDrawer;
          }
        })()
      };
      break;
    default:
      return state;
  }
};
