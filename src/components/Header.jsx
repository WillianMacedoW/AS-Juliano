import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const navClasses = ({ isActive }) =>
  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
    isActive ? 'bg-indigo-600 text-white' : 'text-slate-200 hover:bg-indigo-500 hover:text-white'
  }`

function Header() {
  const { items } = useCart()
  const totalItems = items.reduce((sum, item) => sum + item.quantidade, 0)

  return (
    <header className="fixed top-0 left-0 right-0 bg-indigo-700 shadow-lg z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-white font-semibold text-lg tracking-tight">
          Mini E-commerce
        </Link>
        <nav className="flex items-center gap-2">
          <NavLink to="/" className={navClasses} end>
            Home
          </NavLink>
          <NavLink to="/cadastro" className={navClasses}>
            Cadastro de Produto
          </NavLink>
          <NavLink to="/carrinho" className={navClasses}>
            Carrinho
            {totalItems > 0 && (
              <span className="ml-2 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-white px-2 text-xs font-semibold text-indigo-700">
                {totalItems}
              </span>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Header
