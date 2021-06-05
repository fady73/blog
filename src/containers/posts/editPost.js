import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPost, deletePost, editPost } from "../../actions/postAction";
import { Alert } from "../../components/Alert/Alert";
import PostForm from "../../components/posts/PostForm/postForm";
import Loader from "../../components/loader";

class EditPost extends Component {
  componentWillMount() {
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
  }

  onDeletePost(id) {
    const { deletePost, history } = this.props;

    deletePost(id, () => {
      Alert("The post has been successfully deleted", "success");
      history.replace("/");
    });
  }

  onSubmit(values) {
    const { id } = this.props.post;
    const { history, editPost, post } = this.props;
    editPost(id, { ...post, ...values });
    Alert("The post has been successfully saved", "success");
    history.goBack();
  }

  renderButtons(post) {
    const { auth } = this.props;

    if (auth.uid === post.uid)
      return (
        <div className="top-buttons text-right">
          <Link to={`/posts/${post.id}`} className="btn btn-primary">
            <i className="fa fa-ban"></i> cancel
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => this.onDeletePost(post.id)}
          >
            <i className="fa fa-remove"></i> delete
          </button>
        </div>
      );
  }

  render() {
    const { post } = this.props;

    if (!post.isFetched) return <Loader />;

    return (
      <div className="post-form">
        {this.renderButtons(post)}
        <PostForm
          values={post}
          onSubmit={(values) => this.onSubmit(values)}
          formType="edit"
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    post: state.post,
    auth: state.auth,
    initialValues: state.post,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPost: (id) => dispatch(fetchPost(id)),
    deletePost: (id, callback) => dispatch(deletePost(id, callback)),
    editPost: (id, post) => dispatch(editPost(id, post)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);
