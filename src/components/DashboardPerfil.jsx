"use client"

import { useEffect, useState } from "react";
import { UserCircle } from "lucide-react";

export default function DashboardPerfil({ user: initialUser }) {
  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Mi Perfil</h2>
      <div className="bg-[#1A1A1A] border border-[var(--principal)] rounded-lg p-6 space-y-6">
        <div className="flex justify-center">
          <UserCircle className="h-24 w-24 text-[var(--principal)]" />
        </div>
        <div className="text-center space-y-1">
          <h3 className="text-xl font-bold">{user.name}</h3>
          <p className="text-gray-400">{user.email}</p>
        </div>
        <hr className="border-[var(--principal)]" />
        <section className="text-center">
          <h4 className="font-semibold mb-10 text-2xl">Información Personal</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
            <div>
              <p className="text-lg text-[var(--principal)]">Nombre</p>
              <p className="text-lg">{user.name}</p>
            </div>
            <div>
              <p className="text-lg text-[var(--principal)]">Correo Electrónico</p>
              <p className="text-lg">{user.email}</p>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
