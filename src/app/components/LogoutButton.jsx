"use client";
import { useRouter } from "next/navigation";
import { useAppContext } from "../AppContext";
import { supabase } from "@/lib/supabase";

export default function LogoutButton({ text }) {
  const router = useRouter();
  const logout = async () => {
    await supabase.auth.signOut();
    login(null);
    router.push("/");
  };
  const { login } = useAppContext();
  return (
    <button
      onClick={logout}
      className="bg-red-500 px-3 py-1 rounded-2xl cursor-pointer hover:bg-red-600"
    >
      {text}
    </button>
  );
}
