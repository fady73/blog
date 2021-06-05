import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchPost,
  addComment,
  deleteComment,
  editComment,
} from "../../../actions/postAction";
import PostView from "../../../components/posts/PostView/PostView";
import Comment from "../../../components/posts/Comments/Comment";
import Loader from "../../../components/loader";
import { Form, Input, Button } from "antd";
import "./ShowPost.scss";

class ShowPost extends Component {
  state = {
    edit: false,
    comment: null,
    commentId: null,
  };

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
      fetchPost,
    } = this.props;

    fetchPost(id);
  }
  formRef = React.createRef();

  setStateEdit(edit, postid, comment, commentId) {
    this.setState({ edit, commentId, comment });
    this.formRef.current.setFieldsValue({ comment: comment.message });
  }

  onSubmitComment(values) {
    const {
      auth,
      match: {
        params: { id },
      },
      addComment,
      editComment,
    } = this.props;

    const { edit, commentId, comment } = this.state;

    const commentObj = {
      user: auth.user,
      uid: auth.uid,
      message: values.comment,
    };

    if (!edit) {
      addComment(commentObj, id);
    } else {
      editComment(id, { ...comment, message: values.comment }, commentId);
      this.setState({ edit: false, comment: null, commentId: null });
      this.formRef.current.setFieldsValue({ comment: null });
    }
  }

  renderCommentForm() {
    const { auth } = this.props;

    if (auth.isAuthenticated) {
      return (
        <Form
          onFinish={(values) => this.onSubmitComment(values)}
          ref={this.formRef}
        >
          <Form.Item
            name="comment"
            label={"Comment"}
            rules={[
              {
                required: true,
                message: <p className="br-error"> this field is required </p>,
              },
            ]}
          >
            <Input.TextArea
              placeholder="leave your comments "
              autoComplete={"" + Math.random()}
            />
          </Form.Item>

          <div className="bottom-button">
            <Button htmlType="submit" className="btn btn-primary">
              save
            </Button>
          </div>
        </Form>
      );
    } else
      return (
        <div>
          <b>comments</b>
          <div>
            <p>please login to leave your comments </p>
          </div>
        </div>
      );
  }

  deleteComment(postid, comment, commentid) {
    const { deleteComment, fetchPost } = this.props;

    deleteComment(postid, comment, commentid, () => {
      fetchPost(postid);
    });
  }

  renderComments() {
    const { comments, id } = this.props.post;
    const { auth } = this.props;
    return (
      comments &&
      Object.keys(comments)
        .map((k) => [comments[k], k])
        .map((item, key) => {
          return (
            <Comment
              comment={item[0]}
              auth={auth}
              commentid={key}
              key={key}
              postid={id}
              editComment={() => this.setStateEdit(true, id, item[0], item[1])}
              deleteComment={() => this.deleteComment(id, item[0], item[1])}
            />
          );
        })
    );
  }

  renderButtons(post) {
    const { auth } = this.props;

    if (auth.uid === post.uid)
      return (
        <div className="form-buttons text-right">
          <Link to={`/posts/edit/${post.id}`} className="btn btn-primary">
            <i className="fa fa-edit"></i>edit post
          </Link>
        </div>
      );
  }

  render() {
    const { post } = this.props;

    if (!post.isFetched) return <Loader />;

    return (
      <div className="br-post-view">
        <div className="br-post-view__post-view-post">
          {this.renderButtons(post)}
          <PostView post={post} />
        </div>
        <div className="br-post-view__post-view-comment">
          {this.renderCommentForm()}

          <div className="br-post-view__comments">{this.renderComments()}</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    post: state.post,
    auth: state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPost: (id) => dispatch(fetchPost(id)),
    deleteComment: (postid, comment, commentid, history) =>
      dispatch(deleteComment(postid, comment, commentid, history)),
    addComment: (comment, postId) => dispatch(addComment(comment, postId)),
    editComment: (id, comment, commentId) =>
      dispatch(editComment(id, comment, commentId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowPost);
