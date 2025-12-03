import { useCart } from '../context/CartContext'

function CartItem({ item }) {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart()
  const atingiuLimite = item.quantidade >= item.estoque

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 border-b border-slate-200 pb-4">
      <div className="flex-1">
        <p className="text-lg font-semibold text-slate-800">{item.nome}</p>
        <p className="text-sm text-slate-500">Estoque máximo: {item.estoque}</p>
        <p className="text-indigo-700 font-bold mt-1">R$ {item.preco.toFixed(2)}</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => decreaseQuantity(item.id)}
          className="px-3 py-1 rounded-md bg-slate-200 text-slate-800 hover:bg-slate-300"
          aria-label="Diminuir"
        >
          -
        </button>
        <span className="w-12 text-center font-semibold">{item.quantidade}</span>
        <button
          onClick={() => increaseQuantity(item.id)}
          className={`px-3 py-1 rounded-md text-white ${
            atingiuLimite ? 'bg-slate-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
          disabled={atingiuLimite}
          aria-label="Aumentar"
        >
          +
        </button>
      </div>

      <div className="text-right">
        <p className="text-sm text-slate-500">Total</p>
        <p className="text-lg font-semibold text-slate-800">
          R$ {(item.preco * item.quantidade).toFixed(2)}
        </p>
        {atingiuLimite && <p className="text-xs text-red-600">Estoque máximo atingido</p>}
        <button
          onClick={() => removeFromCart(item.id)}
          className="mt-2 text-sm text-red-600 hover:underline"
        >
          Remover
        </button>
      </div>
    </div>
  )
}

export default CartItem
