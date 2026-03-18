"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo.svg";
import { getToken } from "@/lib/api/client";
import { logout } from "@/lib/services/auth.service";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const token = getToken();

  function handleLogout() {
    logout();
    router.push("/");
    router.refresh();
  }

  return (
    <nav className="flex max-w-7xl mx-auto justify-between p-4">
      <div className="text-white text-2xl font-bold">
        <Image src={logo} alt="logo" width={100} height={100} className="w-10 h-10" />
      </div>
      <div className="container mx-auto flex px-4 gap-4 items-center justify-end">
        <Link href="/" className="text-zinc-300 hover:text-white">
          Artigos
        </Link>
        {token ? (
          <>
            <Link href="/dashboard" className="text-zinc-300 hover:text-white">
              Dashboard
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="text-zinc-300 hover:text-white"
            >
              Sair
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-zinc-300 hover:text-white">
              Entrar
            </Link>
            <Link href="/register" className="text-zinc-300 hover:text-white">
              Cadastrar
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
