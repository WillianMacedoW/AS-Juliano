import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import FormProduct from '../components/FormProduct'
import Loader from '../components/Loader'
import MensagemErro from '../components/MensagemErro'

const API_URL = 'http://localhost:3001/products'

function EditProduct() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [submitError, setSubmitError] = useState(null)

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

  const handleUpdate = async (updated) => {
    try {
      setSubmitError(null)
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      })
      if (!response.ok) throw new Error('Não foi possível salvar as alterações')
      navigate('/')
    } catch (err) {
      setSubmitError(err.message)
    }
  }

  if (loading) return <Loader />
  if (error) return <MensagemErro mensagem={error} />

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-900">Editar Produto</h1>
      {submitError && <MensagemErro mensagem={submitError} />}
      <FormProduct initialData={product} onSubmit={handleUpdate} submitLabel="Salvar alterações" />
    </section>
  )
}

export default EditProduct