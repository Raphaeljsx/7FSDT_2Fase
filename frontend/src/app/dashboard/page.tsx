import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-white mb-4">Dashboard</h1>
      <p className="text-zinc-400 mb-6">
        Você está autenticado. Rotas como esta exigem login (middleware).
      </p>
      <Link
        href="/"
        className="text-blue-400 hover:underline"
      >
        ← Voltar aos artigos
      </Link>
    </div>
  );
}
