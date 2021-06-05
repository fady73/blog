import React from "react";
import moment from "moment";
import "./PostView.scss";

const PostView = (props) => {
  const { post } = props;

  return (
    <div className="br-post-detail text-center">
      <h2 className="br-post-title">{post.title}</h2>
      <div className="br-post-creation-time">
        <i className="fa fa-calendar"></i>
        {moment(new Date(post?.createdAt)).format("MMM Do YY")}
      </div>
      <div className="br-post-creator">
        <i className="fa fa-user-o"></i>
        {post.user}
      </div>
      <p className="br-post-content">{post.content}</p>
    </div>
  );
};

export default PostView;
