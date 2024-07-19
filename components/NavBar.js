import Link from "next/link";



export default function NavBar() {
  return (
    <nav className="py-5 px-12 flex justify-between bg-pink-400">
      <Link href="/">
        <p className="text-3xl font-bold text-white">
          Dream Shoppe
        </p>
      </Link>
    </nav>
  );
}
