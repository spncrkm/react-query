import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

import { useState } from "react";

import { useMutation } from "@tanstack/react-query";

import { Link } from "react-router-dom";

const DisplayPosts = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const results = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    setPosts(results.data);
    return results.data;
  };

  const deletePost = async (id) => {
    const results = await axios.delete(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    setPosts(posts.filter((item) => item.id !== id));
    return results.data;
  };

  const { mutate } = useMutation({
    mutationFn: deletePost,
    onSuccess: async (data) => {
      console.log(data);
    },
  });

  const handleDelete = (id) => {
    mutate(id);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading)
    return (
      <Spinner style={{ position: "absolute", left: "50%", top: "50%" }} />
    );

  return (
    <div className="w-50 mx-auto my-5">
      <ListGroup>
        <h2>List of Posts</h2>
        {posts.map((post) => (
          <ListGroup.Item className="bg-light" key={post.id}>
            <div className="d-flex justify-content-between">
              <div>{post.title} </div>
              <div className="d-flex">
                <Button
                  variant="primary"
                  className="me-3"
                  as={Link}
                  to={`/edit-post/${post.id}`}
                  state={post}
                >
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(post.id)}>
                  Delete
                </Button>
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default DisplayPosts;