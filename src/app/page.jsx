"use client";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useAppContext } from "./AppContext";

export default function Home() {
  const { user } = useAppContext();
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from("todo_list").select("*");
      setTodoList(data);
      console.log(data);
    };
    getData();
  }, []);

  const addTodo = async () => {
    try {
      const { data, error } = await supabase
        .from("todo_list")
        .upsert({
          user_id: user.id,
          name: todo,
          created_at: new Date().toISOString(),
        })
        .select();

      if (error) throw error;

      console.log("Todo aggiunto/aggiornato:", data);
      setTodoList((prev) => [...prev, data]);
      return data;
    } catch (err) {
      console.error("Errore completo:", err);
      return null;
    }
  };
  return (
    <div>
      <h1 className="text-4xl font-bold text-center ">Todo List</h1>
      <div className="flex gap-5 justify-center py-5 ">
        <input
          className="border w-1/3 px-3 py-1 rounded-xl"
          type="text"
          placeholder="Aggiungi un nuovo todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 px-3 py-1 rounded-2xl hover:bg-blue-600 cursor-pointer"
        >
          Aggiungi
        </button>
      </div>
      <ul className="py-5 list-disc">
        {todoList && todoList.map((todo) => <li key={todo.id}>{todo.name}</li>)}
      </ul>
    </div>
  );
}
