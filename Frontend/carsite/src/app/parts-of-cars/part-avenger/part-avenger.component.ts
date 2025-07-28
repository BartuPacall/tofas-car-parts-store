import { Component } from '@angular/core';
import { BasketService, Product as BasketProduct } from '../../basket.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  quantity?: number;
}

@Component({
  selector: 'app-part-avenger',
  templateUrl: './part-avenger.component.html',
  styleUrls: ['./part-avenger.component.css'],
})
export class PartAvengerComponent {
  searchQuery = '';

  products: Product[] = [
    {
      id: 31,
      name: 'FROW - Hararet Müşürü',
      description:
        'Motor sıcaklığını hassas şekilde ölçerek aracınızın aşırı ısınmasını önlemeye yardımcı olan kaliteli bir müşürdür.',
      imageUrl:
        'assets/parcalar/JEEP_AVENGER_urun_resimleri/hararet-musuru-frow-2821911005.png',
      price: 100,
    },
    {
      id: 32,
      name: 'KRUGER - Hava Filtresi',
      description:
        'Motor performansını artırmak için temiz hava girişini sağlayan uzun ömürlü bir hava filtresidir.',
      imageUrl:
        'assets/parcalar/JEEP_AVENGER_urun_resimleri/hava-filtresi-kruger-kaf32025.png',
      price: 120,
    },
    {
      id: 33,
      name: 'VOLLER - Hava Filtresi',
      description:
        'Toz, kir ve partikülleri motordan uzak tutarak yakıt tasarrufu ve performans sunar.',
      imageUrl:
        'assets/parcalar/JEEP_AVENGER_urun_resimleri/hava-filtresi-voller-66130.png',
      price: 110,
    },
    {
      id: 34,
      name: 'AXAM - Polen Filtresi',
      description:
        'Aracın içine temiz ve tozsuz hava girişini sağlayan etkili bir polen filtresidir.',
      imageUrl:
        'assets/parcalar/JEEP_AVENGER_urun_resimleri/polen-filtresi-axam-0426113599.png',
      price: 90,
    },
    {
      id: 35,
      name: 'Fase - Polen Filtresi',
      description:
        'Sürüş sırasında dış ortamdan gelen toz, polen ve zararlı partikülleri filtreleyerek ferah bir iç ortam sağlar.',
      imageUrl:
        'assets/parcalar/JEEP_AVENGER_urun_resimleri/polen-filtresi-fase-22-225-025.png',
      price: 95,
    },
    {
      id: 36,
      name: 'KRUGER - Polen Filtresi',
      description:
        'Yüksek filtrasyon kapasitesiyle hava kalitesini artıran dayanıklı bir polen filtresi modelidir.',
      imageUrl:
        'assets/parcalar/JEEP_AVENGER_urun_resimleri/polen-filtresi-kruger-kcf32014.png',
      price: 105,
    },
    {
      id: 37,
      name: 'FILTRON - Yağ Filtresi',
      description:
        'Motor yağını kir, metal parçacık ve tortudan arındırarak motor ömrünü uzatan güvenilir bir filtredir.',
      imageUrl:
        'assets/parcalar/JEEP_AVENGER_urun_resimleri/yag-filtresi-filtron-op5401.png',
      price: 130,
    },
    {
      id: 38,
      name: 'KRAFTVOLL - Yağ Filtresi',
      description:
        'Motor yağını etkili şekilde süzen, sızdırmazlık sağlayan kaliteli bir yağ filtresi modelidir.',
      imageUrl:
        'assets/parcalar/JEEP_AVENGER_urun_resimleri/yag-filtresi-kraftvoll-06020072eco.png',
      price: 125,
    },
    {
      id: 39,
      name: 'KRUGER - Yağ Filtresi',
      description:
        'Yüksek performanslı motorlar için uygun, dayanıklı yapısıyla öne çıkan yağ filtresidir.',
      imageUrl:
        'assets/parcalar/JEEP_AVENGER_urun_resimleri/yag-filtresi-kruger-kof33001.png',
      price: 115,
    },
    {
      id: 40,
      name: 'Sakura - Yağ Filtresi',
      description:
        'Uzun ömürlü, yüksek filtrasyon kapasiteli bu yağ filtresi motorunuzu temiz tutar.',
      imageUrl:
        'assets/parcalar/JEEP_AVENGER_urun_resimleri/yag-filtresi-sakura-c-2105.png',
      price: 140,
    },
  ];

  filteredProducts: Product[] = [...this.products];

  onSearch() {
    const q = this.searchQuery.toLowerCase().trim();
    this.filteredProducts = this.products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  constructor(
    private snackBar: MatSnackBar,
    private basketService: BasketService,
    private router: Router
  ) {}

  addToCart(product: Product) {
    const quantity = product['quantity'] || 1;
    this.basketService.addToCart({ ...product, quantity });
    this.snackBar.open(
      `${quantity} adet "${product.name}" sepete eklendi.`,
      'Kapat',
      {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      }
    );
    product.quantity = 1;
  }

  goToBasket() {
    this.router.navigate(['/basket']);
  }
  selectedProduct: Product | null = null;

  showProductDetails(product: Product) {
    this.selectedProduct = product;
  }

  closeProductDetails() {
    this.selectedProduct = null;
  }
}
