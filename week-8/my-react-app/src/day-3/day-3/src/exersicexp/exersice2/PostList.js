import React from "react";
import data from "./data.json";

const PostList = () => (
  <div>
    {data.map((post, index) => (
      <div key={index}>
        <h3>{post.title}</h3>
        <p>{post.content}</p>
      </div>
    ))}
  </div>
);

export default PostList;
