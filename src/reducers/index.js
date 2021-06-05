import { combineReducers } from "redux";
import PostsReducer from "./postsReducer";
import PostReducer from "./postReducer";
import AuthReducer from "./authReducer";

const rootReducer = combineReducers({
  posts: PostsReducer,
  post: PostReducer,
  auth: AuthReducer,
});

export default rootReducer;
