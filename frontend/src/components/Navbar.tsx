import Link from "next/link";
import logo from "../../public/logo.svg";
import Image from "next/image";

export default function Navbar() {
  return (
    <>
      <nav className="flex max-w-7xl mx-auto justify-between p-4">
        <div className="text-white text-2xl font-bold">
          <Image src={logo} alt="logo" width={100} height={100} className="w-10 h-10" />
        </div>
        <div className="container mx-auto flex px-4 gap-4 items-center justify-end">
          <Link href="/login"> Login</Link>
          <Link href="/"> Artigos</Link>
        </div>
      </nav>
    </>
  );
}
