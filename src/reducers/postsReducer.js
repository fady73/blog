import _ from "lodash";

import { FETCH_POSTS_SUCCESS, LOAD_MORE_SUCCESS } from "../actions/postAction";

const initialState = {
  list: [],
  isFetched: false,
};

export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS_SUCCESS:
      if (window.localStorage.isAuthenticated === undefined)
        localStorage.setItem("isAuthenticated", false);
      return Object.assign({}, state, {
        list: _.orderBy(action.payload, "createdAt", "desc"),
        isFetched: true,
      });

    case LOAD_MORE_SUCCESS:
      const posts = _.drop(_.orderBy(action.payload, "createdAt", "desc"));
      return Object.assign({}, state, {
        list: _.concat(state.list, posts),
        isFetched: true,
      });
    default:
      return state;
  }
}
