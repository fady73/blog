import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/authAction";
import "./navbar.scss";

class Navbar extends Component {
  onLogout() {
    const { logout, history } = this.props;

    logout(() => {
      history.push("/");
    });
  }

  renderNavbar() {
    const { auth } = this.props;

    if (auth.isAuthenticated) {
      return (
        <Fragment>
          <li className="nav-item">
            <span className="nav-link">
              <i className="fa fa-user-circle"></i>
              {auth.user}
            </span>
          </li>
          <li className="nav-item">
            <button
              className="nav-link logout-btn"
              onClick={() => this.onLogout()}
            >
              <i className="fa fa-sign-out"></i>logout
            </button>
          </li>
        </Fragment>
      );
    } else
      return (
        <Fragment>
          <li className="nav-item">
            <NavLink
              exact={true}
              activeClassName="active"
              to="/users/login"
              className="nav-link"
            >
              <i className="fa fa-sign-in"></i>login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              exact={true}
              activeClassName="active"
              to="/users/register"
              className="nav-link"
            >
              <i className="fa fa-user-plus"></i>register
            </NavLink>
          </li>
        </Fragment>
      );
  }

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg ">
        <NavLink to="/posts" className="navbar-brand">
          blog
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                exact={true}
                activeClassName="active"
                to="/posts"
                className="nav-link"
              >
                <i className="fa fa-home"></i>all posts
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact={true}
                activeClassName="active"
                to="/posts/create"
                className="nav-link"
              >
                <i className="fa fa-plus-circle"></i>new post
              </NavLink>
            </li>
            {this.renderNavbar()}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default withRouter(connect(mapStateToProps, { logout })(Navbar));
