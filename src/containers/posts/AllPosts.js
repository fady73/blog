import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPosts, deletePost } from "../../actions/postAction";
import ListPost from "../../components/posts/ListPost/ListPost";
import Loader from "../../components/loader";
import { List } from "antd";

class AllPosts extends Component {
  componentDidMount() {
    const { fetchPosts } = this.props;

    fetchPosts();
  }

  render() {
    const { posts, isFetched } = this.props;

    if (!isFetched) return <Loader />;

    if (!posts.length && isFetched)
      return (
        <div className="post-index d-flex justify-content-center">
          There are no questions yet.
        </div>
      );

    return (
      <div className="post-index">
        <div className="posts">
          <List
            bordered
            dataSource={posts}
            renderItem={(item, index) => <ListPost key={index} post={item} />}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts.list,
    isFetched: state.posts.isFetched,
  };
}

export default connect(mapStateToProps, { fetchPosts, deletePost })(AllPosts);
