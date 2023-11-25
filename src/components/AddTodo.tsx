"use client"

import React from "react";
import {
  Box,
  Input,
  Button,
  Textarea,
  Stack,
  Select,
  useToast,
} from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";
import { addTodo } from "../../api/todo";
const AddTodo = () => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [status, setStatus] = React.useState("pending");
  const [isLoading, setIsLoading] = React.useState(false);

  const toast = useToast();

  const { isLoggedIn, user } = useAuth();

  const handleTodoCreate = async () => {
    if (!isLoggedIn) {
      toast({
        title: "You must be logged in to create a todo",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
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

    toast({ title: "Todo created successfully", status: "success" });
  };

  return (
    <div className="w-fit mx-auto px-6 mt-5 p-4 bg-blue-200 rounded-lg shadow-md">
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
