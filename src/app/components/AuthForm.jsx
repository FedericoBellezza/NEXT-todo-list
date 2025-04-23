"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAppContext } from "../AppContext";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export default function AuthForm() {
  const router = useRouter();
  const { login } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const pathname = usePathname();

  const handleLogin = async (type) => {
    if (type === "/login") {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          throw error;
        }
        console.log("Login effettuato con successo!", data.user);
        login(data.user);
        router.push("/");
      } catch (err) {
        console.error("Errore imprevisto:", err);
        setError(err.message);
      }
    } else if (type === "/register") {
      try {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) {
          throw error;
        }
        console.log("Registrazione effettuata con successo!", data.user);
        alert(`Avvenuta registrazione ${data.user.email}!`);
        router.push("/login");
      } catch (err) {
        console.log(err);

        setError(err.message);
        return;
      }
    }
  };

  return (
    <div className="py-10  w-7/10">
      {error && (
        <p className=" mb-5 py-5 text-center bg-red-900 border border-red-500 rounded-xl">
          Errore: {error}
        </p>
      )}
      <div className="flex flex-col lg:flex-row items-center justify-center  gap-4">
        <input
          className="bg-slate-700 px-3 py-1 rounded-2xl "
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          className="bg-slate-700 px-3 py-1 rounded-2xl"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="bg-blue-500 px-3 py-1 rounded-2xl cursor-pointer hover:bg-blue-600 transition"
          onClick={() => handleLogin(pathname)}
        >
          {pathname == "/login" ? "accedi" : "registrati"}
        </button>
      </div>
      <div className="mt-10 text-center">
        <span>
          {pathname == "/login" ? "Non hai un account?" : "Hai gia un account?"}{" "}
        </span>
        <Link
          className="underline"
          href={pathname == "/login" ? "/register" : "/login"}
        >
          {pathname == "/login" ? "Registrati" : "Accedi"}
        </Link>{" "}
      </div>
    </div>
  );
}
