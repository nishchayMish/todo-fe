"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import apiClient from "@/lib/apiClient";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export default function Page() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");

  // edit state
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  // get todos
  const getTodos = async () => {
    const res = await apiClient.get("/todos");
    setTodos(res.data);
  };

  useEffect(() => {
    getTodos();
  }, []);

  // add todo
  const addTodo = async () => {
    if (!title) return;

    await apiClient.post("/todos", { title });
    setTitle("");
    getTodos();
  };

  // delete
  const deleteTodo = async (id: number) => {
    await apiClient.delete(`/todos/${id}`);
    getTodos();
  };

  // update title
  const updateTodo = async (id: number, title: string) => {
    await apiClient.put(`/todos/${id}`, { title });
    getTodos();
  };

  // toggle
  const toggleTodo = async (id: number, completed: boolean) => {
    await apiClient.patch(`/todos/${id}`, { completed });
    getTodos();
  };

  // handle edit submit
  const updateTodoHandler = async (id: number) => {
    if (!editText) return;

    await updateTodo(id, editText);
    setEditingId(null);
    setEditText("");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-10">
      <h1 className="text-4xl font-bold mb-6">Todo App</h1>

      {/* input */}
      <div className="flex gap-2 mb-6">
        <input
          className="px-4 py-2 rounded bg-gray-800 border border-gray-600"
          placeholder="Enter todo..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={addTodo}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      {/* list */}
      <div className="w-full max-w-md">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex justify-between items-center bg-gray-800 p-3 mb-2 rounded"
          >
            {editingId === todo.id ? (
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={() => updateTodoHandler(todo.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") updateTodoHandler(todo.id);
                }}
                className="bg-gray-700 px-2 py-1 rounded w-full mr-2"
                autoFocus
              />
            ) : (
              <span
                onClick={() => toggleTodo(todo.id, !todo.completed)}
                className={`cursor-pointer flex-1 ${todo.completed
                  ? "line-through text-gray-400"
                  : ""
                  }`}
              >
                {todo.title}
              </span>
            )}

            <div className="flex gap-2 ml-2">
              <button
                onClick={() => {
                  setEditingId(todo.id);
                  setEditText(todo.title);
                }}
                className="text-yellow-400 hover:text-yellow-500"
              >
                Edit
              </button>

              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}