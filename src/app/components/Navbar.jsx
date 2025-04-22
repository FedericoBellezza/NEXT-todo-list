"use client";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useAppContext } from "../AppContext";
import { useEffect } from "react";

export default function Navbar() {
  const { user, login } = useAppContext();

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session === null) return;
      console.log(data.session.user);
      login(data.session.user);
    };
    getSession();
  }, []);

  return (
    <div className="bg-blue-800 p-5 flex justify-between">
      <h2>Navbar</h2>
      <span className="font-bold italic underline">
        {user !== null && user.email}
      </span>

      <ul className="flex gap-4">
        <Link href={"/"}>Home</Link>
        {user == null ? (
          <Link href={"/login"}>Login</Link>
        ) : (
          <Link href={"/logout"}>Logout</Link>
        )}
      </ul>
    </div>
  );
}
