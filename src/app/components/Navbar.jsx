"use client";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useAppContext } from "../AppContext";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { user, login } = useAppContext();

  // states
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session === null) return;
      console.log(data.session.user);
      login(data.session.user);
    };
    getSession();
  }, []);

  isUserMenuOpen &&
    setTimeout(() => {
      setIsUserMenuOpen(false);
    }, 2000);

  return (
    <div className="bg-linear-to-tr from-purple-700 to-blue-900 p-5 flex justify-between items-center text-white">
      <Link href={"/"} className="text-3xl italic font-black">
        TaskManager
      </Link>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="font-bold italic text-xs underline ml-5 hidden lg:block">
            {user !== null && user.email}
          </span>
          <img
            onClick={() => setIsUserMenuOpen(true)}
            className="w-10 h-10 rounded-full cursor-pointer"
            src={
              user == null
                ? "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s"
            }
            alt="user placeholder"
          />
          <div>
            {isUserMenuOpen && (
              <div className="absolute top-18 right-5 bg-white text-gray-800 rounded-md shadow-lg">
                <div className="py-2 flex flex-col">
                  <Link
                    href={user ? "/logout" : "/login"}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {user ? "Logout" : "Login"}
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
