import { Component, OnInit } from '@angular/core';
import { BasketService, Product } from '../basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css'],
})
export class BasketComponent implements OnInit {
  cartItems: Product[] = [];
  totalPrice: number = 0;
  constructor(private cartService: BasketService) {}
  ngOnInit() {
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
      this.totalPrice = this.cartService.getTotalPrice(); // Toplam fiyatı al
    });
  }
  increaseQuantity(product: Product) {
    this.cartService.addToCart(product);
  }
  decreaseQuantity(product: Product) {
    this.cartService.decreaseQuantity(product.id);
  }
  removeItem(product: Product) {
    this.cartService.removeFromCart(product.id);
  }
}
