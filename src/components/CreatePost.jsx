import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

const CreatePost = () => {
  const queryClient = useQueryClient();

  const [post, setPost] = useState({ title: "", body: "" });

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const addPost = async () => {
    const result = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      post,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return result.data;
  };

  const { mutate } = useMutation({
    mutationFn: addPost,
    onSuccess: async (data) => {
      console.log(`New post with title of ${data.title} added`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate();
    setTimeout(() => {
      const x = queryClient.getQueryData(["posts"]);
      console.log(x);
    }, 2000);
  };

  return (
    <div className="w-50 my-5 bg-light mx-auto p-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Post Title</Form.Label>
          <Form.Control type="text" onChange={handleChange} name="title" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Post Body</Form.Label>
          <Form.Control as="textarea" onChange={handleChange} name="body" />
        </Form.Group>

        <Button variant="success" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default CreatePost;