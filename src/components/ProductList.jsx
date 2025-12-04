import ProductCard from './ProductCard'
import Loader from './Loader'
import MensagemErro from './MensagemErro'

function ProductList({ products, loading, error }) {
  if (loading) return <Loader />
  if (error) return <MensagemErro mensagem={error} />
  if (!products?.length) {
    return <p className="text-center text-slate-600">Nenhum produto encontrado.</p>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductList
