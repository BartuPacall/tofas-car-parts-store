import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
export interface Product {
  id: number;
  name: string;
  price: number;
  quantity?: number;
  imageUrl?: string; //
}
@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private cartItems: Product[] = [];
  private cartItemsSubject = new BehaviorSubject<Product[]>([]);
  addToCart(product: Product) {
    const quantityToAdd = product.quantity || 1;
    const index = this.cartItems.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      this.cartItems[index].quantity! += 1;
    } else {
      this.cartItems.push({ ...product, quantity: quantityToAdd });
    }
    this.cartItemsSubject.next(this.cartItems);
    this.saveToBasketToLocalStorage();
  }

  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter((item) => item.id !== productId);
    this.cartItemsSubject.next(this.cartItems);
    this.saveToBasketToLocalStorage();
  }

  decreaseQuantity(productId: number) {
    const index = this.cartItems.findIndex((item) => item.id === productId);
    if (index !== -1) {
      if (this.cartItems[index].quantity! > 1) {
        this.cartItems[index].quantity!--;
      } else {
        this.removeFromCart(productId);
        return;
      }
      this.cartItemsSubject.next(this.cartItems);
      this.saveToBasketToLocalStorage();
    }
  }

  getCartItems(): Observable<Product[]> {
    return this.cartItemsSubject.asObservable();
  }
  getTotalPrice(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
    );
  }
  clearCart() {
    this.cartItems = [];
    this.cartItemsSubject.next(this.cartItems);
  }
  private saveToBasketToLocalStorage() {
    localStorage.setItem('basket', JSON.stringify(this.cartItems));
  }
  private loadBasketFromLocalStorage() {
    const savedBasket = localStorage.getItem('basket');
    if (savedBasket) {
      this.cartItems = JSON.parse(savedBasket);
      this.cartItemsSubject.next(this.cartItems);
    }
  }
  constructor() {
    this.loadBasketFromLocalStorage();
  }
}
