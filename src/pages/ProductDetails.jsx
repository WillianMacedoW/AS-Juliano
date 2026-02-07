import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import MensagemErro from '../components/MensagemErro'
import { useCart } from '../context/CartContext'

const API_URL = 'http://localhost:3001/products'

function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { items, addToCart } = useCart()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${API_URL}/${id}`)
        if (!response.ok) throw new Error('Produto não encontrado')
        const data = await response.json()
        setProduct(data)
        setError(null)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  if (loading) return <Loader />
  if (error) return <MensagemErro mensagem={error} />
  if (!product) return null

  const itemCarrinho = items.find((item) => item.id === product.id)
  const atingiuLimite =
    product.estoque === 0 || (itemCarrinho && itemCarrinho.quantidade >= itemCarrinho.estoque)

  const handleAdd = () => {
    if (!atingiuLimite) {
      addToCart({
        id: product.id,
        nome: product.nome,
        preco: product.preco,
        estoque: product.estoque,
      })
    }
  }

  const handleDelete = async () => {
    const confirmar = window.confirm('Deseja realmente excluir este produto?')
    if (!confirmar) return

    try {
      setLoading(true)
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Não foi possível excluir o produto')
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-white shadow rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <img
          src={product.imagem}
          alt={product.nome}
          className="w-full h-72 object-cover rounded-md"
        />
      </div>
      <div className="space-y-3">
        <h1 className="text-3xl font-bold text-slate-900">{product.nome}</h1>
        <p className="text-slate-700">{product.descricao}</p>
        <p className="text-2xl font-bold text-indigo-700">R$ {product.preco.toFixed(2)}</p>
        <p className={`text-sm ${product.estoque === 0 ? 'text-red-600' : 'text-slate-600'}`}>
          {product.estoque === 0 ? 'Esgotado' : `Estoque: ${product.estoque}`}
        </p>
        {atingiuLimite && <MensagemErro mensagem="Estoque máximo atingido" />}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleAdd}
            disabled={atingiuLimite}
            className={`inline-flex justify-center rounded-md px-4 py-2 font-semibold text-white ${
              atingiuLimite ? 'bg-slate-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            Adicionar ao Carrinho
          </button>
          <Link
            to={`/editar/${product.id}`}
            className="inline-flex justify-center rounded-md px-4 py-2 font-semibold text-indigo-700 border border-indigo-200 bg-indigo-50 hover:bg-indigo-100"
          >
            Editar produto
          </Link>
          <button
            onClick={handleDelete}
            className="inline-flex justify-center rounded-md px-4 py-2 font-semibold text-red-600 border border-red-200 bg-red-50 hover:bg-red-100"
          >
            Excluir produto
          </button>
        </div>
      </div>
    </section>
  )
}

export default ProductDetails