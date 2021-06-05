import React from "react";
import moment from "moment";
import "./Comments.scss";

const Comment = (props) => {
  const { comment, deleteComment, postid, commentid, auth, editComment } =
    props;
  return (
    <div className="br-comment">
      <div className="br-comment__comment-user">
        {comment.user}

        <span>{moment(comment?.createdAt).format("MMM Do YY")}</span>
      </div>
      <p className="br-comment__comment-body">{comment.message}</p>
      {comment.uid === auth.uid && (
        <div className="top-buttons text-right">
          <button
            className="btn btn-danger"
            onClick={() => deleteComment(postid, comment, commentid)}
          >
            <i className="fa fa-remove"></i>delete
          </button>
          <button className="btn btn-primary" onClick={() => editComment()}>
            edit
          </button>
        </div>
      )}
    </div>
  );
};

export default Comment;
