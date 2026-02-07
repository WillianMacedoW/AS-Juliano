import ProductList from '../components/ProductList'
import { useFetch } from '../hooks/useFetch'

const API_URL = "https://as-juliano-back.onrender.com/products";

function Home() {
  const { data, loading, error, refetch } = useFetch(API_URL)

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h1 className="text-2xl font-bold text-slate-900">Produtos</h1>
        <button
          onClick={refetch}
          className="rounded-md bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-300"
        >
          Atualizar lista
        </button>
      </div>
      <ProductList products={data} loading={loading} error={error} />
    </section>
  )
}

export default Home