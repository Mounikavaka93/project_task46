import { useEffect, useRef, useState } from 'react'
import { ShopContext } from './shop-context'
import { getTotals, promos, resolveCart } from '../data/catalog'

const KEYS = {
  cart: 'lunaria-cart',
  wishlist: 'lunaria-wishlist',
  user: 'lunaria-user',
  users: 'lunaria-users',
  order: 'lunaria-order',
}

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

const retiredDemoEmail = 'ava@lunaria.studio'

const demoUser = {
  name: 'Mounika Vaka',
  email: 'mounika.vaka@lunaria.studio',
  password: 'luna123',
}

export function ShopProvider({ children }) {
  const [cart, setCart] = useState(() => read(KEYS.cart, []))
  const [wishlist, setWishlist] = useState(() => read(KEYS.wishlist, []))
  const [user, setUser] = useState(() => {
    const current = read(KEYS.user, null)
    if (current && (current.email === retiredDemoEmail || current.email === demoUser.email)) {
      return { name: demoUser.name, email: demoUser.email }
    }
    return current
  })
  const [promo, setPromo] = useState(null)
  const [toast, setToast] = useState(null)
  const [lastOrder, setLastOrder] = useState(() => read(KEYS.order, null))
  const toastTimer = useRef(null)

  useEffect(() => {
    const users = read(KEYS.users, []).filter(
      (entry) => entry.email !== retiredDemoEmail && entry.email !== demoUser.email,
    )
    localStorage.setItem(KEYS.users, JSON.stringify([...users, demoUser]))
  }, [])

  useEffect(() => {
    localStorage.setItem(KEYS.cart, JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem(KEYS.wishlist, JSON.stringify(wishlist))
  }, [wishlist])

  useEffect(() => {
    if (user) localStorage.setItem(KEYS.user, JSON.stringify(user))
    else localStorage.removeItem(KEYS.user)
  }, [user])

  function showToast(message) {
    setToast(message)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 2600)
  }

  function addToCart(productId, size = 'classic', qty = 1) {
    const key = `${productId}:${size}`
    setCart((current) => {
      const existing = current.find((item) => item.key === key)
      if (existing) {
        return current.map((item) =>
          item.key === key ? { ...item, qty: Math.min(12, item.qty + qty) } : item,
        )
      }
      return [...current, { key, productId, size, qty }]
    })
    showToast('Added to cart')
  }

  function updateQty(key, qty) {
    setCart((current) => {
      if (qty < 1) return current.filter((item) => item.key !== key)
      return current.map((item) => (item.key === key ? { ...item, qty: Math.min(12, qty) } : item))
    })
  }

  function removeFromCart(key) {
    setCart((current) => current.filter((item) => item.key !== key))
    showToast('Removed from cart')
  }

  function toggleWishlist(productId) {
    setWishlist((current) => {
      if (current.includes(productId)) {
        showToast('Removed from wishlist')
        return current.filter((id) => id !== productId)
      }
      showToast('Saved to wishlist')
      return [...current, productId]
    })
  }

  function applyPromo(code) {
    const normalized = code.trim().toUpperCase()
    if (!promos[normalized]) return { ok: false, message: 'That code is not recognized.' }
    setPromo(normalized)
    showToast(`${normalized} applied`)
    return { ok: true, message: 'Offer applied.' }
  }

  function clearPromo() {
    setPromo(null)
  }

  function login(email, password) {
    const users = read(KEYS.users, [])
    const found = users.find((entry) => entry.email.toLowerCase() === email.trim().toLowerCase())
    if (!found || found.password !== password) {
      return { ok: false, message: 'Email or password does not match our records.' }
    }
    setUser({ name: found.name, email: found.email })
    showToast(`Welcome back, ${found.name.split(' ')[0]}`)
    return { ok: true }
  }

  function signup({ name, email, password }) {
    const users = read(KEYS.users, [])
    if (users.some((entry) => entry.email.toLowerCase() === email.trim().toLowerCase())) {
      return { ok: false, message: 'An account with that email already exists.' }
    }
    const next = [...users, { name: name.trim(), email: email.trim(), password }]
    localStorage.setItem(KEYS.users, JSON.stringify(next))
    setUser({ name: name.trim(), email: email.trim() })
    showToast('Account created')
    return { ok: true }
  }

  function logout() {
    setUser(null)
    showToast('Signed out')
  }

  function placeOrder(details) {
    const lines = resolveCart(cart)
    const totals = getTotals(lines, promo)
    const order = {
      id: `LN-${Math.floor(100000 + Math.random() * 900000)}`,
      lines: lines.map((line) => ({
        name: line.product.name,
        image: line.product.image,
        size: line.size,
        qty: line.qty,
        unit: line.unit,
      })),
      details,
      totals,
      promo,
      createdAt: new Date().toISOString(),
    }
    setLastOrder(order)
    localStorage.setItem(KEYS.order, JSON.stringify(order))
    setCart([])
    setPromo(null)
    return order
  }

  const lines = resolveCart(cart)
  const totals = getTotals(lines, promo)
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)

  const value = {
    cart,
    lines,
    totals,
    cartCount,
    wishlist,
    user,
    promo,
    toast,
    lastOrder,
    addToCart,
    updateQty,
    removeFromCart,
    toggleWishlist,
    applyPromo,
    clearPromo,
    login,
    signup,
    logout,
    placeOrder,
    showToast,
    dismissToast: () => setToast(null),
  }

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}
