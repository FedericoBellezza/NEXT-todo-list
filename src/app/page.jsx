"use client";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useAppContext } from "./AppContext";
import Link from "next/link";

export default function Home() {
  // data from context
  const { user } = useAppContext();

  // states
  const [todo, setTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editing, setEditing] = useState(null);

  // functions
  const getData = async () => {
    const { data } = await supabase
      .from("todo_list")
      .select("*")
      .order("id", { ascending: false });
    setTodoList(data);
    console.log(data);
  };
  const addTodo = async () => {
    todo.trim() === "" && alert("Inserisci un todo");
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
      getData();
      setTodo("");

      return data;
    } catch (err) {
      console.error("Errore completo:", err);
      return null;
    }
  };
  const deleteTodo = async (id) => {
    try {
      const { data, error } = await supabase
        .from("todo_list")
        .delete()
        .eq("id", id);
      if (error) throw error;
      getData();
    } catch (err) {
      console.error("Errore completo:", err);
    }
  };
  const updateTodo = async (id) => {
    try {
      const { data, error } = await supabase
        .from("todo_list")
        .update({ name: editingTodo })
        .eq("id", id);
      if (error) throw error;
      getData();
    } catch (err) {
      console.error("Errore completo:", err);
    }
    setEditing(null);
  };

  // effects
  useEffect(() => {
    getData();
  }, []);

  if (!user)
    return (
      <div className="flex flex-col justify-center items-center max-w-screen px-10 text-center">
        <h1 className="text-xl lg:text-3xl font-bold pt-20">
          Per vedere questa pagina devi essere loggato...
        </h1>
        <Link
          className=" italic mt-10 px-3 py-1 rounded-xl border border-blue-500 hover:bg-blue-500 hover:text-white transition"
          href="/login"
        >
          Vai al login
        </Link>
      </div>
    );
  return (
    <div className="max-w-screen overflow-hidden">
      <h1 className="lg:text-4xl text-2xl font-bold text-center py-10  ">
        Lista delle cose da fare:
      </h1>
      <div className="flex gap-5 justify-center py-5 ">
        <input
          className="border lg:w-1/3 px-3 py-1 rounded-xl"
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
      <div className="py-5 flex flex-col gap-2 xl:px-100 px-5">
        {todoList &&
          todoList.map((todo) => {
            return (
              <div key={todo.id} className="flex justify-between items-center">
                {editing === todo.id ? (
                  <div className="flex gap-2 items-center">
                    <input
                      onChange={(e) => {
                        setEditingTodo(e.target.value);
                      }}
                      className="bg-gray-500 border px-3 py-1 rounded-xl"
                      type="text"
                      value={editingTodo}
                    />
                    <button
                      className="border border-green-500 px-3 py-1 rounded-2xl cursor-pointer hover:bg-green-900"
                      onClick={() => updateTodo(todo.id)}
                    >
                      accetta
                    </button>
                    <button
                      className="border  border-red-500 px-3 py-1 rounded-2xl cursor-pointer hover:bg-red-900"
                      onClick={() => setEditing(null)}
                    >
                      annulla
                    </button>
                  </div>
                ) : (
                  <span>{todo.name}</span>
                )}

                {editing !== todo.id && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditing(todo.id);
                        setEditingTodo(todo.name);
                      }}
                      className="bg-green-600 px-2 lg:px-3 border border-green-500 py-1 rounded-2xl cursor-pointer hover:bg-green-700"
                    >
                      <span className="hidden lg:block">modifica</span>
                      <img
                        className="lg:hidden h-5 min-w-5"
                        src="https://img.icons8.com/?size=100&id=PJyD19u6Z96X&format=png&color=000000"
                        alt=""
                      />
                    </button>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="bg-red-500 px-2 lg:px-3 py-1 rounded-2xl border border-red-500 cursor-pointer hover:bg-red-600"
                    >
                      <span className="hidden lg:block">elimina</span>
                      <img
                        className="lg:hidden h-5 min-w-5"
                        src="https://img.icons8.com/?size=100&id=4MBC7gtaoPlW&format=png&color=000000"
                        alt=""
                      />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
