class Cart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('nur_cart')) || [];
    this.init();
  }

  save() {
    localStorage.setItem('nur_cart', JSON.stringify(this.items));
    this.updateBadge();
  }

  addItem(productId, size = 'M', quantity = 1) {
    const product = products.find(p => p.id === Number(productId));
    if (!product) return;

    const existing = this.items.find(item => item.id === product.id && item.size === size);
    if (existing) {
      existing.quantity += Number(quantity);
    } else {
      this.items.push({ ...product, size, quantity: Number(quantity) });
    }
    this.save();
  }

  removeItem(id, size) {
    this.items = this.items.filter(item => !(item.id === id && item.size === size));
    this.save();
  }

  updateQuantity(id, size, qty) {
    const item = this.items.find(item => item.id === id && item.size === size);
    if (item) {
      item.quantity = Math.max(1, Number(qty));
      this.save();
    }
  }

  getTotal() {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  getCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  updateBadge() {
    const badge = document.getElementById('cart-count');
    if (badge) {
      badge.textContent = this.getCount();
    }
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => this.updateBadge());
  }
}

const cart = new Cart();