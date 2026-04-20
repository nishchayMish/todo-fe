"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import apiClient from "@/lib/apiClient";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export default function Page() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  const getTodos = async () => {
    const res = await apiClient.get("/todos");
    setTodos(res.data);
  };

  useEffect(() => {
    getTodos();
  }, []);

  const addTodo = async () => {
    if (!title.trim()) return;
    await apiClient.post("/todos", { title });
    setTitle("");
    getTodos();
  };

  const deleteTodo = async (id: number) => {
    await apiClient.delete(`/todos/${id}`);
    getTodos();
  };

  const updateTodo = async (id: number, title: string) => {
    await apiClient.put(`/todos/${id}`, { title });
    getTodos();
  };

  const toggleTodo = async (id: number, completed: boolean) => {
    await apiClient.patch(`/todos/${id}`, { completed });
    getTodos();
  };

  const updateTodoHandler = async (id: number) => {
    if (!editText.trim()) return;
    await updateTodo(id, editText);
    setEditingId(null);
    setEditText("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617] text-white flex justify-center p-6">

      <div className="w-full max-w-xl">
        {/* Header */}
        <h1 className="text-4xl font-semibold mb-8 tracking-tight">
          ✨ My Tasks
        </h1>

        {/* Input */}
        <div className="flex items-center gap-2 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-2 mb-6 shadow-lg">
          <input
            className="flex-1 bg-transparent px-3 py-2 outline-none text-sm placeholder:text-gray-400"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button
            onClick={addTodo}
            className="bg-indigo-600 hover:bg-indigo-700 transition p-2 rounded-xl"
          >
            <Plus size={18} />
          </button>
        </div>

        {/* List */}
        <div className="space-y-3">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="group flex items-center justify-between bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 hover:bg-white/10 transition-all"
            >
              {/* Left */}
              {editingId === todo.id ? (
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onBlur={() => updateTodoHandler(todo.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") updateTodoHandler(todo.id);
                  }}
                  className="bg-transparent border-b border-white/20 outline-none w-full text-sm"
                  autoFocus
                />
              ) : (
                <div
                  onClick={() => toggleTodo(todo.id, !todo.completed)}
                  className="flex items-center gap-3 flex-1 cursor-pointer"
                >
                  {/* Checkbox */}
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center ${todo.completed
                        ? "bg-green-500 border-green-500"
                        : "border-gray-500"
                      }`}
                  >
                    {todo.completed && (
                      <span className="text-xs">✓</span>
                    )}
                  </div>

                  {/* Text */}
                  <span
                    className={`text-sm ${todo.completed
                        ? "line-through text-gray-400"
                        : ""
                      }`}
                  >
                    {todo.title}
                  </span>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={() => {
                    setEditingId(todo.id);
                    setEditText(todo.title);
                  }}
                  className="p-1.5 rounded-lg hover:bg-white/10"
                >
                  <Pencil size={16} />
                </button>

                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="p-1.5 rounded-lg hover:bg-red-500/20 text-red-400"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {todos.length === 0 && (
          <div className="text-center text-gray-400 mt-10 text-sm">
            No tasks yet. Add one 🚀
          </div>
        )}
      </div>
    </div>
  );
}