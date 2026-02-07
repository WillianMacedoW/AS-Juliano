import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null) // ✅ aqui

  function handleSubmit(event) {
    event.preventDefault()
    setError(null)

    if (email.trim() === "" || password.trim() === "") {
      setError("Por favor, preencha todos os campos.")
      return
    }

    localStorage.setItem("mini-ecom-user", JSON.stringify({ email }))
    navigate("/")
  }

  return (
    <section className="max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-slate-900">Entrar</h1>

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="rounded-xl bg-white p-6 shadow-sm border border-slate-100 space-y-3"
      >
        <div>
          <label className="block text-sm font-medium text-slate-700">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="seuemail@exemplo.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="********"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Entrar
        </button>
      </form>
    </section>
  )
}