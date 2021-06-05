import React, { Component } from "react";
import { connect } from "react-redux";
import { createPost } from "../../actions/postAction";
import { Alert } from "../../components/Alert/Alert";
import PostForm from "../../components/posts/PostForm/postForm";

class NewPost extends Component {
  onSubmit(values) {
    const post = {
      ...values,
      uid: this.props.auth.uid,
      user: this.props.auth.user,
    };
    if (this.props.auth.uid !== null) {
      this.props.createPost(post, () => {
        Alert("The post has been created ", "success");

        this.props.history.push("/");
      });
    }
  }

  render() {
    return (
      <div className="post-form">
        <PostForm
          onSubmit={(values) => this.onSubmit(values)}
          formType="create"
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  createPost: (post, callback) => {
    dispatch(createPost(post, callback));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
