import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  const estoqueZerado = product.estoque === 0

  return (
    <article className="bg-white rounded-lg shadow p-4 flex flex-col">
      <img
        src={product.imagem}
        alt={product.nome}
        className="w-full h-48 object-cover rounded-md mb-3"
      />
      <h3 className="text-lg font-semibold text-slate-800 line-clamp-2">{product.nome}</h3>
      <p className="text-indigo-700 font-bold text-xl mt-2">R$ {product.preco.toFixed(2)}</p>
      <p className={`text-sm mt-1 ${estoqueZerado ? 'text-red-600' : 'text-slate-600'}`}>
        {estoqueZerado ? 'Esgotado' : `Estoque: ${product.estoque}`}
      </p>
      <div className="mt-auto pt-3">
        <Link
          to={`/produto/${product.id}`}
          className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Ver Detalhes
        </Link>
      </div>
    </article>
  )
}

export default ProductCard
