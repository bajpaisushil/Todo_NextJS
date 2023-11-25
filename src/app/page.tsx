import React from 'react';
import AddTodo from "../components/AddTodo";
import Auth from "../components/auth";
import TodoList from "../components/TodoList";


export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <Auth />
        <AddTodo />
        <TodoList />
    </div>
  );
}
