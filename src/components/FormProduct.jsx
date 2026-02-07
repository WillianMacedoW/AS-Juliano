import { useEffect, useRef, useState } from 'react'
import MensagemErro from './MensagemErro'

const campos = ['nome', 'descricao', 'preco', 'imagem', 'estoque']

function FormProduct({ initialData = {}, onSubmit, submitLabel }) {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    preco: '',
    imagem: '',
    estoque: '',
  })

  const [errors, setErrors] = useState({})
  const refs = useRef({})

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData({
        nome: initialData.nome ?? '',
        descricao: initialData.descricao ?? '',
        preco: initialData.preco ?? '',
        imagem: initialData.imagem ?? '',
        estoque: initialData.estoque ?? '',
      })
    }
  }, [initialData])

  const validate = () => {
    const newErrors = {}

    if (!formData.nome) newErrors.nome = 'Nome é obrigatório'
    if (!formData.descricao) newErrors.descricao = 'Descrição é obrigatória'

    const precoNumber = Number(formData.preco)
    if (formData.preco === '' || Number.isNaN(precoNumber) || precoNumber < 0) {
      newErrors.preco = 'Preço deve ser maior ou igual a 0'
    }

    if (!formData.imagem) newErrors.imagem = 'URL da imagem é obrigatória'

    const estoqueNumber = Number(formData.estoque)
    if (formData.estoque === '' || Number.isNaN(estoqueNumber) || estoqueNumber < 0) {
      newErrors.estoque = 'Estoque deve ser maior ou igual a 0'
    }

    setErrors(newErrors)

    // Focar no primeiro campo inválido
    if (Object.keys(newErrors).length > 0) {
      const primeiroCampo = campos.find((campo) => newErrors[campo])
      if (primeiroCampo && refs.current[primeiroCampo]) {
        refs.current[primeiroCampo].focus()
      }
      return false
    }

    return true
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    const isNumericField = name === 'preco' || name === 'estoque'

    setFormData((prev) => ({
      ...prev,
      [name]: isNumericField
        ? value === '' ? '' : Number(value)
        : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    onSubmit(formData)
  }

  const inputClasses = (hasError) =>
    `w-full rounded-md border px-3 py-2 text-slate-800 placeholder:text-slate-400 
     focus:outline-none focus:ring-2 focus:ring-indigo-500 
     ${hasError ? 'border-red-400 ring-red-200' : 'border-slate-300'}`

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-5">
      
      {/* Nome */}
      <div>
        <label className="block text-sm font-medium text-slate-700">Nome</label>
        <input
          ref={(el) => (refs.current.nome = el)}
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          className={inputClasses(errors.nome)}
          placeholder="Nome do produto"
        />
        {errors.nome && <MensagemErro mensagem={errors.nome} />}
      </div>

      {/* Descrição */}
      <div>
        <label className="block text-sm font-medium text-slate-700">Descrição</label>
        <textarea
          ref={(el) => (refs.current.descricao = el)}
          name="descricao"
          value={formData.descricao}
          onChange={handleChange}
          className={`${inputClasses(errors.descricao)} min-h-[100px]`}
          placeholder="Detalhes do produto"
        />
        {errors.descricao && <MensagemErro mensagem={errors.descricao} />}
      </div>

      {/* Preço + Estoque */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Preço</label>
          <input
            ref={(el) => (refs.current.preco = el)}
            type="number"
            name="preco"
            min="0"
            step="0.01"   // 👈 permite decimais (407.23)
            value={formData.preco}
            onChange={handleChange}
            className={inputClasses(errors.preco)}
            placeholder="0.00"
          />
          {errors.preco && <MensagemErro mensagem={errors.preco} />}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Estoque</label>
          <input
            ref={(el) => (refs.current.estoque = el)}
            type="number"
            name="estoque"
            min="0"
            value={formData.estoque}
            onChange={handleChange}
            className={inputClasses(errors.estoque)}
            placeholder="0"
          />
          {errors.estoque && <MensagemErro mensagem={errors.estoque} />}
        </div>
      </div>

      {/* URL da Imagem */}
      <div>
        <label className="block text-sm font-medium text-slate-700">URL da imagem</label>
        <input
          ref={(el) => (refs.current.imagem = el)}
          type="url"
          name="imagem"
          value={formData.imagem}
          onChange={handleChange}
          className={inputClasses(errors.imagem)}
          placeholder="https://exemplo.com/imagem.jpg"
        />
        {errors.imagem && <MensagemErro mensagem={errors.imagem} />}
      </div>

      {/* Botão */}
      <button
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        {submitLabel}
      </button>

    </form>
  )
}

export default FormProduct
