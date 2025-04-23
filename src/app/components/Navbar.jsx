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

  return (
    <div className="bg-blue-800 p-5 flex justify-between items-center">
      <Link href={"/"} className="text-3xl italic font-black">
        TaskManager
      </Link>

      <div className="flex items-center gap-4">
        {user == null ? (
          <Link href={"/login"}>Login</Link>
        ) : (
          <div className="flex items-center gap-3">
            <span className="font-bold italic text-xs underline ml-5">
              {user !== null && user.email}
            </span>
            <img
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="w-10 h-10 rounded-full cursor-pointer"
              src={
                user !== null &&
                "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
              }
              alt={user !== null && user.email}
            />
            <div>
              {isUserMenuOpen && (
                <div className="absolute top-18 right-5 bg-white text-gray-800 rounded-md shadow-lg">
                  <div className="py-2 flex flex-col">
                    <Link
                      href={"/logout"}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      Logout
                    </Link>
                    <Link
                      href={"/settings"}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      Impostazioni
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
