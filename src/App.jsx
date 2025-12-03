import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import CartPage from './pages/CartPage'
import CreateProduct from './pages/CreateProduct'
import EditProduct from './pages/EditProduct'
import NotFound from './pages/NotFound'
import Header from './components/Header'

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="max-w-6xl mx-auto px-4 pb-16 pt-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produto/:id" element={<ProductDetails />} />
          <Route path="/carrinho" element={<CartPage />} />
          <Route path="/cadastro" element={<CreateProduct />} />
          <Route path="/editar/:id" element={<EditProduct />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
