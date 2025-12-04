import CartItem from '../components/CartItem'
import MensagemErro from '../components/MensagemErro'
import { useCart } from '../context/CartContext'

function CartPage() {
  const { items, total } = useCart()

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-900">Carrinho</h1>
      {items.length === 0 ? (
        <p className="text-slate-600">Seu carrinho está vazio.</p>
      ) : (
        <div className="bg-white shadow rounded-lg p-6 space-y-4">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <div className="flex justify-between items-center pt-4 border-t border-slate-200">
            <span className="text-lg font-semibold text-slate-800">Total geral</span>
            <span className="text-2xl font-bold text-indigo-700">R$ {total.toFixed(2)}</span>
          </div>
          <MensagemErro mensagem="As quantidades respeitam o estoque máximo de cada item." />
        </div>
      )}
    </section>
  )
}

export default CartPage
