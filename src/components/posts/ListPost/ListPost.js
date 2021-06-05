import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "./ListPost.scss";

const ListPost = (props) => {
  const { post } = props;

  return (
    <div className="row">
      <div className="br-posts ">
        <div className="d-flex w-100 justify-content-between">
          <Link className="br-posts__post-title" to={`/posts/${post.id}`}>
            {post.title}
          </Link>
        </div>
        <div className="br-posts__post-content">
          <p>{post.content}</p>
        </div>
        <div className="br-posts__post-info">
          <i className="fa fa-calendar"></i>
          {moment(new Date(post?.createdAt)).format("MMM Do YY")}
        </div>
      </div>
    </div>
  );
};

export default ListPost;
