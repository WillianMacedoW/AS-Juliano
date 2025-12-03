function MensagemErro({ mensagem }) {
  if (!mensagem) return null
  return (
    <div className="bg-red-50 border border-red-200 text-red-700 rounded-md px-4 py-3">
      {mensagem}
    </div>
  )
}

export default MensagemErro
