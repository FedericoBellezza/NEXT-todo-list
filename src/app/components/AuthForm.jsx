"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAppContext } from "../AppContext";
import { useParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export default function AuthForm() {
  const router = useRouter();
  const { login } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const pathname = usePathname();

  const handleLogin = async (type) => {
    if (!email || !password) {
      alert("Inserisci email e password");
      return;
    }
    if (type === "/login") {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          alert(`Errore: ${error.message}`);
          return;
        }

        console.log("Login effettuato con successo!", data.user);
        login(data.user);
        alert(`Benvenuto ${data.user.email}!`);
        router.push("/");
      } catch (err) {
        console.error("Errore imprevisto:", err);
        alert("Si è verificato un errore durante il login");
      }
    } else if (type === "/register") {
      try {
        const { data, error } = await supabase.auth.signup({ email, password });
        if (error) {
          throw error;
        }
        console.log("Registrazione effettuata con successo!", data.user);
        alert(`Avvenuta registrazione ${data.user.email}!`);
        router.push("/login");
      } catch (err) {
        console.error("Errore imprevisto:", err);
        alert("Siè verificato un errore durante la registrazione");
      }
    }
  };

  return (
    <div className="p-10">
      <div className="flex gap-4">
        <input
          className="bg-slate-700 px-3 py-1 rounded-2xl"
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
          className="bg-red-500 px-3 py-1 rounded-2xl cursor-pointer"
          onClick={() => handleLogin(pathname)}
        >
          {pathname == "/login" ? "Login" : "Registrati"}
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
