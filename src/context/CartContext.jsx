import { createContext, useContext, useMemo, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  const addToCart = (product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        if (existing.quantidade >= existing.estoque) {
          return prev
        }
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item,
        )
      }
      if (product.estoque <= 0) return prev
      return [...prev, { ...product, quantidade: 1 }]
    })
  }

  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const increaseQuantity = (id) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          if (item.quantidade >= item.estoque) {
            return item
          }
          return { ...item, quantidade: item.quantidade + 1 }
        }
        return item
      }),
    )
  }

  const decreaseQuantity = (id) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const novaQuantidade = Math.max(1, item.quantidade - 1)
            return { ...item, quantidade: novaQuantidade }
          }
          return item
        })
        .filter((item) => item.quantidade > 0),
    )
  }

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.preco * item.quantidade, 0),
    [items],
  )

  const value = useMemo(
    () => ({ items, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, total }),
    [items, total],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart deve ser usado dentro de CartProvider')
  return ctx
}
