import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

import { useLocation, useParams } from "react-router";

const EditPost = () => {
  const location = useLocation();
  const { id } = useParams();

  const queryClient = useQueryClient();

  const [post, setPost] = useState({ title: "", body: "" });

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setPost(location.state);
  }, []);

  const editPost = async () => {
    console.log(id);
    try {
      const result = await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        post,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (e) {
      console.log(e);
    }

    return result.data;
  };

  const { mutate } = useMutation({
    mutationFn: editPost,
    onSuccess: async (data) => {
      console.log(`New post with title of ${data.title} added`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate();
  };

  return (
    <div className="w-50 my-5 bg-light mx-auto p-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Post Title</Form.Label>
          <Form.Control
            type="text"
            onChange={handleChange}
            name="title"
            value={post.title}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Post Body</Form.Label>
          <Form.Control
            as="textarea"
            onChange={handleChange}
            name="body"
            value={post.body}
          />
        </Form.Group>

        <Button variant="success" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default EditPost;