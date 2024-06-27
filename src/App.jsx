
import "./App.css";
import DisplayPosts from "./components/DisplayPosts";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import CreatePost from "./components/CreatePost";
import EditPost from "./components/EditPost";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<DisplayPosts />} />
        <Route path="/add-post" element={<CreatePost />} />
        <Route path="/edit-post/:id" element={<EditPost />} />
      </Routes>
    </>
  );
}

export default App;