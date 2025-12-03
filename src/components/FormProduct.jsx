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
        // mantém como string para funcionar bem nos inputs
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
      newErrors.estoque = 'Estoque de
