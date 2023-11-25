"use client"

import React from "react";
import useAuth from "../../hooks/useAuth";
import { addTodo } from "../../api/todo";
import { showToast } from 'react-next-toast';


const AddTodo = () => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [status, setStatus] = React.useState("pending");
  const [isLoading, setIsLoading] = React.useState(false);


  const { isLoggedIn, user } = useAuth();

  const handleTodoCreate = async () => {
    console.log(isLoggedIn);
    
    if (!isLoggedIn) {
      showToast.error("You must be logged in to create a todo");
      return;
    }
    setIsLoading(true);
    const todo = {
      title,
      description,
      status,
      userId: user.uid,
    };
    await addTodo(todo);
    setIsLoading(false);

    setTitle("");
    setDescription("");
    setStatus("pending");

    showToast.success("Todo created successfully");
  };

  return (
    <div className="w-fit mx-auto px-6 mt-[1rem] p-4 bg-blue-200 rounded-lg shadow-md">
      <div className="flex flex-col">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-2 px-2 py-1 border border-gray-300 rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-2 px-2 py-1 border border-gray-300 rounded"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="mb-2 px-2 py-1 border border-gray-300 rounded"
        >
          <option value="pending" className="text-yellow-500 font-bold">
            Pending ⌛
          </option>
          <option value="completed" className="text-green-500 font-bold">
            Completed ✅
          </option>
        </select>
        <button
          onClick={handleTodoCreate}
          disabled={title.length < 1 || description.length < 1 || isLoading}
          className="bg-teal-400 py-1 px-2 rounded"
        >
          {isLoading ? "Adding..." : "Add Todo"}
        </button>
      </div>
    </div>
  );
};

export default AddTodo;
