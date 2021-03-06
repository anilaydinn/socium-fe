import {
  SET_HOMEPAGE_FEEDS,
  SET_USER_FEEDS,
  SET_ADMIN_USER_FEEDS,
  REMOVE_ADMIN_USER_FEED,
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case SET_HOMEPAGE_FEEDS:
      return { ...state, feeds: action.payload };
    case SET_USER_FEEDS:
      return { ...state, userFeeds: action.payload };
    case SET_ADMIN_USER_FEEDS:
      return { ...state, adminUserFeeds: action.payload };
    default:
      return state;
  }
};
