"use client"


import React, { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { showToast } from 'react-next-toast';
import { deleteTodo, toggleTodoStatus } from "../../api/todo";

interface Todo {
  id: string;
  title: string;
  description: string;
  status: string;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);

  const { user } = useAuth();
  const refreshData = () => {
    if (!user) {
      setTodos([]);
      return;
    }

    const q = query(collection(db, "todo"), where("user", "==", user.uid));

    onSnapshot(q, (querySnapchot) => {
      let ar: Todo[] = [];
      querySnapchot.docs.forEach((doc) => {
        ar.push({ id: doc.id, ...doc.data() } as Todo);
      });
      setTodos(ar);
    });
  };

  useEffect(() => {
    refreshData();
  }, [user]);

  const handleTodoDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this todo?")) {
      deleteTodo(id);
      showToast.error("Todo deleted successfully");
    }
  };

  const handleToggle = async (id: string, status: string) => {
    const newStatus = status === "completed" ? "pending" : "completed";
    await toggleTodoStatus({ docId: id, status: newStatus });
    showToast.info(`Todo marked ${newStatus}`)
  };

  return (
    <div className="mt-5">   
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="p-3 border border-gray-300 rounded transition duration-200 hover:shadow-md"
          >
            <h3 className="text-xl font-bold mb-2">{todo.title}</h3>
            <p className="mb-4">{todo.description}</p>
            <button
              className="bg-red-500 text-white py-1 px-2 rounded mr-2 hover:bg-red-600"
              onClick={() => handleTodoDelete(todo.id)}
            >
              Delete
            </button>
            <button
              className={`py-1 px-2 rounded`}
              onClick={() => handleToggle(todo.id, todo.status)}
            >
              {todo.status === "pending" ? "Mark Completed" : "Mark Pending"}
            </button>
            <span
              className={`float-right text-black ${
                todo.status === "pending" ? "bg-yellow-500" : "bg-green-500"
              } px-2 py-1 rounded`}
            >
              {todo.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
