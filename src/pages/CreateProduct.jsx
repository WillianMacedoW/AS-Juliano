import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormProduct from '../components/FormProduct'
import MensagemErro from '../components/MensagemErro'

const API_URL = 'http://localhost:3001/products'

function CreateProduct() {
  const navigate = useNavigate()
  const [error, setError] = useState(null)

  const handleCreate = async (product) => {
    try {
      setError(null)
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      })
      if (!response.ok) throw new Error('Não foi possível criar o produto')
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-900">Cadastro de Produto</h1>
      {error && <MensagemErro mensagem={error} />}
      <FormProduct onSubmit={handleCreate} submitLabel="Cadastrar" />
    </section>
  )
}

export default CreateProduct
