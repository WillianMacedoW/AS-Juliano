import { useNavigate } from 'react-router-dom'
import FormProduct from '../components/FormProduct'

const API_URL = 'http://localhost:3001/products'

function CreateProduct() {
  const navigate = useNavigate()

  const handleCreate = async (product) => {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    })
    navigate('/')
  }

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-900">Cadastro de Produto</h1>
      <FormProduct onSubmit={handleCreate} submitLabel="Cadastrar" />
    </section>
  )
}

export default CreateProduct
