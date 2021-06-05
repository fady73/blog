import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";

import Navbar from "./containers/navbar/navbar";
import AllPosts from "./containers/posts/AllPosts";
import NewPost from "./containers/posts/newPost";
import ShowPost from "./containers/posts/ShowPost/ShowPost";
import EditPost from "./containers/posts/editPost";
import Register from "./containers/users/register";
import Login from "./containers/users/login";
import RequireAuth from "./components/requireAuth";

import "./index.scss";

import {
  REDIRECT_IF_GUEST,
  REDIRECT_IF_AUTHENTICATED,
} from "./components/requireAuth";

class App extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <BrowserRouter>
        <div className="wrapper">
          <Navbar />
          <div className="container">
            <Switch>
              <RequireAuth
                path="/users/register"
                component={Register}
                redirectCheck={REDIRECT_IF_AUTHENTICATED}
                authProps={this.props}
              />
              <RequireAuth
                path="/users/login"
                component={Login}
                redirectCheck={REDIRECT_IF_AUTHENTICATED}
                authProps={this.props}
              />
              <RequireAuth
                path="/posts/create"
                component={NewPost}
                authProps={this.props}
                redirectCheck={REDIRECT_IF_GUEST}
              />
              <RequireAuth
                path="/posts/edit/:id"
                component={EditPost}
                authProps={this.props}
                redirectCheck={REDIRECT_IF_GUEST}
              />
              <Route
                path="/posts/:id"
                authProps={this.props}
                component={ShowPost}
              ></Route>
              <Route
                path="/posts"
                authProps={this.props}
                component={AllPosts}
              ></Route>
              <Route
                path="/"
                authProps={this.props}
                component={AllPosts}
              ></Route>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(App);
