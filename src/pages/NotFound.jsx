import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="text-center space-y-4">
      <h1 className="text-3xl font-bold text-slate-900">Página não encontrada</h1>
      <p className="text-slate-600">Ops! O conteúdo que você procura não está disponível.</p>
      <Link
        to="/"
        className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-white font-semibold hover:bg-indigo-700"
      >
        Voltar para a Home
      </Link>
    </section>
  )
}

export default NotFound
